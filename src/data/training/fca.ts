// Cas d'entraînement – Installateur en froid et conditionnement d’air : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-fca-01',
    title: 'La vitre de la vitrine éclate',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une pâtisserie, tu installes avec Nolan une nouvelle vitrine réfrigérée. En posant la grande vitre du dessus, elle lui glisse des mains et éclate sur le comptoir : Nolan a une entaille profonde à l’avant-bras qui saigne beaucoup. Il y a des morceaux de verre partout par terre et une autre vitre, fendue, tient encore de travers sur la vitrine. La pâtissière accourt et deux clients entrent dans la boutique.',
    victime:
      'Debout près du comptoir, se tient l’avant-bras, le sang coule par terre. Aucun morceau de verre ne reste dans la plaie. Conscient, inquiet, répond aux questions. Comprime si on le lui demande ; la compression arrête le saignement.',
    temoin:
      'La pâtissière. Veut passer le bras de Nolan sous le robinet pour « nettoyer le sang ». Fait ensuite ce que le SST demande : faire sortir les clients, appeler les secours, apporter la trousse de secours.',
    materiel:
      'Tissu rouge, gants jetables ou sac plastique, linge propre et bande, plaque de carton pour la vitre fendue, ruban de balisage, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère le verre cassé au sol et la vitre fendue qui peut tomber', 'C2a'),
      act('Fait sortir les clients et interdit l’approche de la vitrine', 'C2b', 'C2d'),
      act('Repère d’emblée le saignement abondant de l’avant-bras', 'C3a', 'C3b'),
      act('Comprime immédiatement l’endroit qui saigne, main protégée (gants ou sac plastique), ou le fait comprimer par la victime', 'C5a', 'C5b'),
      act('Refuse de passer le bras sous l’eau et allonge la victime à l’écart de la vitrine et du verre, sans relâcher la compression', 'C5b'),
      act('Fait alerter le 15 ou le 112 par la pâtissière (saignement abondant de l’avant-bras, compression en cours) et s’assure que l’alerte est passée', 'C4a'),
      act('Si la compression est efficace, la relaie par un pansement compressif ; si le saignement reprend, comprime par-dessus ; s’il continue, pose un garrot', 'C5b'),
      act('Couvre, réconforte et surveille le saignement jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le verre de la vitrine (vitre lourde et coupante)',
      situation: 'Nolan manipule une grande vitre à mains nues, au-dessus du comptoir, boutique ouverte',
      evenement: 'La vitre lui glisse des mains et éclate',
      dommage: 'Plaie profonde de l’avant-bras avec saignement abondant',
      eviter:
        'Faire livrer la vitrine vitres montées quand c’est possible ; sinon poser les vitres à deux avec des ventouses de manutention, sur un plan dégagé, en suivant la notice ; boutique fermée ou zone balisée pendant la pose ; gants et manchettes anti-coupure.',
      remonter: 'Chef d’équipe ou chef d’entreprise, et la pâtissière pour la sécurité de sa boutique.',
    },
  }),
  makeCase({
    id: 'ent-fca-02',
    title: 'Casse-croûte sur la toiture',
    geste: 'Étouffement (obstruction totale)',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Midi, sur la toiture-terrasse d’un immeuble de bureaux où vous posez des unités extérieures de climatisation. Tu manges avec Yanis et Chloé, debout près du bord, que seul un muret bas protège. Yanis avale son sandwich à toute vitesse en racontant une blague. D’un coup, il porte les mains à sa gorge, la bouche ouverte, sans un son, et recule en titubant vers le bord.',
    victime:
      'Debout, mains à la gorge, bouche ouverte. Ne parle pas, ne tousse pas, fait oui de la tête si on lui demande s’il s’étouffe. Recule vers le muret si personne ne l’arrête. Les claques ne suffisent pas ; à la troisième compression abdominale, il recrache le morceau, tousse et reparle.',
    temoin:
      'Chloé, une collègue. Lui tend sa bouteille d’eau et lui dit de lever les bras. Appelle le 15 si le SST le lui demande.',
    materiel:
      'Ruban au sol pour le bord de la toiture, emballage de sandwich, bouteille d’eau, téléphone factice. Claques et compressions mimées : mains bien placées, geste retenu.',
    actions: [
      act('Repère le bord de toiture tout proche (risque de chute pour la victime et pour lui) et écarte la victime du bord avant d’agir', 'C2a', 'C2b', 'C2e'),
      act('Demande « Tu t’étouffes ? » et constate l’obstruction totale : ne parle pas, ne tousse pas', 'C3a', 'C3b'),
      act('Fait alerter le 15 par Chloé sans attendre ; une fois le morceau sorti, fait préciser que des compressions abdominales ont été faites', 'C4a'),
      act('Refuse qu’on lui donne de l’eau ou qu’on lui fasse lever les bras', 'C5b'),
      act('Penche la victime en avant et donne 1 à 5 claques vigoureuses dans le dos, entre les omoplates', 'C5a', 'C5b'),
      act('Les claques étant inefficaces, enchaîne 1 à 5 compressions abdominales, mains bien placées, et alterne jusqu’à la sortie du morceau', 'C5b'),
      act('S’arrête dès que le morceau est sorti et installe la victime assise, loin du bord, dans la position où elle se sent le mieux', 'C5b'),
      act('Réconforte et surveille la victime jusqu’à la fin de la prise en charge, en suivant les conseils du médecin', 'C5c'),
    ],
    prevention: {
      danger: 'Le morceau de nourriture, et le vide tout proche du bord de la toiture',
      situation: 'Yanis mange debout, vite, en parlant, à deux pas du bord de la toiture',
      evenement: 'Un morceau part dans les voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque d’arrêt cardiaque ou de chute dans le vide',
      eviter:
        'Prendre la pause dans un lieu prévu pour ça (local, base vie, camion), assis, et pas sur la toiture ; sur la toiture, garde-corps ou zone de travail balisée loin du bord ; manger lentement, par petites bouchées, sans parler la bouche pleine ; temps de pause suffisant sur le planning.',
      remonter: 'Chef d’équipe ou chef d’entreprise, même si tout s’est bien terminé.',
    },
  }),
  makeCase({
    id: 'ent-fca-03',
    title: 'Canicule sur le balcon',
    geste: 'Malaise dû à la chaleur',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'En pleine canicule, tu poses avec Inès l’unité extérieure d’une climatisation sur le balcon plein sud d’un appartement, au 5e étage. Depuis le matin, elle a très peu bu. Alors qu’elle brase une liaison en cuivre, elle pose le chalumeau encore allumé sur le carrelage, s’appuie au mur et te dit qu’elle a mal à la tête, envie de vomir et que « tout tourne ». La cliente est dans le salon, à l’ombre.',
    victime:
      'Debout contre le mur, accepte de s’asseoir. Rouge, en sueur, peau chaude. Maux de tête, nausées, vertiges. Répond aux questions : a très peu bu depuis le matin, pas de traitement, jamais arrivé. Va un peu mieux au frais, après avoir bu par petites gorgées.',
    temoin:
      'La cliente. Propose un grand verre d’eau glacée à boire d’un coup et un cachet contre le mal de tête. Sait que la chambre côté nord est la pièce la plus fraîche ; apporte de l’eau, un linge mouillé ou un ventilateur si le SST le demande.',
    materiel:
      'Chalumeau factice (ou bouteille vide), chaise ou tapis, bouteille d’eau et gobelet, serviette mouillée, téléphone factice.',
    actions: [
      act('Repère le chalumeau allumé et la chaleur du balcon comme dangers persistants', 'C2a'),
      act('Éteint le chalumeau (ferme ses robinets, puis la bouteille) et le pose à l’écart', 'C2c'),
      act('Observe les signes et questionne : depuis quand, a-t-elle bu et mangé, traitement, déjà arrivé', 'C3a', 'C3b'),
      act('Arrête le travail au soleil et installe Inès au repos dans la pièce la plus fraîche et aérée', 'C5a', 'C5b'),
      act('Appelle ou fait appeler le 15, transmet les signes et les réponses, et applique les conseils du médecin', 'C4a'),
      act('La rafraîchit (linge mouillé, ventilateur) et lui fait boire de l’eau fraîche par petites quantités, puisqu’elle est consciente et peut boire', 'C5b'),
      act('Refuse le grand verre bu d’un coup et ne donne aucun médicament de sa propre initiative', 'C5b'),
      act('Ne la laisse ni seule ni reprendre le travail, et la surveille, prêt à agir si elle ne répond plus', 'C5c'),
    ],
    prevention: {
      danger: 'La chaleur (canicule, balcon en plein soleil), renforcée par la flamme du chalumeau',
      situation: 'Inès travaille au soleil aux heures chaudes, près d’une flamme, sans boire assez',
      evenement: 'Son corps n’arrive plus à évacuer la chaleur',
      dommage: 'Malaise dû à la chaleur, risque de coup de chaleur',
      eviter:
        'Décaler le travail en extérieur aux heures fraîches pendant les fortes chaleurs ; raccords dudgeonnés plutôt que brasage quand c’est possible ; ombrage sur le balcon (bâche, parasol) ; eau fraîche à volonté et pauses à l’ombre ; se surveiller entre collègues et connaître les signes du malaise dû à la chaleur.',
      remonter: 'Chef d’équipe ou chef d’entreprise, pour adapter les horaires pendant les fortes chaleurs.',
    },
  }),
  makeCase({
    id: 'ent-fca-04',
    title: 'Jet de fluide sur la main',
    geste: 'Brûlure par le froid (fluide frigorigène)',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans le local technique d’un restaurant, une petite pièce sans fenêtre qui donne sur la cour de service, Théo termine la charge en fluide frigorigène du groupe de la chambre froide. Le flexible relié à la bouteille se détache d’un coup et lui projette du fluide liquide sur la main gauche : il ne portait pas ses gants. Tu arrives de la cour en l’entendant crier : Théo est debout au fond du local, le flexible tombé au sol crache encore du fluide en sifflant et un brouillard blanc envahit la pièce. Le cuisinier sort de la cuisine pour voir.',
    victime:
      'Debout au fond du local, se tient la main gauche ; sort tout seul dès que le SST le lui demande. Le dos de la main et deux doigts sont blancs et durs ; il ne sent plus ses doigts, puis dit que ça brûle. Conscient, répond aux questions, connaît le nom du fluide. Porte une bague, qui ne colle pas à la peau.',
    temoin:
      'Le cuisinier. Veut entrer dans le local pour fermer la bouteille, puis frotter la main de Théo pour la réchauffer et la passer sous l’eau chaude de la plonge. Fait ensuite ce que le SST demande (rester dehors, appeler les secours, les accueillir).',
    materiel:
      'Tuyau souple pour le flexible, bouteille factice, ruban au sol pour la porte du local, bassine et bouteille d’eau (ou évier de la salle), couverture, téléphone factice.',
    actions: [
      act('Repère la fuite qui continue : fluide très froid et brouillard dans un petit local fermé, où l’air peut manquer d’oxygène', 'C2a'),
      act('N’entre pas dans le local : demande à Théo d’en sortir tout de suite (il peut marcher) et l’éloigne de la porte', 'C2b', 'C2e'),
      act('Interdit au cuisinier et à toute autre personne d’entrer, laisse la porte ouverte sur la cour et ne retourne pas fermer la bouteille sans protection respiratoire', 'C2d'),
      act('Examine, à l’air libre : répond, se plaint de la main gauche, blanche et dure', 'C3a', 'C3b'),
      act('Arrose aussitôt la main à l’eau courante tempérée (pas chaude), sans frotter, au moins 10 minutes (idéalement 20)', 'C5a', 'C5b'),
      act('Pendant l’arrosage, retire la bague (elle ne colle pas à la peau) et refuse qu’on frotte la main ou qu’on la mette sous l’eau chaude', 'C5b'),
      act('Fait alerter le 18 ou le 112 : brûlure par le froid de la main due à un fluide frigorigène (nom donné par Théo), fuite qui continue dans un local fermé', 'C4a'),
      act('Fait accueillir les secours dans la cour et leur montre le local où la fuite continue', 'C4b'),
      act('Couvre Théo, le réconforte et le surveille jusqu’à l’arrivée des secours (main, et malaise possible après le brouillard de fluide)', 'C5c'),
    ],
    prevention: {
      danger: 'Le fluide frigorigène liquide, très froid quand il s’échappe, et le gaz qui chasse l’air d’un local fermé',
      situation: 'Théo manipule les flexibles de charge sans gants ni lunettes, bouteille ouverte, dans un petit local sans fenêtre',
      evenement: 'Le flexible se détache et projette du fluide liquide sur sa main',
      dommage: 'Brûlure par le froid (gelure) de la main ; risque de manque d’oxygène pour qui reste dans le local',
      eviter:
        'Fermer la bouteille et isoler les flexibles avant de les débrancher ; flexibles et joints vérifiés, raccords bien serrés ; porte du local ouverte et ventilation pendant la charge, détecteur de fluide ; gants adaptés au froid et lunettes portés pendant toute la charge ; rappel du mode opératoire de charge.',
      remonter: 'Chef d’équipe ou chef d’entreprise, et le restaurateur pour l’aération du local.',
    },
  }),
  makeCase({
    id: 'ent-fca-05',
    title: 'L’unité tombe de ses supports',
    geste: 'Traumatisme de l’avant-bras',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la cour d’une maison, tu poses avec Julien l’unité extérieure d’une climatisation sur deux supports fixés au mur, à hauteur de poitrine. Au moment où vous la posez, le support de droite s’arrache du mur : l’unité bascule et retombe sur l’avant-bras gauche de Julien. Il est assis par terre, adossé au mur, se tient l’avant-bras, déformé, et crie de douleur. L’unité est restée debout sur la tranche, en équilibre contre le mur, juste à côté de ses jambes. Le propriétaire arrive.',
    victime:
      'Assis par terre, adossé au mur, tient son avant-bras gauche contre son ventre ; l’avant-bras est déformé. Conscient, répond. Ne s’est pas cogné la tête, n’a mal ni au cou ni au dos. Veut se relever tout de suite, puis écoute le SST.',
    temoin:
      'Le propriétaire. Veut tirer sur le bras de Julien « pour le remettre droit » et l’aider à se relever. Aide le SST à coucher l’unité si celui-ci le lui demande, puis fait ce qu’il demande (appeler les secours, ouvrir le portail, les guider).',
    materiel:
      'Gros carton ou caisse pour l’unité, deux cartons scotchés au mur pour les supports, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère l’unité en équilibre à côté de la victime et la couche au sol du côté opposé, à deux avec le propriétaire, avant de s’occuper de Julien', 'C2a', 'C2c'),
      act('Examine : répond, se plaint de l’avant-bras ; demande s’il s’est cogné la tête, s’il a mal au cou ou au dos', 'C3a', 'C3b'),
      act('Demande à la victime de ne pas bouger le bras et respecte la position qu’elle a prise', 'C5a', 'C5b'),
      act('Refuse qu’on remette le bras droit et qu’on relève la victime', 'C5b'),
      act('Fait alerter le 15 ou le 112 : unité de climatisation tombée sur l’avant-bras, avant-bras déformé, victime consciente et assise', 'C4a'),
      act('Envoie le propriétaire ouvrir le portail et guider les secours jusqu’à la cour', 'C4b'),
      act('Couvre, réconforte et surveille jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'La charge lourde (unité extérieure) levée à bout de bras jusqu’à des supports fixés au mur',
      situation: 'Julien et toi tenez l’unité au-dessus du sol, sur des supports dont la fixation n’a pas été vérifiée',
      evenement: 'Un support s’arrache du mur et l’unité bascule',
      dommage: 'Traumatisme de l’avant-bras (fracture possible)',
      eviter:
        'Poser l’unité au sol, sur un socle ou des plots, quand c’est possible ; sinon chevilles adaptées au mur et fixation des supports vérifiée avant d’y poser l’unité, en suivant la notice ; lever l’unité avec un lève-charge plutôt qu’à bout de bras ; gants et chaussures de sécurité ; formation à la manutention.',
      remonter: 'Chef d’équipe ou chef d’entreprise, pour revoir les fixations et le matériel de levage.',
    },
  }),
  makeCase({
    id: 'ent-fca-06',
    title: 'Le ventilateur qui redémarre',
    geste: 'Plaie grave : section du bout d’un doigt',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur le parking d’une petite entreprise, Sarah nettoie l’unité extérieure de la climatisation, posée au sol. Pour aller plus vite, elle a retiré la grille du ventilateur sans couper l’unité. Le ventilateur redémarre tout seul : une pale lui coupe le bout du majeur droit. Tu la trouves assise par terre, la main serrée contre elle ; le ventilateur tourne toujours et le bout de doigt est tombé au fond de l’unité. Le gérant de l’entreprise sort en entendant crier.',
    victime:
      'Assise par terre, tient sa main droite. Le bout du majeur est coupé ; la plaie saigne un peu, sans couler abondamment. Consciente, pâle, très choquée, répond aux questions. Veut aller chercher elle-même le bout de doigt dans l’unité.',
    temoin:
      'Le gérant. Veut plonger la main dans l’unité pour récupérer le bout de doigt, puis le mettre directement dans un verre de glaçons. Sait où est le disjoncteur de la climatisation dans le bâtiment. Fait ensuite ce que le SST demande (couper, appeler les secours, apporter la trousse et de la glace, accueillir les secours).',
    materiel:
      'Gros carton figurant l’unité, petit morceau de pâte à modeler pour le bout de doigt, gants jetables, compresses ou linge propre, sac de congélation, boîte avec glaçons factices, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère le ventilateur qui tourne et peut repartir à tout moment : interdit à quiconque de mettre la main dans l’unité', 'C2a', 'C2b'),
      act('Fait couper l’alimentation de l’unité (interrupteur à côté de l’unité ou disjoncteur au tableau) et attend l’arrêt complet des pales', 'C2c'),
      act('Examine : répond, bout du majeur coupé, la plaie saigne peu', 'C3a', 'C3b'),
      act('Installe Sarah assise ou allongée et protège le moignon avec des compresses ou un linge propre, main protégée (comprime si le saignement devient abondant)', 'C5a', 'C5b'),
      act('Fait alerter le 15 ou le 112 : bout de doigt coupé par le ventilateur d’une climatisation, saignement faible', 'C4a'),
      act('Une fois l’unité coupée, récupère le bout de doigt avec des gants, le met dans un sac fermé posé dans un contenant avec de la glace, sans contact direct avec la glace, et refuse le verre de glaçons', 'C5b'),
      act('Fait accueillir les secours sur le parking', 'C4b'),
      act('Couvre, réconforte et surveille Sarah jusqu’aux secours, et leur remet le sac', 'C5c'),
    ],
    prevention: {
      danger: 'Les pales du ventilateur de l’unité extérieure, qui peut redémarrer à tout moment',
      situation: 'Sarah nettoie près des pales, grille retirée, unité restée sous tension',
      evenement: 'La régulation remet le ventilateur en marche',
      dommage: 'Section du bout du doigt',
      eviter:
        'Couper l’unité et condamner la coupure (cadenas, étiquette) avant de retirer la grille, puis vérifier que le ventilateur ne peut pas repartir ; nettoyer avec une brosse, sans mettre les doigts près des pales ; remettre la grille avant la remise en marche ; gants ; rappel du mode opératoire d’entretien.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-fca-07',
    title: 'Fuite dans la chambre froide',
    geste: 'Ne répond pas, respire (fuite de fluide, sans chute : PLS)',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Pendant les vacances scolaires, Lina cherche une fuite sur l’évaporateur de la chambre froide négative de la cantine d’un collège. Tu reviens du camion avec du matériel. La cuisinière te crie que Lina est sortie de la chambre froide en titubant, s’est assise par terre, puis s’est couchée doucement. Tu vois Lina allongée sur le dos sur le carrelage de la cuisine, à deux pas de la porte de la chambre froide, restée grande ouverte ; à l’intérieur, l’évaporateur siffle et le détecteur de fuite sonne sans arrêt.',
    victime:
      'Allongée sur le dos dans la cuisine, à deux pas de la porte de la chambre froide. Ne répond pas, respire normalement. Origine non traumatique et connue : elle s’est sentie mal à cause de la fuite de fluide, s’est assise puis couchée doucement, sans chute ni choc (la cuisinière l’a vu). On la met donc en PLS. Reste ainsi jusqu’à la fin.',
    temoin:
      'La cuisinière de la cantine. Veut entrer dans la chambre froide pour récupérer la lampe et le détecteur de Lina. Explique, si on le lui demande, que Lina n’est pas tombée, ne s’est pas cogné la tête et qu’il n’y a personne d’autre à l’intérieur. Fait ensuite ce que le SST demande (appeler, ouvrir les fenêtres de la cuisine, accueillir les secours).',
    materiel:
      '2 tapis (cuisine / chambre froide) ou une porte de la salle pour la chambre froide, sonnerie de téléphone pour le détecteur, couverture, téléphone factice.',
    actions: [
      act('Repère le danger persistant : fuite de fluide qui continue (sifflement, détecteur qui sonne), air pauvre en oxygène dans la chambre froide et devant sa porte', 'C2a'),
      act('N’entre pas dans la chambre froide sans appareil respiratoire, interdit à la cuisinière d’y entrer et vérifie avec elle que personne d’autre n’est à l’intérieur', 'C2b', 'C2d'),
      act('Ferme la porte de la chambre froide depuis la cuisine pour garder le fluide à l’intérieur, puis fait ouvrir les fenêtres et les portes de la cuisine', 'C2c', 'C2d'),
      act('Examine : ne répond pas ; libère les voies aériennes et constate qu’elle respire', 'C3a', 'C3b'),
      act('Sachant que son état ne vient ni d’une chute ni d’un choc, met la victime en PLS', 'C5a', 'C5b'),
      act('Fait alerter le 18 ou le 112 par la cuisinière : fuite de fluide frigorigène dans la chambre froide (porte fermée), une victime sortie, qui ne répond pas et respire, en PLS', 'C4a'),
      act('Fait accueillir les secours à l’entrée du collège et leur signale la chambre froide à ne pas ouvrir sans protection', 'C4b'),
      act('Couvre la victime et surveille sa respiration en permanence ; si elle ne respire plus, la remet sur le dos et commence la réanimation', 'C5c'),
    ],
    prevention: {
      danger: 'Le fluide frigorigène qui prend la place de l’air respirable dans un local fermé',
      situation: 'Lina travaille seule dans la chambre froide, porte refermée derrière elle, pendant une recherche de fuite',
      evenement: 'Une fuite importante sur l’évaporateur remplit la chambre froide de fluide',
      dommage: 'Manque d’oxygène, perte de connaissance',
      eviter:
        'Isoler le circuit (fermer les vannes) avant d’entrer quand c’est possible ; porte bloquée grande ouverte et ventilation pendant l’intervention ; détecteur de fluide et d’oxygène porté sur soi, sortir dès qu’il sonne ; ne pas travailler seul dans une chambre froide, un collègue reste à l’extérieur.',
      remonter: 'Chef d’équipe ou chef d’entreprise, et le gestionnaire du collège.',
    },
  }),
  makeCase({
    id: 'ent-fca-08',
    title: 'Le coffret du groupe froid',
    geste: 'Arrêt cardiaque (électrisation)',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la réserve d’un supermarché, Didier, ton chef d’équipe, dépanne le coffret électrique du groupe froid qui alimente les vitrines du magasin. Tu reviens du camion et tu le trouves allongé sur le dos au pied du coffret ouvert, la main contre un câble dénudé. Amandine, la magasinière, arrive en courant. Un défibrillateur est à l’accueil du magasin.',
    victime:
      'Mannequin sur le dos, la main posée contre un câble relié à la boîte « coffret ». Ne répond pas, ne respire pas.',
    temoin:
      'Amandine, la magasinière. Se précipite pour secouer Didier ; s’arrête si le SST l’interdit. Sait où est la coupure du groupe froid et où est le défibrillateur, mais ne le dit que si on le lui demande. Veut d’abord prévenir le directeur ; appelle le 15 si le SST le lui demande clairement.',
    materiel:
      'Mannequin adulte, défibrillateur de formation, boîte en carton « coffret », rallonge ou câble, tournevis, téléphone factice.',
    actions: [
      act('Repère le câble dénudé : ne touche pas Didier tant que le courant n’est pas coupé et interdit à Amandine de le toucher', 'C2a', 'C2b'),
      act('Demande à Amandine où est la coupure et fait couper le courant à la coupure du groupe froid ou au tableau général', 'C2c'),
      act('Examine : ne répond pas, ne respire pas', 'C3a', 'C3b'),
      act('Envoie Amandine alerter le 15 ou le 112 (électrisation, ne répond pas, ne respire pas, réanimation en cours), prévenir l’accueil selon l’organisation des secours du magasin et rapporter le défibrillateur', 'C4a'),
      act('Commence aussitôt 30 compressions thoraciques et 2 insufflations, 100 à 120 compressions par minute (compressions seules en continu s’il ne peut pas insuffler)', 'C5a', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée et suit ses instructions, en interrompant le moins possible les compressions', 'C5b'),
      act('Fait accueillir les secours au quai de livraison et guider jusqu’à la réserve', 'C4b'),
      act('Poursuit la réanimation jusqu’au relais des secours (relais toutes les 2 minutes avec un autre SST si possible)', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique dans le coffret du groupe froid',
      situation: 'Didier intervient dans le coffret resté sous tension',
      evenement: 'Sa main touche un conducteur sous tension',
      dommage: 'Électrisation, arrêt cardiaque',
      eviter:
        'Consigner avant d’intervenir : couper, condamner la coupure (cadenas, étiquette), vérifier l’absence de tension ; habilitation électrique adaptée à l’intervention ; outils isolés ; repérer à l’arrivée la coupure et le défibrillateur du site.',
      remonter: 'Chef d’entreprise, et le responsable du magasin pour l’installation.',
    },
  }),
];
