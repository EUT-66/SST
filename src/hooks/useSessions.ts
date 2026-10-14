import { where } from 'firebase/firestore';
import { useMemo } from 'react';
import type { Session } from '../lib/types';
import { useAuth } from './useAuth';
import { useCollection } from './useFirestore';

/** Sessions du formateur connecté, ou de toute l'équipe avec la permission « voir toutes les sessions ». */
export function useSessions(scope: 'mine' | 'all' = 'mine') {
  const { profile, can } = useAuth();
  const all = scope === 'all' && can('viewAllSessions');
  const constraints = useMemo(() => (all || !profile ? [] : [where('trainerId', '==', profile.uid)]), [all, profile]);
  const state = useCollection<Session>(profile ? 'sessions' : null, constraints, `${all}-${profile?.uid}`);
  const sorted = useMemo(() => [...state.data].sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? '')), [state.data]);
  return { ...state, data: sorted };
}
