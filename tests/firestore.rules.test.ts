import { assertFails, assertSucceeds, initializeTestEnvironment, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, writeBatch, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';

let env: RulesTestEnvironment;

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-sst-rules',
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
  });
});
afterAll(() => env.cleanup());
beforeEach(() => env.clearFirestore());

const user = (uid: string, email = `${uid}@ex.fr`) => env.authenticatedContext(uid, { email }).firestore();

async function seedUser(uid: string, role: string, permissions?: Record<string, boolean>) {
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'users', uid), { uid, email: `${uid}@ex.fr`, role, firstName: uid, lastName: 'X', ...(permissions ? { permissions } : {}) });
  });
}

describe('inscription et premier administrateur', () => {
  it('le premier compte peut devenir admin, pas le suivant', async () => {
    const a = user('alice');
    const b1 = writeBatch(a);
    b1.set(doc(a, 'users', 'alice'), { uid: 'alice', email: 'alice@ex.fr', role: 'admin', firstName: 'A', lastName: 'A' });
    b1.set(doc(a, 'meta', 'bootstrap'), { uid: 'alice' });
    await assertSucceeds(b1.commit());

    const b = user('bob');
    const b2 = writeBatch(b);
    b2.set(doc(b, 'users', 'bob'), { uid: 'bob', email: 'bob@ex.fr', role: 'admin', firstName: 'B', lastName: 'B' });
    b2.set(doc(b, 'meta', 'bootstrap'), { uid: 'bob' });
    await assertFails(b2.commit());
    await assertFails(setDoc(doc(b, 'users', 'bob'), { uid: 'bob', email: 'bob@ex.fr', role: 'admin', firstName: 'B', lastName: 'B' }));
    await assertSucceeds(setDoc(doc(b, 'users', 'bob'), { uid: 'bob', email: 'bob@ex.fr', role: 'pending', firstName: 'B', lastName: 'B' }));
  });

  it('un utilisateur ne peut pas changer son propre rôle ni ses permissions', async () => {
    await seedUser('bob', 'pending');
    const b = user('bob');
    await assertFails(updateDoc(doc(b, 'users', 'bob'), { role: 'formateur' }));
    await assertFails(updateDoc(doc(b, 'users', 'bob'), { permissions: { manageCases: true } }));
    await assertSucceeds(updateDoc(doc(b, 'users', 'bob'), { firstName: 'Robert', signature: 'data:image/png;base64,xx' }));
  });

  it('seul un admin valide un compte ; un gestionnaire non admin ne peut pas créer d’admin', async () => {
    await seedUser('admin', 'admin');
    await seedUser('ref', 'referent', { manageUsers: true });
    await seedUser('bob', 'pending');
    await assertSucceeds(updateDoc(doc(user('admin'), 'users', 'bob'), { role: 'formateur' }));
    await assertFails(updateDoc(doc(user('ref'), 'users', 'bob'), { role: 'admin' }));
    await assertSucceeds(updateDoc(doc(user('ref'), 'users', 'bob'), { role: 'referent' }));
  });
});

describe('contenus et permissions', () => {
  it('un compte en attente ne lit pas les contenus', async () => {
    await seedUser('bob', 'pending');
    await assertFails(getDoc(doc(user('bob'), 'cases', 'c1')));
  });
  it('un formateur lit mais ne modifie pas les cas, sauf permission accordée', async () => {
    await seedUser('f', 'formateur');
    await seedUser('g', 'formateur', { manageCases: true });
    await seedUser('r', 'referent', { manageCases: false });
    await assertSucceeds(getDoc(doc(user('f'), 'cases', 'c1')));
    await assertFails(setDoc(doc(user('f'), 'cases', 'c1'), { title: 'x' }));
    await assertSucceeds(setDoc(doc(user('g'), 'cases', 'c1'), { title: 'x' }));
    await assertFails(setDoc(doc(user('r'), 'cases', 'c2'), { title: 'x' }));
    await assertFails(setDoc(doc(user('g'), 'questions', 'q1'), { text: 'x' }));
  });
  it('un compte désactivé perd tout accès', async () => {
    await seedUser('d', 'disabled');
    await assertFails(getDoc(doc(user('d'), 'courses', 'c')));
  });
});

describe('sessions', () => {
  beforeEach(async () => {
    await seedUser('f1', 'formateur');
    await seedUser('f2', 'formateur');
    await seedUser('admin', 'admin');
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'sessions', 's1'), { trainerId: 'f1', title: 'S1' });
      await setDoc(doc(ctx.firestore(), 'sessions', 's1', 'learners', 'l1'), { lastName: 'A' });
    });
  });
  it('chaque formateur ne voit que ses sessions', async () => {
    await assertSucceeds(getDoc(doc(user('f1'), 'sessions', 's1')));
    await assertFails(getDoc(doc(user('f2'), 'sessions', 's1')));
    await assertFails(getDoc(doc(user('f2'), 'sessions', 's1', 'learners', 'l1')));
    await assertSucceeds(getDocs(query(collection(user('f2'), 'sessions'), where('trainerId', '==', 'f2'))));
    await assertFails(getDocs(collection(user('f2'), 'sessions')));
    await assertSucceeds(getDocs(collection(user('admin'), 'sessions')));
  });
  it('un formateur crée ses sessions et gère ses apprentis', async () => {
    await assertSucceeds(setDoc(doc(user('f2'), 'sessions', 's2'), { trainerId: 'f2', title: 'S2' }));
    await assertFails(setDoc(doc(user('f2'), 'sessions', 's3'), { trainerId: 'f1', title: 'S3' }));
    await assertSucceeds(setDoc(doc(user('f1'), 'sessions', 's1', 'learners', 'l2'), { lastName: 'B' }));
    await assertFails(setDoc(doc(user('f2'), 'sessions', 's1', 'learners', 'l3'), { lastName: 'C' }));
    await assertFails(updateDoc(doc(user('f1'), 'sessions', 's1'), { trainerId: 'f2' }));
    await assertSucceeds(deleteDoc(doc(user('f1'), 'sessions', 's1', 'learners', 'l1')));
  });
});

describe('QCM à distance', () => {
  beforeEach(async () => {
    await seedUser('f1', 'formateur');
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'publicRuns', 'ABC123'), {
        ownerId: 'f1', type: 'evaluation', open: true, learnerIds: ['l1', 'l2'], questions: [],
      });
    });
  });
  const anon = () => env.authenticatedContext('anon1', { firebase: { sign_in_provider: 'anonymous' } } as never).firestore();

  it('un apprenti anonyme lit le questionnaire et dépose une seule copie', async () => {
    const a = anon();
    await assertSucceeds(getDoc(doc(a, 'publicRuns', 'ABC123')));
    await assertFails(getDocs(collection(a, 'publicRuns')));
    const sub = { learnerId: 'l1', uid: 'anon1', answers: {}, startedAt: 1, submittedAt: 2, label: 'A' };
    await assertSucceeds(setDoc(doc(a, 'publicRuns', 'ABC123', 'submissions', 'l1'), sub));
    await assertFails(setDoc(doc(a, 'publicRuns', 'ABC123', 'submissions', 'l1'), sub));
    await assertFails(setDoc(doc(a, 'publicRuns', 'ABC123', 'submissions', 'zz'), { ...sub, learnerId: 'zz' }));
    await assertFails(setDoc(doc(a, 'publicRuns', 'ABC123', 'submissions', 'x'), { ...sub, learnerId: 'l2' }));
    await assertFails(getDocs(collection(a, 'publicRuns', 'ABC123', 'submissions')));
    await assertSucceeds(getDocs(collection(user('f1'), 'publicRuns', 'ABC123', 'submissions')));
  });
  it('plus aucun dépôt une fois le QCM fermé', async () => {
    await updateDoc(doc(user('f1'), 'publicRuns', 'ABC123'), { open: false });
    await assertFails(setDoc(doc(anon(), 'publicRuns', 'ABC123', 'submissions', 'l2'), { learnerId: 'l2', uid: 'anon1', answers: {} }));
  });
  it('un anonyme ne lit rien d’autre', async () => {
    await assertFails(getDoc(doc(anon(), 'cases', 'c1')));
    await assertFails(getDoc(doc(anon(), 'sessions', 's1')));
  });
});
