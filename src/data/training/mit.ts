// Cas d'entraînement – Monteur en installations thermiques : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';
const MIT = ['mit'];

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-mit-01',
    title: 'La vitre du poêle à granulés',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans le salon d’une maison, tu installes un poêle à granulés avec Kylian. Il porte la porte vitrée du poêle quand il se prend les pieds dans un carton d’emballage : la vitre se brise et lui entaille l’avant-bras. Quand tu te retournes, il est à genoux au milieu des éclats de verre et le sang coule en abondance sur le parquet. La cliente arrive de la cuisine, en chaussons.',
    victime:
      'À genoux dans les éclats, tient son avant-bras gauche qui saigne beaucoup. Répond aux questions, a peur. Appuie lui-même sur la plaie si le SST le lui demande : la compression arrête le saignement. Si on le laisse à genoux, dit que la tête lui tourne.',
    temoin:
      'La cliente, en chaussons. Veut s’approcher en marchant dans le verre et propose de passer le bras sous l’eau du robinet. Fait ensuite ce que le SST demande : appeler les secours, apporter un linge propre, ouvrir le portail et attendre les secours dehors.',
    materiel:
      'Tissu ou maquillage rouge, morceaux de carton figurant les éclats de verre, carton d’emballage, gants, linge propre, bande, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère les éclats de verre et arrête la cliente en chaussons avant qu’elle approche', 'C2a', 'C2b', 'C2d'),
      act('Écarte les éclats avec ses chaussures de sécurité ou un balai pour faire une place sans verre', 'C2c'),
      act('Voit le saignement abondant et fait appuyer la victime sur la plaie, ou comprime lui-même avec la paume, main protégée', 'C3a', 'C5a', 'C5b'),
      act('Allonge la victime sur la place dégagée, sans relâcher la compression', 'C5b'),
      act('Fait alerter le 15 ou le 112 : adresse, plaie de l’avant-bras par du verre, saignement abondant, compression en cours', 'C4a'),
      act('Demande à la cliente d’ouvrir le portail et d’attendre les secours dehors', 'C4b'),
      act('Relaie par un pansement compressif une fois le saignement arrêté', 'C5b'),
      act('Sait quoi faire si ça saigne à nouveau : comprimer sur le pansement, puis garrot si le saignement continue', 'C5b'),
      act('Couvre, réconforte et surveille la victime et le pansement jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le verre de la porte du poêle, coupant quand il se brise',
      situation: 'Kylian transporte la vitre à mains nues dans une pièce encombrée par les emballages',
      evenement: 'Il trébuche sur un carton, la vitre tombe et se brise',
      dommage: 'Plaie profonde de l’avant-bras avec saignement abondant',
      eviter:
        'Laisser la porte vitrée montée sur le poêle ou dans son emballage jusqu’au dernier moment. Dégager le passage et sortir les cartons au fur et à mesure. Porter à deux les pièces fragiles ou encombrantes. Gants anti-coupure et manches longues.',
      remonter: 'Maître d’apprentissage ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-mit-02',
    title: 'Le casse-croûte dans le bungalow',
    geste: 'Étouffement : obstruction totale',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Pause de 10 heures dans le bungalow du chantier d’une école où vous remplacez la chaufferie, avec Jade et un collègue plombier. Sur la table, de l’eau chauffe dans une casserole posée sur un réchaud à gaz. Jade mange une pomme en racontant sa soirée quand, d’un coup, elle se lève en renversant sa chaise, les mains à la gorge et la bouche ouverte. Elle ne tousse pas et aucun son ne sort.',
    victime:
      'Debout près de la table, mains à la gorge, bouche ouverte. Ne peut ni parler ni tousser, fait oui de la tête si on lui demande si elle s’étouffe. Les claques dans le dos ne suffisent pas. À la troisième compression abdominale, « recrache » le morceau, tousse et reparle.',
    temoin:
      'Le collègue plombier. Veut lui faire boire un verre d’eau, puis lui tape dans le dos alors qu’elle est bien droite. S’arrête si le SST le lui dit, puis éteint le réchaud et appelle les secours si on le lui demande.',
    materiel:
      'Table, chaise, pomme ou emballage, casserole vide et boîte figurant le réchaud, verre, couverture, téléphone factice. Claques et compressions mimées : mains bien placées, geste retenu.',
    actions: [
      act('Repère le réchaud allumé et la casserole d’eau chaude, fait éteindre le réchaud par le collègue', 'C2a', 'C2c'),
      act('Demande « Tu t’étouffes ? » et reconnaît l’obstruction totale : elle ne parle pas, ne tousse pas', 'C3a', 'C3b'),
      act('Refuse le verre d’eau', 'C5b'),
      act('Se place sur le côté, un peu en arrière, penche la victime en avant et donne 1 à 5 claques vigoureuses entre les omoplates', 'C5a', 'C5b'),
      act('Les claques n’ayant pas suffi, donne 1 à 5 compressions abdominales, poing au creux de l’estomac, et alterne avec les claques', 'C5b'),
      act('Arrête dès que le morceau sort et installe la victime dans la position où elle se sent le mieux', 'C5c'),
      act('Fait appeler le 15 pour un avis médical après les compressions abdominales et suit ses conseils', 'C4a'),
      act('Réconforte, couvre et surveille la victime', 'C5c'),
    ],
    prevention: {
      danger: 'Le morceau de pomme',
      situation: 'Jade mange vite, de grosses bouchées, en parlant et en riant',
      evenement: 'Elle avale de travers et le morceau bloque les voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque d’arrêt cardiaque',
      eviter:
        'Prendre le temps de manger assis, par petites bouchées, sans parler la bouche pleine. Pour le bungalow : remplacer le réchaud à gaz par une bouilloire électrique posée à l’écart de la table.',
      remonter: 'Chef de chantier, même si tout s’est bien fini (accident sur le temps de travail), en signalant aussi le réchaud dans le bungalow.',
    },
  }),
  makeCase({
    id: 'ent-mit-03',
    title: 'Collage PVC dans le vide sanitaire',
    geste: 'Malaise : intoxication par des vapeurs de solvant',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans une maison ancienne, Manon colle depuis une heure les tubes PVC de l’évacuation des condensats, à plat ventre dans le vide sanitaire, un pot de colle ouvert à côté d’elle. Elle ressort par la trappe du cellier, s’assoit par terre et te dit qu’elle a mal à la tête, envie de vomir et qu’elle se sent « comme ivre ». Une forte odeur de solvant sort de la trappe. La propriétaire arrive derrière toi.',
    victime:
      'Assise par terre près de la trappe, pâle, parle lentement. Mal à la tête, nausée, la tête qui tourne depuis un quart d’heure. 18 ans, première fois, pas de maladie ni de traitement, aucune chute. Répond aux questions. Va un peu mieux après quelques minutes à l’air frais.',
    temoin:
      'La propriétaire. Veut descendre dans le vide sanitaire pour refermer le pot de colle. Obéit si le SST le lui interdit, puis ouvre porte et fenêtres et appelle les secours si on le lui demande.',
    materiel: 'Ruban pour délimiter la trappe, pot de colle vide, chaise, couverture, téléphone factice.',
    actions: [
      act('Repère l’odeur de solvant : l’air du vide sanitaire est chargé de vapeurs', 'C2a'),
      act('Interdit à la propriétaire de descendre et à quiconque d’entrer dans le vide sanitaire', 'C2b', 'C2d'),
      act('Fait sortir la victime du cellier et l’installe au repos à l’air frais, dans la position où elle se sent le mieux', 'C2e', 'C5a', 'C5b'),
      act('Fait aérer (porte et fenêtres du cellier ouvertes) sans entrer dans le vide sanitaire', 'C2c'),
      act('Observe et questionne : signes, depuis quand, première fois, maladie, traitement, produit respiré', 'C3a', 'C3b'),
      act('Appelle ou fait appeler le 15, décrit les signes et donne le nom de la colle (étiquette d’un pot neuf ou fiche de données de sécurité)', 'C4a'),
      act('Applique les conseils du médecin', 'C5b'),
      act('Reste avec la victime et la surveille ; si elle ne répond plus mais respire, la met en PLS (malaise sans chute)', 'C5c'),
    ],
    prevention: {
      danger: 'Les vapeurs de solvant de la colle PVC',
      situation: 'Manon travaille longtemps dans un vide sanitaire peu aéré, le visage près du pot ouvert',
      evenement: 'Les vapeurs s’accumulent dans cet espace fermé et elle les respire',
      dommage: 'Intoxication : maux de tête, nausées, vertiges, risque de perte de connaissance',
      eviter:
        'Choisir des raccords sans colle (à joint) ou préparer les assemblages à l’extérieur. Sinon : ventiler le vide sanitaire (trappes ouvertes, extracteur), refermer le pot après chaque usage, travailler à deux avec un collègue à la trappe, pauses à l’air libre, masque adapté si l’aération ne suffit pas. Lire l’étiquette et la fiche de données de sécurité.',
      remonter: 'Maître d’apprentissage ou chef d’entreprise, qui organise le travail dans les espaces peu aérés.',
    },
  }),
  makeCase({
    id: 'ent-mit-04',
    title: 'L’arc électrique au tableau',
    geste: 'Brûlure électrique',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans le garage d’une maison, vous raccordez une pompe à chaleur neuve. Pour gagner du temps, ton collègue Mehdi branche le câble dans le tableau électrique sans couper le courant : son tournevis provoque un court-circuit, avec un flash et une détonation. Mehdi recule en se tenant la main droite, le visage rougi et noirci, et un peu de fumée sort du tableau. Le client arrive en courant ; l’évier de la buanderie est juste à côté.',
    victime:
      'Debout, ne touche plus le tableau, tient sa main droite. Rougeur et cloques sur le dos de la main et les doigts, visage rouge, porte une montre. Répond aux questions, dit qu’il a senti « une décharge dans le bras ». Reste conscient jusqu’à la fin.',
    temoin:
      'Le client. Veut jeter un verre d’eau sur le tableau qui fume, puis propose de la crème contre les brûlures. Sait où est le disjoncteur général si on le lui demande. Obéit ensuite au SST.',
    materiel:
      'Boîte en carton « tableau électrique », boîte « disjoncteur général », tournevis, maquillage rouge, montre, bouteille d’eau et bassine (ou lavabo), chaise, couverture, téléphone factice.',
    actions: [
      act('Ne touche pas au tableau et éloigne la victime et le client de la fumée', 'C2a', 'C2b'),
      act('Coupe le courant au disjoncteur général, sans toucher le tableau abîmé', 'C2c'),
      act('Interdit de jeter de l’eau sur le tableau ; s’il prend feu, fait sortir tout le monde et appeler le 18', 'C2d'),
      act('Examine : répond, brûlures à la main et au visage, a senti le courant passer dans le bras', 'C3a', 'C3b'),
      act('Arrose tout de suite la main et le visage à l’eau courante tempérée, au moins 10 minutes, idéalement 20', 'C5a', 'C5b'),
      act('Retire la montre pendant l’arrosage, ne retire rien qui colle à la peau, refuse la crème', 'C5b'),
      act('Fait alerter le 15 : brûlure électrique, donc toujours grave, avec passage possible du courant', 'C4a'),
      act('Couvre après l’arrosage, réconforte et surveille jusqu’aux secours, prêt à agir s’il ne répond plus', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique du tableau et l’arc d’un court-circuit',
      situation: 'Mehdi travaille dans un tableau électrique resté sous tension',
      evenement: 'Son tournevis touche deux conducteurs et provoque un court-circuit',
      dommage: 'Brûlures électriques de la main et du visage, électrisation possible',
      eviter:
        'Couper et consigner avant de travailler : disjoncteur ouvert, cadenassé et étiqueté, absence de tension vérifiée. Faire le raccordement par une personne formée et habilitée. Outils isolés, gants et écran facial adaptés en complément.',
      remonter: 'Chef d’entreprise ou maître d’apprentissage, et le client pour faire vérifier son tableau avant toute remise sous tension.',
    },
  }),
  makeCase({
    id: 'ent-mit-05',
    title: 'Chute à l’arrière du fourgon',
    geste: 'Traumatisme du cou',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Vous livrez une chaudière dans une rue étroite du centre-ville, le fourgon arrêté en double file sans feux de détresse. Ton collègue Adam recule dans le fourgon en tirant le carton, rate le bord du plancher et tombe en arrière sur la chaussée. Il est allongé sur le dos derrière le fourgon, conscient, et dit qu’il a très mal à la nuque. Des voitures commencent à contourner le fourgon et une passante s’arrête.',
    victime:
      'Allongé sur le dos sur la chaussée, conscient. Très mal à la nuque, picotements dans les mains. Veut tourner la tête pour regarder les voitures et essaie une fois de se relever, puis écoute le SST.',
    temoin:
      'Une passante. Propose de tirer Adam sur le trottoir « pour qu’il ne se fasse pas écraser » ou de lui glisser son blouson roulé sous la tête. Fait ensuite ce que le SST demande : enfiler un gilet et faire ralentir les voitures, appeler les secours, les guider.',
    materiel:
      'Tapis, deux chaises figurant l’arrière du fourgon, carton, gilets haute visibilité, triangle ou plots, blouson, couverture, téléphone factice.',
    actions: [
      act('Repère la circulation, allume les feux de détresse et enfile un gilet haute visibilité', 'C2a', 'C2d'),
      act('Fait baliser en amont par la passante, en gilet, avec le triangle ou les plots du fourgon, sans qu’elle se mette en danger', 'C2b', 'C2d'),
      act('Demande à la victime de ne pas bouger la tête ; refuse qu’on la tire sur le trottoir ou qu’on lui glisse un blouson sous la tête', 'C5a', 'C5b'),
      act('Questionne : où a-t-il mal, sent-il et bouge-t-il ses mains et ses pieds', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 : adresse précise, chute du fourgon sur la chaussée, douleur à la nuque et picotements dans les mains', 'C4a'),
      act('Maintient la tête à deux mains, dans la position où elle se trouve', 'C5b'),
      act('Fait couvrir la victime', 'C5b'),
      act('Parle à la victime et la surveille sans lâcher la tête jusqu’aux secours', 'C5c'),
      act('Fait guider les secours jusqu’au fourgon', 'C4b'),
    ],
    prevention: {
      danger: 'Le vide à l’arrière du fourgon, au-dessus de la chaussée',
      situation: 'Adam se déplace à reculons dans le fourgon, les mains prises par le carton, près du bord',
      evenement: 'Il rate le bord du plancher et tombe en arrière',
      dommage: 'Traumatisme du cou, possible atteinte de la colonne vertébrale',
      eviter:
        'Préparer la livraison : place de livraison réservée, zone de déchargement balisée. Décharger avec un hayon élévateur ou une rampe et un diable, sans jamais marcher à reculons vers le bord. Gilet haute visibilité et chaussures de sécurité.',
      remonter: 'Chef d’entreprise ou responsable du planning, qui organise les livraisons et l’équipement des fourgons.',
    },
  }),
  makeCase({
    id: 'ent-mit-06',
    title: 'Le gant pris dans la fileteuse',
    geste: 'Plaie grave : section du bout d’un doigt',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'À l’atelier de l’entreprise, Lina filète des tubes acier pour une chaufferie ; pour ne pas tenir la pédale de la machine, elle l’a bloquée avec une cale. Elle essuie l’huile de coupe sur le tube qui tourne, avec ses gants : le gant est happé et la machine lui entraîne la main. Quand tu arrives, la machine tourne toujours, Lina serre sa main gauche contre elle en criant et le bout de son index est par terre. Le magasinier accourt.',
    victime:
      'Debout, serre sa main gauche contre son ventre, a très mal, panique. Le bout de l’index gauche est coupé, la plaie saigne peu. Répond aux questions. Si on la laisse debout, dit qu’elle se sent partir.',
    temoin:
      'Le magasinier. Veut ramasser le bout de doigt et le mettre directement dans un verre d’eau ou sur des glaçons. Sait où sont la trousse de secours et les glaçons. Fait ce que le SST demande.',
    materiel:
      'Carton figurant la machine avec un gros bouton rouge « arrêt d’urgence », gant, morceau de pâte à modeler pour le bout de doigt, compresses ou linge propre, deux sacs plastique, boîte et sachet de glaçons, tapis, couverture, téléphone factice.',
    actions: [
      act('Appuie sur l’arrêt d’urgence de la machine (ou la débranche), sans approcher les mains des pièces qui tournent', 'C2a', 'C2c'),
      act('Examine : ne saigne pas abondamment, répond, a le bout de l’index sectionné', 'C3a', 'C3b'),
      act('Installe la victime allongée (ou assise) pour éviter qu’elle tombe', 'C5b'),
      act('Fait alerter le 15 ou le 112 : section du bout de l’index par une machine, victime consciente', 'C4a'),
      act('Protège le moignon avec des compresses ou un linge propre', 'C5a', 'C5b'),
      act('Met le bout de doigt dans un sac fermé, posé dans un contenant réfrigéré, sans contact direct avec la glace ni avec l’eau', 'C5b'),
      act('Envoie le magasinier ouvrir et guider les secours jusqu’à l’atelier', 'C4b'),
      act('Couvre, réconforte et surveille la victime jusqu’aux secours, et leur remet le bout de doigt', 'C5c'),
    ],
    prevention: {
      danger: 'Le tube et la tête de la machine à fileter en rotation',
      situation: 'Lina travaille avec des gants près des pièces qui tournent, la pédale bloquée par une cale',
      evenement: 'Son gant est happé par le tube en rotation',
      dommage: 'Section du bout de l’index',
      eviter:
        'Commander des tubes déjà filetés ou utiliser des raccords à sertir. Sinon : ne jamais bloquer la pédale, vérifier carter et arrêt d’urgence, arrêter la machine pour essuyer ou nettoyer, pas de gants ni de vêtements amples près des pièces qui tournent, formation au poste.',
      remonter: 'Responsable de l’atelier ou chef d’entreprise, en signalant la pédale bloquée.',
    },
  }),
  makeCase({
    id: 'ent-mit-07',
    title: 'Chute par la trémie de l’escalier',
    geste: 'Victime qui ne répond pas, respire (chute : reste sur le dos)',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur un chantier de logements neufs, tu poses le plancher chauffant au premier étage avec Sarah. Elle déroule le tube à reculons et tombe par la trémie de l’escalier, dont le garde-corps a été retiré. Par l’ouverture, tu la vois allongée sur le dos sur la dalle du rez-de-chaussée, immobile, et la couronne de tube pend à moitié au bord de la trémie, au-dessus d’elle. Un plaquiste qui travaille à ton étage accourt.',
    victime:
      'Allongée sur le dos sur la dalle. Ne répond pas, ne réagit pas quand on lui prend la main, respire normalement. Origine traumatique (chute d’un étage) : on la laisse sur le dos, on ne la met pas en PLS.',
    temoin:
      'Le plaquiste. Se penche au bord de la trémie pour regarder, puis, en bas, propose de mettre Sarah « sur le côté ». Fait ensuite ce que le SST demande : barrer la trémie, appeler les secours, aller les attendre à l’entrée du chantier.',
    materiel:
      'Tapis, ruban ou deux chaises figurant la trémie, rouleau de tuyau pour la couronne de tube, barrière ou planche, couverture, téléphone factice.',
    actions: [
      act('Reste à distance du bord et éloigne le plaquiste de la trémie', 'C2a', 'C2b'),
      act('Fait retirer la couronne de tube du bord et barrer la trémie (barrière, planches ou ruban)', 'C2c', 'C2d'),
      act('Descend par l’accès de chantier prévu, sans se précipiter, et vérifie que personne ne travaille au-dessus de la victime', 'C2a'),
      act('Examine : ne répond pas, ne réagit pas ; libère les voies aériennes et constate qu’elle respire', 'C3a', 'C3b'),
      act('Fait alerter le 15, le 18 ou le 112 : chute d’un étage, victime qui ne répond pas mais respire', 'C4a'),
      act('Laisse la victime sur le dos (origine traumatique : pas de PLS) et refuse la mise sur le côté', 'C5a', 'C5b'),
      act('Maintient la tête et la liberté des voies aériennes', 'C5b'),
      act('Couvre la victime et surveille sa respiration en permanence ; si elle s’arrête, commence la réanimation', 'C5c'),
      act('Fait guider les secours depuis l’entrée du chantier', 'C4b'),
    ],
    prevention: {
      danger: 'Le vide de la trémie, sur la hauteur d’un étage',
      situation: 'Sarah travaille à reculons près d’une trémie dont le garde-corps a été retiré',
      evenement: 'Elle ne voit pas le bord et tombe par l’ouverture',
      dommage: 'Traumatisme de la tête et du corps, perte de connaissance',
      eviter:
        'Garde-corps ou plancher solide fixé sur toutes les trémies, remis en place aussitôt par l’entreprise qui l’a retiré. Organiser la pose pour ne jamais reculer vers une ouverture et signaler les trémies. Informer tous les corps de métier présents sur le chantier.',
      remonter: 'Chef de chantier et conducteur de travaux, qui coordonnent les entreprises du chantier.',
    },
  }),
  makeCase({
    id: 'ent-mit-08',
    title: 'Effondrement au gymnase',
    geste: 'Arrêt cardiaque',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans le gymnase de la commune, vous remplacez les aérothermes accrochés sous la charpente. Ton chef d’équipe Patrice, 56 ans, redescend de l’échafaudage roulant en disant qu’il a « un poids sur la poitrine » et s’effondre au pied de l’échafaudage, qu’il heurte en tombant. Au-dessus de lui, l’aérotherme démonté a glissé et dépasse à moitié du bord du plateau. L’agent d’entretien du gymnase arrive en courant ; un défibrillateur est accroché près de l’entrée.',
    victime:
      'Mannequin allongé sur le dos sur un tapis, au pied de l’échafaudage. Ne répond pas, ne respire pas. Se laisse tirer sur quelques mètres par les chevilles ou les poignets.',
    temoin:
      'L’agent d’entretien. Veut monter sur l’échafaudage pour retenir l’aérotherme, s’arrête si le SST le lui interdit. Connaît l’adresse du gymnase et l’emplacement du défibrillateur. Il est lui aussi SST : peut prendre le relais des compressions si on le lui demande.',
    materiel:
      'Mannequin adulte sur un tapis, défibrillateur de formation, deux chaises et un carton figurant l’échafaudage et l’aérotherme, ruban, téléphone factice.',
    actions: [
      act('Repère l’aérotherme prêt à tomber et interdit à l’agent de monter sur l’échafaudage', 'C2a', 'C2b', 'C2d'),
      act('Dégage aussitôt la victime de quelques mètres, hors de l’aplomb de l’échafaudage, en la tirant par les chevilles ou les poignets', 'C2e'),
      act('Examine : ne répond pas, ne respire pas', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 et fait apporter le défibrillateur de l’entrée', 'C4a'),
      act('Commence aussitôt des cycles de 30 compressions thoraciques et 2 insufflations, au rythme de 100 à 120 compressions par minute (compressions seules si les insufflations sont impossibles)', 'C5a', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée et suit ses instructions', 'C5b'),
      act('Se relaie avec l’agent toutes les 2 minutes, en interrompant le moins possible les compressions', 'C5b', 'C5c'),
      act('Fait ouvrir la porte du gymnase et guider les secours jusqu’à la victime', 'C4b'),
      act('Poursuit la réanimation jusqu’à la prise en charge par les secours', 'C5c'),
    ],
    prevention: {
      danger: 'L’arrêt cardiaque vient de l’état de santé ; le danger lié au travail est l’effort en hauteur avec une charge posée au bord du plateau (point à discuter)',
      situation: 'Patrice continue à travailler en hauteur malgré une gêne dans la poitrine',
      evenement: 'Son cœur s’arrête au pied de l’échafaudage, qu’il heurte en tombant',
      dommage: 'Arrêt cardiaque',
      eviter:
        'Descendre les aérothermes démontés avec un moyen de levage au lieu de les poser au bord du plateau. S’arrêter et appeler le 15 dès les premiers signes (douleur ou poids dans la poitrine). Repérer l’emplacement du défibrillateur en arrivant sur un chantier. Suivi par la médecine du travail.',
      remonter: 'Chef d’entreprise, le jour même, et la commune pour qu’elle remette en état le défibrillateur utilisé (électrodes).',
    },
  }),
];
