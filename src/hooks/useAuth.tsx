import { onAuthStateChanged, signOut as fbSignOut, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { auth, db } from '../lib/firebase';
import { can, isActiveStaff } from '../lib/permissions';
import type { Permission, UserProfile } from '../lib/types';

interface AuthState {
  firebaseUser: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isStaff: boolean;
  can: (p: Permission) => boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      setAuthReady(true);
      if (!u || u.isAnonymous) {
        setProfile(null);
        setProfileReady(true);
      } else {
        setProfileReady(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!firebaseUser || firebaseUser.isAnonymous) return;
    return onSnapshot(
      doc(db, 'users', firebaseUser.uid),
      (snap) => {
        setProfile(snap.exists() ? ({ ...(snap.data() as UserProfile), uid: snap.id } as UserProfile) : null);
        setProfileReady(true);
      },
      () => {
        setProfile(null);
        setProfileReady(true);
      },
    );
  }, [firebaseUser]);

  const value = useMemo<AuthState>(
    () => ({
      firebaseUser,
      profile,
      loading: !authReady || !profileReady,
      isStaff: isActiveStaff(profile),
      can: (p) => can(profile, p),
      signOut: () => fbSignOut(auth),
    }),
    [firebaseUser, profile, authReady, profileReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
}
