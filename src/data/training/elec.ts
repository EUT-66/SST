// Cas d'entraînement – Électricien : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-elec-01',
    title: 'La meuleuse du parking souterrain',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: ['elec'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans le parking souterrain d’une résidence, ton équipe installe des bornes de recharge pour voitures électriques. Bastien raccourcit un chemin de câbles en fil avec une meuleuse sans fil tenue d’une seule main : le disque se coince, la meuleuse rebondit et lui entaille l’avant-bras gauche. Quand tu arrives, il est assis au milieu de l’allée de circulation, près de la camionnette de l’équipe, le sang coule entre ses doigts et fait une flaque ; la meuleuse est par terre, batterie en place, et une voiture descend la rampe. Au 2e sous-sol, le téléphone ne capte pas.',
    victime:
      'Assis au sol dans l’allée, se tient l’avant-bras gauche, le sang coule abondamment. Conscient, pâle, inquiet, répond aux questions. Accepte de s’allonger. Le saignement s’arrête quand on comprime fort et ne reprend pas sous le pansement compressif.',
    temoin:
      'Un résident venu chercher sa voiture. Veut emmener Bastien lui-même aux urgences dans sa voiture. Si le SST le lui demande, il balise l’allée avec les cônes de la camionnette, puis remonte au rez-de-chaussée pour appeler les secours, revient dire que l’appel est passé et va les attendre à l’entrée du parking.',
    materiel:
      'Meuleuse (ou boîte) avec sa batterie, cônes ou ruban de balisage, gants à usage unique, tissu rouge, compresses ou linge propre, bande, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère la voiture qui descend : fait signe au conducteur de s’arrêter, puis fait baliser l’allée avec les cônes pour bloquer la circulation', 'C2a', 'C2b', 'C2d'),
      act('Retire la batterie de la meuleuse et la met à l’écart', 'C2a', 'C2c'),
      act('Examine : repère tout de suite le saignement abondant ; la victime répond', 'C3a', 'C3b'),
      act('Comprime aussitôt l’endroit qui saigne avec la paume de la main protégée (gant), ou le fait comprimer par la victime', 'C5a', 'C5b'),
      act('Allonge la victime sur place, dans la zone balisée', 'C5b'),
      act('Refuse le transport en voiture et envoie le témoin alerter le 15 ou le 112 là où le téléphone capte : adresse, 2e sous-sol, blessure à la meuleuse, une victime consciente, saignement abondant de l’avant-bras, compression en cours', 'C4a'),
      act('S’assure que l’alerte est passée et fait attendre les secours à l’entrée du parking pour les guider', 'C4b'),
      act('Relaie la compression par un pansement compressif ; sait qu’il faut un garrot si la compression est inefficace ou impossible', 'C5b'),
      act('Couvre la victime, la réconforte et surveille le saignement et son état jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le disque en rotation de la meuleuse',
      situation: 'Bastien coupe le chemin de câbles avec la meuleuse tenue d’une seule main, l’avant-bras dans l’axe du disque',
      evenement: 'Le disque se coince dans le fil et la meuleuse rebondit',
      dommage: 'Plaie profonde de l’avant-bras avec saignement abondant',
      eviter:
        'Couper le chemin de câbles en fil sans disque, au coupe-boulons ou à la cisaille prévue pour ça ; si la meuleuse est indispensable : pièce bloquée dans un étau ou avec des serre-joints, carter et poignée en place, machine tenue à deux mains, corps hors de l’axe du disque ; zone de travail balisée dans le parking ; en complément : gants, manchettes anti-coupure, lunettes.',
      remonter: 'Chef d’équipe ou chef d’entreprise ; prévenir aussi le gardien ou le syndic pour organiser la circulation pendant les travaux.',
    },
  }),
  makeCase({
    id: 'ent-elec-02',
    title: 'Le sandwich avalé de travers',
    geste: 'Étouffement (obstruction totale)',
    category: 'metier',
    tradeIds: ['elec'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur le chantier d’un gymnase en construction, c’est la pause casse-croûte dans le bungalow de la base vie. Inès, apprentie électricienne, mange son sandwich en vitesse, debout, en racontant sa matinée. D’un coup, elle se tait, porte les mains à sa gorge et te regarde, les yeux grands ouverts. Un apprenti plombier est assis à côté d’elle.',
    victime:
      'Debout, mains à la gorge, bouche ouverte. Ne peut ni parler, ni tousser, ni émettre un son ; fait signe que ça ne passe pas. Les claques dans le dos ne suffisent pas ; le morceau sort à la 2e compression abdominale (gestes mimés : le SST ne frappe pas et ne comprime pas réellement). Ensuite elle tousse, respire, répond et dit qu’elle a mal au ventre.',
    temoin:
      'L’apprenti plombier. Lui tend une bouteille d’eau en disant « bois, ça va passer ». Si le SST le lui demande, il appelle le 15 et met le haut-parleur.',
    materiel: 'Table, chaises, sandwich factice, bouteille d’eau, mannequin de désobstruction si disponible, couverture, téléphone factice.',
    actions: [
      act('Constate qu’il n’y a pas de danger persistant et écarte la table et les chaises pour avoir de la place', 'C2a'),
      act('Reconnaît une obstruction totale : elle ne parle pas, ne tousse pas, n’émet aucun son', 'C3a', 'C3b'),
      act('Refuse qu’on la fasse boire et, sans attendre pour agir, fait alerter le 15 par le témoin, haut-parleur allumé : chantier du gymnase, bungalow de la base vie, une personne qui s’étouffe, gestes en cours', 'C4a'),
      act('Se place sur le côté et un peu en arrière, la penche en avant et donne de 1 à 5 claques vigoureuses dans le dos, entre les omoplates, avec le talon de la main', 'C5a', 'C5b'),
      act('Claques inefficaces : se place derrière elle et réalise de 1 à 5 compressions abdominales (poing au creux de l’estomac, au-dessus du nombril, l’autre main par-dessus, tirer vers soi et vers le haut)', 'C5b'),
      act('S’arrête dès que le morceau sort ; sinon, alterne 1 à 5 claques et 1 à 5 compressions ; sait que si elle perd connaissance, il faut l’allonger et commencer la réanimation', 'C5b'),
      act('Une fois débloquée, l’installe dans la position où elle se sent le mieux et la réconforte', 'C5b'),
      act('Informe le 15 du résultat (morceau sorti, compressions abdominales faites, mal au ventre) et suit ses conseils', 'C5c'),
      act('Couvre, surveille sa respiration et ne la laisse pas reprendre le travail sans avis médical', 'C5c'),
    ],
    prevention: {
      danger: 'Un morceau de nourriture',
      situation: 'Inès mange vite, debout, en parlant, parce que la pause est courte',
      evenement: 'Un morceau de sandwich part de travers dans les voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque d’arrêt de la respiration',
      eviter:
        'Organiser une vraie pause, assez longue, assis à table dans la base vie ; manger lentement, par petites bouchées, sans parler la bouche pleine ; des SST formés dans chaque équipe et l’organisation des secours affichée dans le bungalow.',
      remonter: 'Chef de chantier (organisation des pauses et de la base vie).',
    },
  }),
  makeCase({
    id: 'ent-elec-03',
    title: 'Les combles en plein été',
    geste: 'Malaise dû à la chaleur',
    category: 'metier',
    tradeIds: ['elec'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'En juillet, dans une maison en rénovation, Rayan passe depuis ce matin des câbles dans les combles pour les nouveaux points lumineux, pendant que tu poses les prises à l’étage. Il redescend par la trappe et s’assoit sur la marche du haut de l’escalier, au pied de l’escabeau, rouge et trempé de sueur. Il dit qu’il a mal à la tête, envie de vomir et que « ça tourne ». Sa gourde est vide et il veut remonter finir.',
    victime:
      'Assis sur la marche du haut, visage rouge, transpire beaucoup, se plaint de maux de tête, de nausées et de vertiges. Répond aux questions, un peu lentement. Dit qu’il n’a presque rien bu depuis ce matin, qu’il ne prend pas de traitement et que ça ne lui est jamais arrivé. Va un peu mieux une fois au frais, allongé, après avoir bu.',
    temoin:
      'Le propriétaire de la maison. Lui propose une bière bien fraîche « pour se requinquer ». Si le SST le lui demande, il ferme la trappe, ouvre les fenêtres, apporte de l’eau, un linge mouillé et un ventilateur.',
    materiel: 'Escabeau, chaise ou marche, tapis, bouteille d’eau, serviette mouillée, ventilateur ou carton pour éventer, téléphone factice.',
    actions: [
      act('Repère les dangers : la chaleur des combles et le risque de chute dans l’escalier ou depuis l’escabeau ; interdit à Rayan de remonter', 'C2a', 'C2b'),
      act('L’éloigne du haut de l’escalier en le soutenant et fait fermer la trappe des combles', 'C2d', 'C2e'),
      act('Examine : il répond, se plaint de maux de tête, de nausées et de vertiges ; peau rouge, sueurs abondantes', 'C3a', 'C3b'),
      act('Pense à un malaise dû à la chaleur : le met au repos, allongé, dans la pièce la plus fraîche et aérée de l’étage (fenêtre ouverte, volets fermés)', 'C5a', 'C5b'),
      act('Le rafraîchit : vêtements desserrés, linge mouillé, ventilateur', 'C5b'),
      act('Lui fait boire de l’eau fraîche par petites quantités, parce qu’il est conscient et capable de boire ; refuse la bière', 'C5b'),
      act('Le questionne : depuis quand, ce qu’il a bu et mangé, traitement, malaise déjà arrivé', 'C3a'),
      act('Alerte ou fait alerter le 15 pour un avis médical : adresse, signes, temps passé dans les combles, actions faites ; suit ses conseils', 'C4a'),
      act('Reste avec lui et surveille ; rappelle le 15 s’il devient confus ou si son état s’aggrave ; ne le laisse pas reprendre le travail', 'C5c'),
    ],
    prevention: {
      danger: 'La chaleur sous la toiture en plein été',
      situation: 'Rayan travaille seul plusieurs heures dans les combles, sans pause au frais et sans assez d’eau',
      evenement: 'Son corps n’arrive plus à évacuer la chaleur',
      dommage: 'Malaise dû à la chaleur, qui peut aller jusqu’au coup de chaleur',
      eviter:
        'Prévoir les travaux de combles tôt le matin ou à une saison moins chaude, ou passer les câbles par un autre chemin ; sinon limiter le temps passé dans les combles avec des pauses régulières au frais, ventilation, eau fraîche à volonté, jamais seul ; vêtements légers ; connaître les signes du malaise dû à la chaleur.',
      remonter: 'Chef d’équipe ou chef d’entreprise (organisation du travail par forte chaleur).',
    },
  }),
  makeCase({
    id: 'ent-elec-04',
    title: 'La batterie qui fume au dépôt',
    geste: 'Brûlure thermique grave (main)',
    category: 'metier',
    tradeIds: ['elec'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Tôt le matin, au dépôt de l’entreprise, Chloé prépare le matériel de la journée. Une batterie de perceuse en charge sur l’établi se met à fumer et à siffler : Chloé l’attrape pour la jeter dehors, se brûle la main et la lâche au pied d’une pile de cartons, où elle continue de fumer en crachant des étincelles. Quand tu arrives, Chloé tient sa main droite en criant et la fumée envahit le local. Un collègue magasinier est là. Dehors, un robinet est fixé au mur, à côté de la porte.',
    victime:
      'Debout près de l’établi, main droite très douloureuse : paume et doigts rouges, avec des cloques plus grandes que la moitié de sa paume. Porte une bague. Tousse un peu à cause de la fumée mais respire sans difficulté. Répond aux questions.',
    temoin:
      'Le magasinier. Veut ramasser la batterie avec un chiffon pour la sortir, ou lui jeter un seau d’eau dessus. Si le SST le lui demande, il sort, fait sortir les autres salariés, appelle les secours et les attend à l’entrée du dépôt.',
    materiel: 'Batterie (boîte), cartons, établi ou table, bassine et bouteilles d’eau (ou point d’eau), couverture, téléphone factice.',
    actions: [
      act('Repère le danger : batterie qui brûle, fumées, cartons qui peuvent s’enflammer ; interdit qu’on s’approche de la batterie, qu’on la touche ou qu’on l’arrose', 'C2a', 'C2b'),
      act('Fait sortir tout le monde du dépôt, Chloé comprise, et ferme la porte derrière lui', 'C2d', 'C2e'),
      act('Examine dehors : elle répond, se plaint d’une brûlure à la main, respire sans difficulté', 'C3a', 'C3b'),
      act('Arrose aussitôt la main au robinet, à l’eau courante tempérée, pendant au moins 10 minutes (idéalement 20)', 'C5a', 'C5b'),
      act('Pendant l’arrosage, retire la bague sans forcer, avant que les doigts gonflent, sauf si elle colle à la peau', 'C5b'),
      act('Reconnaît une brûlure grave (cloques plus grandes que la moitié de sa paume, brûlure de la main) et fait alerter le 18 ou le 112 par le magasinier : adresse du dépôt, feu de batterie, porte fermée, plus personne à l’intérieur, une victime consciente brûlée à la main qui a respiré de la fumée, arrosage en cours', 'C4a'),
      act('Fait accueillir les pompiers à l’entrée pour leur montrer le local', 'C4b'),
      act('N’applique rien sur la brûlure (ni pommade, ni glace) et ne perce pas les cloques', 'C5b'),
      act('Couvre Chloé, la réconforte et surveille sa respiration ; l’installe assise si elle a du mal à respirer', 'C5c'),
    ],
    prevention: {
      danger: 'La batterie au lithium qui s’emballe : chaleur, feu, fumées',
      situation: 'Chloé travaille à côté d’une zone de charge encombrée de cartons et saisit à mains nues une batterie qui fume',
      evenement: 'La batterie s’emballe pendant la charge et Chloé l’attrape',
      dommage: 'Brûlure thermique grave de la main, fumées respirées',
      eviter:
        'Retirer du service les batteries abîmées, gonflées ou tombées ; charger avec le chargeur d’origine, dans une zone de charge dédiée, dégagée de tout ce qui peut brûler, pas devant une sortie, sous surveillance, avec un détecteur de fumée ; consigne affichée : ne jamais toucher une batterie qui fume, évacuer, fermer la porte et alerter.',
      remonter: 'Chef d’entreprise ou responsable du dépôt.',
    },
  }),
  makeCase({
    id: 'ent-elec-05',
    title: 'La châtaigne dans le faux plafond',
    geste: 'Traumatisme du cou (après électrisation)',
    category: 'metier',
    tradeIds: ['elec'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur un plateau de bureaux en rénovation, Nathan dépose les anciens luminaires du faux plafond, monté sur un escabeau. Le chef d’équipe pensait avoir coupé le bon disjoncteur, mais Nathan prend une décharge, part en arrière et tombe de l’escabeau. Quand tu arrives, il est allongé sur le dos, l’escabeau renversé à côté de lui ; au-dessus, les fils dénudés du luminaire pendent du faux plafond à hauteur de tête. Le chef d’équipe accourt de la pièce voisine.',
    victime:
      'Allongé sur le dos, conscient, ne touche plus les fils. Dit qu’il a pris « une châtaigne », qu’il a mal au cou et des fourmis dans les doigts. Pas de brûlure visible. Ne bouge pas si on le lui demande ; veut se relever si personne ne l’en empêche.',
    temoin:
      'Le chef d’équipe, électricien habilité. Dit « c’est rien, relève-toi » et veut l’aider à se lever. Si le SST le lui demande, il coupe le disjoncteur général du tableau de l’étage, appelle les secours, apporte une couverture, puis va les attendre à l’entrée de l’immeuble.',
    materiel: 'Escabeau, fils électriques (sans courant) fixés en hauteur, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère le danger électrique : les fils dénudés sont peut-être encore sous tension ; ne les touche pas et interdit qu’on les touche', 'C2a', 'C2b'),
      act('N’intervient pas lui-même sur l’installation : fait couper le courant par le chef d’équipe, habilité, au disjoncteur général du tableau de l’étage ; sans personne habilitée sur place, coupe lui-même au disjoncteur général ou à l’arrêt d’urgence s’il peut le faire sans risque', 'C2c'),
      act('Examine : il répond, se plaint du cou et de fourmillements dans les doigts ; pas de trace de brûlure', 'C3a', 'C3b'),
      act('Lui demande de ne pas bouger la tête et empêche qu’on le relève', 'C5a', 'C5b'),
      act('Maintient la tête à deux mains, dans la position où elle se trouve', 'C5b'),
      act('Fait alerter le 15 ou le 112 : adresse et étage, électrisation suivie d’une chute de l’escabeau, une victime consciente, douleur au cou, fourmillements dans les doigts, courant coupé, tête maintenue', 'C4a'),
      act('Fait guider les secours depuis l’entrée de l’immeuble jusqu’au plateau', 'C4b'),
      act('Fait couvrir la victime, la réconforte et lui parle', 'C5b'),
      act('Surveille sans relâcher le maintien de la tête ; sait qu’après une électrisation l’état peut s’aggraver : s’il ne répond plus, vérifie sa respiration et agit en conséquence', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique (230 V) dans les fils du luminaire, et la hauteur',
      situation: 'Nathan travaille en haut d’un escabeau sur un circuit qu’on croit coupé, sans vérification d’absence de tension',
      evenement: 'Il touche les fils encore sous tension, reçoit une décharge et tombe',
      dommage: 'Électrisation et traumatisme du cou',
      eviter:
        'Travailler hors tension : consignation par une personne habilitée (séparer, condamner, identifier, vérifier l’absence de tension) avant toute dépose, avec un repérage du tableau tenu à jour ; plateforme individuelle roulante avec garde-corps plutôt qu’un escabeau ; habilitation électrique adaptée à la tâche pour chacun ; personne ne commence tant que l’absence de tension n’a pas été vérifiée.',
      remonter: 'Chef d’équipe et chef d’entreprise ; signaler aussi l’erreur de repérage du tableau.',
    },
  }),
  makeCase({
    id: 'ent-elec-06',
    title: 'La saignée sans lunettes',
    geste: 'Plaie grave de l’œil (corps étranger)',
    category: 'metier',
    tradeIds: ['elec'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans un appartement en rénovation, pendant que tu poses des boîtiers dans la même pièce, Léa fait une saignée à la rainureuse dans un mur en brique, à hauteur de visage, pour encastrer une gaine. Elle a relevé ses lunettes parce qu’elles étaient pleines de poussière. Un éclat de brique part dans son œil droit : elle lâche la rainureuse, qui reste branchée par terre, et se plie en deux en se tenant l’œil. La propriétaire arrive de la cuisine.',
    victime:
      'Assise par terre, la main sur l’œil droit, très mal, larmes, n’arrive presque pas à ouvrir l’œil. Quand elle enlève sa main, on voit un petit éclat planté dans le blanc de l’œil. Répond aux questions. Veut se frotter l’œil.',
    temoin:
      'La propriétaire. Veut retirer l’éclat avec le coin d’un mouchoir, ou rincer l’œil au robinet. Si le SST le lui demande, elle appelle le 15 et va ouvrir la porte de l’immeuble aux secours.',
    materiel: 'Rainureuse (ou boîte) avec rallonge, lunettes de protection, tapis, coussins ou vestes roulées pour caler la tête, couverture, téléphone factice.',
    actions: [
      act('Débranche la rainureuse et l’écarte pour que personne ne la remette en marche', 'C2a', 'C2c'),
      act('Examine : elle répond, se plaint de l’œil droit ; repère l’éclat planté', 'C3a', 'C3b'),
      act('Lui demande de ne pas se frotter l’œil ; refuse qu’on retire l’éclat ou qu’on rince l’œil', 'C5b'),
      act('L’allonge sur le dos, les deux yeux fermés, et lui maintient la tête à deux mains (ou la cale)', 'C5a', 'C5b'),
      act('Fait alerter le 15 : adresse et étage, plaie de l’œil avec un éclat de brique planté, une victime consciente, allongée les yeux fermés, tête maintenue', 'C4a'),
      act('Fait ouvrir la porte de l’immeuble et accueillir les secours', 'C4b'),
      act('Lui explique de garder les deux yeux fermés, car l’œil blessé bouge avec l’autre ; la réconforte', 'C5b'),
      act('Couvre et surveille jusqu’à la prise en charge par les secours', 'C5c'),
    ],
    prevention: {
      danger: 'Les éclats de brique projetés par la rainureuse',
      situation: 'Léa fait une saignée à hauteur de visage, lunettes relevées',
      evenement: 'Un éclat est projeté dans son œil',
      dommage: 'Plaie de l’œil avec corps étranger planté',
      eviter:
        'Éviter les saignées quand c’est possible (passage dans les doublages, les cloisons, le faux plafond ou en goulotte apparente) ; sinon rainureuse avec capot et aspiration raccordée ; lunettes-masque anti-buée bien portées, masque contre les poussières, protections auditives ; ne jamais relever ses lunettes pendant la coupe.',
      remonter: 'Chef d’équipe ou chef d’entreprise (lunettes qui s’encrassent à remplacer).',
    },
  }),
  makeCase({
    id: 'ent-elec-07',
    title: 'Le groupe électrogène du garage',
    geste: 'Ne répond pas, respire (intoxication, PLS)',
    category: 'metier',
    tradeIds: ['elec'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans un pavillon neuf pas encore raccordé au réseau électrique, ton équipe fait tourner un groupe électrogène dans le garage, porte basculante presque fermée à cause de la pluie. Quand tu reviens de la camionnette, le propriétaire sort du garage en se tenant la tête : « Manon s’est allongée par terre, elle avait mal à la tête et envie de vomir. » Par la porte entrouverte, tu vois Manon allongée sur le dos à deux mètres de l’entrée, rien ne gêne le passage ; au fond, le groupe tourne et ça sent les gaz d’échappement.',
    victime:
      'Allongée sur le dos à deux mètres de la porte. Ne répond pas, respire. Origine connue et NON traumatique : le propriétaire l’a vue s’allonger d’elle-même, sans chute ni choc, après s’être plainte de maux de tête et de nausées (intoxication au monoxyde de carbone). Se laisse tirer dehors, puis mettre en PLS.',
    temoin:
      'Le propriétaire, qui a mal à la tête lui aussi. Veut retourner dans le garage pour arrêter le groupe. Si le SST le lui demande, il reste dehors, assis, appelle les secours et les attend devant la maison.',
    materiel: 'Camarade (ou mannequin pour le dégagement d’urgence), carton ou caisse pour le groupe électrogène, ligne au sol pour la porte, deux tapis (garage / extérieur), couverture, téléphone factice.',
    actions: [
      act('Repère l’atmosphère toxique : groupe électrogène en marche dans un garage fermé, monoxyde de carbone probable', 'C2a'),
      act('Empêche le propriétaire de retourner dans le garage et le fait asseoir dehors, au grand air', 'C2b', 'C2d'),
      act('Ouvre en grand la porte basculante depuis l’extérieur pour aérer, sans aller arrêter le groupe au fond du garage', 'C2c'),
      act('Le gaz reste dangereux même porte ouverte, mais Manon est visible, à deux mètres, sans obstacle : la tire rapidement dehors (dégagement d’urgence), sans s’attarder dans le garage, et l’installe à quelques mètres de la porte, à l’abri de la pluie si possible', 'C2e'),
      act('Examine à l’air libre : ne répond pas ; l’allonge sur le dos, libère les voies aériennes ; respire', 'C3a', 'C3b'),
      act('Origine connue, non traumatique (malaise sans chute) : la met en PLS', 'C5a', 'C5b'),
      act('Fait alerter le 18 ou le 112 : adresse, intoxication probable au monoxyde de carbone par un groupe électrogène dans le garage, une victime qui ne répond pas mais respire, en PLS, une deuxième personne avec des maux de tête, groupe toujours en marche', 'C4a'),
      act('Fait attendre les secours devant la maison pour leur montrer le garage, où le groupe tourne toujours ; interdit à quiconque d’y entrer', 'C4b', 'C2d'),
      act('Couvre la victime et surveille sa respiration en permanence, garde un œil sur le propriétaire ; si elle ne respire plus : réanimation et défibrillateur', 'C5c'),
    ],
    prevention: {
      danger: 'Le monoxyde de carbone (gaz invisible et sans odeur) rejeté par le groupe électrogène',
      situation: 'Manon travaille dans un garage presque fermé où tourne le groupe électrogène',
      evenement: 'Le gaz s’accumule dans le garage et elle le respire longtemps',
      dommage: 'Intoxication au monoxyde de carbone, perte de connaissance',
      eviter:
        'Prévoir l’alimentation du chantier avant les travaux (branchement provisoire avec coffret de chantier) ou des outils sur batterie ; un groupe électrogène ne tourne jamais dans un local fermé : toujours dehors, loin des portes et fenêtres ; détecteur de monoxyde de carbone ; connaître les premiers signes (maux de tête, nausées, vertiges) et sortir aussitôt à l’air libre.',
      remonter: 'Chef d’équipe ou chef d’entreprise ; prévenir aussi le propriétaire.',
    },
  }),
  makeCase({
    id: 'ent-elec-08',
    title: 'Le chef d’équipe s’effondre',
    geste: 'Arrêt cardiaque',
    category: 'metier',
    tradeIds: ['elec'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans un immeuble de logements en construction, le monte-charge est en panne : avec Didier, ton chef d’équipe, tu montes à pied des couronnes de câble jusqu’au 3e étage. Ce matin, il disait avoir une douleur qui serre la poitrine, « rien de grave ». Sur le palier, il s’effondre sur le dos, à un mètre de la trémie de l’ascenseur dont la barrière a été retirée et posée contre le mur. Un apprenti plaquiste travaille à l’étage ; le défibrillateur est dans le bungalow de la base vie, au rez-de-chaussée.',
    victime: 'Mannequin allongé sur le dos sur le palier. Ne répond pas, ne respire pas.',
    temoin:
      'L’apprenti plaquiste. Propose de mettre Didier sur le côté et d’attendre les secours. Si le SST le lui demande, il remet la barrière, appelle le 15 en descendant, rapporte le défibrillateur et fait attendre les secours à l’entrée du chantier par un compagnon.',
    materiel: 'Mannequin, défibrillateur de formation, ruban ou barrière pour la trémie, couronne de câble, téléphone factice.',
    actions: [
      act('Repère la trémie sans protection à côté de la victime et remet ou fait remettre la barrière avant de s’agenouiller', 'C2a', 'C2b', 'C2d'),
      act('Examine : ne répond pas ; libère les voies aériennes ; ne respire pas (10 secondes au plus)', 'C3a', 'C3b'),
      act('Refuse la mise sur le côté, puisqu’il ne respire pas', 'C5a'),
      act('Fait alerter le 15 ou le 112 (adresse du chantier, une personne qui ne répond pas et ne respire pas, réanimation en cours, 3e étage par l’escalier, monte-charge en panne) et fait apporter le défibrillateur', 'C4a'),
      act('Débute aussitôt la réanimation : 30 compressions au milieu de la poitrine, 100 à 120 par minute, puis 2 insufflations (ou compressions seules en continu si les insufflations sont impossibles)', 'C5a', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée et suit ses instructions, sans interrompre les compressions plus que nécessaire', 'C5b'),
      act('Fait accueillir les secours à l’entrée du chantier et guider par l’escalier jusqu’au 3e étage', 'C4b'),
      act('Si un autre SST est là, se relaie avec lui toutes les 2 minutes, en interrompant le moins possible les compressions', 'C5b'),
      act('Poursuit la réanimation jusqu’au relais par les secours', 'C5c'),
    ],
    prevention: {
      danger: 'L’effort physique intense (charges lourdes portées dans l’escalier)',
      situation: 'Didier monte des couronnes de câble à pied sur trois étages, alors qu’il a eu mal à la poitrine le matin',
      evenement: 'Son cœur s’arrête pendant l’effort',
      dommage: 'Arrêt cardiaque',
      eviter:
        'Faire livrer le matériel à l’étage ou attendre la réparation du monte-charge ; sinon charges réduites, portées à deux ; prendre au sérieux une douleur dans la poitrine : arrêter l’effort et appeler le 15 dès les premiers signes ; défibrillateur signalé et accessible sur le chantier, SST formés dans l’équipe ; remettre les protections de trémie.',
      remonter: 'Chef d’entreprise ; signaler aussi au chef de chantier la trémie laissée sans protection.',
    },
  }),
];
