import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// La configuration web Firebase n'est pas secrète : la sécurité repose sur les règles
// Firestore / Storage (firestore.rules, storage.rules).
const firebaseConfig = {
  apiKey: 'AIzaSyA4U6fO16CWi92zzJW99GUjk98gy5RQF38',
  authDomain: 'mon-espace-sst.firebaseapp.com',
  projectId: 'mon-espace-sst',
  storageBucket: 'mon-espace-sst.firebasestorage.app',
  messagingSenderId: '630570058780',
  appId: '1:630570058780:web:ff0dd81e1b9dc385cc8bd9',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const useEmulators = import.meta.env.VITE_USE_EMULATORS === 'true';

export const db = initializeFirestore(app, useEmulators
  ? {}
  : { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
export const storage = getStorage(app);

if (useEmulators) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}
