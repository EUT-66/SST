import { SPEC_LIMITS, type TradeCourseSpec } from './tradeCourse';

/** Contrôle une fiche métier ; renvoie la liste des problèmes (vide si tout va bien). */
export function checkSpec(spec: TradeCourseSpec, knownTradeIds: string[]): string[] {
  const problems: string[] = [];
  const L = SPEC_LIMITS;
  const max = (path: string, value: string, limit: number) => {
    if (typeof value !== 'string' || !value.trim()) problems.push(`${path} : vide`);
    else if (value.length > limit) problems.push(`${path} : ${value.length} caractères (maximum ${limit})`);
  };

  if (!knownTradeIds.includes(spec.tradeId)) problems.push(`tradeId inconnu : ${spec.tradeId}`);
  if (!/^[A-Z]{2,5}$/.test(spec.code)) problems.push(`code invalide : ${spec.code}`);
  max('diplome', spec.diplome, 30);
  max('intitule', spec.intitule, 60);
  max('prefixe', spec.prefixe, 14);
  max('public', spec.public, 70);
  max('cote', spec.cote, 28);
  max('lieux', spec.lieux, 90);
  max('roles.prevention', spec.roles.prevention, 90);
  max('roles.secours', spec.roles.secours, 90);
  (['at', 'trajet', 'mp'] as const).forEach((k) => max(`atmp.${k}`, spec.atmp[k], L.exemple));
  (['manutention', 'outillage', 'hauteur', 'plainPied'] as const).forEach((k) => max(`causes.${k}`, spec.causes[k], L.court));
  max('premierMaillon', spec.premierMaillon, L.encadre);
  max('quiFormer', spec.quiFormer, L.encadre);
  max('observer', spec.observer, L.encadreLateral);
  if (spec.dangers?.length !== 4) problems.push('dangers : 4 éléments attendus');
  spec.dangers?.forEach((d, i) => max(`dangers[${i}]`, d, L.danger));
  (['mecanique', 'electrique', 'thermique', 'atmosphere'] as const).forEach((k) => max(`categories.${k}`, spec.categories[k], L.exemple));
  max('processus.contexte', spec.processus.contexte, L.contexte);
  (['danger', 'operateur', 'situation', 'evenement', 'dommage'] as const).forEach((k) => max(`processus.${k}`, spec.processus[k], L.court));
  max('exerciceReperage.situation', spec.exerciceReperage.situation, L.situationExercice);
  if (spec.exerciceReperage.elements?.length !== 6) problems.push('exerciceReperage.elements : 6 éléments attendus');
  spec.exerciceReperage.elements?.forEach((e, i) => max(`exerciceReperage.elements[${i}]`, e, L.court));
  max('exerciceReperage.corrections', spec.exerciceReperage.corrections, L.notes);
  max('principes', spec.principes, L.encadreLateral);
  (['prevention', 'collective', 'individuelle'] as const).forEach((k) => max(`protections.${k}`, spec.protections[k], L.exemple));
  max('exerciceNouveau.titre', spec.exerciceNouveau.titre, L.titreExercice);
  max('exerciceNouveau.situation', spec.exerciceNouveau.situation, L.situationNouveau);
  max('exerciceNouveau.corrections', spec.exerciceNouveau.corrections, L.notes);
  max('droitRetrait', spec.droitRetrait, L.encadre);
  max('sirene', spec.sirene, L.encadre);
  max('proteger', spec.proteger, L.encadre);
  max('supprimer', spec.supprimer, L.exemple);
  max('isoler', spec.isoler, L.exemple);
  max('alerter', spec.alerter, L.encadre);
  max('lieuxAlerte', spec.lieuxAlerte, L.court);
  max('natureAlerte', spec.natureAlerte, L.court);
  max('messageAlerte', spec.messageAlerte, L.messageAlerte);
  max('urgence.titre', spec.urgence.titre, L.urgenceTitre);
  max('urgence.texte', spec.urgence.texte, L.urgenceTexte);
  if (typeof spec.urgence.notes !== 'string') problems.push('urgence.notes : texte attendu (éventuellement vide)');
  else if (spec.urgence.notes.length > L.notes) problems.push('urgence.notes : trop long');
  (['saignement', 'etouffement', 'malaise', 'brulure', 'traumatisme', 'plaie', 'inconscient', 'arret'] as const).forEach((k) =>
    max(`secourir.${k}`, spec.secourir[k], L.secourir),
  );
  max('produits', spec.produits, L.encadre);
  if (spec.casConcrets?.length !== 4) problems.push('casConcrets : 4 cas attendus');
  spec.casConcrets?.forEach((c, i) => {
    max(`casConcrets[${i}].titre`, c.titre, L.casTitre);
    max(`casConcrets[${i}].texte`, c.texte, L.casTexte);
  });
  max('casConcretsNotes', spec.casConcretsNotes, L.notes);

  const all = JSON.stringify(spec);
  if (spec.code !== 'MIT' && /\bMIT\b/.test(all)) problems.push('le texte mentionne encore « MIT »');
  if (/\b(TODO|XXX|lorem)\b/i.test(all)) problems.push('texte provisoire (TODO, XXX, lorem…)');
  if (/undefined|null/.test(all)) problems.push('valeur « undefined » ou « null » dans le texte');
  if (all.includes("'")) problems.push('apostrophe droite : utiliser l’apostrophe typographique « ’ »');
  return problems;
}
