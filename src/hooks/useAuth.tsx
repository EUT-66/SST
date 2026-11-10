import { onAuthStateChanged, signOut as fbSignOut, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { auth, db } from '../lib/firebase';
import { can, isActiveStaff } from '../lib/permissions';
import type { Permission, UserProfile } from '../lib/types';

interface AuthState {
  firebaseUser: User | null;
  profile: UserProfile | null;
  /** La fiche n'a pas pu être lue (réseau, quota…) : ce n'est pas une fiche absente. */
  profileError: boolean;
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
  const [profileError, setProfileError] = useState(false);

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
    setProfileError(false);
    return onSnapshot(
      doc(db, 'users', firebaseUser.uid),
      { includeMetadataChanges: true },
      (snap) => {
        // le cache local peut ne pas encore contenir la fiche : on attend la réponse du serveur
        // avant de conclure qu'elle n'existe pas (sinon l'écran « Finaliser votre inscription »
        // s'afficherait et réécrirait la fiche d'un compte existant)
        if (!snap.exists() && snap.metadata.fromCache) return;
        setProfile(snap.exists() ? ({ ...(snap.data() as UserProfile), uid: snap.id } as UserProfile) : null);
        setProfileError(false);
        setProfileReady(true);
      },
      () => {
        // on garde la fiche déjà connue ; sans fiche, on affiche une erreur, pas l'inscription
        setProfileError(true);
        setProfileReady(true);
      },
    );
  }, [firebaseUser]);

  const value = useMemo<AuthState>(
    () => ({
      firebaseUser,
      profile,
      profileError,
      loading: !authReady || !profileReady,
      isStaff: isActiveStaff(profile),
      can: (p) => can(profile, p),
      signOut: () => fbSignOut(auth),
    }),
    [firebaseUser, profile, profileError, authReady, profileReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
}
