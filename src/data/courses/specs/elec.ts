import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'elec',
  code: 'ELEC',
  diplome: 'CAP ELEC',
  intitule: 'CAP Électricien',
  prefixe: 'ELEC',
  public: 'Électriciens — CFA BTP',
  cote: 'Côté ELEC',
  lieux: 'chantier neuf ou de rénovation, logement occupé, local technique, atelier du CFA',
  roles: {
    prevention: 'signaler un coffret de chantier resté ouvert ou une rallonge à la gaine abîmée.',
    secours: 'couper le courant au tableau avant de toucher un collègue électrisé.',
  },
  atmp: {
    at: 'électrisation dans un tableau, chute d’escabeau en tirant des câbles, éclat dans l’œil au perçage.',
    trajet: 'accident de scooter en venant au CFA ou en rentrant du chantier.',
    mp: 'TMS de l’épaule et du coude (tirage, perçage au plafond), maladies liées à l’amiante (saignées).',
  },
  causes: {
    manutention: 'tourets de câbles, chemins de câbles, armoires',
    outillage: 'perforateur, rainureuse, cutter, pince à dénuder',
    hauteur: 'escabeau, échafaudage roulant, nacelle, comble, trémie',
    plainPied: 'câbles au sol, gravats, chantier sans éclairage',
  },
  premierMaillon: 'Sur un chantier d’électricité, vous êtes souvent en binôme, parfois seul dans un local technique ou chez un client : le premier maillon des secours, c’est vous.',
  quiFormer: 'En petite entreprise d’électricité, un SST par équipe ou par fourgon : c’est l’idéal. Pour intervenir sur un tableau ou dans un local technique, évitez de travailler seul.',
  observer: 'En arrivant dans un local technique : tableau ouvert ou consigné, circuits repérés, câbles au sol, éclairage, humidité… deux minutes d’observation avant de sortir les outils.',
  dangers: ['Le courant électrique (230 V, 400 V)', 'L’arc électrique dans un tableau', 'Le travail en hauteur (escabeau, nacelle)', 'La poussière des saignées et du perçage'],
  categories: {
    mecanique: 'Perforateur, rainureuse, cutter, chute d’escabeau ou de nacelle, touret de câble qui roule.',
    electrique: 'Tableau resté sous tension, câble caché percé dans une cloison, rallonge abîmée, circuit non consigné.',
    thermique: 'Arc électrique et ses projections, court-circuit, connexion qui chauffe, batterie lithium qui prend feu.',
    atmosphere: 'Poussière de silice ou d’amiante au perçage, fumées d’un câble qui brûle, vide sanitaire mal ventilé.',
  },
  processus: {
    contexte: 'raccordement d’un nouveau départ dans un tableau électrique',
    danger: 'Les parties sous tension du tableau',
    operateur: 'L’apprenti qui raccorde',
    situation: 'Il travaille sans avoir consigné le tableau',
    evenement: 'Son tournevis provoque un court-circuit',
    dommage: 'Électrisation, brûlures de la main et du visage',
  },
  exerciceReperage: {
    situation: 'rénovation électrique d’une maison des années 1960, habitée par ses propriétaires.',
    elements: [
      'Ancien tableau ouvert, laissé sous tension',
      'Saignées dans un vieux mur, rainureuse sans aspiration',
      'Tirage de câbles au plafond, debout sur une chaise',
      'Passage de gaines dans le comble, entre les solives',
      'Batteries de perforateur en charge sur un carton',
      'Câbles et outils au sol, couloir sans éclairage',
    ],
    corrections:
      'Tableau sous tension : électrique, contact direct ou court-circuit, électrisation, brûlures par arc (faire consigner par une personne habilitée : séparer, condamner, identifier, VAT). Saignées sans aspiration : atmosphère + santé, silice cristalline (brique, béton), amiante possible dans un enduit ancien, bruit ; silicose, maladie de l’amiante (repérage amiante avant travaux, rainureuse aspirée, masque FFP3 ; si doute : arrêter et signaler). Chaise : mécanique, chute de hauteur, fracture ; bras en l’air longtemps, TMS de l’épaule (PIRL, tirage à deux). Comble : mécanique, pied qui passe à travers le plafond, chute dans la pièce du dessous ; chaleur l’été, malaise (planches de circulation, éclairage). Batteries sur un carton : thermique/incendie, batterie abîmée qui s’emballe, départ de feu, fumées toxiques (chargeur d’origine, support non combustible). Câbles au sol dans le noir : mécanique/plain-pied, trébucher, entorse (ranger au fur et à mesure, éclairage de chantier).',
  },
  principes: 'Principe n° 1 : consigner pour travailler hors tension = plus de contact possible avec la tension. Principe n° 3 : rainureuse avec aspiration = la poussière est captée à la source.',
  protections: {
    prevention: 'consigner avant d’intervenir, repérer les câbles avant de percer, outils sur batterie.',
    collective: 'PIRL ou nacelle avec garde-corps, aspiration sur la rainureuse, balisage du tableau ouvert.',
    individuelle: 'gants isolants, écran facial anti-arc, lunettes, masque FFP3, chaussures de sécurité.',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et le tableau',
    situation:
      'vous ajoutez un circuit dans le tableau électrique d’un local commercial. Le chef d’équipe est parti chercher du matériel et le tableau n’est pas encore consigné. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise et travaille avec vous !',
    corrections:
      'danger = parties sous tension du tableau ; situation dangereuse = apprenti non formé, non habilité, devant un tableau ouvert sous tension ; événement = contact direct ou court-circuit avec un outil ; dommage = électrisation, brûlures par arc, arrêt cardiaque. Prévention : ne rien toucher avant le retour du chef d’équipe, faire consigner le tableau par une personne habilitée (séparer, condamner, identifier, vérifier l’absence de tension). Collective : capots et écrans remis en place, tableau refermé, balisage. Individuelle : gants isolants, écran facial, outils isolés. Information : accueil sécurité, pas d’intervention sans habilitation, montrer le tableau général, l’arrêt d’urgence et le défibrillateur.',
  },
  droitRetrait: 'Intervention demandée sous tension sans habilitation, chemin de câbles à poser au bord d’une trémie sans garde-corps, plâtre suspecté d’amiante à saigner : j’arrête, je m’éloigne, j’alerte.',
  sirene: 'Votre réflexe métier : laisser l’installation en sécurité (tableau refermé, aucun conducteur dénudé sous tension), couper la VMC, descendre de la nacelle.',
  proteger:
    'Collègue au sol devant un tableau ouvert : je pense d’abord au courant. Je ne le touche pas tant que le courant n’est pas coupé au tableau général, et j’empêche les autres de le toucher.',
  supprimer: 'Couper le courant au disjoncteur général ou à l’arrêt d’urgence, débrancher l’outil, arrêter la rainureuse.',
  isoler: 'Baliser autour du tableau, fermer le local technique, empêcher quiconque d’approcher de l’armoire.',
  alerter: 'En sous-sol ou en local technique, le réseau passe mal : je repère avant de commencer où le téléphone capte et où est le DAE. Je connais l’adresse exacte du chantier.',
  lieuxAlerte: 'Adresse, bâtiment, étage, local technique, code d’accès.',
  natureAlerte: 'Électrisation, chute d’escabeau, brûlure par arc…',
  messageAlerte:
    'Je suis apprenti électricien, je vous appelle du 8 avenue Jean-Jaurès à Tours, au sous-sol de l’immeuble, dans le local technique. Mon collègue a été électrisé dans le tableau. Une seule victime : il me parle, il a une brûlure à la main. Le courant est coupé, j’arrose la brûlure. Quelqu’un vous attendra devant l’entrée.',
  urgence: {
    titre: 'Électrisation',
    texte: 'Je coupe le courant avant de toucher la victime. Même si elle va bien : avis médical systématique, j’appelle le 15.',
    notes: 'Une personne électrisée peut sembler aller bien puis faire un malaise plus tard : elle ne reprend pas le travail et on demande toujours un avis médical. Le SST ne coupe que ce qu’il sait couper (disjoncteur général, arrêt d’urgence, prise à débrancher). Ligne ou installation haute tension : ne jamais approcher, faire alerter le 18, qui fait couper par l’exploitant.',
  },
  secourir: {
    saignement: 'Coupure profonde à l’avant-bras avec le cutter en dégainant un câble, ou contre le bord d’un chemin de câbles.',
    etouffement: 'Pause casse-croûte sur le chantier : un collègue avale de travers et ne peut plus ni parler ni tousser.',
    malaise: 'Tirage de câbles dans un comble en plein été : sueurs, vertiges. On descend au frais, au repos, eau fraîche par petites gorgées.',
    brulure: 'Flash d’un court-circuit dans le tableau : brûlures du visage et des mains. Courant coupé, j’arrose, avis médical systématique.',
    traumatisme: 'Chute d’escabeau en tirant un câble coincé, pied passé à travers le plafond d’un comble, dos bloqué en portant un touret.',
    plaie: 'Coupure au cutter ou au bord d’une goulotte, éclat de béton ou poussière dans l’œil en perçant au plafond.',
    inconscient: 'Collègue inconscient dans un vide sanitaire : courant, air vicié ? Je protège avant d’entrer. Origine inconnue : sur le dos.',
    arret: 'Électrisation dans un tableau ou par une rallonge abîmée : couper le courant avant de toucher la victime, puis massage et DAE.',
  },
  produits: 'Colle PVC, mousse expansive, nettoyant contact, acide des batteries au plomb des onduleurs. Sur la peau ou dans l’œil : rincer tout de suite, abondamment et longtemps.',
  casConcrets: [
    { titre: 'Raccordement dans un tableau', texte: 'Un claquement, un flash : votre collègue est au sol, inerte, devant le tableau ouvert qui grésille encore.' },
    { titre: 'Tirage de câbles en hauteur', texte: 'Le câble coincé cède d’un coup : votre collègue tombe de l’escabeau. Il reste au sol, immobile, et ne répond pas.' },
    { titre: 'Batteries en charge à l’atelier', texte: 'Une batterie de perforateur fume puis s’enflamme. Votre collègue, qui a voulu la sortir, a la main brûlée.' },
    { titre: 'Gaines en vide sanitaire', texte: 'Le groupe électrogène tourne à l’entrée du vide sanitaire. Votre collègue, à l’intérieur, ne répond plus.' },
  ],
  casConcretsNotes:
    'Quatre scénarios, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : danger électrique persistant (couper au tableau général ou à l’arrêt d’urgence, sans approcher du tableau), puis victime qui ne répond pas et ne respire pas. 2 : chute de hauteur (écarter l’escabeau, arrêter le tirage), victime qui ne répond pas et respire : traumatisme, donc sur le dos, voies aériennes libres. 3 : feu de batterie lithium (débrancher le chargeur si c’est sans risque, s’éloigner des fumées, ne plus toucher la batterie, 18 : le feu peut reprendre), brûlure thermique de la main. 4 : atmosphère toxique (monoxyde de carbone du groupe électrogène) : arrêter le groupe, ne pas entrer sans protection, aérer depuis l’extérieur, alerter ; dégagement d’urgence seulement si la victime est visible, facile à atteindre et sans risque. Si elle respire : PLS (intoxication), sur le dos si une chute est possible.',
};
