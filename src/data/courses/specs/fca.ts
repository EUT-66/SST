import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'froid',
  code: 'FCA',
  diplome: 'CAP FCA',
  intitule: 'CAP Installateur en froid et conditionnement d’air',
  prefixe: 'FCA',
  public: 'Installateurs en froid et conditionnement d’air — CFA BTP',
  cote: 'Côté FCA',
  lieux: 'chantier de climatisation, toiture, cuisine professionnelle, chambre froide, atelier',
  roles: {
    prevention: 'signaler une chambre froide dont la poignée d’ouverture intérieure est cassée.',
    secours: 'arroser à l’eau tempérée la main d’un collègue gelée par une projection de fluide.',
  },
  atmp: {
    at: 'gelure par projection de fluide, chute en posant une unité extérieure, doigt coincé sous un compresseur.',
    trajet: 'accident de scooter en venant au CFA ou en rentrant du chantier.',
    mp: 'TMS de l’épaule (pose de splits bras levés), surdité liée au bruit, maladies liées à l’amiante.',
  },
  causes: {
    manutention: 'unité extérieure, compresseur, bouteilles de fluide',
    outillage: 'perforateur, meuleuse, coupe-tube, cintreuse',
    hauteur: 'toiture, nacelle, escabeau, échafaudage',
    plainPied: 'sol givré ou mouillé, flexibles et câbles au sol',
  },
  premierMaillon: 'En dépannage frigorifique, vous êtes souvent seul ou à deux, en toiture, dans une cuisine professionnelle ou une chambre froide : le premier maillon des secours, c’est vous.',
  quiFormer: 'En entreprise de froid et de climatisation, un SST par équipe ou par fourgon : c’est l’idéal. Seul en dépannage, il faut aussi pouvoir donner l’alerte (dispositif travailleur isolé).',
  observer: 'Sur une toiture ou devant une chambre froide : accès, garde-corps, lanterneaux, ouverture intérieure de la porte, aération… deux minutes d’observation avant de sortir les outils.',
  dangers: ['Le fluide frigorigène, glacé et sous pression', 'La flamme du chalumeau', 'Une unité extérieure de 60 kg en toiture', 'Le courant électrique (230 V et 400 V)'],
  categories: {
    mecanique: 'Unité extérieure qui bascule, chute de toiture ou d’escabeau, ventilateur de condenseur, perforateur.',
    electrique: 'Raccordement d’un groupe en 400 V, armoire électrique ouverte, condensateur encore chargé après la coupure.',
    thermique: 'Chalumeau oxy-acétylénique, tube brasé, projection de fluide glacé, fluides inflammables (R32, R290).',
    atmosphere: 'Fuite de fluide en local bas ou chambre froide, azote en local clos, fumées de brasage, fluide sur une flamme.',
  },
  processus: {
    contexte: 'débranchement d’un flexible du manifold après une charge en fluide',
    danger: 'Fluide frigorigène liquide sous pression',
    operateur: 'L’apprenti qui débranche le flexible',
    situation: 'Il débranche un flexible plein, sans gants ni lunettes',
    evenement: 'Le fluide jaillit du raccord',
    dommage: 'Gelure de la main, lésion de l’œil',
  },
  exerciceReperage: {
    situation: 'pose d’une climatisation dans un petit commerce, unité extérieure en toiture-terrasse.',
    elements: [
      'Unité extérieure de 60 kg à monter par l’échelle',
      'Toiture-terrasse sans garde-corps, lanterneau non protégé',
      'Brasage au chalumeau près de l’étanchéité bitumée',
      'Câble d’alimentation de l’unité déjà sous tension',
      'Perçage du mur au perforateur, sans aspiration',
      'Unité intérieure au R32 dans une réserve sans aération',
    ],
    corrections:
      'Unité par l’échelle : mécanique/manutention, faux mouvement ou chute avec la charge, lombalgie, fracture (monte-matériaux, grue, travail à deux). Toiture et lanterneau : chute de hauteur, chute dans le vide ou à travers le lanterneau, blessures graves (garde-corps, protection du lanterneau, nacelle). Chalumeau près de l’étanchéité : incendie, le bitume ou l’isolant s’enflamme, brûlures (raccords sans flamme, sinon permis de feu, écran, extincteur). Câble sous tension : électrique, contact en raccordant, électrisation (consignation, habilitation électrique). Perçage sans aspiration : poussière de silice cristalline et bruit, maladie respiratoire, surdité (aspiration à la source, masque, protections auditives ; repérage amiante en bâtiment ancien). Unité au R32 en réserve fermée : fuite aux raccords d’un fluide plus lourd que l’air et inflammable, atmosphère irrespirable, asphyxie, incendie (test d’étanchéité à l’azote, local conforme à la notice, aération, détecteur, aucune flamme).',
  },
  principes: 'Principe n° 4 : monter l’unité extérieure au monte-matériaux ou à la grue plutôt qu’à bras. Principe n° 8 : un garde-corps en toiture protège toute l’équipe, le harnais un seul.',
  protections: {
    prevention: 'raccords sans flamme au lieu du brasage, consigner le groupe, poser l’unité au sol si possible.',
    collective: 'garde-corps en toiture, nacelle, ventilation du local, détecteur de fuite de fluide.',
    individuelle: 'gants et lunettes contre les projections de fluide, harnais, chaussures de sécurité.',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et le fluide',
    situation:
      'vous mettez en service une pompe à chaleur chez un particulier. Vous raccordez la bouteille de fluide au manifold pour compléter la charge. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise et travaille avec vous !',
    corrections:
      'danger = fluide liquide sous pression et très froid ; situation dangereuse = apprenti sans gants ni lunettes qui manipule les flexibles ; événement = projection de fluide en débranchant un flexible ; dommage = gelure de la main, lésion de l’œil. Prévention : fermer les vannes avant de débrancher, flexibles à vanne d’arrêt en bon état, manipulation encadrée par un titulaire de l’attestation d’aptitude. Collective : travailler en extérieur ou en local ventilé, baliser la zone. Individuelle : gants, lunettes à protection latérale. Information : accueil sécurité, l’apprenti regarde avant de manipuler ; en cas de projection, arroser tout de suite à l’eau tempérée.',
  },
  droitRetrait: 'Toiture sans garde-corps ni protection des lanterneaux, alarme de détection de fuite en salle des machines, groupe à dépanner non consigné : j’arrête, je me mets en sécurité, j’alerte.',
  sirene: 'Votre réflexe métier : éteindre le chalumeau, fermer les bouteilles, arrêter la climatisation et la ventilation, descendre de la toiture pour vous mettre à l’abri.',
  proteger:
    'Collègue au sol dans une chambre froide ou un local machines : je pense à une fuite de fluide qui chasse l’oxygène. Je n’entre pas sans protection, j’ouvre et j’aère depuis l’extérieur.',
  supprimer: 'Couper le groupe au sectionneur, éteindre le chalumeau, fermer la vanne de la bouteille de fluide.',
  isoler: 'Baliser au pied de la façade, interdire l’accès au local machines ou à la chambre froide.',
  alerter: 'En toiture ou au fond d’une chambre froide, le réseau passe mal : je repère avant où capter. Je donne l’adresse exacte et l’accès au toit (escalier, trappe, clé).',
  lieuxAlerte: 'Adresse, bâtiment, toiture, local machines, code d’accès.',
  natureAlerte: 'Chute de toiture, gelure, électrisation, fuite de fluide…',
  messageAlerte:
    'Je suis apprenti frigoriste, je vous appelle du 8 avenue des Tilleuls à Angers, dans la cuisine du restaurant. Mon collègue a reçu une projection de fluide frigorigène sur la main en débranchant un flexible. Une seule victime, il me parle. J’arrose sa main à l’eau tempérée. Quelqu’un vous attendra devant l’entrée.',
  urgence: {
    titre: 'Fuite de fluide frigorigène',
    texte: 'Je sors, j’aère depuis l’extérieur si je peux, j’interdis l’accès et j’alerte. Fluide inflammable : je n’actionne rien.',
    notes:
      'La plupart des fluides frigorigènes (HFC, HFO, propane, CO2) sont plus lourds que l’air : ils s’accumulent en sous-sol, en local machines ou en chambre froide et chassent l’oxygène. Au contact d’une flamme ou d’une surface très chaude, les fluides fluorés se décomposent en gaz toxiques et corrosifs. Le R32 (A2L, faiblement inflammable) et le R290 (propane, A3, très inflammable) : aucune flamme, aucun interrupteur, pas de téléphone dans le local. L’ammoniac (froid industriel) est toxique et plus léger que l’air : on n’intervient pas, on alerte. Odeur de gaz naturel (pompe à chaleur hybride, chaudière voisine) : Urgence Sécurité Gaz (GRDF) 0 800 47 33 33, depuis l’extérieur.',
  },
  secourir: {
    saignement: 'Coupure profonde à l’avant-bras sur la tôle d’un caisson, ou disque de meuleuse en découpant un support d’unité.',
    etouffement: 'Pause déjeuner dans le fourgon entre deux dépannages : un collègue avale de travers un morceau de sandwich.',
    malaise: 'Froid en chambre froide négative ou chaleur en toiture l’été : mettre au repos, au chaud ou au frais, avis médical.',
    brulure: 'Deux brûlures du métier : le chalumeau et la gelure par le fluide. Dans les deux cas : eau courante tempérée, sans frotter.',
    traumatisme: 'Chute d’un escabeau en posant un split, dos bloqué en portant une unité, pied écrasé par un compresseur.',
    plaie: 'Coupure sur les ailettes d’un échangeur, limaille de cuivre dans l’œil après l’ébavurage d’un tube.',
    inconscient: 'Collègue inconscient au pied de l’échelle de toiture : après une chute, je le laisse sur le dos, voies aériennes libres.',
    arret: 'Électrisation sur le bornier d’un groupe ou d’une pompe à chaleur : couper le courant avant de toucher la victime.',
  },
  produits: 'Huile de pompe à vide usagée, huile d’un compresseur grillé (acide), nettoyant de batterie, décapant de brasage. Dans l’œil : rincer tout de suite et longtemps.',
  casConcrets: [
    { titre: 'Débranchement du manifold', texte: 'Le flexible se décroche : du fluide gicle sur la main nue de votre collègue. Sa peau devient blanche, il a très mal.' },
    { titre: 'Pose d’une unité en toiture', texte: 'Votre collègue passe à travers un lanterneau et tombe dans l’entrepôt. Il est au sol, immobile, les yeux fermés.' },
    { titre: 'Dépannage d’un groupe froid', texte: 'Vous retrouvez votre maître d’apprentissage au sol, inerte, devant l’armoire électrique ouverte du groupe.' },
    { titre: 'Recherche de fuite', texte: 'Votre collègue sort de la chambre froide en titubant : vertiges, maux de tête. L’alarme de détection de fuite sonne.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : danger thermique (froid), fluide qui fuit encore (fermer la vanne si c’est sans risque, s’écarter du jet), gelure à arroser à l’eau tempérée comme une brûlure thermique. 2 : chute de hauteur, lanterneau ouvert à baliser, rejoindre la victime par l’intérieur et non par le toit ; victime qui ne répond pas et respire après un traumatisme : sur le dos, voies aériennes libres, pas de PLS. 3 : danger électrique persistant (couper au sectionneur avant de toucher), puis victime qui ne répond pas et ne respire pas. 4 : atmosphère irrespirable (fluide plus lourd que l’air) : ne pas entrer sans protection, aérer depuis l’extérieur, malaise à l’air libre, avis médical.',
};
