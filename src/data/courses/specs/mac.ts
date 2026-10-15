import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'macon',
  code: 'MAC',
  diplome: 'CAP MAC',
  intitule: 'CAP Maçon',
  prefixe: 'Maçon',
  public: 'Maçons — CFA BTP',
  cote: 'Côté maçon',
  lieux: 'chantier de gros œuvre, maison individuelle en construction, atelier du CFA',
  roles: {
    prevention: 'signaler un garde-corps retiré sur l’échafaudage ou une trémie non protégée.',
    secours: 'arrêter le saignement d’un collègue blessé par le disque de la découpeuse.',
  },
  atmp: {
    at: 'chute d’échafaudage, pied écrasé par un parpaing, brûlure au béton frais tombé dans la botte.',
    trajet: 'accident de scooter en venant au CFA ou en rejoignant le chantier.',
    mp: 'hernie discale due aux charges lourdes, eczéma au ciment, surdité, silicose (poussières de découpe).',
  },
  causes: {
    manutention: 'parpaings, sacs de ciment, étais, coffrages',
    outillage: 'disqueuse, découpeuse thermique, perforateur, massette',
    hauteur: 'échafaudage, trémie, bord de dalle, échelle',
    plainPied: 'sol boueux, gravats, fers à béton au sol',
  },
  premierMaillon: 'Sur un pavillon en construction, vous êtes souvent deux ou trois, loin du bureau et parfois sans adresse précise : le premier maillon des secours, c’est vous.',
  quiFormer: 'En entreprise de maçonnerie, un SST par équipe de chantier : c’est l’idéal. Sur un gros chantier, demandez qui est SST dès l’accueil.',
  observer: 'En arrivant sur le chantier : garde-corps, trémies, charges de la grue, engins, bord des fouilles, état du sol… deux minutes d’observation avant de gâcher le mortier.',
  dangers: ['Le vide : échafaudage, trémie, bord de dalle', 'Une charge suspendue à la grue', 'Le ciment frais sur la peau et dans l’œil', 'Le disque et les gaz de la découpeuse'],
  categories: {
    mecanique: 'Chute d’échafaudage, charge de la grue, bétonnière, rebond de la découpeuse, éboulement de fouille.',
    electrique: 'Bétonnière sur une rallonge abîmée, câble enterré touché en creusant, ligne aérienne près de la grue.',
    thermique: 'Plein d’essence de la découpeuse moteur chaud, gerbe d’étincelles du disque, coup de chaleur en été.',
    atmosphere: 'Monoxyde de carbone de la découpeuse en sous-sol, poussière de silice, vide sanitaire non ventilé.',
  },
  processus: {
    contexte: 'montage d’un mur en parpaings depuis un échafaudage',
    danger: 'Le vide au bord de l’échafaudage',
    operateur: 'L’apprenti qui monte le mur',
    situation: 'Il travaille sans garde-corps, retiré pour passer les blocs',
    evenement: 'Il recule pour prendre un parpaing et bascule',
    dommage: 'Fractures, traumatisme crânien',
  },
  exerciceReperage: {
    situation: 'élévation des murs d’une maison individuelle, en plein mois de juillet, avec la grue.',
    elements: [
      'Trémie de l’escalier couverte d’une simple bâche',
      'Palette de parpaings levée au-dessus de l’équipe',
      'Découpeuse thermique utilisée à sec dans le sous-sol',
      'Bétonnière branchée sur une rallonge posée dans l’eau',
      'Mortier gâché à mains nues, ciment sur les avant-bras',
      'Travail en plein soleil, sans eau ni ombre',
    ],
    corrections:
      'Trémie bâchée : mécanique/chute de hauteur, on marche sur la bâche et on passe au travers, fractures, traumatisme crânien (platelage solide et fixé, ou garde-corps). Palette sous la grue : mécanique, chute de la charge ou d’un bloc mal élingué, écrasement (accessoire de levage avec filet, ne jamais rester sous une charge suspendue). Découpeuse en sous-sol : atmosphère toxique, accumulation de monoxyde de carbone, intoxication ; poussière de silice, silicose à long terme (découpeuse électrique ou découpe à l’extérieur, à l’eau, aspiration). Rallonge dans l’eau : électrique, contact avec un conducteur, électrisation (rallonge en bon état, hors de l’eau, coffret de chantier avec différentiel). Mortier à mains nues : ciment frais, brûlure alcaline et eczéma, maladie professionnelle (gants nitrile, manches longues, lavage des mains). Plein soleil : thermique, coup de chaleur, malaise (eau fraîche, pauses à l’ombre, horaires adaptés).',
  },
  principes: 'Principe n° 6 : découper à l’eau plutôt qu’à sec = beaucoup moins de silice. Principe n° 8 : un garde-corps protège toute l’équipe, le harnais seulement celui qui le porte.',
  protections: {
    prevention: 'monter les blocs à la grue, découper à l’eau, séparer les circulations des engins et des piétons.',
    collective: 'garde-corps, échafaudage conforme, protection des trémies, blindage des tranchées, aspiration.',
    individuelle: 'casque, chaussures de sécurité, gants nitrile, lunettes, protections auditives, masque FFP3.',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et la découpeuse',
    situation:
      'vous recoupez des blocs béton à la découpeuse thermique, au sous-sol d’un pavillon. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise : il vient vous aider en tenant les blocs pendant la découpe !',
    corrections:
      'danger = disque en rotation, gaz d’échappement, poussière ; situation dangereuse = apprenti non formé qui tient le bloc à côté du disque, dans un sous-sol peu ventilé ; événement = rebond de la découpeuse, accumulation de monoxyde de carbone ; dommage = coupure grave, intoxication, silicose à long terme. Prévention : pas de découpeuse thermique en local fermé (découpeuse électrique), découpe à l’eau, caler la pièce au lieu de la tenir. Collective : ventilation, aspiration, balisage de la zone. Individuelle : visière ou lunettes, protections auditives, masque FFP3, gants, chaussures de sécurité. Information : accueil sécurité, montrer où se placer, ne jamais tenir la pièce à la main pendant la découpe.',
  },
  droitRetrait: 'Tranchée profonde non blindée, échafaudage sans garde-corps ou qui bouge, charge qui passe au-dessus de l’équipe par grand vent : j’arrête, je sors de la zone, j’alerte.',
  sirene: 'Votre réflexe métier : arrêter la bétonnière et la découpeuse, descendre de l’échafaudage, rejoindre avec l’équipe un local fermé (base vie, bâtiment).',
  proteger:
    'Collègue au sol au pied de l’échafaudage : je regarde d’abord en l’air (charge de la grue, blocs qui peuvent tomber), je fais arrêter la grue et les engins, je ne monte pas sur un échafaudage abîmé.',
  supprimer: 'Arrêter bétonnière et découpeuse, couper le courant au coffret de chantier, faire poser la charge de la grue.',
  isoler: 'Baliser sous l’échafaudage, dévier la circulation des engins, interdire l’approche du bord de la fouille.',
  alerter: 'Chantier neuf sans numéro de rue ? Avant de commencer, je repère l’adresse, le numéro du lot et l’accès des camions. J’envoie quelqu’un à l’entrée du chantier guider les secours.',
  lieuxAlerte: 'Adresse, numéro du lot, niveau, accès des camions.',
  natureAlerte: 'Chute d’échafaudage, ensevelissement, écrasement…',
  messageAlerte:
    'Je suis apprenti maçon, je vous appelle du chantier du lotissement Les Tilleuls, lot 7, rue des Peupliers à Angers. Mon collègue est tombé de l’échafaudage, d’environ 3 mètres. Une seule victime, il me répond mais il a très mal au dos, je lui ai dit de ne pas bouger. Quelqu’un vous attendra à l’entrée du chantier.',
  urgence: {
    titre: 'Ensevelissement en tranchée',
    texte: 'Je ne descends pas dans la tranchée : elle peut s’ébouler encore. J’alerte le 18 et je fais arrêter les engins.',
    notes:
      'Le dégagement d’une personne ensevelie est l’affaire des pompiers : faire arrêter les engins et les vibrations, ne pas s’approcher du bord, ne rien déposer en bordure. Conduite de gaz touchée en creusant : arrêter les travaux et couper les moteurs sans déplacer l’engin, aucune flamme ni cigarette, éloigner tout le monde, puis appeler à distance le 18 ou l’Urgence Sécurité Gaz (GRDF) : 0 800 47 33 33.',
  },
  secourir: {
    saignement: 'Coupure profonde à la cuisse par le disque de la découpeuse qui rebondit, ou à l’avant-bras avec la disqueuse.',
    etouffement: 'Pause casse-croûte dans la base vie : un collègue avale de travers un morceau de pain.',
    malaise: 'Coup de chaleur sur la dalle en été : je l’installe au frais, je le rafraîchis, eau fraîche par petites gorgées s’il peut boire.',
    brulure: 'Béton dans la botte : brûlure alcaline, indolore au début. Avec des gants, j’ôte botte et vêtements imbibés, je rince abondamment.',
    traumatisme: 'Chute d’échafaudage ou dans une trémie, pied écrasé par un bloc, dos bloqué en portant un sac de ciment.',
    plaie: 'Main entaillée sur une attente en fer à béton, éclat de béton dans l’œil, clou de coffrage planté dans le pied.',
    inconscient: 'Collègue inconscient au sous-sol où tournait la découpeuse thermique : monoxyde de carbone possible, je protège avant d’entrer.',
    arret: 'Électrisation par la bétonnière ou une rallonge abîmée : couper le courant au coffret de chantier avant de toucher la victime.',
  },
  produits: 'Ciment, chaux, béton frais, adjuvants, huile de décoffrage, produit de cure. Ciment dans l’œil : rincer tout de suite et longtemps à l’eau, avis médical.',
  casConcrets: [
    { titre: 'Élévation sur échafaudage', texte: 'Votre collègue tombe de l’échafaudage. Il est au sol, sur le dos : il ne répond pas, mais il respire.' },
    { titre: 'Bétonnière sous la pluie', texte: 'Votre collègue s’effondre en touchant la bétonnière, branchée sur une rallonge abîmée. Il ne bouge plus.' },
    { titre: 'Plein de la découpeuse', texte: 'Votre collègue fait le plein de la découpeuse moteur chaud : l’essence s’enflamme, son pantalon prend feu.' },
    { titre: 'Ouverture d’une baie en sous-sol', texte: 'Au sous-sol, votre collègue découpe un mur à la découpeuse thermique. Il s’assoit, a mal à la tête et vomit.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : chute de hauteur ; danger persistant = blocs et outils qui peuvent tomber, charge de la grue ; victime qui ne répond pas et respire après un traumatisme : sur le dos, voies aériennes libres, pas de PLS. 2 : danger électrique persistant (couper le courant au coffret avant de toucher), puis victime qui ne répond pas et ne respire pas. 3 : incendie (empêcher la victime de courir, l’allonger, étouffer les flammes avec une veste ou une couverture ; extincteur sur l’essence au sol), puis brûlure thermique : arroser à l’eau courante tempérée. 4 : atmosphère toxique (monoxyde de carbone) : ne pas descendre, aérer depuis l’extérieur, la faire remonter à l’air libre si elle le peut (dégagement d’urgence seulement si elle est visible, facile à atteindre et sans risque), puis malaise, avis médical.',
};
