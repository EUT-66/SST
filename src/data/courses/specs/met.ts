import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'metallier',
  code: 'MET',
  diplome: 'CAP MET',
  intitule: 'CAP Métallier',
  prefixe: 'MET',
  public: 'Métalliers — CFA BTP',
  cote: 'Côté MET',
  lieux: 'atelier de métallerie, chantier de pose, façade d’immeuble, chez le client',
  roles: {
    prevention: 'signaler une meuleuse dont le carter de protection a été démonté.',
    secours: 'arroser tout de suite la brûlure d’un collègue touché par une projection de soudure.',
  },
  atmp: {
    at: 'projection de soudure dans le cou, main écrasée dans la plieuse, chute en posant un garde-corps.',
    trajet: 'accident de scooter en venant au CFA ou en rentrant d’un chantier de pose.',
    mp: 'surdité due au bruit du meulage, TMS de l’épaule, atteintes respiratoires dues aux fumées de soudage.',
  },
  causes: {
    manutention: 'vantaux de portail, tôles, poutrelles, limons d’escalier',
    outillage: 'meuleuse, perceuse, scie sabre, marteau',
    hauteur: 'échafaudage, nacelle, escabeau, balcon sans garde-corps',
    plainPied: 'câbles de poste, chutes de métal, sol gras ou encombré',
  },
  premierMaillon: 'En pose de portail ou de garde-corps, vous êtes souvent deux, parfois seul chez un client ou en façade : le premier maillon des secours, c’est vous.',
  quiFormer: 'En entreprise de métallerie, un SST à l’atelier et un SST dans chaque équipe de pose : c’est l’idéal.',
  observer: 'En arrivant sur le chantier : accès, vide à protéger, sol, prises électriques, combustibles près de la zone de soudage… deux minutes d’observation avant de sortir les outils.',
  dangers: ['L’arc de soudage et ses projections', 'Le disque de la meuleuse', 'Un vantail de portail de 80 kg', 'Les fumées de soudage'],
  categories: {
    mecanique: 'Meuleuse, cisaille, plieuse, poinçonneuse, tôle coupante, chute d’un portail ou d’une poutrelle.',
    electrique: 'Poste à souder, câble de masse abîmé, rallonge écrasée, motorisation de portail sous tension.',
    thermique: 'Arc et projections de soudure, oxycoupage, retour de flamme, pièce encore chaude, étincelles.',
    atmosphere: 'Fumées de soudage, fumées de zinc de l’acier galvanisé, solvants, soudage en local fermé.',
  },
  processus: {
    contexte: 'meulage d’une soudure sur un garde-corps, à l’atelier',
    danger: 'Disque de la meuleuse qui tourne',
    operateur: 'L’apprenti qui ébavure',
    situation: 'Il meule sans lunettes, carter démonté',
    evenement: 'Un éclat de métal est projeté',
    dommage: 'Éclat dans l’œil',
  },
  exerciceReperage: {
    situation: 'remplacement du garde-corps d’un balcon, au 3e étage d’un immeuble ancien.',
    elements: [
      'Balcon au 3e étage, vide non protégé côté rue',
      'Ancien garde-corps peint découpé à la meuleuse',
      'Soudage de pattes de fixation près d’un store en toile',
      'Câble du poste à souder coincé dans la porte-fenêtre',
      'Lisses de 3 m montées à la main par l’escalier',
      'Trottoir non balisé sous le balcon',
    ],
    corrections:
      'Vide non protégé : mécanique/chute de hauteur, l’apprenti se penche ou perd l’équilibre, chute mortelle (garde-corps provisoire avant tout, harnais en dernier recours). Découpe de l’ancien garde-corps : vieilles peintures au plomb possibles, inhalation de poussières et de fumées de plomb, saturnisme (repérer avant, adapter la méthode, protection respiratoire) ; aussi éclats et disque qui éclate. Soudage près du store : thermique/incendie, une projection enflamme la toile, incendie, brûlures (permis de feu, protéger les combustibles, extincteur). Câble coincé : électrique, gaine abîmée, contact avec un conducteur, électrisation. Lisses dans l’escalier : mécanique/manutention, faux mouvement ou chute dans l’escalier, lombalgie, coupure (port à deux, gants). Trottoir non balisé : mécanique, chute d’un outil ou d’une chute de métal sur un passant, blessure grave à la tête (baliser, interdire la zone).',
  },
  principes: 'Principe n° 6 : boulonner plutôt que souder sur chantier = plus de point chaud chez le client. Principe n° 8 : l’aspiration protège tout l’atelier, le masque, son seul porteur.',
  protections: {
    prevention: 'souder à l’atelier et boulonner sur chantier, lever les pièces lourdes au palan ou au chariot.',
    collective: 'aspiration des fumées à la source, écrans de soudage, protecteurs des machines, garde-corps.',
    individuelle: 'masque de soudage, gants et tablier en cuir, lunettes, protections auditives.',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et le poste à souder',
    situation:
      'vous soudez au poste semi-automatique les montants d’un portail, à l’atelier. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise et s’approche pour vous regarder souder !',
    corrections:
      'danger = arc (rayonnement ultraviolet), projections de métal en fusion, fumées de soudage ; situation dangereuse = apprenti non formé, sans masque, près de la zone de soudage ; événement = il regarde l’arc à l’œil nu, reçoit une projection, respire les fumées ; dommage = coup d’arc (brûlure de l’œil, très douloureuse quelques heures après), brûlure de la peau, maladie à long terme (les fumées de soudage sont cancérogènes). Prévention : poste de soudage à l’écart des passages. Collective : écrans ou rideaux de soudage, aspiration des fumées à la source, extincteur à portée. Individuelle : masque de soudage, vêtements couvrants en coton ignifugé, gants et tablier en cuir. Information : accueil sécurité, ne jamais regarder l’arc sans masque, montrer les limites de la zone de soudage.',
  },
  droitRetrait: 'Pose en façade sans garde-corps ni point d’ancrage, nacelle calée sur un sol instable, fuite au détendeur d’une bouteille d’acétylène : j’arrête, je me retire, j’alerte.',
  sirene: 'Votre réflexe métier : couper le poste à souder, fermer les robinets des bouteilles, arrêter l’aspiration des fumées.',
  proteger:
    'Collègue au sol près d’un poste à souder : je pense d’abord au courant et aux fumées. Je coupe le poste, je ferme les bouteilles et je ne touche pas la victime avant.',
  supprimer: 'Arrêt d’urgence de la plieuse, couper le poste à souder, fermer les robinets des bouteilles de gaz.',
  isoler: 'Baliser la zone de pose, interdire le trottoir sous la façade, éloigner les curieux de l’atelier.',
  alerter: 'En pose, souvent à deux : l’un reste avec la victime, l’autre appelle. Seul ? J’appelle moi-même, haut-parleur activé. Je note l’adresse du chantier avant de commencer.',
  lieuxAlerte: 'Adresse, atelier ou façade, étage, portail d’accès.',
  natureAlerte: 'Brûlure, chute de hauteur, écrasement, électrisation…',
  messageAlerte:
    'Je suis apprenti métallier, je vous appelle du 8 rue des Forges à Tours, dans l’atelier au fond de la cour. Mon collègue a eu la main écrasée dans la plieuse, il saigne beaucoup. Une seule victime, il me parle. La machine est arrêtée, je comprime la plaie. Quelqu’un vous attendra devant le portail.',
  urgence: {
    titre: 'Bouteilles et incendie',
    texte: 'J’évacue, j’éloigne tout le monde et j’appelle le 18 : je signale les bouteilles d’acétylène.',
    notes: 'Une bouteille d’acétylène chauffée par un feu peut exploser, même après l’extinction : ne pas la déplacer, s’éloigner, laisser faire les pompiers.',
  },
  secourir: {
    saignement: 'Coupure profonde à l’avant-bras avec une tôle à bords vifs ou un disque de meuleuse qui éclate.',
    etouffement: 'Pause déjeuner à l’atelier : un collègue avale de travers en riant, il ne peut plus parler ni tousser.',
    malaise: 'Frissons, fièvre, nausées après avoir soudé ou meulé de l’acier galvanisé : penser aux fumées de zinc. Repos, avis médical.',
    brulure: 'Projection de soudure dans le cou, pièce tout juste soudée prise à main nue. Coup d’arc aux yeux : avis médical.',
    traumatisme: 'Pied écrasé par un vantail de portail, chute d’échafaudage en posant un garde-corps, dos bloqué par une poutrelle.',
    plaie: 'Éclat de métal dans l’œil au meulage : je ne retire rien, victime allongée, les deux yeux fermés, tête immobile.',
    inconscient: 'Collègue qui ne répond pas mais respire après une chute d’escabeau : je le laisse sur le dos, voies aériennes libres, pas de PLS.',
    arret: 'Électrisation par un poste à souder ou une motorisation de portail : couper le courant avant de toucher la victime.',
  },
  produits: 'Pâte de décapage de l’inox (acide fluorhydrique), dégraissant, antirouille, peintures, solvants. Sur la peau ou dans l’œil : rincer tout de suite, longtemps, avis médical.',
  casConcrets: [
    { titre: 'Pliage à la presse plieuse', texte: 'Votre collègue retire sa main de la plieuse en hurlant : deux doigts écrasés, le sang coule fort. La machine tourne encore.' },
    { titre: 'Pose d’un portail sous la pluie', texte: 'Votre collègue s’écroule en soudant une patte de fixation, la pince porte-électrode à la main. Il ne bouge plus.' },
    { titre: 'Oxycoupage d’une poutrelle', texte: 'Un claquement, une flamme sort du tuyau du chalumeau : la manche de votre collègue a pris feu, son avant-bras est brûlé.' },
    { titre: 'Soudage d’une grille galvanisée', texte: 'Dans le local fermé où il soudait, vous retrouvez votre collègue assis par terre, il tousse. La fumée stagne.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : danger mécanique persistant (arrêt d’urgence de la plieuse), saignement abondant. 2 : danger électrique persistant (couper le poste avant de toucher la victime), puis victime qui ne répond pas et ne respire pas. 3 : feu et bouteilles de gaz (fermer les robinets seulement si c’est sans risque, sinon éloigner tout le monde et alerter le 18 en signalant les bouteilles), brûlure thermique. 4 : atmosphère toxique (fumées de soudage et de zinc) : ne pas entrer sans protection, aérer depuis l’extérieur, lui demander de sortir s’il le peut, dégagement d’urgence seulement s’il est visible, facile à atteindre et sans risque pour le SST ; puis malaise, avis médical.',
};
