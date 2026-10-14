import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'mis',
  code: 'MIS',
  diplome: 'CAP MIS',
  intitule: 'CAP Monteur en installations sanitaires',
  prefixe: 'MIS',
  public: 'Monteurs en installations sanitaires — CFA BTP',
  cote: 'Côté MIS',
  lieux: 'salle de bains chez un particulier, chantier de logements neufs, atelier',
  roles: {
    prevention: 'signaler un regard d’assainissement resté ouvert dans le jardin du chantier.',
    secours: 'rincer tout de suite la main d’un collègue brûlée par un déboucheur.',
  },
  atmp: {
    at: 'brûlure au chalumeau, pied écrasé par une baignoire en fonte, coupure sur un lavabo cassé.',
    trajet: 'accident de scooter en allant chez un client ou en rentrant du CFA.',
    mp: 'TMS de l’épaule ou du genou, leptospirose (eaux usées), maladies liées à l’amiante.',
  },
  causes: {
    manutention: 'baignoire en fonte, receveur, WC, ballon d’eau chaude',
    outillage: 'pince à sertir, scie, perforateur, rainureuse',
    hauteur: 'escabeau, trémie, regard ouvert, tranchée',
    plainPied: 'sol mouillé, chutes de tubes, emballages',
  },
  premierMaillon: 'Chez un particulier, pour une fuite ou un chauffe-eau en panne, vous êtes souvent seul ou en binôme : le premier maillon des secours, c’est vous.',
  quiFormer: 'En petite entreprise de plomberie, un SST par équipe ou par fourgon : c’est l’idéal, surtout pour ceux qui partent seuls en dépannage.',
  observer: 'Chez un client ou en cave : sol mouillé, prises près de l’eau, vieux calorifuges, odeur d’égout, regard ouvert… deux minutes d’observation avant de sortir les outils.',
  dangers: ['La flamme du chalumeau', 'Une baignoire en fonte de plus de 100 kg', 'Le déboucheur à la soude ou à l’acide', 'Les eaux usées, l’air d’un regard'],
  categories: {
    mecanique: 'Perforateur, pince à sertir, chute d’un receveur ou d’une baignoire, chute dans une tranchée.',
    electrique: 'Perçage près d’un câble encastré, chauffe-eau électrique sous tension, rallonge dans l’eau d’une fuite.',
    thermique: 'Chalumeau du soudo-brasage, tube tout juste brasé, eau brûlante du ballon, colle PVC inflammable.',
    atmosphere: 'H2S dans un regard ou une fosse, fumées de brasage, vapeurs de solvant, local sans aération.',
  },
  processus: {
    contexte: 'collage d’une évacuation PVC dans une salle de bains sans fenêtre',
    danger: 'Vapeurs du décapant et de la colle PVC',
    operateur: 'L’apprenti qui colle les raccords',
    situation: 'Il colle pendant une heure, porte fermée',
    evenement: 'Il respire les vapeurs de solvant',
    dommage: 'Maux de tête, vertiges, malaise',
  },
  exerciceReperage: {
    situation: 'rénovation de la salle de bains d’une maison ancienne, à l’étage.',
    elements: [
      'Baignoire en fonte à descendre par l’escalier',
      'Brasage au chalumeau contre un lambris en bois',
      'Rallonge électrique posée sur le sol mouillé',
      'Vieux calorifuge qui s’effrite dans la gaine',
      'Saignée au mur à la rainureuse, sans aspiration',
      'Trémie ouverte dans le plancher, sans protection',
    ],
    corrections:
      'Baignoire dans l’escalier : mécanique/manutention, faux mouvement ou chute, lombalgie, pied écrasé. Chalumeau contre le lambris : thermique/incendie, le bois s’enflamme, brûlures, incendie de la maison. Rallonge sur le sol mouillé : électrique, contact avec un conducteur, électrisation. Calorifuge effrité : amiante possible, inhalation de fibres, maladie professionnelle (arrêter et signaler). Saignée sans aspiration : poussières de silice cristalline et bruit, inhalation, maladie respiratoire et surdité à long terme (aspiration à la source, masque, protection auditive). Trémie ouverte : chute de hauteur, chute à l’étage inférieur, fractures (garde-corps ou plancher provisoire).',
  },
  principes: 'Principe n° 6 : sertir plutôt que braser, le furet plutôt que l’acide. Principe n° 8 : le garde-corps de trémie protège toute l’équipe, le harnais seulement celui qui le porte.',
  protections: {
    prevention: 'sertir au lieu de braser, déboucher au furet plutôt qu’au produit chimique.',
    collective: 'blindage de la tranchée, garde-corps de trémie, ventilation du regard avant d’y descendre.',
    individuelle: 'gants étanches, lunettes-masque, chaussures de sécurité, masque contre les poussières.',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et le déboucheur',
    situation:
      'vous intervenez chez un client pour un évier bouché. Votre chef vous demande d’utiliser un déboucheur à l’acide. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise et travaille avec vous !',
    corrections:
      'danger = produit corrosif ; situation dangereuse = apprenti non formé penché sur l’évier, sans protection ; événement = projection ou remontée du produit, vapeurs ; dommage = brûlure chimique de la peau ou des yeux, irritation des voies respiratoires. Prévention : débouchage mécanique (ventouse, furet, démontage du siphon). Collective : aérer la pièce, éloigner le client, ne jamais mélanger deux produits. Individuelle : gants résistant aux produits chimiques, lunettes-masque, manches longues. Information : lire l’étiquette et la fiche de données de sécurité, montrer le point d’eau pour rincer.',
  },
  droitRetrait: 'Descente dans un regard sans détecteur ni ventilation, tranchée profonde non blindée, calorifuge suspecté d’amiante dans une gaine : j’arrête, je sors, j’alerte.',
  sirene: 'Votre réflexe métier : éteindre le chalumeau, fermer les bouteilles, remonter de la tranchée et vous mettre à l’abri dans le bâtiment.',
  proteger:
    'Collègue inanimé au fond d’un regard ou d’une fosse : je pense d’abord à l’hydrogène sulfuré. Je ne descends pas, j’empêche les autres de descendre, j’alerte tout de suite.',
  supprimer: 'Fermer le robinet d’arrêt, couper le courant au disjoncteur, éteindre le chalumeau, fermer la bouteille.',
  isoler: 'Baliser la tranchée ou le regard, fermer la porte de la salle de bains, éloigner le client et ses enfants.',
  alerter: 'Seul chez un particulier ? J’appelle moi-même, haut-parleur activé, sans quitter la victime. Le client peut aller ouvrir aux secours. Je connais l’adresse avant de commencer.',
  lieuxAlerte: 'Adresse, étage, code, salle de bains, jardin, regard…',
  natureAlerte: 'Écrasement, brûlure, chute dans une tranchée, malaise…',
  messageAlerte:
    'Je suis apprenti plombier, je vous appelle du 8 rue des Tilleuls à Angers, dans la salle de bains du premier étage. Une baignoire en fonte a écrasé le pied de mon collègue. Une seule victime, il me parle, il ne peut plus bouger le pied. Je lui ai dit de ne pas bouger. La cliente vous attendra devant la maison.',
  urgence: {
    titre: 'Victime dans un regard',
    texte: 'Je ne descends pas. J’appelle le 18 en précisant : victime au fond d’un regard, gaz toxique possible.',
    notes:
      'Dans un regard, une fosse ou un égout, l’hydrogène sulfuré ne se sent plus à forte dose : ne pas se fier à son nez. Danger de suraccident : celui qui descend sans protection devient à son tour victime. Odeur de gaz chez un client : sortir, puis appeler le 18 ou l’Urgence Sécurité Gaz (GRDF) au 0 800 47 33 33 depuis l’extérieur, sans rien actionner.',
  },
  secourir: {
    saignement: 'Coupure profonde à l’avant-bras sur un lavabo en céramique qui se brise, ou avec la scie à métaux.',
    etouffement: 'Déjeuner avalé en vitesse entre deux dépannages : un collègue avale de travers et ne peut plus parler.',
    malaise: 'Maux de tête, vertiges, nausées après un collage PVC en pièce fermée ou près d’un regard : on sort tous à l’air libre.',
    brulure: 'Chalumeau, tube tout juste brasé, eau brûlante en vidangeant un ballon. Déboucheur sur la peau : rincer abondamment.',
    traumatisme: 'Pied écrasé par une baignoire en fonte, dos bloqué en portant un WC, chute dans une tranchée : on ne déplace pas la victime.',
    plaie: 'Éclat de faïence planté dans la main : on ne le retire pas. Limaille de cuivre dans l’œil après un ébavurage.',
    inconscient: 'Collègue retrouvé inconscient au fond d’un regard ou d’une fosse : H2S possible, je ne descends pas sans protection.',
    arret: 'Électrisation en raccordant un chauffe-eau électrique ou en perçant un câble : couper le courant avant de toucher.',
  },
  produits: 'Déboucheurs à la soude ou à l’acide, décapant et colle PVC, détartrant. Ne jamais mélanger deux produits. Dans l’œil : rincer tout de suite et longtemps.',
  casConcrets: [
    { titre: 'Dépannage d’un chauffe-eau', texte: 'En démontant le groupe de sécurité, l’eau brûlante du ballon gicle sur les jambes et les mains de votre collègue.' },
    { titre: 'Dépose d’un vieux lavabo', texte: 'Le lavabo se brise en tombant. Votre collègue a l’avant-bras entaillé, le sang coule fort sur le carrelage.' },
    { titre: 'Pose d’un WC suspendu', texte: 'Votre collègue perce le mur pour fixer le bâti-support. Il s’effondre, la perceuse branchée encore en main.' },
    { titre: 'Débouchage d’un réseau d’égout', texte: 'Votre collègue est descendu dans le regard pour déboucher la canalisation. Il ne répond plus, affaissé au fond.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : eau brûlante et chauffe-eau sous tension (fermer l’arrivée d’eau, couper le courant), brûlure thermique grave à arroser. 2 : débris de céramique et sol mouillé, saignement abondant. 3 : danger électrique persistant (débrancher, couper au disjoncteur avant de toucher), puis victime qui ne répond pas et ne respire pas. 4 : atmosphère toxique (hydrogène sulfuré), protection impossible sans équipement : ne pas descendre, interdire l’accès, alerter le 18. Si la victime est hors du regard, visible, facile à atteindre et sans risque : dégagement d’urgence à l’air libre ; si elle ne répond pas et respire, chute possible : la laisser sur le dos, voies aériennes libres.',
};
