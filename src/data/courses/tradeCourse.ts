// Gabarit des supports de cours par métier.
// Il reprend à l'identique la structure et les contenus INRS du cours « SST – CAP MIT »
// (56 diapositives, 4 séances) ; seuls les exemples, encadrés et exercices propres au
// métier sont fournis par une fiche `TradeCourseSpec`.
import type { Callout, Course, Slide, SlideItem } from '../../lib/types';

export interface TradeCourseSpec {
  /** Identifiant du métier dans l'application (ex. « macon »). */
  tradeId: string;
  /** Code de la section (ex. « MAC »), utilisé dans les exemples « MAC : … ». */
  code: string;
  /** Diplôme abrégé, affiché sur la couverture (ex. « CAP MAC »). */
  diplome: string;
  /** Intitulé complet du diplôme, utilisé dans le titre du cours (ex. « CAP Maçon »). */
  intitule: string;
  /** Préfixe des exemples métier (ex. « MAC » dans « MAC : chute d’échafaudage »). */
  prefixe: string;
  /** Sous-titre de la couverture (ex. « Maçons — CFA BTP »). */
  public: string;
  /** Titre des encadrés métier (ex. « Côté maçon »). */
  cote: string;
  /** Lieux de travail évoqués dans les notes (ex. « chantier de gros œuvre, atelier, dépôt »). */
  lieux: string;
  /** Exemples des deux casquettes du SST (sans « Ex. : »). */
  roles: { prevention: string; secours: string };
  /** Exemples d'accident du travail, d'accident de trajet et de maladie professionnelle. */
  atmp: { at: string; trajet: string; mp: string };
  /** Exemples métier des 4 grandes causes d'accidents du BTP. */
  causes: { manutention: string; outillage: string; hauteur: string; plainPied: string };
  /** Encadré « le premier maillon des secours, c'est vous ». */
  premierMaillon: string;
  /** Encadré sur le nombre de SST dans l'entreprise. */
  quiFormer: string;
  /** Encadré « observer avant de commencer ». */
  observer: string;
  /** Quatre exemples de « ce qui peut faire mal » dans le métier. */
  dangers: [string, string, string, string];
  /** Exemples métier pour les 4 catégories de dangers. */
  categories: { mecanique: string; electrique: string; thermique: string; atmosphere: string };
  /** Exemple du processus d'apparition du dommage. */
  processus: { contexte: string; danger: string; operateur: string; situation: string; evenement: string; dommage: string };
  /** Exercice de repérage des dangers : situation, 6 éléments et pistes de correction (notes). */
  exerciceReperage: { situation: string; elements: [string, string, string, string, string, string]; corrections: string };
  /** Encadré illustrant deux des 9 principes généraux de prévention. */
  principes: string;
  /** Exemples métier de prévention, protection collective, protection individuelle. */
  protections: { prevention: string; collective: string; individuelle: string };
  /** Exercice « le nouvel apprenti » : titre, situation complète et pistes (notes). */
  exerciceNouveau: { titre: string; situation: string; corrections: string };
  /** Encadré droit de retrait : situations de danger grave et imminent du métier. */
  droitRetrait: string;
  /** Encadré réflexe métier quand la sirène retentit. */
  sirene: string;
  /** Encadré « Protéger : repérer avant d'agir ». */
  proteger: string;
  /** Exemples pour supprimer puis isoler un danger. */
  supprimer: string;
  isoler: string;
  /** Encadré « Faire alerter ». */
  alerter: string;
  /** Exemples pour le lieu et la nature de l'accident dans le message d'alerte. */
  lieuxAlerte: string;
  natureAlerte: string;
  /** Exemple complet de message d'alerte. */
  messageAlerte: string;
  /** Encadré de la diapositive des numéros d'urgence, et notes associées. */
  urgence: { titre: string; texte: string; notes: string };
  /** Encadrés métier des 8 situations de « Secourir ». */
  secourir: {
    saignement: string;
    etouffement: string;
    malaise: string;
    brulure: string;
    traumatisme: string;
    plaie: string;
    inconscient: string;
    arret: string;
  };
  /** Encadré « Vos produits à risque ». */
  produits: string;
  /** Quatre cas concrets (un par catégorie de danger) et notes de déroulé. */
  casConcrets: [{ titre: string; texte: string }, { titre: string; texte: string }, { titre: string; texte: string }, { titre: string; texte: string }];
  casConcretsNotes: string;
}

/** Longueurs maximales (en caractères) pour que le texte tienne sur la diapositive. */
export const SPEC_LIMITS = {
  court: 60, // causes, lieux/nature d'alerte, éléments d'exercice, processus
  exemple: 110, // rôles, AT/MP, catégories, protections, supprimer/isoler
  encadreLateral: 180, // encadrés affichés en colonne à côté d'étapes
  encadre: 200, // encadrés affichés sous des cartes
  secourir: 130, // encadrés métier des diapositives « Secourir »
  danger: 45,
  contexte: 72,
  titreExercice: 42,
  situationExercice: 90,
  situationNouveau: 270,
  messageAlerte: 330,
  urgenceTitre: 30,
  urgenceTexte: 120,
  casTitre: 35,
  casTexte: 125,
  notes: 1000,
} as const;

export function buildTradeCourse(spec: TradeCourseSpec, order: number): Course {
  const prefix = `${spec.code.toLowerCase()}-s`;
  let n = 0;
  const id = () => `${prefix}${String(++n).padStart(2, '0')}`;
  const items = (...pairs: [string, string?, string?][]): SlideItem[] =>
    pairs.map(([title, text, value]) => {
      const item: SlideItem = { title };
      if (text !== undefined) item.text = text;
      if (value !== undefined) item.value = value;
      return item;
    });
  const metier = (text: string, title = spec.cote): Callout => ({ kind: 'metier', title, text });
  const attention = (text: string, title = 'Attention'): Callout => ({ kind: 'attention', title, text });
  const info = (text: string, title?: string): Callout => (title ? { kind: 'info', title, text } : { kind: 'info', text });
  const question = (text: string, title = 'À votre avis ?'): Callout => ({ kind: 'question', title, text });
  const ex = (text: string) => `${spec.prefixe} : ${text}`;

  const slides: Slide[] = [
    {
      id: id(),
      layout: 'cover',
      kicker: `Formation SST · ${spec.diplome}`,
      title: 'Sauveteur Secouriste du Travail',
      subtitle: spec.public,
      items: items(['de formation', undefined, '14 h'], ['de validité du certificat (INRS)', undefined, '24 mois'], ['de MAC pour le renouveler', undefined, '7 h']),
      notes: 'Formation de 14 h. Si validation : certificat SST délivré sous l’égide de l’INRS, valable 24 mois. Maintien et actualisation des compétences (MAC) : 7 h.',
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Programme : 4 séances de 3 h 30',
      items: items(
        ['Séance 1', 'Le cadre du SST · La prévention · Protéger', '3 h 30'],
        ['Séance 2', 'Examiner · Alerter · Secourir (1 et 2)', '3 h 30'],
        ['Séance 3', 'Secourir (3 à 8) · Gestes et conduites à tenir', '3 h 30'],
        ['Séance 4', 'Cas concrets · Épreuves certificatives', '3 h 30'],
      ),
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Le rôle du SST : deux casquettes',
      items: items(
        ['Acteur de PRÉVENTION', `Intervenir sur une situation dangereuse dans le cadre de son travail, avant l’accident. Ex. : ${spec.roles.prevention}`],
        ['SECOURISTE', `Agir efficacement face à une situation d’accident (équivalent du PSC1). Ex. : ${spec.roles.secours}`],
      ),
    },
    { id: id(), layout: 'section', kicker: 'Partie 1', title: 'Le cadre du SST', subtitle: 'Pourquoi des SST, quel rôle, quelles règles ?' },
    {
      id: id(),
      layout: 'cards',
      title: 'Pourquoi forme-t-on des SST ?',
      items: items(
        ['L’accident arrive vite sur un chantier', 'Le BTP fait partie des secteurs les plus touchés par les accidents du travail.'],
        ['Les premières minutes comptent', 'Le collègue est sur place avant les secours : c’est lui qui peut tout changer.'],
        ['C’est prévu par le Code du travail', 'L’employeur doit organiser les premiers secours dans l’entreprise.'],
      ),
      callouts: [question('Avez-vous déjà vu un accident sur un chantier ou à l’atelier ?')],
      notes: `Laisser les apprentis répondre avant d’afficher les trois raisons. Faire le lien avec leur vécu en entreprise (${spec.lieux}).`,
    },
    {
      id: id(),
      layout: 'cards',
      title: 'AT et MP : de quoi parle-t-on ?',
      items: items(
        ['Accident du travail (AT)', `Événement soudain, survenu par le fait ou à l’occasion du travail, qui cause un dommage corporel au salarié. ${ex(spec.atmp.at)}`],
        ['Accident de trajet', `Accident survenu sur le parcours entre le domicile et le lieu de travail (ou le lieu de repas). À ne pas confondre avec l’AT. ${ex(spec.atmp.trajet)}`],
        ['Maladie professionnelle (MP)', `Maladie liée à l’exposition à un risque pendant l’activité. Reconnue si elle figure dans un tableau du Code de la Sécurité sociale. ${ex(spec.atmp.mp)}`],
      ),
    },
    {
      id: id(),
      layout: 'stats',
      title: 'Les accidents du travail en France (2024)',
      items: items(['décès suite à un accident du travail', undefined, '764'], ['décès suite à un accident de trajet', undefined, '318'], ['accidents du travail pour 1 000 salariés', undefined, '26,4']),
      callouts: [info('Plus d’un décès sur cinq survient dans l’année qui suit la prise de poste. Les nouveaux (apprentis, intérimaires) sont les plus exposés.', 'Les nouveaux d’abord')],
      body: 'Source : Assurance Maladie – Risques professionnels, rapport annuel 2024 (régime général).',
      notes: 'Chiffres 2024 du régime général : 764 décès par accident du travail, 318 par accident de trajet, 215 par maladie professionnelle. Indice de fréquence 26,4 AT pour 1 000 salariés. Plus de 20 % des décès surviennent dans l’année suivant la prise de poste. À actualiser chaque année avec le nouveau rapport.',
    },
    {
      id: id(),
      layout: 'stats',
      title: 'Et dans le BTP ?',
      items: items(['accidents du travail en 2024', undefined, '72 633'], ['décès au travail', undefined, '146'], ['AT pour 1 000 salariés (26,4 tous secteurs)', undefined, '38,1']),
      body: `Les causes les plus fréquentes :\n- Manutention manuelle : ${spec.causes.manutention}\n- Outillage à main : ${spec.causes.outillage}\n- Chutes de hauteur : ${spec.causes.hauteur} (22 décès)\n- Chutes de plain-pied : ${spec.causes.plainPied}\n\nSource : sinistralité AT/MP 2024 du BTP (Assurance Maladie – Risques professionnels, FFB).`,
      notes: 'BTP 2024 : 72 633 accidents du travail (-5,4 %), indice de fréquence 38,1 pour 1 000 salariés, 146 décès (149 en 2023), dont 22 par chute de hauteur. Manutention manuelle, outillage à main, chutes de hauteur et chutes de plain-pied représentent la très grande majorité des accidents.',
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Le secourisme du travail, c’est…',
      items: items(
        ['Agir efficacement', 'Réunir les compétences humaines et les moyens techniques pour agir en cas d’accident au travail, afin d’en limiter les conséquences.'],
        ['Sensibiliser chacun', 'Informer le plus grand nombre sur la notion de risque et de danger : prévenir et détecter pour éviter l’accident.'],
      ),
      callouts: [metier(spec.premierMaillon)],
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Le SST est…',
      items: items(
        ['Sensibilisé au repérage des dangers', 'Il repère les dangers et les risques de son établissement pour empêcher, autant que possible, l’événement déclencheur.'],
        ['Formé pour porter secours', 'À tout moment, dans sa structure, à toute victime d’un accident ou d’un malaise.'],
        ['En lien avec sa hiérarchie et le CSE', 'Auxiliaire de prévention : il identifie les dangers (« ce qui fait mal ») et propose des solutions.'],
      ),
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Une intervention limitée',
      items: items(
        ['Dans le temps', 'Les quelques minutes qui suivent l’accident, jusqu’à l’arrivée des secours spécialisés.'],
        ['Dans l’espace', 'Surtout dans l’entreprise. Mais comme tout citoyen, il doit porter secours (art. 223-6 du Code pénal), sans se mettre en danger.'],
        ['Dans les moyens', 'Peu de matériel, mais il est déjà sur place : la rapidité compense le manque de moyens.'],
      ),
      callouts: [info('« Le SST, c’est le secouriste à mains nues »')],
    },
    {
      id: id(),
      layout: 'cards',
      kicker: 'Code du travail',
      title: 'Le cadre légal : la formation à la sécurité',
      items: items(
        ['Art. R4141-17', 'La formation à la sécurité prépare le travailleur à la conduite à tenir lorsqu’une personne est victime d’un accident ou d’une intoxication sur les lieux du travail.'],
        ['Art. R4141-20', 'Cette formation est dispensée dans le mois qui suit l’affectation du travailleur à son emploi.'],
        ['Art. R4624-3', 'Le médecin du travail est associé à la formation à la sécurité et à celle des secouristes.'],
      ),
      notes: 'Numérotation reprise du support d’origine : vérifier la version en vigueur sur Légifrance (la partie « médecin du travail » a été renumérotée).',
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Le cadre légal : qui doit être formé ?',
      items: items(
        ['Art. R4224-15', 'Un secouriste formé dans chaque atelier où sont accomplis des travaux dangereux. Un secouriste sur chaque chantier de 20 travailleurs au moins, pendant plus de 15 jours, avec travaux dangereux.'],
        ['Art. R4224-16', 'Sans infirmier présent en permanence, l’employeur organise les premiers secours après avis du médecin du travail, en lien avec les secours extérieurs, selon la nature des risques.'],
        ['de l’effectif formé SST', 'Préconisation INRS / Carsat', '10 à 15 %'],
      ),
      callouts: [metier(spec.quiFormer)],
      notes: 'Les travailleurs formés ne peuvent pas remplacer les infirmiers. Les mesures prises sont consignées dans un document tenu à la disposition de l’inspecteur du travail.',
    },
    {
      id: id(),
      layout: 'stats',
      title: 'Le Code pénal : porter assistance',
      body: 'Article 223-6 — Quiconque peut empêcher par son action immédiate, sans risque pour lui ou pour les tiers, un crime ou un délit contre l’intégrité d’une personne, ou porter assistance à une personne en péril, et s’abstient volontairement de le faire, est puni.',
      items: items(['d’emprisonnement', undefined, '5 ans'], ['d’amende', undefined, '75 000 €']),
      notes: 'Obligation d’assistance à personne en péril, sans risque pour soi ni pour les tiers. Le minimum attendu de tout citoyen : alerter les secours.',
    },
    { id: id(), layout: 'section', kicker: 'Partie 2', title: 'La prévention', subtitle: 'Repérer le danger avant qu’il ne fasse mal' },
    {
      id: id(),
      layout: 'steps',
      title: 'Le SST est un préventeur',
      items: items(
        ['Observe', 'Il regarde son poste et son chantier côté sécurité.'],
        ['Analyse', 'Il comprend comment la situation peut tourner à l’accident.'],
        ['Informe', 'Il prévient les personnes exposées et fait remonter le danger.'],
      ),
      callouts: [metier(spec.observer)],
    },
    {
      id: id(),
      layout: 'cards',
      kicker: '« Ce qui peut faire mal ou fait mal »',
      title: 'Le danger',
      body: 'Cause capable de provoquer une lésion ou une atteinte à la santé. Dans votre métier, ce qui peut faire mal :',
      items: items(...spec.dangers.map((d): [string] => [d])),
    },
    {
      id: id(),
      layout: 'cards',
      title: '4 catégories de dangers',
      items: items(
        ['Mécanique', spec.categories.mecanique],
        ['Électrique', spec.categories.electrique],
        ['Thermique, incendie, explosion', spec.categories.thermique],
        ['Atmosphère toxique ou irrespirable', spec.categories.atmosphere],
      ),
      notes: 'Demander aux apprentis de citer un exemple vécu pour chaque catégorie avant d’afficher ceux de la diapositive.',
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Les mots de la prévention',
      items: items(
        ['L’opérateur', 'La personne qui est en contact avec le danger.'],
        ['La situation dangereuse', 'Situation dans laquelle une personne est exposée à un danger.'],
        ['L’événement dangereux', 'Ce qui peut se produire et transformer le risque en accident.'],
        ['Le dommage', 'La lésion ou l’atteinte à la santé qui en résulte.'],
      ),
      callouts: [info('Le risque : combinaison de la probabilité qu’un événement dangereux se produise et de la gravité de la lésion ou de l’atteinte à la santé.')],
    },
    {
      id: id(),
      layout: 'steps',
      kicker: `Exemple ${spec.prefixe} : ${spec.processus.contexte}`,
      title: 'Comment apparaît un dommage ?',
      body: 'Un outil pour comprendre pourquoi une situation devient dangereuse et trouver les bonnes mesures de prévention.',
      items: items(
        ['Danger', spec.processus.danger],
        ['Opérateur', spec.processus.operateur],
        ['Situation dangereuse', spec.processus.situation],
        ['Événement dangereux', spec.processus.evenement],
        ['Dommage', spec.processus.dommage],
      ),
      callouts: [info('Si rien n’est fait, l’événement dangereux finit par se produire : c’est là que la prévention agit.')],
      notes: 'Schéma du processus d’apparition d’un dommage : DANGER + OPÉRATEUR = situation dangereuse ; un événement dangereux (déclencheur) transforme le risque en accident, avec un dommage. Refaire le schéma au tableau avec un exemple donné par les apprentis.',
    },
    {
      id: id(),
      layout: 'content',
      kicker: 'Exercice',
      title: 'À vous de repérer les dangers',
      body: `La situation : ${spec.exerciceReperage.situation}\n${spec.exerciceReperage.elements.map((e) => `- ${e}`).join('\n')}`,
      callouts: [
        question(
          '1. Le danger : qu’est-ce qui peut faire mal ?\n2. La situation dangereuse : qui est exposé, et comment ?\n3. L’événement dangereux : que peut-il se passer ?\n4. Le dommage : quelle blessure, quelle maladie ?',
          'Pour chaque élément, trouvez',
        ),
      ],
      notes: `Pistes de correction — ${spec.exerciceReperage.corrections}`,
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Les acteurs de la prévention',
      body: 'Le SST informe les personnes en situation de danger et fait remonter les dangers repérés aux personnes chargées de la prévention.',
      items: items(
        ['Dans l’entreprise', 'L’employeur · Le CSE (qui a remplacé les DP et le CHSCT) · Le salarié désigné compétent en prévention · Le chef d’équipe, le maître d’apprentissage · Les SST'],
        ['À l’extérieur', 'Le médecin du travail (service de prévention et de santé au travail) · L’OPPBTP · La Carsat · L’inspection du travail · L’INRS'],
      ),
    },
    {
      id: id(),
      layout: 'cards',
      title: 'La prévention, c’est quoi ?',
      body: 'L’ensemble des dispositions à mettre en œuvre pour préserver la santé et la sécurité des salariés, améliorer les conditions de travail et tendre au bien-être au travail.',
      items: items(
        ['Une démarche collective', 'Elle se construit avec tous les acteurs concernés : employeur, salariés, apprentis, CSE.'],
        ['Adaptée à l’entreprise', 'Taille, moyens, organisation, sous-traitance, intérim, chantiers chez des clients, présence de public.'],
      ),
    },
    {
      id: id(),
      layout: 'steps',
      title: 'Les 9 principes généraux de prévention',
      items: items(
        ['Éviter les risques'],
        ['Évaluer les risques qui ne peuvent pas être évités'],
        ['Combattre les risques à la source'],
        ['Adapter le travail à l’Homme'],
        ['Tenir compte de l’évolution de la technique'],
        ['Remplacer ce qui est dangereux par ce qui l’est moins'],
        ['Planifier la prévention'],
        ['Donner la priorité à la protection collective'],
        ['Donner les instructions appropriées aux salariés'],
      ),
      callouts: [metier(spec.principes)],
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Prévention ou protection ?',
      items: items(
        ['La prévention', `Diminue la fréquence du risque, voire le supprime. ${ex(spec.protections.prevention)}`],
        ['La protection collective', `Diminue la gravité, pour tout le monde à la fois. ${ex(spec.protections.collective)}`],
        ['La protection individuelle', `Diminue la gravité, pour celui qui la porte (EPI). ${ex(spec.protections.individuelle)}`],
      ),
      callouts: [info('Et toujours : la formation et l’information (accueil sécurité, permis de feu, habilitation électrique, notices).')],
    },
    {
      id: id(),
      layout: 'content',
      kicker: 'À vous de jouer !',
      title: spec.exerciceNouveau.titre,
      body: `La situation : ${spec.exerciceNouveau.situation}\n\nVotre mission :\n- Repérez le danger et la situation dangereuse\n- Imaginez l’événement dangereux et le dommage\n- Proposez une action de prévention, de protection collective, de protection individuelle\n- Que dites-vous au nouvel apprenti ?`,
      callouts: [info('Outil : animation PAP_SST (à lancer depuis votre poste).')],
      notes: `Pistes : ${spec.exerciceNouveau.corrections}`,
    },
    {
      id: id(),
      layout: 'cards',
      kicker: 'Art. L4131-1 du Code du travail',
      title: 'Danger grave et imminent : droit de retrait',
      items: items(
        ['Grave', 'Peut entraîner la mort ou une incapacité permanente ou prolongée.'],
        ['Imminent', 'Peut se réaliser brutalement, dans un délai rapproché.'],
        ['Ce que je fais', 'J’alerte immédiatement l’employeur · Je peux me retirer de la situation · On ne peut pas m’obliger à reprendre tant que le danger persiste'],
      ),
      callouts: [metier(spec.droitRetrait)],
      notes: 'Circulaire de la Direction générale du travail du 25 mars 1993 pour les définitions de « grave » et « imminent ». Le travailleur signale aussi toute défectuosité constatée dans les systèmes de protection. « Mieux vaut prévenir que guérir ».',
    },
    { id: id(), layout: 'section', kicker: 'Partie 3', title: 'L’alerte aux populations', subtitle: 'Reconnaître le signal et adopter les bons réflexes' },
    {
      id: id(),
      layout: 'cards',
      title: 'Le signal national d’alerte',
      items: items(
        ['La sirène', 'Son modulé, montant et descendant. 3 séquences d’1 minute 41, séparées par 5 secondes. Fin d’alerte : son continu de 30 secondes.'],
        ['FR-Alert', 'Notification sur le téléphone des personnes présentes dans la zone de danger.'],
      ),
      callouts: [info('Essai des sirènes le premier mercredi de chaque mois, à midi : ce jour-là, pas de panique. Tout autre jour, c’est une vraie alerte.', 'À savoir')],
    },
    {
      id: id(),
      layout: 'cards',
      title: 'J’entends la sirène : que faire ?',
      items: items(
        ['Je fais', 'Je me mets à l’abri dans un local fermé · Portes et fenêtres fermées, issues calfeutrées · J’arrête ventilation, chauffage et climatisation · Je m’informe : France Bleu, France Info, France Télévisions, comptes officiels · Je vérifie que mon entourage a reçu les consignes'],
        ['Je ne fais pas', 'Je ne vais pas chercher mes enfants à l’école · Je ne fume pas, j’évite toute flamme · Je ne téléphone pas : le réseau reste libre pour les secours'],
      ),
      callouts: [metier(spec.sirene)],
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Les alertes particulières',
      items: items(
        ['Risque chimique ou radioactif', 'Près des sites industriels à risque : sirènes spécifiques et consignes du plan particulier d’intervention. Se confiner et écouter les consignes.'],
        ['Rupture de barrage', 'Corne de brume : 2 secondes de son, 3 secondes de silence, pendant au moins 2 minutes. C’est un signal d’évacuation : gagner les hauteurs.'],
      ),
      callouts: [info('Une sirène = se mettre à l’abri. Une corne de brume = évacuer.')],
    },
    {
      id: id(),
      layout: 'steps',
      title: 'Attaque terroriste ou situation de violence',
      items: items(
        ['S’échapper', 'Si c’est possible sans danger : repérer les issues, aider les autres à fuir, dissuader d’entrer dans la zone.'],
        ['Se cacher', 'Sinon : s’enfermer, se barricader, éteindre la lumière, couper le son du téléphone, s’allonger loin des ouvertures.'],
        ['Alerter', 'Une fois en sécurité : appeler le 17 ou le 112 (114 par SMS) et obéir aux forces de l’ordre.'],
      ),
      callouts: [info('Le SST, comme tout le monde, se met d’abord en sécurité.')],
    },
    { id: id(), layout: 'section', kicker: 'Partie 4', title: 'Intervenir face à un accident', subtitle: 'Protéger, examiner, faire alerter, secourir' },
    {
      id: id(),
      layout: 'steps',
      title: 'Le plan d’intervention du SST',
      items: items(
        ['PROTÉGER', 'Éviter le suraccident'],
        ['EXAMINER', 'Chercher ce qui menace la vie'],
        ['FAIRE ALERTER ou ALERTER', 'Prévenir les secours'],
        ['SECOURIR', 'Faire le geste adapté'],
      ),
      callouts: [attention('Toujours dans cet ordre : on ne secourt pas avant d’avoir protégé.', 'Moins de trois minutes pour agir')],
      notes: 'Le « PREFAS » du support d’origine : PRotéger, Examiner, Faire Alerter ou alerter, Secourir.',
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Protéger : repérer avant d’agir',
      items: items(
        ['Identifier les dangers persistants', 'Mécanique, électrique, thermique / incendie / explosion, atmosphère toxique ou irrespirable.'],
        ['Repérer les personnes exposées', 'La victime, moi, les collègues, le client, les voisins.'],
        ['Comprendre le déclencheur de l’accident', 'Que s’est-il passé ? Est-ce que cela peut recommencer ?'],
      ),
      callouts: [metier(spec.proteger)],
    },
    {
      id: id(),
      layout: 'steps',
      title: 'Protéger : les bonnes questions',
      items: items(
        ['Peut-on SUPPRIMER le danger, de façon permanente et sans risque ?', spec.supprimer],
        ['Sinon, peut-on ISOLER la zone de danger, sans risque ?', spec.isoler],
        ['Sinon, peut-on SOUSTRAIRE la victime, sans risque ?', 'Dégagement d’urgence : la victime est visible, facile à atteindre, rien ne gêne.'],
      ),
      callouts: [attention('Si aucune de ces actions n’est possible sans risque : interdire l’accès à la zone et faire alerter les secours.')],
      notes: 'Si oui à une question : le faire ou le faire faire. Le SST ne s’expose jamais lui-même au danger.',
    },
    {
      id: id(),
      layout: 'steps',
      title: 'Examiner : 4 questions, dans l’ordre',
      body: 'Rechercher les signes qui indiquent que la vie de la victime est menacée.',
      items: items(
        ['La victime saigne-t-elle abondamment ?', 'Je regarde, y compris sous les vêtements épais.'],
        ['S’étouffe-t-elle ?', 'Elle ne peut plus parler, ni tousser, ni respirer.'],
        ['Répond-elle ?', '« Vous m’entendez ? Serrez-moi la main, ouvrez les yeux. »'],
        ['Respire-t-elle ?', 'Je bascule la tête, je regarde le ventre et la poitrine pendant 10 secondes au plus.'],
      ),
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Examiner : la victime répond-elle ?',
      items: items(
        ['Elle répond : de quoi se plaint-elle ?', 'D’un malaise, de sensations pénibles ? De brûlures ? D’une douleur qui empêche certains mouvements ? D’une plaie qui ne saigne pas abondamment ?'],
        ['Elle ne répond pas : respire-t-elle ?', 'Si elle est sur le ventre ou sur le côté, je la mets sur le dos. Je bascule doucement la tête en arrière et j’élève le menton. Je regarde, j’écoute, je sens : 10 secondes au maximum.'],
      ),
      callouts: [info('Elle respire : PLS (ou sur le dos, voies aériennes libres, après un traumatisme). Elle ne respire pas : massage cardiaque et défibrillateur.')],
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Faire alerter ou alerter',
      body: 'Transmettre aux personnes prévues dans l’organisation des secours de l’entreprise les informations nécessaires et suffisantes pour qu’elles organisent leur intervention.',
      items: items(
        ['Qui ?', 'Les moyens de secours et les personnes prévus dans l’organisation des secours de l’entreprise.'],
        ['Comment ?', 'Avec un téléphone portable, ou en choisissant si possible la personne la plus apte pour faire alerter.'],
      ),
      callouts: [metier(spec.alerter)],
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Le message d’alerte',
      items: items(
        ['Le lieu de l’accident', spec.lieuxAlerte],
        ['La nature de l’accident', spec.natureAlerte],
        ['Le nombre de victimes', 'Et leur état : saigne, répond, respire ? Gestes déjà faits.'],
      ),
      callouts: [attention('Ne jamais raccrocher le premier. Puis envoyer quelqu’un au-devant des secours.'), info(`« ${spec.messageAlerte} »`, 'Exemple de message')],
      notes: 'S’assurer que l’alerte a bien été donnée. Dans tous les cas, organiser l’accès des secours au plus près de la victime. Adapter l’adresse de l’exemple à votre ville.',
    },
    {
      id: id(),
      layout: 'stats',
      title: 'Les numéros d’urgence',
      items: items(['SAMU · Urgence médicale', undefined, '15'], ['Pompiers · Secours, incendie, gaz', undefined, '18'], ['Numéro d’urgence européen', undefined, '112'], ['Sourds et malentendants · SMS, appli, visio', undefined, '114']),
      callouts: [attention(spec.urgence.texte, spec.urgence.titre)],
      notes: `Numéros à utiliser hors de l’entreprise ; dans l’entreprise, suivre l’organisation des secours prévue. ${spec.urgence.notes}`.trim(),
    },
    { id: id(), layout: 'section', kicker: 'Partie 5', title: 'Secourir', subtitle: 'À chaque situation, un résultat à atteindre' },
    {
      id: id(),
      layout: 'cards',
      title: 'Secourir : 8 situations, 8 résultats',
      items: items(
        ['Elle saigne abondamment', 'Arrêter le saignement'],
        ['Elle s’étouffe', 'Lui permettre de respirer'],
        ['Elle fait un malaise', 'Mettre au repos, avis médical'],
        ['Elle se plaint de brûlures', 'Éviter l’aggravation de la brûlure'],
        ['Douleur empêchant des mouvements', 'Éviter l’aggravation du traumatisme'],
        ['Plaie qui ne saigne pas abondamment', 'Éviter l’aggravation de la plaie'],
        ['Ne répond pas, respire', 'Lui permettre de continuer à respirer'],
        ['Ne répond pas, ne respire pas', 'Rétablir respiration et circulation'],
      ),
    },
    {
      id: id(),
      layout: 'steps',
      title: 'La victime saigne abondamment',
      result: 'Arrêter le saignement',
      items: items(
        ['Comprimer immédiatement l’endroit qui saigne, avec la main protégée (gant, sac plastique, linge).'],
        ['Allonger la victime.'],
        ['Faire alerter ou alerter les secours.'],
        ['Si je dois me libérer : pansement compressif. Si la compression est impossible ou inefficace sur un membre : garrot.'],
        ['Couvrir, rassurer, surveiller.'],
      ),
      callouts: [metier(spec.secourir.saignement), attention('Ne jamais retirer un objet planté dans la plaie. Se laver les mains après.')],
      notes: 'Gestes à démontrer et à faire pratiquer conformément au guide des données techniques SST de l’INRS en vigueur.',
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Saignements : les cas particuliers',
      items: items(
        ['Elle saigne du nez', 'L’asseoir, tête penchée en avant. La faire se moucher, puis comprimer les narines 10 minutes. Avis médical si ça continue.'],
        ['Elle vomit ou crache du sang', 'Alerter tout de suite. L’installer dans la position où elle se sent le mieux. Conserver les vomissements pour les secours.'],
        ['Autres saignements', 'Saignement par un orifice naturel : allonger la victime, demander un avis médical et appliquer les consignes.'],
      ),
      callouts: [attention('Le saignement ne s’arrête pas, ou la victime prend un traitement anticoagulant : avis médical.', 'Dans tous les cas')],
    },
    {
      id: id(),
      layout: 'steps',
      title: 'La victime s’étouffe',
      result: 'Lui permettre de respirer',
      items: items(
        ['Elle ne peut plus parler ni tousser : obstruction grave.'],
        ['Donner 1 à 5 claques vigoureuses dans le dos, entre les omoplates.'],
        ['Si inefficace : 1 à 5 compressions abdominales.'],
        ['Alterner claques et compressions jusqu’à l’expulsion.'],
        ['Ensuite : la rassurer, demander un avis médical.'],
      ),
      callouts: [metier(spec.secourir.etouffement), attention('Si elle tousse encore, je ne tape pas : je l’encourage à tousser. Si elle perd connaissance : massage cardiaque.')],
      notes: 'Adapter : compressions thoraciques pour la femme enceinte ou la personne obèse ; techniques spécifiques pour l’enfant et le nourrisson.',
    },
    {
      id: id(),
      layout: 'steps',
      title: 'La victime fait un malaise',
      result: 'Mettre au repos et obtenir un avis médical',
      items: items(
        ['Mettre au repos : allongée, ou assise si elle a du mal à respirer.'],
        ['Écouter et rassurer, desserrer les vêtements, protéger du chaud et du froid.'],
        ['Questionner : depuis quand ? Première fois ? Traitement ? Maladie, hospitalisation ?'],
        ['Appeler le 15 et transmettre les réponses.'],
        ['Appliquer les consignes, surveiller.'],
      ),
      callouts: [metier(spec.secourir.malaise), attention('Douleur dans la poitrine, visage déformé, bras qui ne se lève plus, difficulté à parler : j’appelle le 15 tout de suite.', 'Signes d’alerte')],
      notes: 'La victime se plaint de sensations pénibles et/ou présente des signes anormaux. Si elle demande du sucre, lui en donner. Malaise dû à la chaleur : installer au frais, rafraîchir, faire boire de l’eau fraîche par petites quantités si elle est consciente et capable de boire.',
    },
    {
      id: id(),
      layout: 'steps',
      title: 'La victime se plaint de brûlures',
      result: 'Éviter une aggravation de la brûlure',
      items: items(
        ['Arroser immédiatement la brûlure à l’eau courante tempérée, à faible pression.'],
        ['Retirer les vêtements pendant l’arrosage, sauf s’ils collent à la peau.'],
        ['Faire alerter ou alerter, continuer d’arroser selon les consignes.'],
        ['Brûlure grave : allonger la victime, protéger par un drap propre, surveiller.'],
        ['Brûlure simple : arroser jusqu’à la fin de la douleur, pansement.'],
      ),
      callouts: [metier(spec.secourir.brulure), attention('Jamais de glace, de pommade ou de gras. Ne pas percer les cloques.')],
      notes: 'Brûlure thermique : arroser au moins 10 minutes (idéalement 20). Brûlure grave : cloque unique ou multiples d’une surface supérieure à la moitié de la paume de la main de la victime, destruction profonde, localisation à risque (visage, mains, articulations, orifices), ou victime fragile.',
    },
    {
      id: id(),
      layout: 'cards',
      title: 'Brûlures : chimique, électrique, par inhalation',
      items: items(
        ['Chimique', 'Ôter les vêtements imbibés en se protégeant. Rincer abondamment à l’eau jusqu’à l’avis médical. Garder l’emballage du produit.'],
        ['Électrique', 'Couper le courant avant de toucher la victime. Arroser la zone visiblement brûlée. Toujours demander un avis médical.'],
        ['Par inhalation', 'Fumées ou vapeurs chaudes : installer la victime assise si elle respire mal, demander un avis médical, surveiller.'],
      ),
      callouts: [metier(spec.produits, 'Vos produits à risque')],
      notes: 'Ingestion d’un produit : ne pas faire vomir, ne pas donner à boire, appeler le 15 ou le centre antipoison, garder l’emballage.',
    },
    {
      id: id(),
      layout: 'steps',
      title: 'La victime a une douleur qui empêche des mouvements',
      result: 'Éviter l’aggravation du traumatisme supposé',
      items: items(
        ['Lui dire de ne pas bouger la partie douloureuse.'],
        ['Dos, cou ou tête : ne pas la déplacer, lui dire de ne pas bouger la tête.'],
        ['Faire alerter ou alerter les secours.'],
        ['Appliquer les consignes, couvrir, surveiller.'],
      ),
      callouts: [metier(spec.secourir.traumatisme), attention('On ne remet jamais un membre « en place » et on ne fait pas marcher la victime.')],
      notes: 'Traumatisme supposé d’un membre, du dos, du cou ou de la tête. Coup sur la tête avec perte de connaissance, vomissements ou propos incohérents : alerter.',
    },
    {
      id: id(),
      layout: 'steps',
      title: 'La victime a une plaie qui ne saigne pas abondamment',
      result: 'Éviter l’aggravation de la plaie',
      items: items(
        ['Plaie simple : se laver les mains, nettoyer la plaie à l’eau et au savon.'],
        ['Protéger par un pansement, vérifier la vaccination contre le tétanos.'],
        ['Plaie grave : installer la victime en position d’attente, alerter.'],
        ['Thorax : demi-assise. Abdomen : allongée, jambes fléchies. Œil : allongée, yeux fermés, tête immobile.'],
      ),
      callouts: [metier(spec.secourir.plaie), attention('Ne jamais retirer un corps étranger. Doigt sectionné : dans un sac plastique fermé, posé sur de la glace.')],
      notes: 'Plaie grave : selon sa localisation (cou, œil, face, thorax, abdomen), son aspect (déchiquetée, écrasée, multiple, étendue) ou son mécanisme (projectile, outil, morsure, objet tranchant souillé).',
    },
    {
      id: id(),
      layout: 'steps',
      title: 'La victime ne répond pas, mais elle respire',
      result: 'Libérer les voies aériennes pour qu’elle continue à respirer',
      items: items(
        ['Basculer la tête en arrière et élever le menton.'],
        ['La tourner sur le côté : position latérale de sécurité (PLS).'],
        ['Faire alerter ou alerter les secours.'],
        ['Couvrir, et contrôler la respiration en permanence.'],
      ),
      callouts: [
        metier(spec.secourir.inconscient),
        attention('Après un traumatisme (chute…) ou si l’origine est inconnue : laisser la victime sur le dos en maintenant la liberté des voies aériennes. Si la respiration s’arrête : massage cardiaque.'),
      ],
      notes: 'Aide-mémoire INRS (2024) : PLS si l’état résulte d’un évènement non traumatique ; si l’évènement est traumatique ou d’origine inconnue, laisser la victime sur le dos et maintenir la liberté des voies aériennes.',
    },
    {
      id: id(),
      layout: 'steps',
      title: 'La victime ne répond pas et ne respire pas',
      result: 'Rétablir artificiellement une respiration et une circulation sanguine',
      items: items(
        ['Faire alerter et faire apporter un défibrillateur (DAE).'],
        ['30 compressions au centre de la poitrine : 5 à 6 cm, 100 à 120 par minute.'],
        ['2 insufflations, puis reprendre 30 compressions.'],
        ['Dès que le DAE arrive : l’allumer et suivre ses instructions.'],
        ['Continuer jusqu’au relais des secours ou à la reprise de la respiration.'],
      ),
      callouts: [metier(spec.secourir.arret), question('Savez-vous où est le défibrillateur le plus proche du CFA ? Et de votre entreprise ?', 'Le DAE')],
      notes: 'Enfant et nourrisson : commencer par 5 insufflations. Si les insufflations sont impossibles ou inefficaces, masser sans interruption.',
    },
    { id: id(), layout: 'section', kicker: 'Séance 4', title: 'Cas concrets', subtitle: 'On met tout en pratique, sur vos situations de chantier' },
    {
      id: id(),
      layout: 'cards',
      title: 'Cas concrets : vos situations de chantier',
      items: items(...spec.casConcrets.map((c): [string, string] => [c.titre, c.texte])),
      notes: spec.casConcretsNotes,
    },
    { id: id(), layout: 'cover', kicker: 'À retenir', title: 'Protéger, examiner, faire alerter, secourir', subtitle: 'Sur le chantier, le premier secouriste, c’est vous.' },
  ];

  return {
    id: `cours-sst-${spec.code.toLowerCase()}`,
    title: `SST – ${spec.intitule}`,
    description: `Support complet de la formation initiale (4 séances de 3 h 30), illustré par des situations du métier (${spec.intitule}). Notes du présentateur incluses.`,
    tradeIds: [spec.tradeId],
    order,
    slides,
  };
}
