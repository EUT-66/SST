import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'menuisier',
  code: 'MEN',
  diplome: 'CAP MEN',
  intitule: 'CAP Menuisier fabricant ou installateur',
  prefixe: 'MEN',
  public: 'Menuisiers — CFA BTP',
  cote: 'Côté MEN',
  lieux: 'atelier de fabrication, chantier de pose chez un client, atelier du CFA',
  roles: {
    prevention: 'signaler un protecteur de scie démonté ou une aspiration en panne.',
    secours: 'comprimer tout de suite la main d’un collègue qui s’est coupé à la scie circulaire.',
  },
  atmp: {
    at: 'doigt coupé à la toupie, pied écrasé par une porte, chute d’escabeau en posant un placard.',
    trajet: 'accident de scooter en venant au CFA ou en rejoignant le chantier de pose.',
    mp: 'cancer des fosses nasales et asthme (poussières de bois), surdité due aux machines, TMS de l’épaule.',
  },
  causes: {
    manutention: 'portes, fenêtres, panneaux, plans de travail',
    outillage: 'ciseau à bois, scie égoïne, défonceuse, cloueur',
    hauteur: 'escabeau, échafaudage, pose de fenêtre à l’étage',
    plainPied: 'copeaux, chutes de bois, câbles, emballages',
  },
  premierMaillon:
    'À l’atelier, vous êtes souvent peu nombreux autour des machines ; en pose, vous êtes parfois deux chez un client : le premier maillon des secours, c’est vous.',
  quiFormer:
    'L’atelier machines, ce sont des travaux dangereux : un secouriste formé y est obligatoire. En pose, un SST par équipe, c’est l’idéal. Dès l’accueil, demandez qui est SST.',
  observer:
    'Avant de lancer une machine : protecteur réglé, outil en bon état, aspiration en marche, sol sans copeaux, poussoir à portée… deux minutes d’observation avant la première coupe.',
  dangers: ['La lame de la scie, l’outil de la toupie', 'Les poussières de bois, surtout de bois dur', 'Une fenêtre en chêne à porter à l’étage', 'Les solvants des vernis et des colles'],
  categories: {
    mecanique: 'Scie circulaire, toupie, dégauchisseuse : coupure, doigt sectionné, pièce rejetée. Cloueur, chute de porte.',
    electrique: 'Scie portative au câble entaillé, rallonge écrasée, mèche qui touche un câble encastré en fixant un placard.',
    thermique: 'Copeaux qui prennent feu, poussières qui explosent dans l’aspiration, chiffons huilés qui s’enflamment seuls.',
    atmosphere: 'Poussières de bois (cancérogènes), vapeurs de vernis, de lasure ou de colle dans une pièce fermée.',
  },
  processus: {
    contexte: 'refente d’une planche courte sur la scie circulaire de l’atelier',
    danger: 'La lame de la scie en rotation',
    operateur: 'L’apprenti qui pousse la planche',
    situation: 'Il pousse à la main, protecteur relevé, sans poussoir',
    evenement: 'La pièce est rejetée, sa main part vers la lame',
    dommage: 'Doigts coupés ou sectionnés',
  },
  exerciceReperage: {
    situation: 'débit et usinage de pièces en chêne à l’atelier, avant de vernir une série de portes.',
    elements: [
      'Scie circulaire utilisée sans protecteur ni poussoir',
      'Aspiration en panne, poussière de chêne partout',
      'Chiffons imbibés d’huile et de vernis dans les copeaux',
      'Rallonge abîmée qui traverse l’allée',
      'Vernissage au pistolet dans un coin sans ventilation',
      'Raboteuse qui tourne, apprenti sans protection auditive',
    ],
    corrections:
      'Scie sans protecteur ni poussoir : mécanique, la main glisse ou la pièce est rejetée, doigts coupés ou sectionnés (protecteur réglé, couteau diviseur, poussoir). Aspiration en panne : poussières de bois dur inhalées, cancer des fosses nasales et asthme à long terme ; la poussière peut aussi s’enflammer ou exploser (réparer l’aspiration avant de reprendre, jamais de soufflette, masque FFP3 en complément). Chiffons dans les copeaux : incendie, les chiffons huilés peuvent s’enflammer seuls, feu d’atelier, brûlures (poubelle métallique à couvercle, copeaux évacués chaque jour). Rallonge abîmée : électrisation, et chute de plain-pied (la retirer, la faire remplacer, câbles hors des allées). Vernissage sans ventilation : vapeurs de solvants toxiques et explosives, malaise, intoxication (vernis en phase aqueuse, sinon cabine ventilée ; masque à cartouche en complément). Raboteuse sans protection : bruit, surdité définitive à long terme (capotage de la machine, protections auditives).',
  },
  principes:
    'Principe n° 6 : un vernis à l’eau plutôt qu’un vernis aux solvants. Principe n° 8 : l’aspiration à la source protège tout l’atelier, le masque seulement celui qui le porte.',
  protections: {
    prevention: 'vernis à l’eau, pièces courtes usinées en commande numérique, manutention au chariot ou à la ventouse.',
    collective: 'protecteurs des machines, aspiration à la source, cabine de vernissage, PIRL ou échafaudage roulant.',
    individuelle: 'protections auditives, lunettes, masque FFP3, chaussures de sécurité, gants pour porter (jamais aux machines).',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et la toupie',
    situation:
      'vous profilez des traverses de fenêtre à la toupie, à l’atelier. Les pièces sont courtes et la poussière vole. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise et vient vous aider à tenir les pièces !',
    corrections:
      'danger = outil de la toupie en rotation, poussières de bois, bruit ; situation dangereuse = apprenti non formé qui tient des pièces courtes près de l’outil ; événement = pièce rejetée, main entraînée vers l’outil ; dommage = doigts sectionnés, choc de la pièce rejetée, cancer des fosses nasales et surdité à long terme. Prévention : usiner les pièces courtes en commande numérique ou dans un gabarit, jamais tenues à la main. Collective : protecteur et presseurs réglés, entraîneur, aspiration en marche. Individuelle : protections auditives, lunettes, masque FFP3 ; pas de gants ni de manches flottantes à la machine. Information : accueil sécurité, montrer l’arrêt d’urgence ; un apprenti mineur ne travaille sur une machine dangereuse comme la toupie qu’avec la déclaration de dérogation de l’employeur, après formation et avis médical, sous la surveillance d’une personne compétente. Au nouvel apprenti : il ne tient pas les pièces, il observe en restant hors de la zone de l’outil.',
  },
  droitRetrait:
    'Protecteur de machine ou arrêt d’urgence hors service, pose d’une fenêtre à l’étage sans garde-corps, ancien mastic de fenêtre suspecté d’amiante : j’arrête, je m’éloigne, j’alerte.',
  sirene:
    'Votre réflexe métier : arrêter les machines et l’aspiration, refermer les bidons de vernis, descendre de l’échafaudage, rejoindre avec l’équipe un local fermé.',
  proteger:
    'Collègue blessé à la scie ou à la toupie : j’appuie sur l’arrêt d’urgence, j’attends l’arrêt complet de l’outil et je coupe l’alimentation avant d’approcher les mains.',
  supprimer: 'Actionner l’arrêt d’urgence, couper la machine à son sectionneur, débrancher l’air du cloueur.',
  isoler: 'Baliser autour de la machine, faire sortir les autres apprentis, interdire le passage sous la zone de pose.',
  alerter:
    'En pose chez un particulier, je connais l’adresse avant de commencer. À l’atelier, je sais où est le téléphone et j’envoie quelqu’un ouvrir le portail aux secours.',
  lieuxAlerte: 'Adresse, atelier, machine, étage, pièce, code d’accès.',
  natureAlerte: 'Doigt sectionné, chute d’escabeau, écrasement, incendie…',
  messageAlerte:
    'Je suis apprenti menuisier, je vous appelle de la menuiserie du 8 rue des Artisans à Angers, à l’atelier machines. Mon collègue s’est sectionné un doigt à la scie circulaire, il saigne fort. Une seule victime, il me parle. La machine est arrêtée, on comprime la plaie, le doigt est au frais. Quelqu’un vous attendra au portail.',
  urgence: {
    titre: 'Feu dans l’atelier',
    texte: 'Je fais évacuer et j’appelle le 18. Extincteur seulement sur un départ de feu, sans me mettre en danger.',
    notes:
      'Copeaux, poussières et vernis brûlent vite : ne jamais combattre un feu qui a pris de l’ampleur, fermer les portes en sortant. Repérer les extincteurs et les issues de secours de l’atelier dès l’accueil.',
  },
  secourir: {
    saignement: 'Coupure profonde de la main à la scie circulaire, au ciseau à bois ou au cutter en ouvrant un emballage.',
    etouffement: 'Pause à l’atelier : un collègue avale de travers en riant, il ne peut plus parler ni tousser.',
    malaise: 'Maux de tête, vertiges, nausées en vernissant dans une pièce close : on sort à l’air libre, puis repos et avis médical.',
    brulure: 'Colle chaude de la plaqueuse de chants : on arrose sans arracher la colle. Décapant sur la peau : on rince longtemps.',
    traumatisme: 'Chute de l’escabeau en posant un placard, pied écrasé par une porte, dos bloqué en portant une fenêtre à l’étage.',
    plaie: 'Clou du cloueur planté dans la main, grosse écharde enfoncée : on ne les retire pas. Éclat de bois dans l’œil : on ne frotte pas.',
    inconscient: 'Collègue au pied de l’escabeau, il ne répond pas et respire : chute probable, on le laisse sur le dos, voies aériennes libres.',
    arret: 'Électrisation avec une scie portative au câble entaillé : couper le courant avant de toucher la victime.',
  },
  produits:
    'Vernis, lasures, colles, décapants, produits de traitement du bois. Sur la peau ou dans l’œil : rincer tout de suite et longtemps, garder la fiche de données de sécurité.',
  casConcrets: [
    { titre: 'Refente à la scie circulaire', texte: 'La pièce est rejetée, votre collègue crie : un doigt est sectionné, le sang coule fort, la lame tourne encore.' },
    { titre: 'Pose d’un placard chez un client', texte: 'Votre collègue perce le mur pour fixer un montant. Il s’écroule, la perceuse à la main, et ne répond plus.' },
    { titre: 'Ponçage à l’atelier', texte: 'Le bac à copeaux prend feu. Un apprenti a voulu l’éteindre : sa main et son avant-bras sont brûlés.' },
    { titre: 'Vitrification d’un parquet', texte: 'Chez un client, votre collègue vitrifie le parquet d’une petite chambre fermée. Il a la tête qui tourne et s’assoit.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : danger mécanique persistant (lame en rotation : arrêt d’urgence), saignement abondant, section de doigt (protéger le moignon, segment dans un sac fermé, dans un contenant réfrigéré). 2 : danger électrique persistant (couper le courant avant de toucher la victime), victime qui ne répond pas : si elle respire, la laisser sur le dos (chute), voies aériennes libres ; sinon massage cardiaque et défibrillateur ; avis médical systématique. 3 : incendie (évacuer, alerter le 18, extincteur seulement sur un départ de feu), brûlure grave (main et avant-bras) : arroser à l’eau courante tempérée, alerter. 4 : atmosphère toxique et inflammable (vapeurs de solvants : aucun interrupteur ni flamme, ne pas entrer sans protection, l’aider à sortir depuis la porte), malaise : repos à l’air libre, avis médical.',
};
