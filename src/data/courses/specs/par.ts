import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'peintre',
  code: 'PAR',
  diplome: 'CAP PAR',
  intitule: 'CAP Peintre applicateur de revêtements',
  prefixe: 'Peintre',
  public: 'Peintres applicateurs de revêtements — CFA BTP',
  cote: 'Côté peintre',
  lieux: 'logement occupé chez un client, chantier de rénovation, atelier du CFA',
  roles: {
    prevention: 'signaler des chiffons imbibés de solvant laissés en tas au fond du fourgon.',
    secours: 'rincer tout de suite l’œil d’un collègue touché par une projection de décapant.',
  },
  atmp: {
    at: 'chute d’un escabeau, coupure au cutter, projection de décapant dans l’œil.',
    trajet: 'chute en scooter ou à vélo en venant au CFA ou en rentrant du chantier.',
    mp: 'TMS de l’épaule (bras levés), eczéma aux résines et aux colles, saturnisme (plomb des peintures anciennes).',
  },
  causes: {
    manutention: 'pots de 15 litres, sacs d’enduit, rouleaux de sol',
    outillage: 'cutter, couteau à enduire, grattoir, ponceuse',
    hauteur: 'escabeau, PIRL, échafaudage roulant',
    plainPied: 'bâches qui glissent, pots au sol, rallonges',
  },
  premierMaillon: 'En peinture, vous êtes souvent seul ou à deux dans un logement occupé ou une cage d’escalier : le premier maillon des secours, c’est vous.',
  quiFormer: 'En petite entreprise de peinture, un SST par équipe ou par fourgon : c’est l’idéal, surtout quand les équipes sont réparties sur plusieurs chantiers.',
  observer: 'En arrivant dans la pièce : aération possible, prises et éclairage, sol à bâcher, vieille peinture qui s’écaille, occupants… deux minutes d’observation avant d’ouvrir les pots.',
  dangers: ['L’escabeau, la PIRL, l’échafaudage', 'Les solvants des peintures et des vernis', 'La lame du cutter, le jet de l’airless', 'La poussière de ponçage, le plomb ancien'],
  categories: {
    mecanique: 'Chute d’escabeau ou d’échafaudage roulant, cutter, couteau à enduire, ponceuse, jet du pistolet airless.',
    electrique: 'Prise dévissée pour peindre sans couper le courant, rallonge abîmée au sol, décolleuse et eau.',
    thermique: 'Vapeur de la décolleuse, décapeur thermique, solvants inflammables, chiffons imbibés qui s’enflamment.',
    atmosphere: 'Vapeurs de solvants et de vernis en pièce fermée, décapants, colles de sol, poussières de ponçage.',
  },
  processus: {
    contexte: 'vernissage d’un parquet dans une chambre fermée',
    danger: 'Vapeurs de solvants du vernis',
    operateur: 'L’apprenti qui vernit',
    situation: 'Il travaille fenêtres fermées, sans masque',
    evenement: 'Il respire les vapeurs pendant une heure',
    dommage: 'Maux de tête, malaise, intoxication',
  },
  exerciceReperage: {
    situation: 'rénovation des peintures de la cage d’escalier d’un immeuble ancien habité.',
    elements: [
      'Escabeau posé sur les marches, calé avec un pot',
      'Ponçage à sec d’une vieille peinture écaillée',
      'Chiffons imbibés de solvant entassés dans un sac',
      'Rallonge à la gaine abîmée en travers du palier',
      'Vernis solvanté appliqué, fenêtres fermées',
      'Habitants et enfants qui passent sans arrêt',
    ],
    corrections:
      'Escabeau sur les marches : mécanique/chute de hauteur, l’escabeau bascule, fracture, traumatisme crânien (plateforme ou échafaudage adapté à l’escalier). Ponçage à sec : immeuble d’avant 1949, plomb possible, inhalation de poussières, saturnisme, maladie professionnelle (faire repérer le plomb, ponçage humide ou avec aspiration, masque adapté). Chiffons entassés : incendie, auto-inflammation, feu dans l’immeuble (les étaler pour qu’ils sèchent ou les mettre dans un bidon métallique fermé). Rallonge abîmée : électrique + chute de plain-pied, électrisation, chute dans l’escalier. Vernis solvanté sans aération : atmosphère toxique et inflammable, malaise, intoxication, départ de feu (produit en phase aqueuse, ventiler). Habitants qui passent : tiers exposés à tous ces dangers, chute, contact avec les produits (baliser, informer, fermer la zone de travail).',
  },
  principes: 'Principe n° 6 : une peinture en phase aqueuse plutôt qu’une peinture solvantée. Principe n° 8 : ventiler la pièce protège tout le monde, le masque seulement celui qui le porte.',
  protections: {
    prevention: 'peinture en phase aqueuse, ponceuse reliée à un aspirateur, repérage du plomb avant les travaux.',
    collective: 'échafaudage roulant ou PIRL avec garde-corps, ventilation de la pièce, balisage en site occupé.',
    individuelle: 'masque adapté au produit, gants, lunettes, chaussures de sécurité antidérapantes.',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et l’airless',
    situation:
      'vous peignez les murs d’un local commercial vide au pistolet airless, à très haute pression. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise et travaille avec vous !',
    corrections:
      'danger = jet de peinture à très haute pression et brouillard de pulvérisation ; situation dangereuse = apprenti non formé qui approche la main de la buse ou veut la déboucher avec le doigt ; événement = injection de peinture sous la peau, inhalation du brouillard ; dommage = plaie d’injection (urgence chirurgicale, même si elle paraît minuscule), irritation des voies respiratoires. Prévention : rouleau pour les petites surfaces, verrou de gâchette et décompression avant tout démontage de la buse. Collective : zone de pulvérisation balisée, ventilation du local. Individuelle : masque, lunettes, gants, combinaison. Information : accueil sécurité, notice du pistolet, ne jamais pointer le pistolet vers quelqu’un.',
  },
  droitRetrait: 'Échafaudage roulant sans garde-corps, vieilles dalles de sol suspectées d’amiante à arracher, odeur de gaz dans le logement : j’arrête, je sors, j’alerte.',
  sirene: 'Votre réflexe métier : refermer les pots, arrêter l’extracteur, fermer les fenêtres ouvertes pour aérer et débrancher la décolleuse.',
  proteger:
    'Collègue effondré dans la pièce qu’il vernissait : je pense aux vapeurs de solvants, toxiques et inflammables. Je n’entre pas tête baissée, je n’actionne aucun interrupteur, j’aère depuis l’extérieur.',
  supprimer: 'Refermer les pots, arrêter l’airless et le décompresser, débrancher la décolleuse ou la ponceuse.',
  isoler: 'Baliser la zone, fermer la pièce, éloigner les occupants, les enfants et les animaux.',
  alerter: 'Seul dans un logement ou une cage d’escalier ? J’appelle moi-même, haut-parleur activé, sans quitter la victime. Je demande à l’occupant d’aller ouvrir aux secours.',
  lieuxAlerte: 'Adresse, bâtiment, étage, appartement, digicode.',
  natureAlerte: 'Chute d’escabeau, malaise aux solvants, brûlure…',
  messageAlerte:
    'Je suis apprenti peintre, je vous appelle du 8 rue Victor-Hugo à Orléans, bâtiment B, 3e étage, appartement 32. Mon collègue est tombé de son escabeau, il a très mal au poignet et ne peut plus le bouger. Une seule victime, il me parle et respire. Je lui ai dit de ne pas bouger. Quelqu’un vous attendra en bas de l’immeuble.',
  urgence: {
    titre: 'Injection par l’airless',
    texte: 'Même si la plaie paraît minuscule, c’est une urgence chirurgicale : j’appelle le 15 et je précise le produit.',
    notes: 'La plaie d’injection ressemble souvent à un simple point rouge, mais la peinture sous pression diffuse dans les tissus : chirurgie en urgence. Ne pas attendre que la douleur apparaisse. Donner aux secours l’étiquette ou la fiche de données de sécurité du produit.',
  },
  secourir: {
    saignement: 'Coupure profonde à la main ou au poignet avec le cutter, en recoupant un lé de sol souple ou de papier peint.',
    etouffement: 'Pause déjeuner sur le chantier : un collègue avale de travers en riant, il ne peut plus parler ni tousser.',
    malaise: 'Maux de tête, nausées, vertiges en vernissant ou en collant un sol en pièce fermée : on sort tous à l’air libre et on aère.',
    brulure: 'Vapeur de la décolleuse, décapeur thermique : arroser. Décapant chimique sur la peau : ôter le vêtement imbibé, rincer longtemps.',
    traumatisme: 'Chute d’un escabeau ou d’un échafaudage roulant, glissade sur une bâche dans l’escalier : on ne bouge pas la victime.',
    plaie: 'Injection de peinture par l’airless : petite plaie, mais urgence chirurgicale. Éclat d’enduit ou de peinture dans l’œil.',
    inconscient: 'Collègue retrouvé inconscient dans une pièce fermée où il vernissait : vapeurs toxiques possibles, je protège avant d’entrer.',
    arret: 'Électrisation en dévissant une prise pour peindre derrière : couper le courant au disjoncteur avant de toucher la victime.',
  },
  produits: 'Décapants, white-spirit, diluants, vernis, colles de sol, résines époxy. Lisez l’étiquette et la fiche de données de sécurité. Dans l’œil : rincer tout de suite et longtemps.',
  casConcrets: [
    { titre: 'Ponçage d’un plafond', texte: 'L’échafaudage roulant non freiné bascule. Votre collègue est au sol, se plaint du cou ; la ponceuse tourne encore.' },
    { titre: 'Peinture d’une chambre', texte: 'Vous retrouvez votre collègue au sol, inerte, devant une prise dévissée, un tournevis à la main.' },
    { titre: 'Décollage de papier peint', texte: 'Le tuyau de la décolleuse se débranche : la vapeur brûle la main et l’avant-bras de votre collègue.' },
    { titre: 'Vernissage d’un parquet', texte: 'Dans la chambre fermée, votre collègue se plaint de vertiges et de nausées, puis s’assoit au milieu de la pièce.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : danger mécanique persistant (échafaudage instable, ponceuse en marche à débrancher), puis traumatisme du cou : ne pas déplacer la victime, lui demander de ne pas bouger la tête. 2 : danger électrique persistant (couper au disjoncteur), puis victime qui ne répond pas et ne respire pas. 3 : brûlure thermique (débrancher la décolleuse), arroser à l’eau courante tempérée. 4 : atmosphère toxique et inflammable (vapeurs de solvants), malaise : aérer, faire sortir la victime à l’air libre si c’est possible sans risque, aucune flamme ni étincelle.',
};
