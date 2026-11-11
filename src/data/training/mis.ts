// Cas d'entraînement – Monteur en installations sanitaires (plombier) : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-mis-01',
    title: 'Le lavabo qui éclate',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: ['mis'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Tu rénoves la salle de bains d’un appartement au 3e étage avec ton collègue Mathis. Il dévisse les fixations d’un vieux lavabo en céramique sans le tenir : le lavabo tombe et éclate sur le carrelage. Tu entends un cri : Mathis est assis par terre, il serre son avant-bras et le sang coule entre ses doigts jusqu’à faire une flaque. Des morceaux de céramique coupants sont éparpillés autour de lui et la cliente arrive en chaussons.',
    victime:
      'Assis par terre au milieu des éclats, se tient l’avant-bras, le sang coule beaucoup. Répond, a peur. Comprime lui-même si on le lui demande. Si on ne l’allonge pas, dit que la tête lui tourne. Le saignement s’arrête sous la compression (le formateur peut annoncer qu’il continue, pour faire poser un garrot).',
    temoin:
      'La cliente. Entre dans la pièce en chaussons et veut ramasser les morceaux à la main. Apporte un torchon propre, appelle les secours ou va ouvrir la porte de l’immeuble si le SST le lui demande.',
    materiel:
      'Morceaux de carton figurant les éclats, maquillage ou tissu rouge, gants jetables, torchon propre, bande ou garrot de formation, tapis, couverture, téléphone factice.',
    actions: [
      act('Arrête la cliente à la porte : lui interdit d’entrer en chaussons et de ramasser les éclats à la main', 'C2a', 'C2b', 'C2d'),
      act('Avec ses chaussures de sécurité, écarte du pied les gros éclats autour de la victime pour s’agenouiller sans se couper', 'C2c'),
      act('Constate le saignement abondant de l’avant-bras', 'C3a'),
      act('Fait comprimer la plaie par la victime ou comprime lui-même, main protégée (gant, sac plastique)', 'C5a', 'C5b'),
      act('Allonge la victime sur un endroit dégagé des éclats, sans relâcher la compression', 'C5b'),
      act('Fait alerter le 15 ou le 112 par la cliente : adresse, étage, plaie qui saigne beaucoup, compression en cours', 'C4a'),
      act('Si la compression est inefficace, pose un garrot au-dessus de la plaie et le laisse visible ; sinon, pansement compressif si besoin', 'C5b'),
      act('Fait ouvrir la porte de l’immeuble et guider les secours jusqu’au 3e étage', 'C4b'),
      act('Couvre, réconforte, surveille l’arrêt du saignement et l’état de la victime jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le lavabo en céramique, lourd, qui devient coupant en se cassant',
      situation: 'Mathis dévisse les fixations seul, sans soutenir le lavabo, en tee-shirt et sans gants',
      evenement: 'Le lavabo se décroche, tombe et éclate',
      dommage: 'Plaie profonde de l’avant-bras, saignement abondant',
      eviter:
        'Avant la dépose, soutenir ou caler le lavabo et travailler à deux ; protéger le sol avec une couverture pour amortir une chute ; gants anti-coupure et manches longues ; évacuer les débris dans un seau ou un sac épais.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-mis-02',
    title: 'Le casse-croûte dans le fourgon',
    geste: 'Étouffement (obstruction totale)',
    category: 'metier',
    tradeIds: ['mis'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Il est 9 h, c’est la pause casse-croûte. Tu manges avec Ethan et Lucie, l’apprentie, dans le fourgon de l’entreprise garé le long d’une rue passante, devant le chantier. Ethan, assis au volant, dévore un sandwich au saucisson en racontant une histoire. D’un coup, il ouvre sa portière côté rue et descend sur la chaussée, les mains à la gorge et la bouche grande ouverte : il ne tousse pas, aucun son ne sort, et les voitures passent tout près de lui.',
    victime:
      'Debout sur la chaussée, à côté de sa portière, mains à la gorge, bouche ouverte. Ne parle pas, ne tousse pas, ne respire pas ; fait oui de la tête si on lui demande s’il s’étouffe. Se laisse guider sur le trottoir. Les 5 claques ne suffisent pas ; à la deuxième compression abdominale, il recrache le morceau, tousse et respire à nouveau.',
    temoin:
      'Lucie, l’apprentie. Veut lui faire boire sa bouteille d’eau et lui tape dans le dos alors qu’il est bien droit. S’arrête si le SST le lui dit et appelle le 15 si on le lui demande.',
    materiel:
      'Ruban au sol pour la chaussée et le trottoir, deux chaises figurant le fourgon, emballage de sandwich, bouteille d’eau, téléphone factice. Claques et compressions mimées : mains bien placées, geste retenu.',
    actions: [
      act('Descend côté trottoir, regarde la circulation avant de passer côté rue et ramène aussitôt Ethan sur le trottoir, à l’abri des voitures', 'C2a', 'C2b', 'C2e'),
      act('Demande « Tu t’étouffes ? » et constate l’obstruction totale : il ne parle pas, ne tousse pas, ne respire pas', 'C3a', 'C3b'),
      act('Fait appeler le 15 par Lucie pendant les claques et les compressions', 'C4a'),
      act('Refuse qu’on lui donne à boire et qu’on lui tape dans le dos quand il est droit', 'C5b'),
      act('Le penche en avant et donne 1 à 5 claques vigoureuses dans le dos, entre les omoplates', 'C5a', 'C5b'),
      act('Les claques étant inefficaces, enchaîne 1 à 5 compressions abdominales, mains bien placées, en alternance avec les claques si besoin', 'C5b'),
      act('Arrête dès que le morceau sort et l’installe dans la position où il se sent le mieux', 'C5b'),
      act('Fait dire au 15 que des compressions abdominales ont été faites et suit ses conseils', 'C4a'),
      act('Réconforte, couvre et surveille sa respiration jusqu’à l’avis du médecin ou l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le morceau de sandwich avalé de travers (et la circulation dans la rue)',
      situation: 'Ethan mange vite, en parlant, dans un fourgon garé le long d’une rue passante',
      evenement: 'Un morceau part dans les voies aériennes ; il sort côté rue sans regarder',
      dommage: 'Obstruction totale des voies aériennes, risque d’être renversé par une voiture',
      eviter:
        'Faire la pause dans un local ou une base vie plutôt que dans le fourgon au bord de la rue, descendre toujours côté trottoir ; manger assis, lentement, en petites bouchées, sans parler la bouche pleine ; prévoir un vrai temps de pause.',
      remonter: 'Chef d’équipe ou chef d’entreprise (organisation des pauses sur les chantiers).',
    },
  }),
  makeCase({
    id: 'ent-mis-03',
    title: 'La colle PVC dans le vide sanitaire',
    geste: 'Malaise (intoxication par des vapeurs de solvant)',
    category: 'metier',
    tradeIds: ['mis'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une maison neuve, ta collègue Léa colle depuis une heure les évacuations en PVC dans le vide sanitaire, un espace bas et mal aéré sous le plancher. Elle ressort par la trappe, s’assoit à côté, toute pâle, et te dit qu’elle a très mal à la tête, que tout tourne et qu’elle a envie de vomir. Le pot de colle est resté ouvert au bord de la trappe et l’odeur de solvant est forte. Le carreleur, qui travaille dans la pièce, sort son briquet pour allumer une cigarette.',
    victime:
      'Assise au bord de la trappe, pâle, maux de tête, vertiges, nausées. Répond aux questions : a collé une heure dans le vide sanitaire, sans ventilation ni masque ; ça a commencé il y a dix minutes ; pas de maladie connue, pas de traitement, a pris son petit déjeuner. Marche si on l’aide. Va un peu mieux au repos, à l’air frais, mais a toujours mal à la tête.',
    temoin:
      'Le carreleur. Veut allumer sa cigarette et dit : « Elle a juste besoin d’une pause, elle finira après. » Range son briquet, ouvre les fenêtres et appelle les secours si le SST le lui demande.',
    materiel:
      'Carton ou tapis figurant la trappe, pot de colle vide et fermé (étiquette « inflammable »), briquet factice ou crayon, chaise, couverture, téléphone factice.',
    actions: [
      act('Repère les vapeurs de solvant, nocives et inflammables, et interdit au carreleur d’allumer sa cigarette', 'C2a', 'C2b'),
      act('Fait fermer le pot de colle et ouvrir portes et fenêtres', 'C2c'),
      act('Interdit à quiconque de redescendre dans le vide sanitaire', 'C2d'),
      act('Installe la victime au repos à l’air frais, loin de la trappe, dans la position où elle se sent le mieux', 'C5a', 'C5b'),
      act('Observe les signes : pâleur, maux de tête, vertiges, nausées', 'C3a'),
      act('Questionne : depuis quand, temps passé dans le vide sanitaire, produit utilisé, maladie ou traitement', 'C3b'),
      act('Appelle ou fait appeler le 15 et transmet les signes et le nom du produit lu sur le pot', 'C4a'),
      act('Applique les consignes du médecin et garde le pot (ou la fiche de données de sécurité) pour les secours', 'C5b'),
      act('Surveille, ne la laisse ni seule ni retourner travailler, prêt à agir si elle perd connaissance', 'C5c'),
    ],
    prevention: {
      danger: 'Les vapeurs de solvant de la colle PVC, nocives et inflammables',
      situation: 'Léa colle pendant une heure dans un vide sanitaire bas, fermé et non ventilé',
      evenement: 'Les vapeurs s’accumulent et elle les respire',
      dommage: 'Malaise par intoxication (maux de tête, vertiges, nausées)',
      eviter:
        'Choisir des raccords à joint, sans colle, ou préparer et coller les assemblages hors du vide sanitaire ; sinon, ventiler le vide sanitaire (ventilateur ou extracteur), refermer le pot entre deux collages, aucune flamme ni cigarette à proximité, ne pas travailler seul dans un espace confiné ; protection respiratoire adaptée selon la fiche de données de sécurité.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-mis-04',
    title: 'Le chauffe-eau resté sous tension',
    geste: 'Brûlure électrique',
    category: 'metier',
    tradeIds: ['mis'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Tu remplaces un vieux chauffe-eau électrique dans le cellier d’une maison avec Inès, l’autre apprentie. Elle a coupé au tableau un disjoncteur sans étiquette, en pensant que c’était le bon. Quand elle desserre les fils avec son tournevis, il y a un flash et un claquement : elle crie et recule en se tenant la main. Le capot du chauffe-eau est ouvert, les fils sont toujours branchés, et le client arrive en demandant ce qui se passe.',
    victime:
      'Debout, consciente, respire normalement. Se tient la main droite : paume et bout des doigts brûlés, avec des traces noires. Dit que son bras fourmille et que « ce n’est rien, je finis le branchement ».',
    temoin:
      'Le client. Veut toucher les fils « pour voir s’il y a encore du courant » et dit qu’il n’y a pas besoin d’appeler pour une si petite brûlure. Sait où est le tableau et coupe le disjoncteur général si le SST le lui demande.',
    materiel:
      'Carton figurant le chauffe-eau avec deux fils, feuille figurant le tableau électrique, tournevis, maquillage, bassine et bouteilles d’eau, chaise, couverture, téléphone factice.',
    actions: [
      act('Repère les fils restés sous tension et interdit à quiconque de toucher le chauffe-eau', 'C2a', 'C2b', 'C2d'),
      act('Fait couper le courant au disjoncteur général du tableau avant tout contact avec l’installation', 'C2c'),
      act('Examine : elle répond, respire, se plaint d’une brûlure à la main', 'C3a', 'C3b'),
      act('Arrose aussitôt la main à l’eau courante tempérée pendant au moins 10 minutes (idéalement 20), victime assise', 'C5a', 'C5b'),
      act('Considère la brûlure électrique comme toujours grave, même si elle paraît petite', 'C5a'),
      act('Fait alerter le 15 : brûlure électrique par contact avec le 230 V, victime consciente, arrosage en cours', 'C4a'),
      act('Applique les consignes du médecin et refuse qu’elle reprenne le travail', 'C5b'),
      act('Couvre, réconforte et surveille son état (conscience, respiration) jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique (230 V) dans les fils du chauffe-eau',
      situation: 'Inès intervient sur le chauffe-eau sans avoir vérifié l’absence de tension',
      evenement: 'Le tournevis touche une borne restée sous tension',
      dommage: 'Électrisation et brûlure électrique de la main',
      eviter:
        'Travailler hors tension : couper le bon disjoncteur (ou le général), le condamner et vérifier l’absence de tension avec un appareil adapté ; habilitation électrique adaptée à la tâche ; demander au client de faire repérer son tableau ; outils isolés en complément.',
      remonter: 'Chef d’entreprise, et le client pour le tableau non repéré.',
    },
  }),
  makeCase({
    id: 'ent-mis-05',
    title: 'La carotteuse qui se bloque',
    geste: 'Traumatisme du poignet',
    category: 'metier',
    tradeIds: ['mis'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Au sous-sol d’un immeuble en construction, ton collègue Hugo perce un mur en béton à la carotteuse pour passer une évacuation. Il tient la machine à la main, sans support. Tu entends un claquement : la couronne s’est bloquée, la machine a tourné d’un coup et lui a tordu le poignet. Hugo est assis contre le mur et crie ; la carotteuse est par terre, toujours branchée, dans l’eau de refroidissement qui coule sur le sol. Un électricien du chantier arrive.',
    victime:
      'Assis contre le mur, tient son avant-bras droit contre son ventre avec l’autre main. Poignet gonflé et déformé, très douloureux, ne peut plus bouger la main. Répond normalement, respire. N’est pas tombé, ne s’est pas cogné la tête.',
    temoin:
      'L’électricien. Veut « remettre le poignet dans l’axe » en tirant dessus, puis propose d’emmener Hugo aux urgences dans sa voiture. Débranche la rallonge, appelle les secours ou va les accueillir si le SST le lui demande.',
    materiel:
      'Perceuse ou carton figurant la carotteuse, rallonge, serpillière figurant l’eau au sol, chaise ou mur, couverture, téléphone factice.',
    actions: [
      act('Repère la machine branchée dans l’eau et ne marche pas dans la flaque tant qu’elle est branchée', 'C2a', 'C2b'),
      act('Débranche ou fait débrancher la rallonge à la prise, hors de l’eau, puis ferme l’arrivée d’eau de la carotteuse', 'C2c'),
      act('Examine : répond, respire, se plaint du poignet, ne peut plus bouger la main', 'C3a', 'C3b'),
      act('Lui demande de ne pas bouger le bras et respecte la position qu’il a prise', 'C5a', 'C5b'),
      act('Refuse qu’on tire sur le poignet pour le remettre en place', 'C5b'),
      act('Appelle ou fait appeler le 15 (lieu, niveau du sous-sol, poignet déformé) et applique ses consignes, sans transport en voiture de sa propre initiative', 'C4a'),
      act('Fait guider les secours depuis l’entrée du chantier jusqu’au sous-sol', 'C4b'),
      act('Couvre, réconforte et surveille jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'La carotteuse, dont la couronne peut se bloquer et faire tourner la machine avec force',
      situation: 'Hugo carotte à main levée, sans support, dans un mur en béton armé',
      evenement: 'La couronne se bloque dans une armature, la machine tourne d’un coup',
      dommage: 'Traumatisme du poignet (entorse ou fracture)',
      eviter:
        'Prévoir les réservations (fourreaux) avant le coulage du béton pour ne pas avoir à carotter ; sinon, carotteuse fixée sur un support au mur, armatures repérées avant de percer, machine avec embrayage de sécurité et poignée latérale bien tenue, alimentation protégée par un différentiel et récupération de l’eau ; formation à l’utilisation de la machine.',
      remonter: 'Chef de chantier ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-mis-06',
    title: 'Le cutter vers soi',
    geste: 'Plaie grave de l’abdomen',
    category: 'metier',
    tradeIds: ['mis'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Le matin, au dépôt de l’entreprise, tu prépares le matériel de la journée avec Bilal. Il coupe au cutter le film d’une palette de receveurs de douche, en tirant la lame vers lui. La lame dérape et lui entre dans le ventre : il recule, plié en deux, et une tache de sang s’étale sur son tee-shirt. Le cutter, lame sortie, est tombé par terre, et le cariste arrive en marche arrière avec le chariot élévateur pour prendre la palette.',
    victime:
      'Debout, plié en deux, se tient le ventre. Plaie de 2 à 3 cm au-dessus du nombril, qui saigne peu. Répond, a peur, respire normalement. Dit qu’il va prendre sa voiture pour aller aux urgences.',
    temoin:
      'Le cariste. Recule sans regarder, puis veut conduire lui-même Bilal aux urgences. S’arrête, coupe le moteur, appelle les secours ou va ouvrir le portail si le SST le lui demande.',
    materiel:
      'Tapis, maquillage, cutter sans lame ou crayon, ruban pour la zone de circulation du chariot, couverture, téléphone factice.',
    actions: [
      act('Crie au cariste de s’arrêter et lui fait couper le moteur du chariot élévateur', 'C2a', 'C2b', 'C2c'),
      act('Rentre la lame du cutter et le met de côté', 'C2c'),
      act('Examine : répond, respire, plaie du ventre qui ne saigne pas abondamment', 'C3a', 'C3b'),
      act('Identifie une plaie grave par sa localisation (abdomen)', 'C5a'),
      act('Allonge la victime à plat dos, jambes fléchies', 'C5b'),
      act('Refuse qu’il conduise ou qu’on l’emmène en voiture', 'C5b'),
      act('Appelle ou fait appeler le 15 : plaie au ventre par un cutter, victime consciente et allongée', 'C4a'),
      act('Fait ouvrir le portail du dépôt et guider les secours', 'C4b'),
      act('Couvre, réconforte et surveille son état jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'La lame du cutter',
      situation: 'Bilal coupe le film de la palette en tirant la lame vers son ventre',
      evenement: 'La lame dérape',
      dommage: 'Plaie de l’abdomen',
      eviter:
        'Couteau de sécurité à lame rétractable automatique ou coupe-film à lame cachée ; toujours couper en éloignant la lame du corps ; zone de préparation séparée de la circulation des chariots ; gants anti-coupure.',
      remonter: 'Responsable du dépôt ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-mis-07',
    title: 'La trappe de la cave',
    geste: 'Ne répond pas, respire (chute : traumatisme)',
    category: 'metier',
    tradeIds: ['mis'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une vieille maison, Chloé et toi remplacez la conduite d’eau qui passe dans la cave. On y descend par une trappe dans le sol de la cuisine et une échelle raide. Chloé remonte avec un tube à la main, rate un barreau et tombe en arrière d’environ deux mètres : sa tête heurte le sol. En bas, elle est allongée sur le dos et ne bouge plus. La trappe est grande ouverte et les deux jeunes enfants de la cliente courent dans la cuisine.',
    victime:
      'Allongée sur le dos au pied de l’échelle. Origine TRAUMATIQUE (chute avec choc à la tête) : on la laisse sur le dos. Ne répond pas, ne réagit pas quand on lui parle ou qu’on lui demande de serrer la main, respire normalement. Ne bouge pas jusqu’à l’arrivée des secours.',
    temoin:
      'La cliente. Veut descendre vite par l’échelle, propose de « la remonter dans la cuisine » ou de lui glisser un coussin sous la tête. Met les enfants dans une autre pièce, appelle les secours et va ouvrir la porte aux secours si le SST le lui demande.',
    materiel:
      'Tapis figurant le sol de la cave, ruban autour de la trappe, chaise ou escabeau figurant l’échelle, tube PVC, coussin, couverture, téléphone factice.',
    actions: [
      act('Fait mettre les enfants dans une autre pièce, porte fermée, et entoure la trappe (chaises, ruban) pour que personne ne tombe à son tour', 'C2a', 'C2b', 'C2d'),
      act('Allume la lumière de la cave et descend prudemment par l’échelle, sans se précipiter ; demande à la cliente de rester en haut', 'C2a'),
      act('Examine : ne répond pas ; libère les voies aériennes (bascule prudente de la tête, menton élevé) et vérifie qu’elle respire', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 par la cliente : chute de deux mètres dans une cave, choc à la tête, victime qui ne répond pas mais respire', 'C4a'),
      act('Laisse la victime sur le dos (origine traumatique : pas de PLS) et lui maintient la tête à deux mains en gardant les voies aériennes libres', 'C5a', 'C5b'),
      act('Refuse qu’on la remonte ou qu’on lui mette un coussin sous la tête', 'C5b'),
      act('Fait ouvrir la porte de la maison et guider les secours jusqu’à la trappe', 'C4b'),
      act('Couvre et surveille en permanence la respiration jusqu’à la prise en charge par les secours ; si elle s’arrête, commence la réanimation', 'C5c'),
    ],
    prevention: {
      danger: 'La trappe ouverte et l’échelle raide (chute de hauteur)',
      situation: 'Chloé remonte l’échelle avec un tube dans une main, sans se tenir des deux mains',
      evenement: 'Elle rate un barreau et tombe en arrière',
      dommage: 'Traumatisme de la tête, perte de connaissance',
      eviter:
        'Faire passer le matériel de main en main ou avec une corde au lieu de monter chargé ; garder les deux mains pour l’échelle ; éclairer l’accès ; entourer la trappe ouverte d’une barrière ou la refermer ; tenir les enfants hors de la cuisine pendant les travaux.',
      remonter: 'Chef d’équipe ou chef d’entreprise, et la cliente pour la trappe.',
    },
  }),
  makeCase({
    id: 'ent-mis-08',
    title: 'Brasage dans les toilettes de l’école',
    geste: 'Ne répond pas, ne respire pas (arrêt cardiaque)',
    category: 'metier',
    tradeIds: ['mis'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Pendant les vacances, tu refais les sanitaires d’une école avec Didier, ton tuteur, 59 ans. Il brase un raccord en cuivre au chalumeau pendant que tu vas chercher des tubes au camion. À ton retour, Didier est allongé sur le dos au milieu des toilettes, immobile. Le chalumeau, toujours allumé, est par terre, la flamme contre les cartons des lavabos neufs, qui commencent à noircir. Le gardien de l’école arrive derrière toi ; un défibrillateur est accroché à l’entrée de l’école.',
    victime: 'Mannequin sur le dos, à côté du chalumeau. Ne répond pas, ne respire pas, jusqu’à l’arrivée des secours.',
    temoin:
      'Le gardien de l’école. Veut d’abord secouer Didier et lui jeter de l’eau au visage. Sait où est le défibrillateur ; appelle les secours avec son portable, va chercher le défibrillateur puis ouvre le portail aux secours si le SST le lui demande.',
    materiel:
      'Mannequin, défibrillateur de formation, bouteille de gaz et chalumeau factices (ou carton), cartons d’emballage, téléphone factice.',
    actions: [
      act('Repère la flamme du chalumeau contre les cartons, près de la victime', 'C2a', 'C2b'),
      act('Ferme le robinet du chalumeau ou de la bouteille pour éteindre la flamme, puis écarte les cartons', 'C2c'),
      act('Examine : ne répond pas ; libère les voies aériennes, ne respire pas', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 par le gardien : lieu exact dans l’école, homme qui ne répond pas et ne respire pas, réanimation en cours', 'C4a'),
      act('Lui fait apporter le défibrillateur de l’école', 'C5b'),
      act('Débute aussitôt les compressions thoraciques : cycles de 30 compressions et 2 insufflations, 100 à 120 par minute (compressions seules en continu s’il ne peut pas insuffler)', 'C5a', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée et suit ses instructions, en interrompant le moins possible les compressions', 'C5b'),
      act('Fait ouvrir le portail de l’école et guider les secours jusqu’aux toilettes', 'C4b'),
      act('Poursuit la réanimation jusqu’à la prise en charge par les secours', 'C5c'),
    ],
    prevention: {
      danger: 'La flamme du chalumeau près de matériaux qui brûlent (cartons d’emballage)',
      situation: 'Didier brase seul, les cartons des lavabos posés juste à côté de lui',
      evenement: 'Didier s’effondre et le chalumeau allumé tombe contre les cartons',
      dommage: 'Risque d’incendie et de brûlures pour la victime et le sauveteur (l’arrêt cardiaque, lui, n’est pas causé par le travail : point à discuter)',
      eviter:
        'Sertir les raccords au lieu de les braser quand c’est possible (plus de flamme) ; sinon, sortir les cartons et matériaux combustibles avant de braser, écran ou couverture anti-feu, chalumeau qui s’éteint dès qu’on relâche la gâchette, extincteur à portée de main, permis de feu établi avec l’école, ne jamais laisser une flamme sans surveillance. Repérer le défibrillateur en arrivant sur un chantier.',
      remonter: 'Chef d’entreprise, et le responsable de l’école (permis de feu).',
    },
  }),
];
