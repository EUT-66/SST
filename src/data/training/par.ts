// Cas d'entraînement – Peintre applicateur de revêtements : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-par-01',
    title: 'Le cutter qui dérape sur le lino',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: ['peintre'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la cuisine d’un appartement occupé, Yanis pose un revêtement de sol souple. À genoux, il recoupe un lé au cutter en tirant la lame vers lui : elle dérape et lui entaille profondément l’intérieur de la cuisse. Tu travailles dans le salon, tu l’entends crier et tu arrives : le sang traverse son jean et coule sur le sol encollé, le cutter est par terre, lame sortie. Mme Lopez, la locataire, est sur le pas de la porte.',
    victime:
      'Assis par terre, appuie mollement sur sa cuisse : le sang coule sans s’arrêter. Répond, respire, a peur et devient pâle. Une compression bien faite arrête le saignement.',
    temoin:
      'Mme Lopez, la locataire, âgée. Panique et apporte un rouleau d’essuie-tout et un verre d’eau. Connaît l’adresse, l’étage et le code de la porte d’entrée ; appelle les secours et va ouvrir si on le lui demande.',
    materiel:
      'Tapis, chute de lino, cutter lame rentrée (ou en carton), gants à usage unique, compresses ou linge propre, tissu rouge, couverture, téléphone factice.',
    actions: [
      act('Rentre la lame du cutter, le pose hors de portée et repère le sol glissant (colle, sang)', 'C2a', 'C2c'),
      act('Constate un saignement abondant de la cuisse, qui ne s’arrête pas', 'C3a'),
      act(
        'Comprime aussitôt l’endroit qui saigne avec la paume de la main protégée (gant, sac plastique), ou le fait comprimer par Yanis',
        'C5a',
        'C5b',
      ),
      act('Allonge Yanis au sol en gardant la compression', 'C5b'),
      act(
        'Fait alerter le 15 par Mme Lopez : adresse, étage, code, saignement abondant de la cuisse, compression en cours ; elle ne raccroche pas la première',
        'C4a',
      ),
      act('Demande à Mme Lopez d’ouvrir la porte de l’immeuble et d’accueillir les secours', 'C4b'),
      act(
        'Garde la compression ou pose un pansement compressif si elle est efficace ; si le saignement reprend, comprime par-dessus ; s’il continue, pose un garrot',
        'C5b',
        'C5c',
      ),
      act('Couvre Yanis, le réconforte et surveille le saignement, s’il répond et s’il respire, jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'La lame du cutter',
      situation: 'Yanis coupe à genoux en tirant la lame vers lui, la cuisse dans la trajectoire',
      evenement: 'La lame dérape sur le lino',
      dommage: 'Plaie profonde de la cuisse, saignement abondant',
      eviter:
        'Couteau à lame crochet ou cutter à lame qui se rentre toute seule, règle de coupe avec protège-doigts, planche de coupe ; ne jamais couper vers soi et garder les jambes hors de la trajectoire de la lame ; rentrer la lame après chaque coupe ; gants anti-coupure ; rappeler ces règles aux apprentis.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-par-02',
    title: 'La pause casse-croûte à l’hôtel',
    geste: 'Étouffement (obstruction totale)',
    category: 'metier',
    tradeIds: ['peintre'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la salle de restaurant d’un hôtel fermé pour travaux, ton équipe pose du papier peint. À la pause casse-croûte, assise sur un seau retourné entre la table à encoller et les rouleaux, Mélissa mange un sandwich en racontant une histoire. D’un coup, elle se lève, les mains autour de la gorge, la bouche ouverte, sans un bruit. Kylian, l’apprenti, lui tend une bouteille d’eau : « Bois, ça va passer ! »',
    victime:
      'Debout, les mains à la gorge, bouche ouverte : ne peut ni parler, ni tousser, ni respirer. Le morceau sort à la deuxième compression abdominale ; elle tousse, respire de nouveau et dit qu’elle a eu très peur. Les claques et les compressions sont mimées, sans appuyer.',
    temoin:
      'Kylian, l’apprenti. Veut la faire boire et lui dit de lever les bras. Pose la bouteille si on le lui demande, appelle les secours et suit les consignes.',
    materiel:
      'Seaux ou chaises, table, rouleau de papier peint, sandwich factice, bouteille d’eau, gilet ou mannequin de désobstruction si disponible, téléphone factice.',
    actions: [
      act('Repère l’absence de danger persistant et écarte la table et les seaux pour avoir de la place', 'C2a'),
      act('Constate que Mélissa ne peut ni parler, ni tousser, ni émettre un son : obstruction totale', 'C3a'),
      act('Empêche Kylian de la faire boire', 'C5a'),
      act(
        'Se place sur le côté et un peu en arrière, la penche en avant et donne 1 à 5 claques vigoureuses dans le dos, entre les omoplates, avec le plat de la main',
        'C5a',
        'C5b',
      ),
      act(
        'Claques inefficaces : se place derrière elle et fait 1 à 5 compressions abdominales (poing au creux de l’estomac, tirer vers soi et vers le haut)',
        'C5b',
      ),
      act('Alterne claques et compressions jusqu’à ce que le morceau sorte', 'C5b', 'C5c'),
      act(
        'Fait alerter le 15 par Kylian en précisant que des compressions abdominales ont été faites, et suit les conseils du médecin',
        'C4a',
      ),
      act(
        'Installe Mélissa dans la position où elle se sent le mieux, la réconforte, la couvre et surveille sa respiration jusqu’à l’avis du médecin ou l’arrivée des secours',
        'C5c',
      ),
    ],
    prevention: {
      danger: 'Les gros morceaux de nourriture avalés trop vite',
      situation: 'Mélissa mange vite en parlant, assise sur un seau au milieu du chantier',
      evenement: 'Un morceau de sandwich bloque ses voies respiratoires',
      dommage: 'Étouffement, risque d’arrêt de la respiration',
      eviter:
        'Prévoir un vrai local de pause, avec table et chaises, loin de la colle et des outils ; laisser le temps de manger sans se presser ; manger assis, par petites bouchées, sans parler la bouche pleine ; se laver les mains avant de manger ; rappeler à l’équipe qui sont les SST.',
      remonter: 'Chef d’équipe ou chef d’entreprise (organisation du local de pause).',
    },
  }),
  makeCase({
    id: 'ent-par-03',
    title: 'Coup de chaleur sur la façade',
    geste: 'Malaise (chaleur)',
    category: 'metier',
    tradeIds: ['peintre'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'En juillet, en début d’après-midi, ton équipe repeint au rouleau la façade sud d’un immeuble, depuis un échafaudage, en plein soleil. Enzo descend de l’échafaudage et s’assoit sur un seau au pied de la façade, le visage rouge et trempé de sueur. Il dit qu’il a mal à la tête, que tout tourne et qu’il a envie de vomir. Bruno, le chef d’équipe, lui tend une canette et lui dit de remonter finir la travée.',
    victime:
      'Assis au soleil, rouge, en sueur, la peau chaude. Répond, respire, parle lentement. A très peu bu depuis le matin, pas de maladie, pas de traitement. Va un peu mieux à l’ombre, au frais, en buvant de l’eau par petites gorgées.',
    temoin:
      'Bruno, le chef d’équipe. Tend une canette de boisson énergisante et veut qu’Enzo remonte. Accepte ensuite d’aider : apporte de l’eau fraîche et un linge mouillé, appelle les secours si on le lui demande.',
    materiel: 'Seau retourné, chaise ou tapis pour le coin « à l’ombre », bouteille d’eau, linge mouillé, canette vide, casque, téléphone factice.',
    actions: [
      act(
        'Repère le danger persistant : la chaleur et le soleil, qui touchent aussi le reste de l’équipe, et l’échafaudage où Enzo veut remonter',
        'C2a',
        'C2b',
      ),
      act('Interdit à Enzo de remonter sur l’échafaudage', 'C2d'),
      act('Fait installer Enzo à l’ombre, dans un endroit frais et aéré (le hall de l’immeuble)', 'C2e', 'C5a'),
      act('L’observe et le questionne : signes, depuis quand, ce qu’il a bu, maladie, traitement', 'C3a', 'C3b'),
      act('Le met au repos, desserre ses vêtements et le rafraîchit avec un linge mouillé', 'C5b'),
      act(
        'Lui fait boire de l’eau fraîche par petites quantités, car il est conscient et capable de boire ; refuse la boisson énergisante',
        'C5b',
      ),
      act('Appelle ou fait appeler le 15 : malaise à la chaleur, signes observés, ce qui a été fait ; suit les conseils du médecin', 'C4a'),
      act('Reste avec Enzo, surveille son état et rappelle le 15 s’il s’aggrave (il devient confus, ne répond plus)', 'C5c'),
    ],
    prevention: {
      danger: 'La forte chaleur et le soleil',
      situation: 'Enzo travaille en plein soleil sur l’échafaudage, aux heures les plus chaudes, en buvant peu',
      evenement: 'Son corps n’arrive plus à évacuer la chaleur',
      dommage: 'Malaise lié à la chaleur ; risque de chute s’il était resté en hauteur',
      eviter:
        'Adapter les horaires (commencer tôt, ne pas travailler en plein soleil aux heures les plus chaudes) et changer de façade selon l’ombre ; bâches ou filets d’ombrage sur l’échafaudage ; eau fraîche à disposition et pauses régulières à l’ombre ; vêtements légers et couvrants ; ne pas travailler seul et apprendre à repérer les premiers signes.',
      remonter: 'Chef de chantier ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-par-04',
    title: 'Le décapeur thermique et les chiffons',
    geste: 'Brûlure thermique grave',
    category: 'metier',
    tradeIds: ['peintre'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la cour d’une maison, sous l’auvent, Noémie décape de vieux volets en bois posés sur des tréteaux, avec un décapeur thermique. Elle pose l’appareil allumé sur le tréteau, à côté des chiffons imbibés de white-spirit : ils s’enflamment et le feu prend à la manche de sa polaire. Elle l’arrache et la jette au sol en criant. Quand tu arrives, les chiffons brûlent encore sur le tréteau, à côté du bidon de white-spirit, et le décapeur souffle toujours.',
    victime:
      'Debout, se tient l’avant-bras gauche : peau rouge vif, grandes cloques sur presque tout l’avant-bras. La manche de son tee-shirt, roussie, n’adhère pas à la peau. Répond, respire, a très mal.',
    temoin:
      'Théo, l’apprenti. Propose de mettre des glaçons et de la crème. Sait où sont l’extincteur de la camionnette et le tuyau d’arrosage ; obéit ensuite.',
    materiel:
      'Tréteaux et planche, décapeur thermique débranché (ou sèche-cheveux), chiffons, bidon vide étiqueté « white-spirit », extincteur vide ou factice, tuyau ou bouteilles d’eau et bassine, couverture, téléphone factice.',
    actions: [
      act('Fait débrancher le décapeur et éloigner le bidon de white-spirit, sans se mettre en danger', 'C2a', 'C2c'),
      act('Éteint ou fait éteindre le feu des chiffons avec l’extincteur et éloigne Noémie du tréteau', 'C2c', 'C2e'),
      act('Examine : Noémie répond, respire ; brûlure avec de grandes cloques sur l’avant-bras, donc grave', 'C3a', 'C3b'),
      act(
        'Arrose immédiatement l’avant-bras à l’eau courante tempérée, avec un faible débit, pendant au moins 10 minutes (idéalement 20)',
        'C5a',
        'C5b',
      ),
      act('En même temps, fait retirer le tee-shirt, qui n’adhère pas à la peau', 'C5b'),
      act('Refuse les glaçons et la crème', 'C5b'),
      act(
        'Fait alerter le 15 par Théo : brûlure grave de l’avant-bras par le feu, grandes cloques, arrosage en cours ; applique les conseils du médecin',
        'C4a',
      ),
      act('Poursuit l’arrosage, couvre le reste du corps, réconforte Noémie et surveille son état jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'La chaleur du décapeur thermique et le white-spirit inflammable',
      situation: 'Noémie pose le décapeur allumé à côté de chiffons imbibés de solvant',
      evenement: 'Les chiffons prennent feu et la flamme atteint sa manche',
      dommage: 'Brûlure thermique grave de l’avant-bras',
      eviter:
        'Choisir si possible une méthode de décapage sans forte chaleur, adaptée au support ; sinon zone de travail débarrassée des solvants et des chiffons (rangés dans un récipient métallique fermé), support prévu pour poser le décapeur, appareil arrêté dès qu’on le pose, extincteur à portée de main ; vêtements en coton couvrants et gants ; formation à l’utilisation de l’extincteur.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-par-05',
    title: 'L’échafaudage roulant qui bascule',
    geste: 'Traumatisme du cou',
    category: 'metier',
    tradeIds: ['peintre'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans un gymnase, ton équipe repeint le haut des murs depuis un échafaudage roulant. Pour aller plus vite, Rayan reste sur le plancher pendant que Jordan pousse l’échafaudage vers la travée suivante. Une roue bute contre le bord d’un tapis de sol : l’échafaudage bascule et Rayan tombe d’environ deux mètres. Quand tu arrives, il est allongé sur le dos, l’échafaudage couché à côté de lui, un pot de peinture renversé au sol ; des agents de la mairie s’approchent.',
    victime:
      'Allongé sur le dos. Répond, respire, ne saigne pas. Se plaint d’une forte douleur au cou et en haut du dos, n’ose pas bouger. Essaie de se relever si personne ne l’en empêche.',
    temoin:
      'Jordan, le collègue qui poussait. Paniqué, veut asseoir Rayan contre le mur. Ensuite, appelle les secours et va les attendre à l’entrée du gymnase si on le lui demande.',
    materiel: 'Tapis, escabeau couché ou cadre pour figurer l’échafaudage, pot de peinture vide, ruban de balisage, couverture, téléphone factice.',
    actions: [
      act(
        'Repère l’échafaudage couché et la peinture renversée qui rend le sol glissant ; fait reculer les agents de la mairie et balise la zone',
        'C2a',
        'C2b',
        'C2d',
      ),
      act('Examine : Rayan répond, respire, ne saigne pas ; il a mal au cou après une chute de hauteur', 'C3a', 'C3b'),
      act('Lui demande de ne pas bouger la tête et empêche Jordan de l’asseoir', 'C5a'),
      act('Se met à genoux dans l’axe de sa tête et la maintient à deux mains, dans la position où elle se trouve', 'C5b'),
      act(
        'Fait alerter le 15 par Jordan : chute d’environ deux mètres d’un échafaudage roulant, douleur au cou, victime consciente, tête maintenue',
        'C4a',
      ),
      act('Fait ouvrir les portes et envoie Jordan accueillir les secours à l’entrée du gymnase', 'C4b'),
      act('Fait couvrir Rayan sans le bouger, le réconforte et lui parle', 'C5b'),
      act('Ne lâche pas la tête et surveille (il répond, il respire) jusqu’à la prise en charge par les secours', 'C5c'),
    ],
    prevention: {
      danger: 'La hauteur du plancher de l’échafaudage roulant (environ deux mètres)',
      situation: 'Rayan reste sur le plancher pendant que l’échafaudage est déplacé',
      evenement: 'Une roue bute contre un tapis et l’échafaudage bascule',
      dommage: 'Chute, traumatisme du cou et du dos',
      eviter:
        'Ne jamais déplacer un échafaudage roulant avec quelqu’un dessus : descendre avant chaque déplacement ; dégager et vérifier le sol sur le trajet ; échafaudage monté selon la notice, garde-corps en place, roues bloquées et stabilisateurs sortis avant de monter ; utilisation par des personnes formées ; rappel de la règle à toute l’équipe.',
      remonter: 'Chef de chantier ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-par-06',
    title: 'Un fil de brosse dans l’œil',
    geste: 'Plaie grave de l’œil (corps étranger)',
    category: 'metier',
    tradeIds: ['peintre'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Devant un pavillon, Camille prépare un vieux portail en fer avant de le repeindre : elle enlève la rouille avec une brosse métallique montée sur une meuleuse. Ses lunettes, pleines de buée, sont remontées sur son front. Elle crie, lâche la meuleuse et met la main sur son œil droit : un fil de la brosse s’y est planté. La meuleuse tourne encore par terre, branchée sur la rallonge, et des passants marchent sur le trottoir. Hugo, ton collègue, sort une pince de sa caisse à outils.',
    victime:
      'Debout, la main sur l’œil droit, pleure et a très mal ; un fil métallique dépasse de l’œil. Répond, respire, ne saigne pas abondamment. Veut se frotter l’œil.',
    temoin:
      'Hugo, le collègue. Veut retirer le fil avec sa pince. Ensuite, appelle les secours et va les attendre au bout de la rue si on le lui demande.',
    materiel:
      'Meuleuse débranchée sans brosse (ou en carton), rallonge, lunettes de protection, ruban de balisage, couverture, bout de cure-pipe collé sur la joue, sous l’œil, pour figurer le fil, téléphone factice.',
    actions: [
      act('Fait débrancher la rallonge à la prise pour arrêter la meuleuse, sans s’approcher de la brosse qui tourne', 'C2a', 'C2c'),
      act('Fait écarter les passants et balise le trottoir', 'C2b', 'C2d'),
      act('Examine : Camille répond, respire, ne saigne pas abondamment ; un fil métallique est planté dans son œil droit', 'C3a', 'C3b'),
      act('Empêche Hugo de retirer le fil et Camille de se frotter l’œil : on ne retire jamais un corps étranger planté', 'C5a'),
      act('L’allonge sur le dos, lui demande de fermer les deux yeux et maintient sa tête à deux mains', 'C5a', 'C5b'),
      act('Fait alerter le 15 par Hugo : plaie de l’œil par un fil de brosse métallique encore planté, victime consciente', 'C4a'),
      act('Envoie Hugo attendre les secours au bout de la rue pour les guider', 'C4b'),
      act(
        'La couvre, la réconforte, lui rappelle de garder les yeux fermés et surveille son état jusqu’à l’arrivée des secours',
        'C5c',
      ),
    ],
    prevention: {
      danger: 'Les fils et éclats projetés par la brosse métallique qui tourne',
      situation: 'Camille brosse le portail avec ses lunettes remontées sur le front, près des passants',
      evenement: 'Un fil se détache de la brosse et part dans son œil',
      dommage: 'Plaie grave de l’œil, risque de perte de la vue',
      eviter:
        'Choisir si possible un procédé qui projette moins ; sinon brosse en bon état et adaptée à la vitesse de la meuleuse, carter en place ; zone balisée pour les passants ; lunettes ou écran facial anti-projection, avec traitement anti-buée, gardés sur les yeux ; gants ; rappel du port des protections.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-par-07',
    title: 'Le chauffage au gaz dans le garage',
    geste: 'Ne répond pas, respire (intoxication : PLS)',
    category: 'metier',
    tradeIds: ['peintre'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'En janvier, Sofiane et Clara, l’apprentie, enduisent les murs du garage d’un pavillon en rénovation. Pour faire sécher plus vite, un chauffage d’appoint au gaz tourne depuis le matin, porte basculante fermée à cause du froid. Clara sort en se tenant la tête : elle a mal à la tête, envie de vomir, et Sofiane ne lui répond plus. Par la porte de service, tu le vois à deux mètres de l’entrée, affalé par terre contre le mur ; le chauffage tourne toujours.',
    victime:
      'Affalé au sol contre le mur. Ne répond pas, respire. Origine non traumatique : il s’est plaint de mal de tête, s’est assis par terre pour se reposer, puis s’est affaissé doucement, sans tomber ni se cogner (Clara l’a vu). Se laisse tirer et tourner.',
    temoin:
      'Clara, l’apprentie, elle aussi intoxiquée : mal de tête, nausée. Veut retourner chercher Sofiane. Raconte, si on le lui demande, qu’il s’est assis puis affaissé sans se cogner. Appelle les secours si on le lui demande, en restant dehors.',
    materiel: 'Tapis, carton étiqueté « chauffage gaz », porte de la salle pour figurer la porte du garage, couverture, téléphone factice.',
    actions: [
      act(
        'Repère le danger : chauffage au gaz dans un garage fermé et maux de tête de Clara, donc gaz toxique (monoxyde de carbone) probable',
        'C2a',
      ),
      act('Garde Clara dehors, à l’air frais, et interdit à quiconque d’entrer dans le garage', 'C2b', 'C2d'),
      act('Ouvre en grand la porte basculante depuis l’extérieur pour aérer', 'C2c'),
      act(
        'Sofiane est visible et tout près de l’entrée : le tire rapidement à l’air libre, sans s’attarder dans le garage (dégagement d’urgence)',
        'C2e',
      ),
      act('Examine : Sofiane ne répond pas ; l’allonge sur le dos, libère les voies aériennes ; il respire', 'C3a', 'C3b'),
      act(
        'Fait alerter le 18 (ou le 15, le 112) par Clara : intoxication probable par un chauffage au gaz dans un garage fermé, deux victimes, l’une ne répond pas mais respire, l’autre a mal à la tête',
        'C4a',
      ),
      act('Met Sofiane en PLS, car son état ne vient pas d’un traumatisme : il s’est affaissé sans tomber ni se cogner', 'C5a', 'C5b'),
      act(
        'Le couvre, surveille en permanence sa respiration et l’état de Clara ; si Sofiane ne respire plus, commence la réanimation',
        'C5c',
      ),
    ],
    prevention: {
      danger: 'Le monoxyde de carbone dégagé par le chauffage au gaz (gaz invisible et sans odeur)',
      situation: 'Sofiane et Clara travaillent dans un garage fermé où le chauffage tourne depuis le matin',
      evenement: 'Le gaz s’accumule et ils le respirent',
      dommage: 'Intoxication au monoxyde de carbone, perte de connaissance',
      eviter:
        'Ne jamais utiliser d’appareil à combustion (chauffage au gaz, groupe électrogène) dans un local fermé ; pour le séchage, chauffage électrique ou déshumidificateur ; sinon aération permanente et détecteur de monoxyde de carbone ; ne pas travailler seul ; informer l’équipe des premiers signes (mal de tête, nausée, envie de dormir).',
      remonter: 'Chef d’entreprise ou conducteur de travaux.',
    },
  }),
  makeCase({
    id: 'ent-par-08',
    title: 'La spatule et la prise sous tension',
    geste: 'Arrêt cardiaque (électrisation)',
    category: 'metier',
    tradeIds: ['peintre'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une chambre vide d’une résidence pour personnes âgées, Laura décolle un vieux papier peint à la décolleuse à vapeur. Elle a enlevé la plaque d’une prise pour gratter autour avec sa spatule métallique ; le mur ruisselle. Tu entends un claquement et un cri : Laura est allongée au pied du mur, immobile, la main encore sur la spatule coincée contre la prise. La décolleuse siffle toujours. Le tableau électrique de la chambre est dans l’entrée ; un défibrillateur est à l’accueil, au rez-de-chaussée.',
    victime: 'Mannequin allongé sur le dos au pied du mur, une main sur la spatule. Ne répond pas, ne respire pas.',
    temoin:
      'Maxime, un collègue. Veut tirer Laura loin du mur tout de suite. Coupe le disjoncteur si on le lui demande, puis va à l’accueil faire appeler les secours et rapporter le défibrillateur ; peut faire guider les secours par l’agent d’accueil.',
    materiel:
      'Mannequin, défibrillateur de formation, spatule, prise sans plaque dessinée sur une feuille, carton pour la décolleuse, tableau électrique dessiné, téléphone factice.',
    actions: [
      act('Ne touche ni Laura ni le mur mouillé et retient Maxime qui veut la tirer', 'C2a', 'C2b'),
      act(
        'Fait couper le courant au tableau électrique de la chambre et vérifie que la décolleuse s’est arrêtée avant de toucher Laura',
        'C2c',
      ),
      act('Examine : Laura ne répond pas ; libère les voies aériennes ; elle ne respire pas', 'C3a', 'C3b'),
      act(
        'Envoie Maxime à l’accueil : faire alerter le 15 (arrêt cardiaque après électrisation, adresse, étage, numéro de chambre, réanimation en cours) et rapporter le défibrillateur',
        'C4a',
      ),
      act(
        'Commence aussitôt la réanimation : 30 compressions au milieu de la poitrine, à 100 à 120 par minute, puis 2 insufflations, et répète les cycles (compressions seules si les insufflations sont impossibles)',
        'C5a',
        'C5b',
      ),
      act(
        'Dès l’arrivée du défibrillateur, le met en marche, colle les électrodes sur la poitrine nue et sèche, suit ses instructions et fait écarter tout le monde pendant l’analyse et le choc',
        'C5b',
      ),
      act('Fait guider les secours par l’agent d’accueil jusqu’à la chambre', 'C4b'),
      act(
        'Reprend les compressions dès que le défibrillateur le demande, se relaie si possible avec un autre SST toutes les 2 minutes, jusqu’à la prise en charge par les secours',
        'C5c',
      ),
    ],
    prevention: {
      danger: 'Le courant électrique de la prise sans plaque',
      situation: 'Laura gratte avec une spatule métallique autour d’une prise sous tension, sur un mur mouillé par la vapeur',
      evenement: 'La spatule touche les fils et le courant traverse son corps',
      dommage: 'Électrisation, arrêt cardiaque',
      eviter:
        'Faire couper et vérifier le circuit au tableau, par une personne habilitée, avant de déposer les plaques et de mouiller le mur ; protéger les boîtiers vides avec un cache ; outils à manche isolant ; décolleuse et rallonge en bon état, branchées sur une prise protégée par un différentiel 30 mA ; informer et former l’équipe à ces règles.',
      remonter: 'Chef d’équipe ou chef d’entreprise, qui prévient le responsable de la résidence.',
    },
  }),
];
