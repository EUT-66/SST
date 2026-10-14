// Fiche de référence : les contenus métier du cours MIT de la formatrice, exprimés dans
// le format du gabarit. Elle sert de modèle pour les autres métiers et aux tests
// (le cours MIT livré reste celui de courseMit.ts, repris tel quel du PowerPoint).
import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'mit',
  code: 'MIT',
  diplome: 'CAP MIT',
  intitule: 'CAP Monteur en installations thermiques',
  prefixe: 'MIT',
  public: 'Monteurs en installations thermiques — CFA BTP',
  cote: 'Côté MIT',
  lieux: 'chaufferie, chantier de rénovation, atelier',
  roles: {
    prevention: 'signaler une bouteille de gaz non arrimée dans le fourgon.',
    secours: 'refroidir tout de suite la brûlure d’un collègue touché par le chalumeau.',
  },
  atmp: {
    at: 'brûlure au chalumeau, pied écrasé par un radiateur en fonte, chute d’un escabeau.',
    trajet: 'accident de scooter en venant au CFA ou en rentrant du chantier.',
    mp: 'TMS de l’épaule ou du genou, maladies liées à l’amiante (anciens calorifuges).',
  },
  causes: {
    manutention: 'chaudière, ballon, radiateurs en fonte',
    outillage: 'meuleuse, coupe-tube, perforateur',
    hauteur: 'escabeau, toiture, trémie',
    plainPied: 'sol encombré, mouillé, câbles',
  },
  premierMaillon: 'Sur un chantier de plomberie-chauffage, vous êtes souvent deux ou trois, parfois seul chez un client : le premier maillon des secours, c’est vous.',
  quiFormer: 'En petite entreprise de chauffage, un SST par équipe ou par fourgon : c’est l’idéal.',
  observer: 'En arrivant dans une chaufferie : ventilation, odeur de gaz, sol, éclairage, vieux calorifuges… deux minutes d’observation avant de sortir les outils.',
  dangers: ['La flamme du chalumeau', 'Le gaz, le monoxyde de carbone', 'Une chaudière de 45 kg', 'Le courant électrique (230 V)'],
  categories: {
    mecanique: 'Meuleuse, perforateur, chute d’un ballon d’eau chaude, chute d’escabeau, tube qui coupe.',
    electrique: 'Raccordement d’une chaudière, circulateur sous tension, rallonge abîmée dans l’eau.',
    thermique: 'Chalumeau, tube tout juste brasé, eau à 80 °C, vapeur, fuite de gaz.',
    atmosphere: 'Monoxyde de carbone, fumées de brasage, fuite de fluide frigorigène, cave non ventilée.',
  },
  processus: {
    contexte: 'brasage d’un raccord cuivre dans un placard technique',
    danger: 'Flamme du chalumeau',
    operateur: 'L’apprenti qui brase',
    situation: 'Il brase à côté d’un isolant',
    evenement: 'L’isolant s’enflamme',
    dommage: 'Brûlure de la main',
  },
  exerciceReperage: {
    situation: 'remplacement d’une chaudière gaz dans la cave d’un pavillon.',
    elements: [
      'Brasage au chalumeau, laine isolante juste derrière',
      'Bouteille de gaz debout, non attachée',
      'Rallonge électrique posée dans une flaque',
      'Ancienne chaudière à remonter par l’escalier',
      'Vieux calorifuge qui s’effrite sur les tuyaux',
      'Soupirail fermé, pas de ventilation',
    ],
    corrections:
      'Chalumeau + isolant : thermique/incendie, l’isolant s’enflamme, brûlures. Bouteille non attachée : mécanique + explosion, chute de la bouteille, écrasement du pied, fuite. Rallonge dans l’eau : électrique, contact avec un conducteur, électrisation. Chaudière dans l’escalier : mécanique/manutention, faux mouvement ou chute, lombalgie, fracture. Calorifuge effrité : amiante possible, inhalation de fibres, maladie professionnelle (arrêter et signaler). Cave non ventilée : atmosphère toxique, accumulation de gaz ou de monoxyde de carbone, intoxication, explosion.',
  },
  principes: 'Principe n° 6 : sertir plutôt que braser = plus de flamme sur le chantier. Principe n° 8 : un garde-corps protège toute l’équipe, le harnais ne protège que celui qui le porte.',
  protections: {
    prevention: 'sertir au lieu de braser, vidanger et consigner avant d’intervenir.',
    collective: 'garde-corps, écran pare-flamme, ventilation de la chaufferie.',
    individuelle: 'gants, lunettes de brasage, chaussures de sécurité, masque.',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et le chalumeau',
    situation:
      'vous posez un chauffe-eau dans un local technique. Vous brasez les raccords en cuivre au chalumeau. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise et travaille avec vous !',
    corrections:
      'danger = flamme et pièces chaudes ; situation dangereuse = apprenti non formé à proximité du brasage ; événement = contact avec le tube chaud, départ de feu ; dommage = brûlure. Prévention : sertissage. Collective : écran pare-flamme, extincteur à portée, dégager les combustibles. Individuelle : gants, lunettes. Information : accueil sécurité, montrer les zones chaudes, permis de feu.',
  },
  droitRetrait: 'Odeur de gaz en entrant dans la chaufferie, toiture sans garde-corps pour poser un capteur solaire, calorifuge suspecté d’amiante : j’arrête, je sors, j’alerte.',
  sirene: 'Votre réflexe métier : couper la ventilation et le chauffage, éteindre le chalumeau.',
  proteger:
    'Collègue inanimé dans une chaufferie : je pense d’abord au gaz et au monoxyde de carbone. Je n’entre pas tête baissée, je n’actionne aucun interrupteur, j’aère si je peux le faire de l’extérieur.',
  supprimer: 'Couper le gaz à la vanne d’arrêt, couper le courant au disjoncteur, éteindre le chalumeau.',
  isoler: 'Baliser, fermer la porte de la chaufferie, empêcher quiconque d’approcher.',
  alerter: 'Seul chez un client ? J’appelle moi-même, haut-parleur activé, sans quitter la victime. Je connais l’adresse du chantier avant de commencer.',
  lieuxAlerte: 'Adresse, étage, cave, chaufferie, code d’accès.',
  natureAlerte: 'Chute de hauteur, brûlure, écrasement, fuite de gaz…',
  messageAlerte:
    'Je suis apprenti chauffagiste, je vous appelle du 12 rue des Lilas à Tours, dans la cave du pavillon. Mon collègue s’est brûlé la main et l’avant-bras avec un chalumeau. Une seule victime, il me parle. J’arrose la brûlure à l’eau. Quelqu’un vous attendra devant le portail.',
  urgence: {
    titre: 'Fuite de gaz',
    texte: 'Je sors d’abord, puis j’appelle le 18 ou l’Urgence Sécurité Gaz depuis l’extérieur.',
    notes: 'Urgence Sécurité Gaz (GRDF) : 0 800 47 33 33. Ne jamais téléphoner dans un local où il y a une odeur de gaz.',
  },
  secourir: {
    saignement: 'Coupure profonde à l’avant-bras avec la meuleuse ou une tôle de conduit.',
    etouffement: 'Pause casse-croûte dans le fourgon : un collègue avale de travers un morceau de sandwich.',
    malaise: 'Maux de tête, nausées, vertiges dans une chaufferie : penser au monoxyde de carbone. On sort tous à l’air libre.',
    brulure: 'Le grand classique du métier : chalumeau, tube qui vient d’être brasé, projection d’eau chaude à la purge.',
    traumatisme: 'Chute d’un escabeau en posant un conduit, pied écrasé par un radiateur en fonte, dos bloqué en portant un ballon.',
    plaie: 'Coupure avec un tube tout juste ébavuré, copeau de cuivre ou limaille dans l’œil.',
    inconscient: 'Collègue retrouvé inconscient dans un vide sanitaire ou une cave : air irrespirable possible, je protège avant d’entrer.',
    arret: 'Électrisation en raccordant une chaudière ou un circulateur : couper le courant avant de toucher la victime.',
  },
  produits: 'Détartrant, désembouant, décapant de brasage, colle PVC. Dans l’œil : rincer tout de suite et longtemps.',
  casConcrets: [
    { titre: 'Brasage en chaufferie', texte: 'Votre collègue lâche le chalumeau et crie : sa manche a pris feu, l’avant-bras est brûlé.' },
    { titre: 'Découpe à la meuleuse', texte: 'Le disque éclate. Le client vous appelle : votre collègue se tient le bras, le sang coule fort.' },
    { titre: 'Raccordement de la chaudière', texte: 'Vous retrouvez votre maître d’apprentissage au sol, inerte, la main sur le bornier.' },
    { titre: 'Mise en service en cave', texte: 'Un collègue se plaint de maux de tête et de nausées, puis s’assoit contre le mur.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : brûlure thermique. 2 : saignement abondant. 3 : danger électrique persistant, puis victime qui ne répond pas et ne respire pas. 4 : atmosphère toxique (monoxyde de carbone), malaise.',
};
