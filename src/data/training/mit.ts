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
      'Dans le salon d’une maison, tu installes un poêle à granulés avec Kylian. Il porte la porte vitrée du poêle quand il se prend les pieds dans un carton d’emballage : il tombe à genoux sur la vitre, qui se brise et lui entaille la cuisse. Quand tu te retournes, il est assis au milieu des éclats de verre et le sang traverse son pantalon et coule en abondance sur le parquet. La cliente arrive de la cuisine, en chaussons.',
    victime:
      'Assis dans les éclats, tient sa cuisse droite qui saigne beaucoup à travers le pantalon. Répond aux questions, a peur. Appuie lui-même sur la plaie si le SST le lui demande : la compression arrête le saignement (le formateur peut annoncer qu’il continue, pour faire poser un garrot). Si on le laisse assis, dit que la tête lui tourne.',
    temoin:
      'La cliente, en chaussons. Veut s’approcher en marchant dans le verre et propose d’emmener Kylian jusqu’à la douche pour rincer la plaie. Fait ensuite ce que le SST demande : appeler les secours, apporter un linge propre, ouvrir le portail et attendre les secours dehors.',
    materiel:
      'Tissu ou maquillage rouge, morceaux de carton figurant les éclats de verre, carton d’emballage, gants, linge propre, bande ou garrot de formation, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère les éclats de verre et arrête la cliente en chaussons avant qu’elle approche', 'C2a', 'C2b', 'C2d'),
      act('Écarte les éclats avec ses chaussures de sécurité ou un balai pour faire une place sans verre', 'C2c'),
      act('Voit le saignement abondant de la cuisse et fait appuyer la victime sur la plaie, ou comprime lui-même avec la paume, main protégée', 'C3a', 'C5a', 'C5b'),
      act('Allonge la victime sur la place dégagée, sans relâcher la compression ; refuse de l’emmener à la douche', 'C5b'),
      act('Fait alerter le 15 ou le 112 par la cliente : adresse, plaie de la cuisse par du verre, saignement abondant, compression en cours', 'C4a'),
      act('Demande à la cliente d’ouvrir le portail et d’attendre les secours dehors', 'C4b'),
      act('Relaie par un pansement compressif une fois le saignement arrêté', 'C5b'),
      act('Si ça saigne à nouveau, comprime sur le pansement ; si le saignement continue, pose un garrot au-dessus de la plaie et le laisse visible', 'C5b'),
      act('Couvre, réconforte et surveille la victime et le pansement jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le verre de la porte du poêle, coupant quand il se brise',
      situation: 'Kylian transporte la vitre à mains nues dans une pièce encombrée par les emballages',
      evenement: 'Il trébuche sur un carton et tombe sur la vitre, qui se brise',
      dommage: 'Plaie profonde de la cuisse avec saignement abondant',
      eviter:
        'Laisser la porte vitrée montée sur le poêle ou dans son emballage jusqu’au dernier moment. Dégager le passage et sortir les cartons au fur et à mesure. Porter à deux les pièces fragiles ou encombrantes. Gants anti-coupure et vêtements de travail couvrants.',
      remonter: 'Maître d’apprentissage ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-mit-02',
    title: 'Le bonbon pendant l’entretien',
    geste: 'Étouffement : obstruction totale',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans le sous-sol d’une maison, tu fais l’entretien annuel de la chaudière fioul avec Jade. Elle vient d’arrêter la chaudière et travaille à genoux devant le brûleur, en suçant un gros bonbon. Le propriétaire descend vous apporter un café et raconte une blague : Jade éclate de rire et se relève d’un coup, les mains à la gorge et la bouche ouverte. Elle ne tousse pas, aucun son ne sort, et elle recule vers la chaudière et son conduit de fumée, encore brûlants.',
    victime:
      'Debout, mains à la gorge, bouche ouverte. Ne peut ni parler, ni tousser, ni respirer ; fait oui de la tête si on lui demande si elle s’étouffe. Recule vers la chaudière si personne ne l’arrête. Les claques dans le dos ne suffisent pas. À la troisième compression abdominale, « recrache » le bonbon, tousse et reparle.',
    temoin:
      'Le propriétaire. Veut lui faire boire un verre d’eau, puis lui tape dans le dos alors qu’elle est bien droite. S’arrête si le SST le lui dit, puis appelle le 15 si on le lui demande.',
    materiel:
      'Carton figurant la chaudière (étiquette « brûlant »), bonbon ou emballage, verre, couverture, téléphone factice. Claques et compressions mimées : mains bien placées, geste retenu.',
    actions: [
      act('Repère la chaudière et le conduit de fumée encore brûlants et écarte aussitôt Jade d’un ou deux pas pour qu’elle ne s’y appuie pas', 'C2a', 'C2b'),
      act('Demande « Tu t’étouffes ? » et reconnaît l’obstruction totale : elle ne parle pas, ne tousse pas, ne respire pas', 'C3a', 'C3b'),
      act('Fait appeler le 15 par le propriétaire pendant les claques et les compressions', 'C4a'),
      act('Refuse le verre d’eau et les tapes dans le dos quand elle est droite', 'C5b'),
      act('Se place sur le côté, un peu en arrière, penche la victime en avant et donne 1 à 5 claques vigoureuses entre les omoplates', 'C5a', 'C5b'),
      act('Les claques n’ayant pas suffi, donne 1 à 5 compressions abdominales, poing au creux de l’estomac, et alterne avec les claques', 'C5b'),
      act('Arrête dès que le bonbon sort et installe la victime dans la position où elle se sent le mieux', 'C5b'),
      act('Fait dire au 15 que des compressions abdominales ont été faites et suit ses conseils', 'C4a'),
      act('Réconforte, couvre et surveille sa respiration jusqu’à l’avis du médecin ou l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le bonbon dur gardé dans la bouche pendant le travail',
      situation: 'Jade suce un gros bonbon en travaillant, en parlant et en riant',
      evenement: 'Elle éclate de rire et le bonbon part dans les voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque d’arrêt cardiaque',
      eviter:
        'Ne rien garder dans la bouche en travaillant (bonbon, chewing-gum, vis ou joint entre les lèvres) : manger ou grignoter pendant les pauses, assis. Pour la chaudière : la laisser refroidir avant de travailler devant le brûleur, gants et manches longues près des parties chaudes.',
      remonter: 'Maître d’apprentissage ou chef d’entreprise, même si tout s’est bien fini (accident sur le temps de travail).',
    },
  }),
  makeCase({
    id: 'ent-mit-03',
    title: 'Le nid de guêpes dans la pompe à chaleur',
    geste: 'Malaise : réaction allergique à des piqûres',
    category: 'metier',
    tradeIds: MIT,
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'En juillet, dans le jardin d’une maison, tu fais l’entretien de la pompe à chaleur avec Manon. Elle dévisse le capot du groupe extérieur : un nid de guêpes est caché dessous et plusieurs guêpes la piquent au cou et à la main. Elle s’éloigne de quelques mètres, s’assoit dans l’herbe et te dit qu’elle est allergique, que ça la gratte partout et qu’elle respire mal. Les guêpes tournent encore autour du capot posé par terre. Le propriétaire sort de la maison avec une bombe insecticide.',
    victime:
      'Assise dans l’herbe, à quelques mètres de la pompe à chaleur. Plaques rouges sur le cou et les bras, lèvres qui gonflent, respire vite et avec difficulté, mais parle et répond. Allergique aux piqûres de guêpe, a déjà fait une grosse réaction ; son traitement d’urgence prescrit par son médecin (un stylo auto-injecteur) est dans son sac, dans le fourgon. Préfère rester assise et demande qu’on lui apporte son stylo. Respire un peu mieux après l’avoir utilisé, mais reste gênée.',
    temoin:
      'Le propriétaire. Veut aller asperger le nid avec sa bombe insecticide. S’arrête si le SST le lui interdit, puis fait ce qu’on lui demande : aller chercher le sac de Manon dans le fourgon, appeler les secours, les attendre dans la rue.',
    materiel:
      'Carton figurant le groupe extérieur et son capot, boule de papier pour le nid, bombe vide, sac avec un stylo factice, tapis ou chaise, couverture, téléphone factice.',
    actions: [
      act('Repère les guêpes autour du nid, interdit au propriétaire d’approcher avec sa bombe et fait rester tout le monde à l’écart du capot', 'C2a', 'C2b', 'C2d'),
      act('Observe les signes : plaques rouges, lèvres qui gonflent, respiration rapide et difficile', 'C3a'),
      act('Questionne : piqûres, allergie connue, réaction déjà arrivée, traitement prescrit', 'C3b'),
      act('La laisse au repos, assise, loin des guêpes, dans la position où elle respire le mieux, sans la faire marcher', 'C5a', 'C5b'),
      act('Appelle ou fait appeler le 15 sans attendre : piqûres de guêpe chez une personne allergique, lèvres qui gonflent, gêne pour respirer', 'C4a'),
      act('Fait apporter son sac et l’aide, à sa demande, à prendre son traitement d’urgence, en suivant les conseils du médecin', 'C5b'),
      act('Fait attendre les secours dans la rue et les guider jusqu’au jardin', 'C4b'),
      act('Reste avec elle, la réconforte et surveille sa respiration en permanence, prêt à agir si elle ne répond plus', 'C5c'),
    ],
    prevention: {
      danger: 'Les guêpes installées sous le capot du groupe extérieur',
      situation: 'Manon, allergique, ouvre le capot sans avoir regardé autour ni dessous',
      evenement: 'Les guêpes dérangées l’attaquent et la piquent plusieurs fois',
      dommage: 'Réaction allergique grave : gonflement des lèvres, gêne pour respirer',
      eviter:
        'Regarder autour et sous le capot avant de l’ouvrir, surtout l’été ; si un nid est repéré, ne pas intervenir et le faire détruire par un professionnel avant l’entretien ; demander au client, à la prise de rendez-vous, s’il a vu des guêpes ou des frelons ; gants et manches longues. Pour Manon : prévenir ses collègues de son allergie et garder son traitement sur elle, pas dans le fourgon.',
      remonter: 'Maître d’apprentissage ou chef d’entreprise, et le client pour faire détruire le nid.',
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
      act('Coupe ou fait couper le courant au disjoncteur général, près du compteur, sans toucher le tableau abîmé', 'C2c'),
      act('Interdit de jeter de l’eau sur le tableau ; s’il prend feu, fait sortir tout le monde et appeler le 18', 'C2d'),
      act('Examine : répond, brûlures à la main et au visage, a senti le courant passer dans le bras', 'C3a', 'C3b'),
      act('Arrose tout de suite la main et le visage à l’eau courante tempérée, sans jet fort, au moins 10 minutes, idéalement 20', 'C5a', 'C5b'),
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
      act('Repère la circulation et les personnes exposées (Adam, la passante, lui-même), allume les feux de détresse et enfile un gilet haute visibilité', 'C2a', 'C2b'),
      act('Fait baliser en amont par la passante, en gilet, avec le triangle ou les plots du fourgon, sans qu’elle se mette en danger', 'C2d'),
      act('Examine : il répond, respire, a très mal à la nuque et des picotements dans les mains', 'C3a', 'C3b'),
      act('Lui demande de ne pas bouger la tête ; refuse qu’on le tire sur le trottoir ou qu’on lui glisse un blouson sous la tête', 'C5a', 'C5b'),
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
      act('Appuie sur l’arrêt d’urgence puis débranche la machine, sans approcher les mains des pièces qui tournent', 'C2a', 'C2c'),
      act('Examine : ne saigne pas abondamment, répond, a le bout de l’index sectionné', 'C3a', 'C3b'),
      act('Installe la victime allongée (ou assise) pour éviter qu’elle tombe', 'C5b'),
      act('Fait alerter le 15 ou le 112 : section du bout de l’index par une machine, victime consciente', 'C4a'),
      act('Protège le moignon avec des compresses ou un linge propre', 'C5a', 'C5b'),
      act('Met le bout de doigt, sans le laver, dans un sac fermé, posé dans un contenant réfrigéré, sans contact direct avec la glace ni avec l’eau', 'C5b'),
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
      act('Tire la couronne de tube loin du bord par le tube déjà déroulé, sans s’approcher du vide, et fait barrer la trémie (barrière ou planches)', 'C2c', 'C2d'),
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
      'L’agent d’entretien. Veut monter sur l’échafaudage pour retenir l’aérotherme, s’arrête si le SST le lui interdit. Connaît l’adresse du gymnase et l’emplacement du défibrillateur : appelle les secours et va chercher le défibrillateur si on le lui demande. Il est lui aussi SST : peut prendre le relais des compressions.',
    materiel:
      'Mannequin adulte sur un tapis, défibrillateur de formation, deux chaises et un carton figurant l’échafaudage et l’aérotherme, ruban, téléphone factice.',
    actions: [
      act('Repère l’aérotherme prêt à tomber et interdit à l’agent de monter sur l’échafaudage', 'C2a', 'C2b', 'C2d'),
      act('Dégage aussitôt la victime de quelques mètres, hors de l’aplomb de l’échafaudage, en la tirant par les chevilles ou les poignets', 'C2e'),
      act('Examine : ne répond pas ; libère les voies aériennes, ne respire pas', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 par l’agent : adresse du gymnase, homme qui ne répond pas et ne respire pas, réanimation en cours', 'C4a'),
      act('Lui fait apporter le défibrillateur de l’entrée', 'C5b'),
      act('Commence aussitôt des cycles de 30 compressions thoraciques et 2 insufflations, au rythme de 100 à 120 compressions par minute (compressions seules si les insufflations sont impossibles)', 'C5a', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée et suit ses instructions', 'C5b'),
      act('Demande à l’agent de laisser grande ouverte la porte du gymnase en revenant avec le défibrillateur, pour que les secours trouvent tout de suite la victime', 'C4b'),
      act('Se relaie avec l’agent toutes les 2 minutes, en interrompant le moins possible les compressions', 'C5b', 'C5c'),
      act('Poursuit la réanimation jusqu’à la prise en charge par les secours', 'C5c'),
    ],
    prevention: {
      danger: 'L’aérotherme démonté posé au bord du plateau de l’échafaudage ; l’arrêt cardiaque, lui, vient de l’état de santé (point à discuter)',
      situation: 'Patrice continue à travailler en hauteur malgré un poids sur la poitrine, sous une charge mal posée',
      evenement: 'Son cœur s’arrête au pied de l’échafaudage ; en tombant, il le heurte et l’aérotherme glisse vers le bord',
      dommage: 'Arrêt cardiaque, avec le risque d’être écrasé par la chute de l’aérotherme',
      eviter:
        'Descendre les aérothermes démontés avec un moyen de levage au lieu de les poser au bord du plateau. S’arrêter et appeler le 15 dès les premiers signes (douleur ou poids dans la poitrine). Repérer l’emplacement du défibrillateur en arrivant sur un chantier. Suivi par la médecine du travail.',
      remonter: 'Chef d’entreprise, le jour même, et la commune pour qu’elle remette en état le défibrillateur utilisé (électrodes).',
    },
  }),
];
