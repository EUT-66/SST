// Cas d'entraînement – Menuisier (fabricant / installateur) : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-men-01',
    title: 'La vitre qui éclate à la dépose',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: ['menuisier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une maison ancienne, tu remplaces les fenêtres avec Nathan. En déposant un vieux châssis, la vitre éclate : Nathan s’entaille profondément l’avant-bras et le sang coule abondamment sur le parquet. Des morceaux de verre sont partout au sol et le châssis cassé tient en équilibre sur l’appui de fenêtre. Le propriétaire arrive en entendant le bruit.',
    victime:
      'Debout, se tient l’avant-bras, le sang coule abondamment, pâle et inquiet. Répond aux questions, respire. Le saignement s’arrête quand la compression est bien faite et reprend si on relâche.',
    temoin:
      'Le propriétaire de la maison. Veut emmener Nathan tout de suite aux urgences dans sa voiture. Fait ensuite ce que le SST demande (alerter, apporter la trousse, accueillir les secours).',
    materiel:
      'Cadre de fenêtre (ou carton), papier aluminium froissé pour le verre, tissu rouge, gants, compresses, bande, garrot de formation, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère le châssis en équilibre et le verre au sol ; met des gants, couche le châssis à plat, loin de la victime, et repousse les gros morceaux de verre', 'C2a', 'C2c'),
      act('Repère le saignement abondant de l’avant-bras', 'C3a', 'C3b'),
      act('Comprime ou fait comprimer directement la plaie avec la paume de la main, main protégée', 'C5a', 'C5b'),
      act('Allonge la victime au sol, à l’écart du verre, sans relâcher la compression', 'C5b'),
      act('Refuse le transport en voiture et fait alerter le 15 (ou le 112) : saignement abondant de l’avant-bras, compression en cours', 'C4a'),
      act('Si la compression est efficace, pose un pansement compressif ; si le saignement reprend, comprime par-dessus ; s’il continue, pose un garrot', 'C5b'),
      act('Fait accueillir les secours devant la maison', 'C4b'),
      act('Couvre la victime, la réconforte et vérifie que le saignement reste arrêté jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le verre de l’ancienne fenêtre',
      situation: 'Nathan dépose un vieux châssis vitré, sans gants anti-coupure ni manchettes',
      evenement: 'La vitre éclate pendant la dépose',
      dommage: 'Coupure profonde de l’avant-bras, saignement abondant',
      eviter:
        'Retirer ou protéger le vitrage avant de déposer le châssis (film adhésif sur la vitre), travailler à deux, prévoir un bac pour évacuer le verre ; gants anti-coupure et manchettes ; informer l’équipe de la méthode de dépose.',
      remonter: 'Chef de chantier ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-men-02',
    title: 'Le casse-croûte au bord de la rue',
    geste: 'Étouffement (obstruction totale)',
    category: 'metier',
    tradeIds: ['menuisier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'À la pause casse-croûte, tu manges avec Inès et Bilal sur le trottoir, assis contre la camionnette garée dans une rue passante, devant le chantier. Inès rit en avalant un gros morceau de sandwich, puis se lève d’un coup, porte les mains à sa gorge et recule vers la chaussée. Aucun son ne sort, elle ne tousse pas, et les voitures passent tout près.',
    victime:
      'Debout, mains à la gorge, bouche ouverte. Ne peut ni parler, ni tousser, ni respirer (obstruction totale) ; fait oui de la tête si on lui demande si elle s’étouffe. Les claques dans le dos ne suffisent pas. À la deuxième compression abdominale, « recrache » le morceau, tousse, respire et reparle, encore essoufflée.',
    temoin:
      'Bilal, un collègue de l’équipe. Lui tend sa bouteille d’eau en disant « bois un coup, ça va passer ». Fait ensuite ce que le SST demande (appeler le 15).',
    materiel:
      'Emballage de sandwich, bouteille d’eau, caisse pour s’asseoir, ruban au sol pour figurer le bord du trottoir, téléphone factice. Claques et compressions mimées sur le camarade : mains bien placées, geste retenu.',
    actions: [
      act('Repère la circulation et ramène Inès sur le trottoir, à l’écart de la chaussée', 'C2a', 'C2e'),
      act('Demande « Tu t’étouffes ? » et constate l’obstruction totale : ne parle pas, ne tousse pas, ne respire pas', 'C3a', 'C3b'),
      act('Fait alerter le 15 par Bilal sans attendre ; une fois le morceau sorti, fait préciser que des compressions abdominales ont été faites et suit les conseils du médecin', 'C4a'),
      act('Refuse qu’on lui donne à boire', 'C5b'),
      act('Penche la victime en avant et donne 1 à 5 claques vigoureuses dans le dos, entre les omoplates', 'C5a', 'C5b'),
      act('Les claques sont inefficaces : réalise 1 à 5 compressions abdominales, en alternance avec les claques tant que le morceau n’est pas sorti', 'C5b'),
      act('S’arrête dès que le morceau est expulsé et installe Inès dans la position où elle se sent le mieux', 'C5b'),
      act('Couvre, réconforte et surveille sa respiration jusqu’à la fin de la prise en charge', 'C5c'),
    ],
    prevention: {
      danger: 'Le gros morceau de nourriture',
      situation: 'Inès mange vite, en riant, assise au bord d’une rue passante',
      evenement: 'Le morceau bloque ses voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque d’arrêt cardiaque (et d’être renversée par une voiture)',
      eviter:
        'Prévoir un vrai lieu de pause sur le chantier, à l’écart de la circulation, et un temps de repas suffisant ; manger assis, lentement, par petites bouchées, sans parler la bouche pleine.',
      remonter: 'Chef de chantier ou chef d’entreprise (organisation des pauses), même si tout s’est bien terminé.',
    },
  }),
  makeCase({
    id: 'ent-men-03',
    title: 'Les vapeurs du vitrificateur',
    geste: 'Malaise (intoxication par des vapeurs de solvant)',
    category: 'metier',
    tradeIds: ['menuisier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une maison, Manon vitrifie au rouleau le parquet d’une chambre, fenêtres et porte fermées pour éviter la poussière. Quand tu ouvres la porte, une forte odeur de solvant te prend à la gorge. Manon est assise par terre près de la porte, le bidon de vitrificateur ouvert à côté d’elle : elle dit qu’elle a la tête qui tourne, mal à la tête et envie de vomir. Le propriétaire est juste derrière toi.',
    victime:
      'Assise au sol près de la porte, répond lentement, respire. Se plaint de maux de tête, de vertiges et de nausées, se sent « comme ivre ». Peut marcher si on la soutient. Va un peu mieux à l’air frais, mais reste fatiguée et nauséeuse.',
    temoin:
      'Le propriétaire. Sort son briquet pour allumer une cigarette, puis veut faire boire à Manon un verre de lait « pour éliminer ». Range son briquet, ouvre les fenêtres de la maison et appelle les secours si le SST le lui demande.',
    materiel:
      'Rouleau, bidon vide étiqueté « vitrificateur », chaise, couverture, briquet factice, verre, feuille figurant la fiche de données de sécurité, téléphone factice.',
    actions: [
      act('Repère les vapeurs de solvant, toxiques et inflammables, et n’entre pas dans la chambre', 'C2a'),
      act('Aide Manon à sortir depuis la porte, puis l’emmène, soutenue, dans une pièce aérée ou dehors', 'C2e'),
      act('Interdit l’entrée de la chambre, fait ranger le briquet (aucune flamme ni cigarette) et fait ouvrir les fenêtres de la maison', 'C2c', 'C2d'),
      act('Examine : répond, se plaint de vertiges, de maux de tête et de nausées, respire', 'C3a', 'C3b'),
      act('Met la victime au repos, assise ou allongée, dans la position où elle se sent le mieux', 'C5a', 'C5b'),
      act('La questionne : produit utilisé, depuis combien de temps, maladie, traitement', 'C5b'),
      act('Refuse le verre de lait et ne lui donne rien à boire sans l’avis du médecin', 'C5b'),
      act('Fait alerter le 15 : malaise après avoir respiré des vapeurs de vitrificateur, nom du produit (lu sur la fiche de données de sécurité ou sur un autre bidon, sans retourner dans la chambre)', 'C4a'),
      act('Suit les conseils du médecin, couvre, réconforte et surveille ; si elle ne répond plus, reprend l’examen', 'C5c'),
    ],
    prevention: {
      danger: 'Les vapeurs de solvant du vitrificateur',
      situation: 'Manon applique le vitrificateur dans une chambre fermée, sans aération ni masque',
      evenement: 'Elle respire les vapeurs pendant de longues minutes',
      dommage: 'Intoxication : malaise avec vertiges, maux de tête et nausées (et risque d’incendie)',
      eviter:
        'Choisir un vitrificateur à l’eau plutôt qu’au solvant ; aérer pendant et après l’application (fenêtres ouvertes, extracteur) ; pauses à l’air libre ; masque à cartouche pour vapeurs organiques en complément ; lire l’étiquette et la fiche de données de sécurité ; aucune flamme ni cigarette à proximité.',
      remonter: 'Chef d’équipe ou chef d’entreprise (choix du produit, matériel d’aération).',
    },
  }),
  makeCase({
    id: 'ent-men-04',
    title: 'La colle chaude de la plaqueuse',
    geste: 'Brûlure thermique (colle chaude)',
    category: 'metier',
    tradeIds: ['menuisier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'À l’atelier, Lucas recharge en granulés de colle le bac de la plaqueuse de chants, machine en chauffe. Pressé, il verse le sac d’un coup : de la colle fondue gicle et colle sur le dos de sa main et sur son poignet. Tu l’entends crier et tu le vois secouer la main. La plaqueuse tourne toujours et le bac de colle brûlante est resté ouvert.',
    victime:
      'Debout, très douloureux, colle fondue collée sur le dos de la main droite et sur le poignet, peau rouge avec des cloques autour. Répond aux questions, respire. Veut arracher la colle.',
    temoin:
      'Un collègue d’atelier. Arrive avec de la glace et veut aider Lucas à décoller la colle. Fait ensuite ce que le SST demande (ouvrir l’eau, alerter).',
    materiel:
      'Caisse figurant la plaqueuse, pâte à fixe pour la colle, maquillage rouge, bassine et bouteille d’eau (ou évier de la salle), couverture, téléphone factice.',
    actions: [
      act('Arrête ou fait arrêter la plaqueuse et éloigne Lucas du bac de colle brûlante', 'C2a', 'C2c'),
      act('Examine : répond, brûlure du dos de la main et du poignet, avec de la colle collée à la peau et des cloques', 'C3a', 'C3b'),
      act('Arrose immédiatement à l’eau courante tempérée, au moins 10 minutes (idéalement 20)', 'C5a', 'C5b'),
      act('Pendant l’arrosage, retire ce qui n’adhère pas à la peau (montre, manche), sans toucher à la colle collée', 'C5b'),
      act('Refuse la glace et qu’on décolle la colle', 'C5b'),
      act('Fait alerter le 15 (ou le 112), selon l’organisation des secours de l’atelier : brûlure de la main et du poignet par de la colle chaude, arrosage en cours', 'C4a'),
      act('Suit les conseils des secours, couvre la victime, la réconforte et la surveille jusqu’à leur arrivée', 'C5c'),
    ],
    prevention: {
      danger: 'La colle fondue très chaude du bac de la plaqueuse',
      situation: 'Lucas recharge le bac à la main, machine en chauffe, sans gants ni manches longues',
      evenement: 'Il verse le sac d’un coup et la colle gicle',
      dommage: 'Brûlure thermique de la main et du poignet',
      eviter:
        'Recharger comme le prévoit la notice (petites quantités, système de chargement, couvercle), sans approcher les mains du bac ; carter et couvercle en place ; gants résistants à la chaleur, manches longues et lunettes ; formation au poste.',
      remonter: 'Chef d’atelier.',
    },
  }),
  makeCase({
    id: 'ent-men-05',
    title: 'La chute par la trémie d’escalier',
    geste: 'Traumatisme du cou',
    category: 'metier',
    tradeIds: ['menuisier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur le chantier d’un immeuble neuf, tu poses avec Lina l’escalier intérieur d’un duplex ; la trémie (le trou dans le plancher prévu pour l’escalier) n’est entourée que d’un ruban. Tu es en bas pour recevoir les marches que Lina te passe par le trou. En se penchant avec une marche lourde, elle perd l’équilibre et tombe par la trémie, juste à côté de toi. Elle est allongée sur le dos, consciente, et gémit. Au-dessus, d’autres marches sont empilées au bord du trou et un électricien travaille à côté.',
    victime:
      'Allongée sur le dos, consciente, répond aux questions, respire. Douleur au cou et en haut du dos, fourmillements dans les deux mains. Veut se relever, puis ne bouge plus la tête si le SST le lui demande.',
    temoin:
      'L’électricien, à l’étage du dessus. Veut descendre en courant pour aider Lina à s’asseoir « pour voir si ça va ». Fait ensuite ce que le SST demande : écarter les marches du bord et barrer la trémie, puis appeler les secours et les accueillir.',
    materiel:
      'Tapis, ruban de signalisation, planches ou cartons figurant les marches empilées sur une table (l’étage du dessus), couverture, téléphone factice.',
    actions: [
      act('Repère les marches empilées au bord de la trémie, qui peuvent tomber sur la victime, et l’électricien qui travaille à côté du vide', 'C2a', 'C2b'),
      act('Demande à l’électricien d’écarter les marches du bord, de barrer la trémie (planches fixées ou barrière) et de ne plus travailler au-dessus de la victime', 'C2c', 'C2d'),
      act('Examine : répond, se plaint du cou et du dos, fourmillements dans les mains, respire', 'C3a', 'C3b'),
      act('Lui demande de ne pas bouger la tête et refuse qu’on l’assoie', 'C5a', 'C5b'),
      act('Maintient la tête à deux mains, dans la position où elle se trouve', 'C5b'),
      act('Fait alerter le 15 (ou le 112) par l’électricien : chute d’un étage par une trémie, douleur au cou, fourmillements dans les mains', 'C4a'),
      act('Fait accueillir et guider les secours depuis l’entrée du chantier jusqu’à la victime', 'C4b'),
      act('Fait couvrir la victime, la rassure et la surveille jusqu’à la prise en charge par les secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le vide de la trémie, protégée seulement par un ruban',
      situation: 'Lina se penche au-dessus de la trémie pour passer des marches à l’étage du dessous',
      evenement: 'Elle perd l’équilibre et tombe par la trémie',
      dommage: 'Traumatisme du cou et du dos (chute de hauteur)',
      eviter:
        'Fermer la trémie par un plancher provisoire solidement fixé ou l’entourer d’un garde-corps tant que l’escalier n’est pas posé (un ruban ne protège pas) ; descendre les marches par l’escalier de chantier ou avec un moyen de levage, pas en les passant par le trou ; stocker les marches loin du vide ; informer toutes les entreprises présentes sur le chantier.',
      remonter: 'Chef de chantier ou conducteur de travaux.',
    },
  }),
  makeCase({
    id: 'ent-men-06',
    title: 'L’éclat de bois dans l’œil',
    geste: 'Plaie grave de l’œil avec corps étranger',
    category: 'metier',
    tradeIds: ['menuisier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une boutique en travaux, tu poses avec Yanis un habillage en lambris sur un mur. Yanis cloue les lames au cloueur pneumatique, sans lunettes de protection : un clou ricoche sur une vis cachée et un éclat de bois se plante dans son œil droit. Tu le trouves à genoux, la main sur l’œil. Le cloueur, toujours relié au compresseur, est posé par terre à côté de lui. Le responsable de la boutique accourt.',
    victime:
      'À genoux, main sur l’œil droit, l’œil pleure et fait très mal, un petit éclat de bois est planté dedans. Répond aux questions, respire. Veut frotter son œil et retirer l’éclat.',
    temoin:
      'Le responsable de la boutique. Propose d’enlever l’éclat avec une pince à épiler. Fait ensuite ce que le SST demande (alerter, accueillir les secours).',
    materiel:
      'Planches de lambris (ou cartons), cloueur factice et tuyau, tapis, couverture, pince à épiler, téléphone factice. Rien n’est mis dans l’œil : la victime garde la main devant.',
    actions: [
      act('Fait débrancher le cloueur du compresseur et le pose à l’écart', 'C2a', 'C2c'),
      act('Examine : répond, se plaint de l’œil droit, éclat de bois planté visible, respire', 'C3a', 'C3b'),
      act('Empêche la victime de frotter son œil et refuse qu’on retire l’éclat', 'C5b'),
      act('Allonge la victime, lui demande de fermer les deux yeux et maintient sa tête à deux mains', 'C5a', 'C5b'),
      act('Fait alerter le 15 (ou le 112) : éclat de bois planté dans l’œil, victime allongée, yeux fermés', 'C4a'),
      act('Fait accueillir les secours devant la boutique', 'C4b'),
      act('Rassure, couvre et surveille jusqu’aux secours, en rappelant de garder les deux yeux fermés', 'C5c'),
    ],
    prevention: {
      danger: 'Les clous et éclats projetés par le cloueur pneumatique',
      situation: 'Yanis cloue sans lunettes de protection, sur un mur où une vis est cachée',
      evenement: 'Un clou ricoche sur la vis et projette un éclat de bois',
      dommage: 'Plaie de l’œil avec corps étranger, risque de perdre la vue',
      eviter:
        'Repérer et retirer les vis et fixations avant de clouer ; cloueur à déclenchement coup par coup avec palpeur de sécurité ; débrancher l’air pendant les pauses ; lunettes de protection obligatoires ; formation à l’outil.',
      remonter: 'Chef de chantier ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-men-07',
    title: 'Le rejet de pièce à la toupie',
    geste: 'Ne répond pas, respire (traumatisme)',
    category: 'metier',
    tradeIds: ['menuisier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'À l’atelier, Sarah moulure des montants de porte à la toupie, en poussant la pièce à la main, sans entraîneur ni presseurs. La pièce est rejetée violemment et la frappe au front. Tu la trouves allongée sur le dos à côté de la machine, immobile ; la toupie tourne toujours et la planche est au sol. Un collègue, qui a tout vu, accourt.',
    victime:
      'Allongée sur le dos, yeux fermés, ne répond pas et ne serre pas la main quand on le lui demande, respire normalement. Bosse rouge sur le front. Origine traumatique (choc à la tête) : elle doit rester sur le dos, voies aériennes libres, pas de PLS. Reste ainsi jusqu’à la fin.',
    temoin:
      'Un collègue qui a vu le choc. Veut la mettre en PLS « comme à la formation » et lui passer de l’eau froide sur le visage. Fait ensuite ce que le SST demande (alerter, couvrir, accueillir les secours).',
    materiel: 'Caisse figurant la toupie, planche, tapis, couverture, maquillage (bosse au front), téléphone factice.',
    actions: [
      act('Appuie sur l’arrêt d’urgence de la toupie et attend l’arrêt complet de l’outil avant de s’occuper de la victime', 'C2a', 'C2c'),
      act('Examine : ne répond pas ; libère les voies aériennes et constate qu’elle respire (10 secondes)', 'C3a', 'C3b'),
      act('Fait alerter le 15 (ou le 112) : choc à la tête par une pièce rejetée, ne répond pas, respire', 'C4a'),
      act('Identifie un traumatisme : laisse la victime sur le dos et refuse la PLS', 'C5a'),
      act('Maintient la liberté des voies aériennes, tête tenue à deux mains', 'C5b'),
      act('Refuse l’eau froide sur le visage et fait couvrir la victime', 'C5b'),
      act('Fait accueillir les secours à l’entrée de l’atelier', 'C4b'),
      act('Surveille la respiration en permanence ; si elle ne respire plus, reprend l’examen et commence la réanimation', 'C5c'),
    ],
    prevention: {
      danger: 'L’outil de la toupie en rotation et les pièces rejetées',
      situation: 'Sarah pousse la pièce à la main, sans entraîneur ni presseurs, dans l’axe de rejet',
      evenement: 'La pièce est happée puis rejetée violemment',
      dommage: 'Traumatisme de la tête, perte de connaissance',
      eviter:
        'Entraîneur automatique, presseurs et protecteurs réglés, outils adaptés et affûtés ; se placer hors de l’axe de rejet ; formation au poste et travail à la toupie seulement avec l’accord du tuteur.',
      remonter: 'Chef d’atelier ou maître d’apprentissage.',
    },
  }),
  makeCase({
    id: 'ent-men-08',
    title: 'La mèche dans le câble électrique',
    geste: 'Arrêt cardiaque (électrisation)',
    category: 'metier',
    tradeIds: ['menuisier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la salle des professeurs d’un lycée, tu fixes des casiers en bois au mur avec Mehdi. En perçant le mur, sa mèche touche un câble électrique caché : Mehdi s’effondre et la perceuse, toujours branchée, reste plantée dans le mur. Il est allongé sur le dos, immobile, juste en dessous. Un défibrillateur est accroché dans le hall du lycée et le gardien arrive en courant.',
    victime:
      'Mannequin allongé sur le dos au pied du mur, qui ne touche plus la perceuse. Ne répond pas, ne respire pas.',
    temoin:
      'Le gardien du lycée. Veut retirer la perceuse du mur et secouer Mehdi. Sait où se trouvent le tableau électrique et le défibrillateur, et y va si le SST le lui demande.',
    materiel:
      'Mannequin, défibrillateur de formation, perceuse débranchée (ou factice), planche figurant le casier, téléphone factice.',
    actions: [
      act('Ne touche ni Mehdi ni la perceuse et empêche le gardien d’approcher', 'C2a', 'C2b'),
      act('Fait couper le courant au tableau électrique, et pas seulement à la prise de la perceuse (le câble touché dans le mur reste sous tension)', 'C2c'),
      act('Examine : ne répond pas, ne respire pas (libère les voies aériennes, contrôle 10 secondes)', 'C3a', 'C3b'),
      act('Fait alerter le 15 (ou le 112) : électrisation, ne répond pas, ne respire pas, réanimation en cours ; fait apporter le défibrillateur', 'C4a'),
      act('Débute aussitôt les compressions thoraciques au milieu de la poitrine, 100 à 120 par minute', 'C5a', 'C5b'),
      act('Réalise des cycles de 30 compressions et 2 insufflations (compressions seules en continu si les insufflations sont impossibles)', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée et suit ses instructions', 'C5b'),
      act('Fait guider les secours depuis l’entrée du lycée jusqu’à la salle des professeurs', 'C4b'),
      act('Poursuit la réanimation jusqu’au relais des secours, en se relayant toutes les 2 minutes si un autre SST est là', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique d’un câble caché dans le mur',
      situation: 'Mehdi perce un mur sans avoir repéré le passage des câbles',
      evenement: 'La mèche touche le câble sous tension',
      dommage: 'Électrisation, arrêt cardiaque',
      eviter:
        'Demander les plans des réseaux et repérer les câbles avant de percer (détecteur de câbles) ; faire couper et condamner le circuit concerné quand on doit percer près d’un passage de câbles ; ne pas percer au-dessus ni en dessous des prises et interrupteurs ; tenir la perceuse par ses poignées isolées ; informer l’équipe.',
      remonter: 'Chef d’entreprise et responsable du lycée (le câble abîmé doit être réparé par un électricien).',
    },
  }),
];
