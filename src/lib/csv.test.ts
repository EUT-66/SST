import { describe, expect, it } from 'vitest';
import { detectSessionTrade, detectTrade, diffLearners, parseCsvBuffer, parseCsvText, parseDate, rowsToLearners, splitFullName } from './csv';
import type { Learner, Trade } from './types';

const trades: Trade[] = [
  { id: 'mit', code: 'MIT', label: 'Monteur en installations thermiques', keywords: ['MIT', 'installations thermiques', 'thermique'] },
  { id: 'macon', code: 'MAC', label: 'Maçon', keywords: ['maçon', 'maconnerie'] },
  { id: 'elec', code: 'ELEC', label: 'Électricien', keywords: ['électricien', 'ELEC'] },
];

describe('parseCsv', () => {
  it('lit un export Netyparéo au point-virgule avec ligne de titre', () => {
    const text = [
      'Export des apprenants - CFA BTP',
      'Code apprenant;Nom;Prénom;Date de naissance;Formation;Groupe;Entreprise;Email',
      '12345;dupont;jean-marc;05/03/2007;CAP Monteur en installations thermiques;MIT1A;Chauffage Martin;jm@ex.fr',
      '12346;MARTIN;léa;2006-11-20;CAP MIT;MIT1A;;',
      ';;;;;;;',
    ].join('\r\n');
    const parsed = parseCsvText(text);
    expect(parsed.headers[1]).toBe('Nom');
    expect(parsed.mapping).toMatchObject({ externalId: 0, lastName: 1, firstName: 2, birthDate: 3, formation: 4, groupName: 5, company: 6, email: 7 });
    const learners = rowsToLearners(parsed);
    expect(learners).toHaveLength(2);
    expect(learners[0]).toMatchObject({ lastName: 'DUPONT', firstName: 'Jean-Marc', birthDate: '2007-03-05', externalId: '12345', company: 'Chauffage Martin' });
    expect(learners[1]).toMatchObject({ firstName: 'Léa', birthDate: '2006-11-20' });
    expect(detectSessionTrade(learners, trades)?.id).toBe('mit');
  });

  it('décode le Windows-1252 et les colonnes « Nom Prénom »', () => {
    const text = 'Apprenant,Né(e) le,Classe\n"DURAND Élodie",12/01/08,CAP Maçon 1\n';
    const bytes = Uint8Array.from([...text].map((c) => (c === 'É' ? 0xc9 : c === 'é' ? 0xe9 : c === 'ç' ? 0xe7 : c.charCodeAt(0))));
    const parsed = parseCsvBuffer(bytes.buffer);
    expect(parsed.encoding).toBe('windows-1252');
    const [l] = rowsToLearners(parsed);
    expect(l).toMatchObject({ lastName: 'DURAND', firstName: 'Élodie', birthDate: '2008-01-12', groupName: 'CAP Maçon 1' });
    expect(detectTrade(l.groupName!, trades)?.id).toBe('macon');
  });

  it("n'associe pas « nom de l'entreprise » au nom de l'apprenti", () => {
    const parsed = parseCsvText("Nom de l'entreprise;Prénom apprenant;Nom apprenant\nACME;Paul;Petit\n");
    expect(parsed.mapping.company).toBe(0);
    expect(parsed.mapping.lastName).toBe(2);
  });
});

describe('dates et noms', () => {
  it('reconnaît plusieurs formats', () => {
    expect(parseDate('5/3/2007')).toBe('2007-03-05');
    expect(parseDate('2007-03-05')).toBe('2007-03-05');
    expect(parseDate('05.03.2007')).toBe('2007-03-05');
    expect(parseDate('39146')).toBe('2007-03-05');
    expect(parseDate('31/02')).toBe('');
  });
  it('sépare nom et prénom', () => {
    expect(splitFullName('Jean Pierre DE LA TOUR')).toEqual({ lastName: 'DE LA TOUR', firstName: 'Jean Pierre' });
    expect(splitFullName('MARTIN Léa')).toEqual({ lastName: 'MARTIN', firstName: 'Léa' });
  });
  it('ne confond pas MIT avec un mot qui le contient', () => {
    expect(detectTrade('PERMIT DE FEU', trades)).toBeNull();
    expect(detectTrade('Bac pro électricien', trades)?.id).toBe('elec');
  });
});

describe('diffLearners', () => {
  const existing: Learner[] = [
    { id: 'a', lastName: 'DUPONT', firstName: 'Jean', externalId: '1', birthDate: '2007-01-01' },
    { id: 'b', lastName: 'MARTIN', firstName: 'Léa', birthDate: '2006-02-02' },
    { id: 'c', lastName: 'PETIT', firstName: 'Paul' },
  ];
  it('détecte ajouts, mises à jour, inchangés et absents', () => {
    const d = diffLearners(existing, [
      { lastName: 'DUPONT', firstName: 'Jean', externalId: '1', birthDate: '2007-01-01', email: 'j@x.fr' },
      { lastName: 'MARTIN', firstName: 'Léa', birthDate: '2006-02-02' },
      { lastName: 'NOUVEAU', firstName: 'Nina' },
    ]);
    expect(d.updated.map((u) => u.existing.id)).toEqual(['a']);
    expect(d.updated[0].changes).toEqual(['email']);
    expect(d.unchanged.map((u) => u.id)).toEqual(['b']);
    expect(d.added.map((u) => u.lastName)).toEqual(['NOUVEAU']);
    expect(d.missing.map((u) => u.id)).toEqual(['c']);
  });
});
