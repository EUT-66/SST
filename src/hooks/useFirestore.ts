import {
  collection,
  doc,
  onSnapshot,
  query,
  type DocumentData,
  type Query,
  type QueryConstraint,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';

export interface LiveState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

/** Abonnement temps réel à un document (chemin nul = pas d'abonnement). */
export function useDocument<T>(path: string | null): LiveState<T | null> {
  const [state, setState] = useState<LiveState<T | null>>({ data: null, loading: !!path, error: null });
  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState((s) => ({ ...s, loading: true }));
    return onSnapshot(
      doc(db, path),
      (snap) =>
        setState({ data: snap.exists() ? ({ ...(snap.data() as object), id: snap.id } as T) : null, loading: false, error: null }),
      (error) => setState({ data: null, loading: false, error }),
    );
  }, [path]);
  return state;
}

/** Abonnement temps réel à une collection. `key` permet de relancer l'abonnement quand les filtres changent. */
export function useCollection<T>(
  path: string | null,
  constraints: QueryConstraint[] = [],
  key = '',
): LiveState<T[]> {
  const [state, setState] = useState<LiveState<T[]>>({ data: [], loading: !!path, error: null });
  useEffect(() => {
    if (!path) {
      setState({ data: [], loading: false, error: null });
      return;
    }
    setState((s) => ({ ...s, loading: true }));
    const q: Query<DocumentData> = query(collection(db, path), ...constraints);
    return onSnapshot(
      q,
      (snap) =>
        setState({
          data: snap.docs.map((d) => ({ ...(d.data() as object), id: d.id }) as T),
          loading: false,
          error: null,
        }),
      (error) => setState({ data: [], loading: false, error }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, key]);
  return state;
}
