// Cas d'entraînement – Carreleur mosaïste : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-car-01',
    title: 'Les plaques grand format basculent',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: ['carreleur'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans le séjour d’une villa, tu poses avec Nolan des plaques de grès cérame grand format, stockées debout contre le mur, sans chevalet ni cale. En tirant une plaque, Nolan fait basculer la pile : une plaque se brise contre lui et l’arête lui ouvre la cuisse. Il s’est reculé et s’est assis par terre, le sang coule abondamment sur le sol. Trois plaques tiennent encore en équilibre contre le mur et le client s’avance pour les redresser.',
    victime:
      'Assis par terre à deux mètres de la pile, conscient, se tient la cuisse, saignement abondant. Même avec une compression bien faite, le sang continue de couler à travers le linge : le SST doit poser un garrot. Après le garrot, le saignement s’arrête. Pâle, dit qu’il a froid et que la tête lui tourne.',
    temoin:
      'Le client. Veut redresser les plaques en équilibre, puis propose d’emmener Nolan aux urgences dans sa voiture. Si le SST le demande, s’écarte de la pile, apporte la trousse de secours, appelle le 15 et va ouvrir le portail.',
    materiel:
      'Grands cartons figurant les plaques, appuyés contre un mur, tissu ou maquillage rouge, gants jetables, linge propre, garrot de formation (ou lien large et solide), tapis, couverture, téléphone factice.',
    actions: [
      act('Repère les plaques en équilibre : interdit au client d’y toucher et de passer devant la pile', 'C2a', 'C2b', 'C2d'),
      act('Repère le saignement abondant de la cuisse', 'C3a'),
      act('Comprime immédiatement la plaie avec la paume de la main, protégée (gant, sac plastique)', 'C5a', 'C5b'),
      act('Allonge la victime', 'C5b'),
      act('Fait alerter le 15 ou le 112 par le client : adresse, plaie de la cuisse par un carreau, saignement abondant, victime consciente, gestes en cours', 'C4a'),
      act('Constate que la compression est inefficace et pose un garrot entre la plaie et la racine de la cuisse, à quelques centimètres au-dessus de la plaie, serré jusqu’à l’arrêt du saignement', 'C5a', 'C5b'),
      act('Laisse le garrot visible, note l’heure de pose et ne le desserre pas', 'C5b'),
      act('Fait ouvrir le portail et guider les secours jusqu’au séjour', 'C4b'),
      act('Couvre la victime, la réconforte et surveille l’arrêt du saignement et son état jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Les plaques de grès cérame grand format, lourdes et coupantes quand elles se brisent',
      situation: 'Nolan tire seul une plaque d’une pile posée debout contre le mur, sans chevalet ni cale',
      evenement: 'La pile bascule et une plaque se brise contre lui',
      dommage: 'Plaie profonde de la cuisse, saignement abondant',
      eviter:
        'Stocker les plaques sur un chevalet ou un râtelier prévu pour, calées et sanglées ; les manipuler à deux, avec des ventouses ou un cadre de manutention ; gants anti-coupure et pantalon de travail résistant ; consigne à l’équipe : on ne tire jamais seul une plaque d’une pile.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-car-02',
    title: 'Casse-croûte au bord de la piscine',
    geste: 'Étouffement (obstruction totale)',
    category: 'metier',
    tradeIds: ['carreleur'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Tu poses la mosaïque d’une piscine avec Dylan. À la pause casse-croûte, vous mangez assis sur la plage de la piscine, au bord du bassin vide, profond de deux mètres à cet endroit. Dylan avale un gros morceau de pain au chocolat en riant, puis se lève d’un coup, les mains à la gorge, la bouche ouverte, et titube vers le bord du bassin. Aucun son ne sort, il ne tousse pas.',
    victime:
      'Debout, mains à la gorge, bouche ouverte, tout près du bord. Ne parle pas, ne tousse pas, fait « oui » de la tête. Se laisse écarter du bord. Les claques ne suffisent pas ; à la troisième compression abdominale, recrache le morceau, tousse et reparle. Dit ensuite qu’il a mal au ventre.',
    temoin:
      'Le propriétaire de la maison, qui vous a apporté le café. Crie à Dylan de lever les bras et veut lui faire boire un verre d’eau. Appelle le 15 si le SST le lui demande et met le haut-parleur.',
    materiel:
      'Ruban au sol pour le bord du bassin, pain ou emballage, chaise ou caisse, verre en plastique, téléphone factice. Claques et compressions mimées : mains bien placées, geste retenu.',
    actions: [
      act('Écarte aussitôt Dylan du bord du bassin vide, sans perdre de temps', 'C2a', 'C2b'),
      act('Demande « Tu t’étouffes ? » et constate l’obstruction totale : ne parle pas, ne tousse pas, bouche ouverte', 'C3a', 'C3b'),
      act('Demande au propriétaire d’appeler le 15, sans attendre pour commencer les gestes', 'C4a'),
      act('Refuse qu’on le fasse boire ou lever les bras', 'C5b'),
      act('Le penche en avant et donne 1 à 5 claques vigoureuses dans le dos, entre les omoplates, avec le plat de la main', 'C5a', 'C5b'),
      act('Claques inefficaces : enchaîne 1 à 5 compressions abdominales, poing au creux de l’estomac, au-dessus du nombril', 'C5a', 'C5b'),
      act('Alterne claques et compressions tant que le morceau n’est pas sorti', 'C5b'),
      act('Morceau expulsé : l’installe dans la position où il se sent le mieux, le réconforte et suit les conseils du 15', 'C5c'),
      act('Surveille sa respiration et son état jusqu’à la fin de l’appel ou l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le morceau de nourriture avalé de travers, et le bassin vide tout proche',
      situation: 'Dylan mange vite, en riant, assis au bord d’un bassin vide non protégé',
      evenement: 'Un morceau part dans les voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque d’arrêt cardiaque ; risque de chute dans le bassin',
      eviter:
        'Prendre la pause loin du bord, dans un endroit prévu pour ça (local, véhicule, table) ; protéger le bord du bassin vide pendant le chantier (garde-corps ou balisage) ; prendre le temps de manger, petites bouchées, ne pas parler ni rire la bouche pleine.',
      remonter: 'Chef d’équipe, même si tout s’est bien terminé : c’est arrivé pendant la journée de travail, et le bord du bassin n’était pas protégé.',
    },
  }),
  makeCase({
    id: 'ent-car-03',
    title: 'Les cartons du 4e étage',
    geste: 'Malaise : douleur dans la poitrine',
    category: 'metier',
    tradeIds: ['carreleur'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans un immeuble ancien sans ascenseur, ton chef d’équipe Thierry et toi montez à pied les cartons de carrelage au 4e étage. Au troisième voyage, Thierry pose son carton, s’assoit sur une marche, la main sur la poitrine : il est pâle, en sueur, dit que ça le serre « comme un étau » et que ça descend dans le bras gauche. Des cartons sont empilés en travers des marches et une voisine descend l’escalier avec ses courses.',
    victime:
      'Assis sur une marche, main à plat sur la poitrine, pâle et en sueur, un peu essoufflé. La douleur serre depuis cinq minutes et descend dans le bras gauche ; n’a jamais eu ça, pas de maladie connue, pas de traitement. Répond aux questions. Veut redescendre au fourgon « pour se reposer ». Reste conscient jusqu’à l’arrivée des secours.',
    temoin:
      'La voisine. Propose de lui donner un cachet de sa pharmacie personnelle. Sait que la pharmacie au pied de l’immeuble a un défibrillateur, mais ne le dit que si on le lui demande. Fait ensuite ce que le SST demande.',
    materiel: 'Cartons, quelques marches figurées au ruban, chaise, boîte de cachets vide, défibrillateur de formation, couverture, téléphone factice.',
    actions: [
      act('Fait dégager les cartons des marches pour que personne ne trébuche', 'C2a', 'C2b', 'C2c'),
      act('Met Thierry au repos sur le palier, assis contre le mur, dans la position où il se sent le mieux ; lui interdit de redescendre à pied', 'C5a', 'C5b'),
      act('Observe les signes et questionne : depuis quand, où ça fait mal, déjà arrivé, maladie ou traitement', 'C3a', 'C3b'),
      act('Appelle ou fait appeler le 15 sans attendre : douleur qui serre dans la poitrine et descend dans le bras gauche, sueurs, réponses aux questions', 'C4a'),
      act('Refuse le cachet de la voisine : seul le médecin du 15 décide d’un médicament (sauf traitement personnel que la victime demande à prendre)', 'C5b'),
      act('Fait apporter le défibrillateur de la pharmacie pour l’avoir à portée de main', 'C5b'),
      act('Fait attendre les secours en bas de l’immeuble et les guide jusqu’au 4e étage', 'C4b'),
      act('Applique les consignes du 15, réconforte et surveille sans le quitter, prêt à agir s’il ne répond plus ou ne respire plus', 'C5c'),
    ],
    prevention: {
      danger: 'L’effort intense et répété : cartons de carrelage montés à pied sur quatre étages',
      situation: 'Thierry monte les cartons à bras, voyage après voyage, sans pause',
      evenement: 'Son cœur ne suit plus l’effort',
      dommage: 'Malaise cardiaque (douleur dans la poitrine), risque d’arrêt cardiaque',
      eviter:
        'Faire livrer le carrelage à l’étage ou utiliser un monte-matériaux ; sinon fractionner les charges, travailler à deux et faire des pauses, ne pas encombrer l’escalier ; repérer avant le chantier le défibrillateur le plus proche ; suivi par le médecin du travail.',
      remonter: 'Chef d’entreprise, pour organiser autrement la montée du matériel.',
    },
  }),
  makeCase({
    id: 'ent-car-04',
    title: 'Le nettoyant acide',
    geste: 'Brûlure chimique',
    category: 'metier',
    tradeIds: ['carreleur'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans les douches d’un camping, Camille et toi nettoyez le voile de ciment sur le carrelage que vous venez de jointoyer. Camille verse le nettoyant acide pur dans un seau d’eau, sans gants ni lunettes : le produit éclabousse, lui coule sur l’avant-bras droit et imbibe la manche de son sweat. Elle crie que ça brûle. Le bidon débouché est resté posé au bord du seau et une odeur piquante remplit la pièce.',
    victime:
      'Debout, consciente, avant-bras droit rouge qui brûle fort, manche du sweat trempée de produit. Répond aux questions. Veut s’essuyer avec un chiffon. Se laisse rincer et retirer le sweat.',
    temoin:
      'Le gérant du camping. Propose de mettre du bicarbonate « pour neutraliser l’acide ». Si le SST le demande, ouvre la porte pour aérer, appelle le 15 en lisant l’étiquette du bidon et va attendre les secours à l’entrée du camping.',
    materiel:
      'Bidon vide étiqueté « nettoyant acide – corrosif », seau, bassine et bouteille d’eau (ou lavabo), vieux sweat, gants, ciseaux à bouts ronds, couverture, téléphone factice.',
    actions: [
      act('Referme le bidon, l’écarte et fait ouvrir la porte pour aérer', 'C2a', 'C2c'),
      act('Met des gants avant de toucher la victime et ses vêtements imbibés', 'C2b'),
      act('Examine : répond, se plaint d’une brûlure par le produit à l’avant-bras', 'C3a', 'C3b'),
      act('Rince immédiatement l’avant-bras à l’eau courante tempérée, bras tenu vers le bas pour que l’eau de rinçage ne coule ni sur la peau saine ni vers le visage', 'C5a', 'C5b'),
      act('Pendant le rinçage, retire le sweat imbibé en se protégeant, sans le faire passer devant le visage (le découpe si besoin)', 'C5b'),
      act('Refuse le bicarbonate et tout autre produit sur la brûlure', 'C5b'),
      act('Fait alerter le 15 par le gérant en donnant le nom du produit lu sur l’étiquette', 'C4a'),
      act('Garde le bidon et sa fiche de données de sécurité pour les secours', 'C5b'),
      act('Poursuit le rinçage le temps indiqué par le 15, puis couvre, réconforte et surveille jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le nettoyant acide, corrosif',
      situation: 'Camille manipule le produit pur, sans gants ni lunettes',
      evenement: 'Le produit éclabousse quand elle le verse dans le seau',
      dommage: 'Brûlure chimique de l’avant-bras',
      eviter:
        'Choisir un nettoyant moins dangereux ou déjà dilué ; lire l’étiquette et la fiche de données de sécurité avant usage ; verser doucement le produit dans l’eau, au ras du seau, dans une pièce aérée avec un point d’eau tout près ; gants, lunettes-masque et manches longues.',
      remonter: 'Chef d’équipe ou chef d’entreprise, pour revoir le choix du produit et l’équipement.',
    },
  }),
  makeCase({
    id: 'ent-car-05',
    title: 'L’escalier fraîchement encollé',
    geste: 'Traumatisme de la tête et du cou',
    category: 'metier',
    tradeIds: ['carreleur'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Tu poses le carrelage des marches de l’escalier intérieur d’une maison avec Inès ; tu gâches la colle dans l’entrée, au pied de l’escalier. En descendant avec un carton, Inès pose le pied sur une marche encollée de frais, glisse, dévale plusieurs marches et se cogne la tête. Elle est allongée sur le dos au pied de l’escalier, se plaint de la tête et du cou. Les marches sont couvertes de colle fraîche, de seaux et d’outils, et le fils des clients veut descendre de l’étage pour voir.',
    victime:
      'Allongée sur le dos au pied de l’escalier. A été « sonnée » quelques secondes, puis répond aux questions. Bosse au front, douleur au cou. Veut se relever « pour voir si ça va ». Ne bouge plus si on le lui demande. Pas de saignement.',
    temoin:
      'Le client, arrivé du salon. Veut glisser un coussin sous la tête d’Inès et l’aider à s’asseoir. Si le SST le demande, dit à son fils de rester en haut, appelle le 15 et va ouvrir la porte d’entrée.',
    materiel: 'Tapis, quelques marches figurées au ruban, seau, carton, ruban de balisage, coussin, couverture, téléphone factice.',
    actions: [
      act('Repère les marches glissantes et encombrées : interdit l’escalier et fait rester l’enfant en haut', 'C2a', 'C2b', 'C2d'),
      act('Examine : répond, a été sonnée quelques secondes, se plaint de la tête et du cou ; lui demande de ne pas bouger la tête', 'C3a', 'C3b'),
      act('Maintient la tête à deux mains, dans la position où elle se trouve, sans la tirer ni la tourner', 'C5a', 'C5b'),
      act('Refuse le coussin et qu’on l’aide à s’asseoir ou à se relever', 'C5b'),
      act('Fait alerter le 15 par le client : chute dans l’escalier, choc à la tête avec perte de connaissance de quelques secondes, douleur au cou, victime consciente', 'C4a'),
      act('Fait ouvrir la porte et dégager l’entrée pour les secours', 'C4b'),
      act('Fait couvrir la victime, lui parle et la rassure', 'C5b'),
      act('Surveille en continu (répond-elle normalement, respire-t-elle, se plaint-elle davantage) sans lâcher la tête jusqu’au relais des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Les marches glissantes (colle fraîche) et encombrées',
      situation: 'Inès descend l’escalier en cours de pose, les bras chargés d’un carton',
      evenement: 'Elle glisse sur une marche fraîchement encollée',
      dommage: 'Chute dans l’escalier, traumatisme de la tête et du cou',
      eviter:
        'Organiser la pose pour ne jamais marcher sur des marches fraîches (accès par un autre chemin, ou une marche sur deux) ; monter le matériel avant de commencer ; baliser et interdire l’escalier pendant la pose et le séchage ; chaussures antidérapantes, une main sur la rampe ; prévenir les clients.',
      remonter: 'Chef d’équipe ou chef d’entreprise, et les clients pour l’accès à l’étage pendant le chantier.',
    },
  }),
  makeCase({
    id: 'ent-car-06',
    title: 'La dépose de la vieille faïence',
    geste: 'Plaie grave : éclat dans l’œil',
    category: 'metier',
    tradeIds: ['carreleur'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la salle de bains d’un appartement ancien, Sarah dépose la vieille faïence murale au burineur électrique ; ses lunettes de protection sont restées dans le fourgon. Un éclat de faïence saute et lui arrive dans l’œil droit : elle lâche l’outil, qui continue de taper au fond de la baignoire, gâchette bloquée. Elle se tient l’œil en criant, et le propriétaire passe la tête par la porte, au milieu de la poussière et des éclats.',
    victime:
      'Assise sur le rebord de la baignoire, main devant l’œil droit sans appuyer. Douleur vive, sent quelque chose de planté, larmoie, veut frotter. Répond aux questions, se laisse allonger.',
    temoin:
      'Le propriétaire. Propose de retirer l’éclat avec le coin d’un mouchoir. Si le SST le demande, recule hors de la pièce, appelle le 15, puis descend attendre les secours en bas de l’immeuble avec le code d’accès.',
    materiel: 'Tapis, perceuse ou burineur débranché, morceaux de carton figurant la faïence, lunettes de protection, deux sacs ou vestes pour caler la tête, couverture, téléphone factice.',
    actions: [
      act('Débranche le burineur à la prise, sans approcher de l’outil qui tape', 'C2a', 'C2c'),
      act('Fait reculer le propriétaire hors de la salle de bains', 'C2b'),
      act('Examine : répond, se plaint de l’œil droit, sent quelque chose de planté', 'C3a', 'C3b'),
      act('Empêche Sarah de frotter et refuse qu’on retire l’éclat', 'C5b'),
      act('L’allonge à plat dos et lui demande de fermer les deux yeux et de ne pas bouger la tête', 'C5a', 'C5b'),
      act('Maintient sa tête à deux mains ou la cale (sacs, vestes)', 'C5b'),
      act('Fait alerter le 15 par le propriétaire : plaie de l’œil avec un éclat planté, victime consciente', 'C4a'),
      act('Fait attendre les secours en bas de l’immeuble, avec le code d’accès et l’étage', 'C4b'),
      act('Couvre, rassure et surveille jusqu’au relais des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Les éclats de faïence projetés par le burineur',
      situation: 'Sarah dépose la faïence à hauteur de visage, sans lunettes',
      evenement: 'Un éclat est projeté dans son œil',
      dommage: 'Plaie de l’œil avec corps étranger',
      eviter:
        'Outil avec capot ou aspiration, travail par petites surfaces derrière un écran ou une bâche qui retient les éclats ; lunettes-masque (ou écran facial) portées pendant toute la dépose et rangées avec l’outil ; gants et masque contre les poussières ; demander au client de ne pas entrer pendant la dépose.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-car-07',
    title: 'Le primaire dans la buanderie',
    geste: 'Ne répond pas, respire (intoxication : PLS)',
    category: 'metier',
    tradeIds: ['carreleur'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la buanderie sans fenêtre d’une maison, Léa passe un primaire à solvant sur l’ancien carrelage, porte du jardin fermée pour ne pas avoir froid. Il y a dix minutes, elle t’a crié qu’elle avait la tête qui tourne et qu’elle s’asseyait un moment. Tu ouvres la porte : une forte odeur de solvant sort, Léa est assise par terre contre le mur, à un mètre de toi, la tête tombée sur la poitrine, et ne répond pas quand tu l’appelles. Le pot de primaire est ouvert à côté d’une baladeuse allumée, et la cliente arrive derrière toi.',
    victime:
      'Assise par terre contre le mur, à un mètre de la porte, tête tombée sur la poitrine. Ne répond pas, respire normalement. Origine non traumatique et connue : intoxication par les vapeurs de solvant, sans chute (elle s’est assise d’elle-même). Se laisse allonger, tirer, puis mettre en PLS.',
    temoin:
      'La cliente. Veut entrer pour éteindre la baladeuse et refermer le pot. Fait ensuite ce que le SST demande : reste dehors, appelle le 18 ou le 112, va ouvrir le portail.',
    materiel: '2 tapis (buanderie / jardin), ligne au sol pour la porte, pot vide étiqueté « primaire – solvant », lampe éteinte figurant la baladeuse, couverture, téléphone factice.',
    actions: [
      act('Repère le danger persistant : vapeurs de solvant toxiques et inflammables, dans une pièce sans fenêtre, impossibles à supprimer sans entrer', 'C2a'),
      act('Interdit à la cliente d’entrer et de toucher la baladeuse ou un interrupteur', 'C2b', 'C2d'),
      act('Ouvre la porte en grand, retient sa respiration, allonge Léa et la tire par les chevilles ou les poignets jusque dans le jardin', 'C2e'),
      act('Examine à l’air libre : ne répond pas, respire (voies aériennes libérées, 10 secondes au plus)', 'C3a', 'C3b'),
      act('Origine non traumatique et connue (intoxication, pas de chute) : met la victime en PLS', 'C5a', 'C5b'),
      act('Fait alerter le 18 ou le 112 par la cliente : intoxication par des vapeurs de solvant, une victime qui ne répond pas et respire', 'C4a'),
      act('Ne retourne pas dans la buanderie, la laisse porte ouverte sur le jardin pour l’aérer, sans flamme ni étincelle à proximité', 'C2c', 'C2d'),
      act('Fait guider les secours depuis la rue jusqu’au jardin', 'C4b'),
      act('Couvre la victime et surveille sa respiration en permanence jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Les vapeurs de solvant du primaire, toxiques et inflammables',
      situation: 'Léa applique le primaire seule, dans une buanderie sans fenêtre, porte fermée',
      evenement: 'Les vapeurs s’accumulent et elle les respire',
      dommage: 'Intoxication, perte de connaissance (et risque d’incendie avec la baladeuse)',
      eviter:
        'Choisir un primaire sans solvant (en phase aqueuse) ; sinon ventiler en permanence (porte ouverte, extracteur), éclairage adapté loin du pot, aucune flamme ni étincelle ; ne pas travailler seul en local fermé ; masque à cartouche adapté au produit en complément ; lire la fiche de données de sécurité.',
      remonter: 'Chef d’équipe ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-car-08',
    title: 'La scie à eau du préau',
    geste: 'Arrêt cardiaque (électrisation)',
    category: 'metier',
    tradeIds: ['carreleur'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Pendant les vacances, ton entreprise refait la faïence des sanitaires d’une école. Sous le préau, ton chef d’équipe Malik vide le bac de la scie à eau sans l’avoir débranchée ; le câble de la scie a été écrasé par une palette ce matin. Tu entends un cri : Malik est allongé sur le dos à côté de la scie, immobile, une main dans l’eau du bac renversé. La gardienne de l’école arrive en courant ; un défibrillateur est accroché dans le hall.',
    victime: 'Mannequin sur le dos, une main dans la flaque près de la scie. Ne répond pas, ne respire pas.',
    temoin:
      'La gardienne. Veut relever Malik tout de suite. Sait où est le tableau électrique, mais ne le dit que si on le lui demande. Appelle le 15 et apporte le défibrillateur si le SST le lui demande.',
    materiel: 'Mannequin, défibrillateur de formation, caisse figurant la scie à eau, rallonge, flaque dessinée ou bâche bleue, téléphone factice.',
    actions: [
      act('Ne touche ni la victime ni l’eau et interdit à la gardienne d’approcher', 'C2b', 'C2d'),
      act('Débranche la rallonge à la prise murale, au sec, ou fait couper le courant au tableau', 'C2a', 'C2c'),
      act('Examine : ne répond pas, ne respire pas (voies aériennes libérées, 10 secondes au plus)', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 par la gardienne : électrisation, une victime qui ne répond pas et ne respire pas, réanimation en cours', 'C4a'),
      act('Fait apporter le défibrillateur du hall', 'C5b'),
      act('Débute aussitôt les compressions thoraciques : 30 compressions au milieu de la poitrine, 100 à 120 par minute, puis 2 insufflations (compressions seules en continu si les insufflations sont impossibles)', 'C5a', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée et suit ses instructions, en interrompant le moins possible les compressions', 'C5b'),
      act('Fait guider les secours depuis le portail jusqu’au préau', 'C4b'),
      act('Poursuit la réanimation jusqu’au relais des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique (230 V) de la scie à eau',
      situation: 'Malik met la main dans l’eau d’une scie restée branchée, dont le câble est abîmé',
      evenement: 'Le courant passe par l’eau et par son corps',
      dommage: 'Électrisation, arrêt cardiaque',
      eviter:
        'Débrancher la scie avant de la vider ou de la nettoyer ; retirer du service tout câble abîmé et faire vérifier le matériel ; prise protégée par un différentiel 30 mA, rallonge et prises hors de l’eau, câbles protégés du passage des palettes ; rappel des consignes à l’équipe.',
      remonter: 'Chef d’entreprise ; signaler le câble écrasé et mettre la scie de côté jusqu’à sa réparation.',
    },
  }),
];
