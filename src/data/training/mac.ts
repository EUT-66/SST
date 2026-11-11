// Cas d'entraînement – Maçon : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-mac-01',
    title: 'Coupe de briques à la scie sur table',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: ['macon'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur le chantier d’une maison individuelle, Léna, apprentie, coupe des briques à la scie sur table pour finir un pignon. La brique bascule, sa main glisse et le disque lui entaille l’avant-bras. Quand tu arrives, elle est debout à côté de la scie qui tourne toujours, le sang coule abondamment de son bras et forme une flaque par terre. Damien, son collègue, est là, figé.',
    victime:
      'Debout près de la scie, se tient l’avant-bras gauche. Le sang coule abondamment entre ses doigts. Consciente, répond, a peur, se sent un peu faible. Se laisse allonger. Si la compression est bien faite, le saignement s’arrête.',
    temoin:
      'Damien, collègue maçon. Reste figé, puis veut passer le bras de Léna sous l’eau du bac de la scie. Si le SST le lui demande, arrête la scie et la débranche, apporte la trousse de secours, appelle les secours et va les attendre à l’entrée du chantier.',
    materiel:
      'Table ou caisse figurant la scie, une brique, tissu rouge pour le sang, gants jetables ou sac plastique, linge propre ou pansement compressif, garrot de formation, tapis, couverture, téléphone factice.',
    actions: [
      act('Fait arrêter la scie (arrêt d’urgence) et la fait débrancher avant d’approcher', 'C2a', 'C2c'),
      act('Repère le saignement abondant', 'C3a'),
      act('Comprime immédiatement l’endroit qui saigne avec la paume de la main, protégée si possible (gant, sac plastique)', 'C5a', 'C5b'),
      act('Allonge la victime sans relâcher la compression', 'C5b'),
      act('Fait alerter le 15 ou le 112 : adresse du chantier, plaie de l’avant-bras par une scie, saignement abondant, compression en cours', 'C4a'),
      act('Fait attendre les secours à l’entrée du chantier pour les guider', 'C4b'),
      act('Relaie par un pansement compressif si besoin ; pose un garrot si la compression est inefficace ou si le saignement reprend malgré le pansement', 'C5b'),
      act('Couvre, réconforte et surveille le saignement et l’état de la victime jusqu’à la prise en charge', 'C5c'),
    ],
    prevention: {
      danger: 'Le disque en rotation de la scie sur table',
      situation: 'Léna pousse la brique à la main, les doigts et l’avant-bras près du disque',
      evenement: 'La brique bascule et sa main glisse vers le disque',
      dommage: 'Plaie profonde de l’avant-bras avec saignement abondant',
      eviter:
        'Prévoir au calepinage des briques de complément (demi-briques, briques d’angle) pour limiter les coupes ; sinon scie équipée de son protège-disque et d’un chariot pour pousser la brique, posée de niveau sur un sol stable ; gants adaptés, lunettes, protections auditives ; formation à l’utilisation de la scie.',
      remonter: 'Chef de chantier, qui fait vérifier la scie (protège-disque, chariot, arrêt d’urgence).',
    },
  }),
  makeCase({
    id: 'ent-mac-02',
    title: 'Le casse-croûte de 9 heures',
    geste: 'Étouffement (obstruction totale)',
    category: 'metier',
    tradeIds: ['macon'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      '9 heures, pause casse-croûte dans le bungalow du chantier d’un petit immeuble. Malik mange un sandwich en discutant avec l’équipe. D’un coup, il se lève, porte les mains à sa gorge, la bouche grande ouverte : il ne tousse pas et aucun son ne sort. Les autres rigolent, ils croient qu’il fait le clown.',
    victime:
      'Debout, mains à la gorge, bouche ouverte. Ne peut ni parler, ni tousser, ni respirer ; fait « oui » de la tête si on lui demande s’il s’étouffe. Les 5 claques dans le dos ne suffisent pas ; à la 2e compression abdominale, il « recrache » le morceau, tousse et reparle.',
    temoin:
      'Sarah, apprentie maçonne. Rigole d’abord, puis veut lui faire boire un verre d’eau. Si le SST le lui demande, appelle le 15 et lui passe le téléphone quand Malik respire à nouveau.',
    materiel:
      'Table et chaises, sandwich ou emballage, gobelet, téléphone factice. Claques et compressions mimées : mains bien placées, geste retenu.',
    actions: [
      act('Vérifie qu’il n’y a pas de danger persistant et dégage l’espace autour de la victime (chaises, table)', 'C2a'),
      act('Demande « Tu t’étouffes ? » et reconnaît l’obstruction totale : ne parle pas, ne tousse pas, aucun son', 'C3a', 'C3b'),
      act('Fait alerter le 15 par Sarah sans retarder les gestes de secours', 'C4a'),
      act('Empêche qu’on lui donne à boire', 'C5b'),
      act('Penche la victime en avant et donne 1 à 5 claques vigoureuses dans le dos, entre les omoplates, avec le talon de la main', 'C5a', 'C5b'),
      act('Claques inefficaces : se place derrière la victime et donne 1 à 5 compressions abdominales, puis alterne claques et compressions', 'C5a', 'C5b'),
      act('Une fois l’obstruction levée, l’installe dans la position où il se sent le mieux et signale au médecin du 15 les compressions abdominales réalisées', 'C4a', 'C5b'),
      act('Réconforte, suit les conseils du médecin et surveille la respiration jusqu’à la prise en charge', 'C5c'),
    ],
    prevention: {
      danger: 'Le morceau de nourriture',
      situation: 'Malik mange vite, de grosses bouchées, en parlant et en riant',
      evenement: 'Un morceau part dans les voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque d’arrêt cardiaque',
      eviter:
        'Vraie pause, assis, sans se presser : petites bouchées, ne pas parler la bouche pleine. Côté entreprise : temps de pause suffisant sur le planning, base vie équipée de tables et de chaises. Rappeler les gestes à toute l’équipe.',
      remonter: 'Chef de chantier, même si tout s’est bien terminé : c’est arrivé sur le chantier, pendant la journée de travail.',
    },
  }),
  makeCase({
    id: 'ent-mac-03',
    title: 'Coup de chaleur au coulage de la dalle',
    geste: 'Malaise dû à la chaleur',
    category: 'metier',
    tradeIds: ['macon'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Mi-juillet, 15 heures, en plein soleil : ton équipe coule la dalle du garage d’une maison à la pompe à béton. Romain tire le béton à la règle depuis une heure sans boire ; il s’arrête, chancelle et s’assoit dans le béton frais. Le flexible de la pompe continue de déverser du béton à côté de lui, et le pompiste, sa télécommande à la main, regarde ailleurs. Patrick, le chef d’équipe, s’approche.',
    victime:
      'Assis dans le béton frais, rouge, en sueur. Dit qu’il a mal à la tête, que tout tourne et qu’il a envie de vomir. Répond, un peu lentement. N’a pas bu depuis midi, pas de maladie connue, pas de traitement. Peut marcher en étant soutenu. Va un peu mieux à l’ombre, au frais.',
    temoin:
      'Patrick, le chef d’équipe. Veut que Romain finisse de régler la dalle « avant que le béton tire » et lui tend une canette de soda. Si le SST le lui demande, fait arrêter la pompe, appelle les secours et va chercher de l’eau fraîche.',
    materiel:
      'Tapis figurant la dalle, règle de maçon ou tasseau, tuyau ou carton pour le flexible, chaise à l’ombre, bouteille d’eau, linge mouillé, téléphone factice.',
    actions: [
      act('Fait arrêter le pompage (signe au pompiste) avant d’approcher du flexible', 'C2a', 'C2c'),
      act('Aide la victime à sortir du béton frais et l’installe au repos à l’ombre, dans un endroit frais et aéré', 'C5a', 'C5b'),
      act('Observe les signes : peau rouge, sueurs, maux de tête, vertiges, nausées, réponses lentes', 'C3a'),
      act('Questionne la victime et le chef d’équipe : depuis quand, a-t-il bu, maladie, traitement, déjà arrivé', 'C3b'),
      act('Fait alerter le 15, transmet les signes et les réponses au médecin et suit ses conseils', 'C4a'),
      act('Rafraîchit la victime : retire le casque et les vêtements pleins de béton, rince à l’eau la peau souillée, mouille la peau', 'C5b'),
      act('Lui fait boire de l’eau fraîche par petites quantités, puisqu’il est conscient et capable de boire', 'C5b'),
      act('Surveille l’évolution (réponses, respiration), prêt à agir s’il perd connaissance, jusqu’à la prise en charge', 'C5c'),
    ],
    prevention: {
      danger: 'La forte chaleur et le soleil',
      situation: 'Romain fait un effort physique intense en plein soleil, sans boire',
      evenement: 'Son corps n’arrive plus à évacuer la chaleur',
      dommage: 'Malaise dû à la chaleur (coup de chaleur), risque de perte de connaissance',
      eviter:
        'Couler tôt le matin en période de forte chaleur ; rotations et pauses à l’ombre ; eau fraîche à disposition au pied de la dalle, boire souvent sans attendre la soif ; casque avec couvre-nuque, vêtements légers et couvrants ; ne jamais rester seul, surveillance entre collègues.',
      remonter: 'Chef de chantier, pour adapter les horaires et l’organisation du coulage par forte chaleur.',
    },
  }),
  makeCase({
    id: 'ent-mac-04',
    title: 'Le plein de la découpeuse',
    geste: 'Brûlure thermique grave',
    category: 'metier',
    tradeIds: ['macon'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur le chantier d’une terrasse devant une maison, Jordan refait le plein de la découpeuse thermique juste après avoir coupé des bordures, moteur encore brûlant. L’essence déborde sur le pot d’échappement et s’enflamme ; la manche de son sweat prend feu. Quand tu arrives, Kylian vient d’étouffer les flammes avec sa veste, Jordan hurle en se tenant le bras, et une flaque d’essence brûle encore au sol, à côté du jerrican ouvert.',
    victime:
      'Debout, se tient l’avant-bras droit : peau rouge, grosses cloques sur l’avant-bras et le dos de la main. Conscient, répond, très douloureux. La manche du sweat est brûlée et un morceau de tissu colle à la peau près du poignet. Porte une montre.',
    temoin:
      'Kylian, collègue. Veut arracher le tissu collé et aller chercher de la glace dans la glacière. Si le SST le lui demande, éteint la flaque avec l’extincteur du camion, appelle les secours et va les attendre devant la maison.',
    materiel:
      'Caisse figurant la découpeuse, jerrican vide, tissu orange au sol pour les flammes, extincteur de formation ou factice, bouteilles d’eau et bassine (ou tuyau), montre, couverture, téléphone factice.',
    actions: [
      act('Repère le feu qui persiste (flaque d’essence, jerrican ouvert) et éloigne la victime et le témoin de la flaque', 'C2a', 'C2b'),
      act('Fait éteindre la flaque à l’extincteur sans prendre de risque ; si le feu ne peut pas être maîtrisé, fait éloigner tout le monde et interdit l’accès', 'C2c', 'C2d'),
      act('Examine : répond, se plaint d’une brûlure étendue de l’avant-bras et de la main, avec cloques', 'C3a'),
      act('Arrose immédiatement la brûlure à l’eau courante tempérée pendant au moins 10 minutes (idéalement 20)', 'C5a', 'C5b'),
      act('En même temps, retire la montre et les vêtements qui n’adhèrent pas à la peau ; laisse le tissu collé', 'C5b'),
      act('Refuse la glace et tout produit sur la brûlure', 'C5b'),
      act('Fait alerter le 15 pendant l’arrosage : brûlure grave par essence enflammée, avant-bras et main, arrosage en cours', 'C4a'),
      act('Après l’arrosage, couvre la victime, la réconforte et surveille son état jusqu’à la prise en charge', 'C5c'),
    ],
    prevention: {
      danger: 'L’essence, très inflammable, près du moteur chaud',
      situation: 'Jordan fait le plein de la découpeuse juste après l’avoir utilisée, moteur brûlant',
      evenement: 'L’essence déborde sur le pot d’échappement et s’enflamme',
      dommage: 'Brûlure thermique grave de l’avant-bras et de la main',
      eviter:
        'Découpeuse électrique ou à batterie quand c’est possible ; sinon laisser refroidir le moteur avant le plein, le faire à l’écart, avec un bidon à bec verseur, jamais près d’une flamme ou d’une cigarette ; extincteur à portée de main ; vêtements de travail couvrants, en coton plutôt qu’en matière synthétique qui fond sur la peau ; rappel de ces règles à l’équipe.',
      remonter: 'Chef de chantier ou chef d’entreprise ; faire remplacer ou recharger l’extincteur utilisé.',
    },
  }),
  makeCase({
    id: 'ent-mac-05',
    title: 'Chute dans la tranchée des fondations',
    geste: 'Traumatisme du dos (doute sur le cou)',
    category: 'metier',
    tradeIds: ['macon'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur le terrain d’une future maison, les tranchées des fondations viennent d’être creusées, environ 1 mètre de profondeur. En guidant à reculons le camion de gravier, Inès tombe dans la tranchée et reste allongée au fond, sur le dos. Le camion est arrêté tout près du bord, moteur en marche, et la terre commence à s’effriter sous ses roues. Le chauffeur descend de sa cabine.',
    victime:
      'Allongée sur le dos au fond de la tranchée. Répond, a très mal au bas du dos, n’ose pas bouger. A heurté la paroi avec la tête en tombant et ne sait pas trop si elle a mal au cou. Bouge les mains et les pieds si on le lui demande. Veut se relever toute seule.',
    temoin:
      'Le chauffeur du camion. Veut la sortir tout de suite en la tirant par les bras « pour la mettre à plat sur le terrain ». Si le SST le lui demande, avance le camion loin du bord, coupe le moteur, appelle les secours et va les guider depuis la route.',
    materiel:
      'Deux bancs ou un ruban au sol pour figurer la tranchée, tapis, casque, gilet haute visibilité, couverture, téléphone factice.',
    actions: [
      act('Fait avancer le camion loin du bord et couper le moteur, puis écarte tout le monde des bords de la tranchée', 'C2a', 'C2c', 'C2d'),
      act('Rejoint la victime par un endroit stable, sans faire tomber de terre sur elle', 'C2a'),
      act('Examine : pas de saignement abondant, répond, douleur au bas du dos, choc à la tête', 'C3a', 'C3b'),
      act('Lui demande de ne pas bouger et empêche qu’on la sorte de la tranchée', 'C5a', 'C5b'),
      act('Doute sur le cou (choc à la tête) : maintient la tête à deux mains, dans la position où elle se trouve', 'C5b'),
      act('Fait alerter le 18 ou le 112 : chute dans une tranchée d’un mètre, douleur au dos, choc à la tête, victime consciente', 'C4a'),
      act('Fait guider les secours depuis la route jusqu’à la tranchée', 'C4b'),
      act('Fait couvrir la victime, la réconforte et surveille ses réponses et sa respiration jusqu’à la prise en charge', 'C5c'),
    ],
    prevention: {
      danger: 'La tranchée ouverte (vide d’environ 1 mètre)',
      situation: 'Inès marche à reculons au bord de la tranchée en guidant le camion',
      evenement: 'Elle ne voit pas le bord et tombe dans la tranchée',
      dommage: 'Traumatisme du dos, choc à la tête',
      eviter:
        'Faire livrer sur une aire de stockage éloignée des fouilles ; protéger les bords des tranchées (barrières, garde-corps) et tenir les camions à distance des bords ; plan de circulation du chantier ; guider sur le côté, visible du chauffeur, sans jamais marcher à reculons ; gilet haute visibilité ; information de l’équipe.',
      remonter: 'Chef de chantier, pour revoir la protection des fouilles et le plan de circulation.',
    },
  }),
  makeCase({
    id: 'ent-mac-06',
    title: 'Chute sur les fers en attente',
    geste: 'Plaie grave de l’abdomen',
    category: 'metier',
    tradeIds: ['macon'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur la dalle du premier étage d’un petit immeuble, Baptiste porte un panneau de coffrage qui lui cache la vue. Il trébuche sur un rouleau de treillis soudé et tombe en avant sur les fers en attente d’un poteau, qui n’ont pas de capuchons. Quand tu arrives, il est assis par terre, plié en deux, les mains sur le ventre, le tee-shirt déchiré et taché de sang. Tout autour, d’autres fers en attente dépassent sans protection.',
    victime:
      'Assis par terre, se tient le ventre côté droit. Plaie au ventre qui saigne un peu, mais pas abondamment. Répond, a mal, a peur. Veut descendre « tout seul » jusqu’à la camionnette et demande à boire.',
    temoin:
      'Océane, ferrailleuse. Veut l’aider à se relever pour descendre l’escalier et lui tend sa bouteille d’eau. Si le SST le lui demande, pose des capuchons sur les fers, appelle les secours et va les attendre en bas pour les guider jusqu’à l’étage.',
    materiel:
      'Tapis, quelques manches à balai ou tubes en carton pour les fers en attente, bouchons ou gobelets pour les capuchons, tee-shirt taché de rouge, sac ou coussin pour caler les jambes, couverture, téléphone factice.',
    actions: [
      act('Repère les fers en attente non protégés autour de la victime et fait poser des capuchons ou couvrir les fers', 'C2a', 'C2c'),
      act('Examine : répond, plaie à l’abdomen qui ne saigne pas abondamment', 'C3a', 'C3b'),
      act('Allonge la victime à plat dos, jambes fléchies, et lui cale les jambes', 'C5a', 'C5b'),
      act('Ne touche pas à la plaie et ne retire rien de ce qui pourrait s’y trouver', 'C5b'),
      act('L’empêche de se lever et de marcher, et ne lui donne pas à boire', 'C5b'),
      act('Fait alerter le 15 : chute sur des fers à béton, plaie au ventre, victime consciente, au premier étage', 'C4a'),
      act('Fait attendre les secours en bas de l’immeuble et les fait guider jusqu’à l’étage', 'C4b'),
      act('Couvre, réconforte et surveille (réponses, respiration, pâleur) jusqu’à la prise en charge', 'C5c'),
    ],
    prevention: {
      danger: 'Les extrémités des fers en attente, non protégées',
      situation: 'Baptiste circule sur une dalle encombrée, les bras chargés, près des fers en attente',
      evenement: 'Il trébuche sur un rouleau de treillis et tombe sur les fers',
      dommage: 'Plaie grave de l’abdomen',
      eviter:
        'Boîtes d’attente ou fers repliés quand c’est possible ; sinon protéger toutes les extrémités (capuchons, planches) dès la pose ; zones de stockage définies et passages dégagés sur la dalle ; porter les panneaux à deux ou avec la grue pour garder la vue dégagée ; information de l’équipe.',
      remonter: 'Chef de chantier, pour faire protéger tous les fers en attente du chantier.',
    },
  }),
  makeCase({
    id: 'ent-mac-07',
    title: 'Le compacteur dans le sous-sol',
    geste: 'Ne répond pas, respire (intoxication, PLS)',
    category: 'metier',
    tradeIds: ['macon'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans le sous-sol d’une maison en construction, Yanis compacte le gravier avant le dallage avec une plaque vibrante à moteur essence ; la porte de garage est fermée à cause de la pluie. Lou, l’apprentie, sort en courant par la petite porte : « Yanis s’est senti mal, il s’est assis contre le mur et il ne répond plus ! » Par la porte ouverte, tu le vois affalé à 2 mètres de l’entrée ; la plaque tourne toujours au fond et ça sent fort les gaz d’échappement.',
    victime:
      'Affalé contre le mur, à 2 m de la porte. Ne répond pas, respire normalement. Ne s’est pas cogné : il avait mal à la tête et la nausée, il s’est assis puis a perdu connaissance. Origine non traumatique et connue (intoxication) : la PLS est attendue. Se laisse tirer.',
    temoin:
      'Lou, apprentie. Veut retourner dans le sous-sol pour couper le moteur et aider Yanis. Elle a elle-même un peu mal à la tête. Si le SST le lui demande, reste dehors, empêche les autres d’entrer, appelle les secours et va les attendre devant le chantier.',
    materiel:
      'Deux tapis (sous-sol et extérieur), ruban au sol pour la porte, caisse figurant la plaque vibrante, bruit de moteur sur un téléphone, couverture, téléphone factice.',
    actions: [
      act('Repère le danger persistant : gaz d’échappement (monoxyde de carbone) dans un local fermé, moteur qui tourne au fond', 'C2a'),
      act('Empêche Lou et les autres d’entrer, et tient compte qu’elle a aussi respiré les gaz', 'C2b', 'C2d'),
      act('Danger impossible à supprimer sans risque, victime visible et proche : ouvre la porte en grand, retient sa respiration et dégage la victime à l’air libre en la tirant par les poignets ou les chevilles', 'C2e'),
      act('Examine dehors : ne répond pas ; l’allonge sur le dos, libère les voies aériennes : respire', 'C3a', 'C3b'),
      act('Origine non traumatique et connue (intoxication, sans chute ni choc) : met la victime en PLS', 'C5a', 'C5b'),
      act('Fait alerter le 18 ou le 112 : suspicion d’intoxication au monoxyde de carbone, une victime inconsciente qui respire, en PLS, une autre personne exposée', 'C4a'),
      act('Fait accueillir les secours et leur signale le moteur qui tourne dans le sous-sol ; personne n’y retourne', 'C4b', 'C2d'),
      act('Couvre et surveille en permanence la respiration, garde Lou au repos dehors jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le monoxyde de carbone des gaz d’échappement (gaz invisible et sans odeur)',
      situation: 'Yanis travaille avec un moteur thermique dans un sous-sol fermé',
      evenement: 'Les gaz d’échappement s’accumulent, porte de garage fermée',
      dommage: 'Intoxication au monoxyde de carbone, perte de connaissance',
      eviter:
        'Pas de moteur thermique en local fermé : plaque vibrante électrique ou à batterie ; sinon ouvertures en grand, ventilation mécanique et détecteur de monoxyde de carbone ; ne jamais travailler seul en sous-sol ; informer l’équipe des signes d’alerte (maux de tête, nausées, vertiges) et sortir dès qu’ils apparaissent.',
      remonter: 'Chef de chantier ou chef d’entreprise, pour interdire les moteurs thermiques en sous-sol fermé.',
    },
  }),
  makeCase({
    id: 'ent-mac-08',
    title: 'La rallonge abîmée sous la pluie',
    geste: 'Arrêt cardiaque (électrisation)',
    category: 'metier',
    tradeIds: ['macon'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Tu travailles sur l’agrandissement d’une maison habitée. La rallonge du chantier est branchée dans le garage du client et traverse la cour ; le camion de livraison l’a écrasée et la gaine est ouverte. Sous la pluie, Mehdi la ramasse pour la déplacer, pousse un cri et s’effondre au bord d’une flaque, la rallonge encore dans la main. Le client sort de la maison en courant.',
    victime:
      'Mannequin allongé sur le dos au bord de la flaque, la main sur la rallonge. Ne répond pas, ne respire pas. Le défibrillateur de formation annonce un choc à la première analyse.',
    temoin:
      'Le client. Se précipite pour attraper Mehdi par les épaules. Si le SST le lui demande, coupe le disjoncteur général dans le garage (ou débranche la rallonge à la prise, au sec), appelle les secours avec son portable tout en allant chercher le défibrillateur de la mairie, juste en face.',
    materiel:
      'Mannequin, défibrillateur de formation, rallonge, bâche ou tissu bleu pour la flaque, serviette pour sécher le torse, téléphone factice.',
    actions: [
      act('Repère le danger électrique (rallonge abîmée, sol mouillé), ne touche ni la victime ni la flaque et retient le client', 'C2a', 'C2b'),
      act('Fait couper le courant au disjoncteur du garage ou débrancher la rallonge à la prise, au sec, avant de toucher la victime', 'C2c'),
      act('Examine : ne répond pas ; libère les voies aériennes : ne respire pas', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 (électrisation, arrêt cardiaque, RCP en cours) et fait apporter le défibrillateur', 'C4a'),
      act('Commence aussitôt la RCP : 30 compressions au milieu de la poitrine, 100 à 120 par minute, puis 2 insufflations ; ou compressions seules en continu', 'C5a', 'C5b'),
      act('Dès l’arrivée du DAE : le met en marche, sèche le torse, pose les électrodes et suit les instructions ; personne ne touche la victime pendant l’analyse et le choc', 'C5b'),
      act('Fait guider les secours jusqu’à la cour', 'C4b'),
      act('Reprend les compressions aussitôt après le choc et poursuit RCP et DAE jusqu’à la prise en charge par les secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique (fils à nu de la rallonge abîmée)',
      situation: 'Mehdi manipule une rallonge à la gaine ouverte, sous la pluie, sur un sol mouillé',
      evenement: 'Il touche les fils à nu et le courant traverse son corps',
      dommage: 'Électrisation entraînant un arrêt cardiaque',
      eviter:
        'Alimenter le chantier par un coffret de chantier protégé par un différentiel 30 mA plutôt que par une prise du client ; câbles prévus pour l’extérieur, en bon état, passés en hauteur ou protégés du passage des véhicules ; retirer tout câble abîmé et ne jamais le manipuler sous tension ; vérification régulière du matériel électrique ; information de l’équipe.',
      remonter: 'Chef de chantier ou chef d’entreprise ; prévenir aussi le client pour son installation électrique.',
    },
  }),
];
