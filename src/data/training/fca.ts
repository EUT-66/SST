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
      act('Refuse de passer le bras sous l’eau et allonge la victime à l’écart des débris de verre', 'C5b'),
      act('Fait alerter le 15 ou le 112 par la pâtissière et s’assure que l’alerte est passée', 'C4a'),
      act('Relaie par un pansement compressif quand le saignement est arrêté ; sait qu’il faut un garrot si la compression est inefficace', 'C5b'),
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
      'Midi, sur la toiture-terrasse d’un immeuble de bureaux où vous posez des unités extérieures de climatisation. Tu manges avec Yanis et Chloé, debout près du bord, protégé seulement par un muret bas. Yanis avale son sandwich à toute vitesse en racontant une blague. D’un coup, il porte les mains à sa gorge, la bouche ouverte, sans un son, et recule en titubant vers le bord.',
    victime:
      'Debout, mains à la gorge, bouche ouverte. Ne parle pas, ne tousse pas, fait oui de la tête si on lui demande s’il s’étouffe. Recule vers le muret si personne ne l’arrête. Les claques ne suffisent pas ; à la troisième compression abdominale, il recrache le morceau, tousse et reparle.',
    temoin:
      'Chloé, une collègue. Lui tend sa bouteille d’eau et lui dit de lever les bras. Appelle le 15 si le SST le lui demande.',
    materiel:
      'Ruban au sol pour le bord de la toiture, emballage de sandwich, bouteille d’eau, téléphone factice. Claques et compressions mimées : mains bien placées, geste retenu.',
    actions: [
      act('Repère le bord de toiture tout proche (risque de chute pour la victime et pour lui) et écarte la victime du bord avant d’agir', 'C2a', 'C2b'),
      act('Demande « Tu t’étouffes ? » et constate l’obstruction totale : ne parle pas, ne tousse pas', 'C3a', 'C3b'),
      act('Refuse qu’on lui donne de l’eau ou qu’on lui fasse lever les bras', 'C5b'),
      act('Penche la victime en avant et donne 1 à 5 claques vigoureuses dans le dos, entre les omoplates', 'C5a', 'C5b'),
      act('Les claques étant inefficaces, enchaîne 1 à 5 compressions abdominales, mains bien placées, et alterne jusqu’à la désobstruction', 'C5b'),
      act('Fait appeler le 15 par Chloé si l’obstruction persiste ; après la désobstruction, demande de toute façon un avis médical', 'C4a'),
      act('Installe la victime assise, loin du bord, dans la position où elle se sent le mieux, et la réconforte', 'C5c'),
      act('Surveille la victime et applique les conseils du médecin', 'C5c'),
    ],
    prevention: {
      danger: 'Le morceau de nourriture avalé de travers, et le vide tout proche',
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
      'En pleine canicule, tu poses avec Inès l’unité extérieure d’une climatisation sur le balcon plein sud d’un appartement, au 5e étage. Depuis le matin, elle a très peu bu. En train de braser une liaison cuivre, elle pose le chalumeau encore allumé sur le carrelage, s’appuie au mur et te dit qu’elle a mal à la tête, envie de vomir et que « tout tourne ». La cliente est dans le salon, à l’ombre.',
    victime:
      'Debout contre le mur, accepte de s’asseoir. Rouge, en sueur, peau chaude. Maux de tête, nausées, vertiges. Répond aux questions : a très peu bu depuis le matin, pas de traitement, jamais arrivé. Va un peu mieux au frais, après avoir bu par petites gorgées.',
    temoin:
      'La cliente. Propose un grand verre d’eau glacée à boire d’un coup et un cachet contre le mal de tête. Sait que la chambre côté nord est la pièce la plus fraîche ; apporte de l’eau, un linge mouillé ou un ventilateur si le SST le demande.',
    materiel:
      'Chalumeau factice (ou bouteille vide), chaise ou tapis, bouteille d’eau et gobelet, serviette mouillée, téléphone factice.',
    actions: [
      act('Repère le chalumeau allumé et la chaleur du balcon comme dangers persistants', 'C2a'),
      act('Ferme les robinets du chalumeau et l’écarte', 'C2c'),
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
        'Raccords dudgeonnés plutôt que brasage quand c’est possible ; décaler le travail en extérieur aux heures fraîches ; ombrage sur le balcon (bâche, parasol) ; eau fraîche à volonté et pauses à l’ombre ; se surveiller entre collègues et connaître les signes du malaise dû à la chaleur.',
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
      'Dans le local technique d’un restaurant, une petite pièce sans fenêtre derrière la cuisine, Théo termine la charge en fluide frigorigène du groupe de la chambre froide. Le flexible relié à la bouteille se détache d’un coup et lui projette du fluide liquide sur la main gauche : il ne portait pas ses gants. Tu arrives en l’entendant crier : le flexible, tombé au sol, crache encore du fluide en sifflant et un brouillard blanc envahit le local. Le cuisinier passe la tête par la porte.',
    victime:
      'Debout, se tient la main gauche. Le dos de la main et deux doigts sont blancs et durs ; il ne sent plus ses doigts, puis dit que ça brûle. Conscient, répond aux questions. Porte une bague, qui ne colle pas à la peau.',
    temoin:
      'Le cuisinier. Veut frotter la main de Théo pour la réchauffer, puis la passer sous l’eau chaude de la plonge. Fait ensuite ce que le SST demande (appeler le 15, garder les portes ouvertes).',
    materiel:
      'Tuyau souple pour le flexible, bouteille factice avec robinet, gants et lunettes, bassine et bouteille d’eau, couverture, téléphone factice.',
    actions: [
      act('Repère la fuite qui continue : fluide très froid et brouillard dans un local fermé', 'C2a'),
      act('Avec gants et lunettes, ferme le robinet de la bouteille pour arrêter la fuite (si ce n’est pas possible sans risque, fait sortir tout le monde sans y retourner)', 'C2c'),
      act('Fait sortir Théo et le cuisinier du local et laisse la porte grande ouverte pour aérer', 'C2b'),
      act('Examine : répond, se plaint de la main gauche, blanche et dure', 'C3a', 'C3b'),
      act('Arrose aussitôt la main à l’eau courante tempérée, sans frotter, au moins 10 minutes (idéalement 20)', 'C5a', 'C5b'),
      act('Pendant l’arrosage, retire la bague (elle ne colle pas à la peau) et refuse qu’on frotte la main ou qu’on la mette sous l’eau chaude', 'C5b'),
      act('Fait alerter le 15 en précisant : brûlure par le froid due à un fluide frigorigène (nom lu sur la bouteille), main et doigts touchés', 'C4a'),
      act('Couvre, réconforte et surveille jusqu’à l’arrivée des secours ou l’avis du médecin', 'C5c'),
    ],
    prevention: {
      danger: 'Le fluide frigorigène liquide, très froid quand il s’échappe, dans un local fermé',
      situation: 'Théo manipule les flexibles de charge sans gants ni lunettes, bouteille ouverte',
      evenement: 'Le flexible se détache et projette du fluide liquide sur sa main',
      dommage: 'Brûlure par le froid (gelure) de la main ; risque de manque d’oxygène dans le local',
      eviter:
        'Fermer la bouteille et isoler les flexibles avant de les débrancher ; flexibles et joints vérifiés, raccords bien serrés ; local ventilé, porte ouverte, détecteur de fluide ; gants adaptés au froid et lunettes ; rappel du mode opératoire de charge.',
      remonter: 'Chef d’équipe ou chef d’entreprise, et le restaurateur pour l’aération du local.',
    },
  }),
  makeCase({
    id: 'ent-fca-05',
    title: 'Chute dans l’escalier avec l’unité',
    geste: 'Traumatisme de l’avant-bras',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une maison de ville, tu descends avec Julien une ancienne unité extérieure d’environ 50 kg par l’escalier étroit qui mène à la cour. Julien porte le bas et descend à reculons. Il rate une marche et tombe sur le palier ; l’unité t’échappe et reste coincée de travers trois marches au-dessus de lui, prête à glisser. Julien se tient l’avant-bras gauche, déformé, et crie de douleur ; le propriétaire arrive.',
    victime:
      'Assis sur le palier, tient son avant-bras gauche contre son ventre ; l’avant-bras est déformé. Conscient, répond. Ne s’est pas cogné la tête, n’a mal ni au cou ni au dos. Veut se relever tout de suite, puis écoute le SST.',
    temoin:
      'Le propriétaire. Veut tirer sur le bras « pour le remettre droit » et aider Julien à se relever. Fait ensuite ce que le SST demande (apporter une sangle, appeler, ouvrir aux secours).',
    materiel:
      'Caisse ou gros carton pour l’unité, 2 ou 3 marches (ou estrade), sangle, couverture, téléphone factice.',
    actions: [
      act('Repère l’unité instable au-dessus de la victime et la bloque (sangle à la rampe, cale) avant de s’approcher', 'C2a', 'C2c'),
      act('Examine : répond, se plaint de l’avant-bras ; demande s’il s’est cogné la tête, s’il a mal au cou ou au dos', 'C3a', 'C3b'),
      act('Demande à la victime de ne pas bouger le bras et respecte la position qu’elle a prise', 'C5a', 'C5b'),
      act('Refuse qu’on remette le bras droit et qu’on relève la victime', 'C5b'),
      act('Fait alerter le 15 ou le 18 en décrivant la chute et la déformation de l’avant-bras', 'C4a'),
      act('Envoie le propriétaire ouvrir la porte et guider les secours jusqu’à l’escalier', 'C4b'),
      act('Couvre, réconforte et surveille jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'La charge lourde (unité d’environ 50 kg) portée dans un escalier',
      situation: 'Julien descend à reculons, sans voir les marches, les mains prises par l’unité',
      evenement: 'Il rate une marche et chute',
      dommage: 'Traumatisme de l’avant-bras (fracture possible)',
      eviter:
        'Éviter le port à la main : sortir l’unité par l’extérieur avec un lève-charge ou un monte-matériaux ; sinon diable monte-escalier ou sangles de portage, à deux, escalier dégagé et éclairé ; chaussures de sécurité ; formation aux gestes et postures.',
      remonter: 'Chef d’équipe ou chef d’entreprise, pour prévoir le matériel de manutention.',
    },
  }),
  makeCase({
    id: 'ent-fca-06',
    title: 'Un éclat de brique dans l’œil',
    geste: 'Plaie grave : corps étranger dans l’œil',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans un salon de coiffure fermé pour la journée, Sarah perce au perforateur le mur de façade pour faire passer les liaisons de la future climatisation, pendant que tu fixes le support de l’unité intérieure. Elle a remonté ses lunettes sur son front. Un éclat de brique lui saute dans l’œil droit : elle lâche le perforateur, qui reste branché et pendu au mur par son foret coincé, et se tient l’œil en criant. La gérante du salon arrive.',
    victime:
      'Debout, main sur l’œil droit, l’œil pleure et saigne un peu. Dit qu’elle sent quelque chose de planté dans l’œil et voit flou. Consciente, répond. Veut se frotter l’œil.',
    temoin:
      'La gérante du salon. Veut retirer l’éclat avec le coin d’un mouchoir. Fait ensuite ce que le SST demande (appeler, accueillir les secours devant le salon).',
    materiel:
      'Perceuse factice (ou carton) avec rallonge, lunettes de protection, tapis, couverture roulée ou coussins pour caler la tête, téléphone factice.',
    actions: [
      act('Débranche le perforateur et le décroche du mur', 'C2a', 'C2c'),
      act('Examine : répond, se plaint de l’œil droit, un éclat semble planté dans l’œil', 'C3a', 'C3b'),
      act('Empêche la victime de se frotter l’œil et refuse qu’on retire l’éclat', 'C5b'),
      act('Allonge la victime, lui demande de fermer les deux yeux et lui maintient la tête à deux mains (ou la cale)', 'C5a', 'C5b'),
      act('Fait alerter le 15 en précisant le corps étranger planté dans l’œil', 'C4a'),
      act('Demande à la gérante d’accueillir les secours devant le salon', 'C4b'),
      act('Rassure la victime, lui rappelle de garder les deux yeux fermés et la surveille jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Les éclats de brique projetés par le perçage',
      situation: 'Sarah perce à hauteur de visage, lunettes remontées sur le front',
      evenement: 'Un éclat est projeté dans son œil',
      dommage: 'Plaie de l’œil avec corps étranger',
      eviter:
        'Choisir le passage des liaisons pour limiter les perçages ; carotteuse ou perforateur avec capot d’aspiration ; percer depuis une plateforme stable, sans avoir le visage face au trou ; lunettes-masque portées sur les yeux pendant tout le perçage ; rappel de la consigne par le chef d’équipe.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-fca-07',
    title: 'Fuite dans la chambre froide',
    geste: 'Ne répond pas, respire (manque d’oxygène : PLS)',
    category: 'metier',
    tradeIds: ['froid'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Pendant les vacances scolaires, Lina cherche une fuite sur l’évaporateur de la chambre froide négative de la cantine d’un collège. Tu reviens du camion avec du matériel. La cuisinière, devant la porte entrouverte, te crie que Lina s’est sentie mal, s’est assise, puis s’est couchée doucement par terre. Tu vois Lina allongée sur le dos à un mètre de la porte ; à l’intérieur, l’évaporateur siffle et le détecteur de fuite posé au sol sonne sans arrêt.',
    victime:
      'Allongée sur le dos dans la chambre froide, à un mètre de la porte. Ne répond pas, respire normalement. Se laisse tirer. Origine non traumatique et connue : manque d’oxygène dû à la fuite de fluide ; elle s’est assise puis couchée doucement, sans chute ni choc (la cuisinière l’a vu). On la met donc en PLS.',
    temoin:
      'La cuisinière de la cantine. Veut entrer chercher Lina. Explique, si on le lui demande, que Lina ne s’est pas cogné la tête et n’est pas tombée. Fait ensuite ce que le SST demande (appeler, ouvrir les fenêtres de la cuisine, accueillir les secours).',
    materiel:
      '2 tapis (chambre froide / cuisine), ruban au sol pour la porte, sonnerie de téléphone pour le détecteur, couverture, téléphone factice.',
    actions: [
      act('Repère le danger persistant : fuite de fluide dans un local fermé (sifflement, détecteur qui sonne), air pauvre en oxygène', 'C2a'),
      act('Empêche la cuisinière d’entrer et interdit l’accès à la chambre froide', 'C2b', 'C2d'),
      act('La fuite ne pouvant pas être arrêtée sans entrer et la victime étant visible et proche : ouvre la porte en grand, retient sa respiration et dégage la victime vers la cuisine par les poignets ou les chevilles', 'C2e'),
      act('Examine : ne répond pas ; libère les voies aériennes et constate qu’elle respire', 'C3a', 'C3b'),
      act('Sachant que l’état vient du manque d’oxygène, sans chute ni choc, met la victime en PLS', 'C5a', 'C5b'),
      act('Fait alerter le 18 ou le 112 en précisant : fuite de fluide frigorigène dans une chambre froide, une victime qui ne répond pas et respire, sortie de la chambre froide', 'C4a'),
      act('Fait aérer la cuisine sans retourner dans la chambre froide', 'C2c'),
      act('Envoie quelqu’un accueillir les secours à l’entrée du collège', 'C4b'),
      act('Couvre la victime et surveille sa respiration en permanence jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le fluide frigorigène qui remplace l’air respirable dans un local fermé',
      situation: 'Lina travaille seule dans la chambre froide, porte presque fermée, pendant une recherche de fuite',
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
      act('Ne touche pas la victime tant que le courant n’est pas coupé et interdit à Amandine de la toucher', 'C2b', 'C2d'),
      act('Fait couper le courant à la coupure du groupe froid ou au tableau général', 'C2a', 'C2c'),
      act('Examine : ne répond pas, ne respire pas', 'C3a', 'C3b'),
      act('Fait alerter tout de suite le 15 ou le 112, puis l’accueil selon l’organisation des secours du magasin', 'C4a'),
      act('Fait apporter le défibrillateur de l’accueil', 'C5b'),
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
