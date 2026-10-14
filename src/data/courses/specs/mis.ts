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
    prevention: 'signaler un regard d’assainissement resté ouvert dans le jardin d’un client.',
    secours: 'rincer tout de suite la main d’un collègue brûlée par un déboucheur.',
  },
  atmp: {
    at: 'brûlure au chalumeau, pied écrasé par une baignoire en fonte, coupure sur un lavabo cassé.',
    trajet: 'accident de scooter entre la maison et le CFA, ou en rentrant chez soi après le chantier.',
    mp: 'TMS de l’épaule ou du genou, leptospirose (eaux usées), maladies liées à l’amiante.',
  },
  causes: {
    manutention: 'baignoire en fonte, receveur, WC, ballon d’eau chaude',
    outillage: 'pince à sertir, scie, perforateur, rainureuse',
    hauteur: 'escabeau, trémie, regard ouvert, tranchée',
    plainPied: 'sol mouillé, bouts de tube et emballages au sol',
  },
  premierMaillon: 'Chez un particulier, pour une fuite ou un chauffe-eau en panne, vous êtes souvent seul ou en binôme : le premier maillon des secours, c’est vous.',
  quiFormer: 'En petite entreprise de plomberie, un SST par équipe ou par fourgon : c’est l’idéal, car on travaille souvent en binôme, loin de l’entreprise.',
  observer: 'Chez un client ou en cave : sol mouillé, prises près de l’eau, vieux calorifuges, odeur d’égout, regard ouvert… deux minutes d’observation avant de sortir les outils.',
  dangers: ['La flamme du chalumeau', 'Une baignoire en fonte de plus de 100 kg', 'Le déboucheur à la soude ou à l’acide', 'Les eaux usées, les gaz dans un regard'],
  categories: {
    mecanique: 'Perforateur, pince à sertir, chute d’un receveur ou d’une baignoire, éboulement d’une tranchée.',
    electrique: 'Perçage près d’un câble encastré, chauffe-eau électrique sous tension, rallonge dans l’eau d’une fuite.',
    thermique: 'Chalumeau (brasage, soudo-brasage), tube tout juste brasé, eau brûlante du ballon, colle PVC inflammable.',
    atmosphere: 'Hydrogène sulfuré (H2S) ou manque d’oxygène dans un regard, fumées de brasage, vapeurs de solvant.',
  },
  processus: {
    contexte: 'collage d’une évacuation PVC dans une salle de bains sans fenêtre',
    danger: 'Vapeurs du décapant et de la colle PVC',
    operateur: 'L’apprenti qui colle les raccords',
    situation: 'Il colle pendant une heure, porte fermée',
    evenement: 'Les vapeurs s’accumulent dans la pièce',
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
      'danger = produit corrosif ; situation dangereuse = apprenti non formé penché sur l’évier, sans protection ; événement = projection ou remontée du produit, vapeurs ; dommage = brûlure chimique de la peau ou des yeux, irritation des voies respiratoires. Prévention : débouchage mécanique (ventouse, furet, démontage du siphon) ; si le produit reste indispensable, ne jamais le mélanger avec un autre déboucheur. Collective : aérer la pièce, éloigner le client. Individuelle : gants résistant aux produits chimiques, lunettes-masque, manches longues. Information : lire l’étiquette et la fiche de données de sécurité, ne jamais se pencher au-dessus de l’évier, montrer le point d’eau pour rincer.',
  },
  droitRetrait: 'Descente dans un regard sans détecteur ni ventilation, tranchée profonde non blindée, calorifuge suspecté d’amiante dans une gaine : j’arrête, je sors, j’alerte.',
  sirene: 'Votre réflexe métier : éteindre le chalumeau, fermer les bouteilles, remonter de la tranchée et vous mettre à l’abri dans le bâtiment.',
  proteger:
    'Collègue inanimé au fond d’un regard ou d’une fosse : je pense d’abord à l’hydrogène sulfuré et au manque d’oxygène. Je ne descends pas, j’empêche les autres de descendre, j’alerte tout de suite.',
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
    saignement: 'Coupure profonde à l’avant-bras sur un lavabo en céramique qui se brise, ou à la meuleuse en coupant une colonne en fonte.',
    etouffement: 'Déjeuner avalé en vitesse entre deux dépannages : un collègue avale de travers et ne peut plus parler.',
    malaise: 'Maux de tête, vertiges, nausées après un collage PVC en pièce fermée ou près d’un regard : on sort tous à l’air libre.',
    brulure: 'Chalumeau, tube tout juste brasé, eau brûlante en vidangeant un ballon. Déboucheur sur la peau : rincer abondamment.',
    traumatisme: 'Pied écrasé par une baignoire en fonte, dos bloqué en portant un WC, chute dans une tranchée : on ne déplace pas la victime.',
    plaie: 'Éclat de faïence planté dans la main : on ne le retire pas. Limaille de cuivre dans l’œil après un ébavurage.',
    inconscient: 'Collègue inconscient au pied de l’escabeau : chute probable, je le laisse sur le dos. Au fond d’un regard : je ne descends pas.',
    arret: 'Électrisation en raccordant un chauffe-eau électrique ou en perçant un câble : couper le courant avant de toucher.',
  },
  produits: 'Déboucheurs à la soude ou à l’acide, décapant et colle PVC, détartrant. Ne jamais mélanger deux produits. Dans l’œil : rincer tout de suite et longtemps.',
  casConcrets: [
    { titre: 'Dépannage d’un chauffe-eau', texte: 'En démontant le groupe de sécurité, l’eau brûlante du ballon gicle sur les jambes et les mains de votre collègue.' },
    { titre: 'Dépose d’un vieux lavabo', texte: 'Le lavabo se brise en tombant. Votre collègue a l’avant-bras entaillé, le sang coule fort sur le carrelage.' },
    { titre: 'Pose d’un WC suspendu', texte: 'Votre collègue perce le mur pour fixer le bâti-support. Un claquement : il s’effondre, le perforateur planté dans le mur.' },
    { titre: 'Débouchage dans un regard', texte: 'Votre collègue est descendu dans un regard profond pour déboucher la canalisation. Il ne répond plus, affaissé au fond.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : eau brûlante et chauffe-eau sous tension (fermer l’arrivée d’eau froide, couper le courant), brûlure thermique grave (mains, grande surface) à arroser. 2 : débris de céramique et sol mouillé, saignement abondant. 3 : danger électrique persistant (câble encastré sous tension : couper au disjoncteur avant de toucher, débrancher l’outil ne suffit pas), puis victime qui ne répond pas et ne respire pas. 4 : atmosphère toxique (hydrogène sulfuré, manque d’oxygène) : ne pas descendre, interdire l’accès, aérer depuis l’extérieur, alerter le 18. Dégagement d’urgence seulement si la victime est au bord du regard, facile à atteindre sans s’y pencher. À l’air libre, si elle respire sans répondre : chute possible, la laisser sur le dos, voies aériennes libres.',
};
