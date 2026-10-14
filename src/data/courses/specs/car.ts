import type { TradeCourseSpec } from '../tradeCourse';

export const spec: TradeCourseSpec = {
  tradeId: 'carreleur',
  code: 'CAR',
  diplome: 'CAP CAR',
  intitule: 'CAP Carreleur mosaïste',
  prefixe: 'CAR',
  public: 'Carreleurs mosaïstes — CFA BTP',
  cote: 'Côté CAR',
  lieux: 'salle de bains chez un client, chantier de rénovation, atelier du CFA',
  roles: {
    prevention: 'signaler une rallonge abîmée qui traîne dans l’eau de la scie à carrelage.',
    secours: 'rincer tout de suite l’œil d’un collègue qui a reçu une projection de ciment-colle.',
  },
  atmp: {
    at: 'éclat de carreau dans l’œil, coupure à la meuleuse, glissade sur un sol mouillé.',
    trajet: 'accident de scooter en venant au CFA ou en allant directement de chez soi au chantier.',
    mp: 'hygroma du genou, eczéma au ciment, silicose due aux poussières de découpe.',
  },
  causes: {
    manutention: 'sacs de colle de 25 kg, cartons de carreaux',
    outillage: 'meuleuse, scie à eau, carrelette, malaxeur',
    hauteur: 'escabeau, échafaudage roulant, trémie',
    plainPied: 'sol mouillé, colle fraîche, gravats, câbles',
  },
  premierMaillon: 'Dans une salle de bains en rénovation, vous êtes souvent deux, parfois seul chez un client : le premier maillon des secours, c’est vous.',
  quiFormer: 'En petite entreprise de carrelage, un SST par équipe ou par camionnette : c’est l’idéal.',
  observer: 'En arrivant chez le client : sol mouillé, prises et rallonges, aération de la pièce, ancien revêtement à déposer… deux minutes d’observation avant de sortir les outils.',
  dangers: ['Le disque de la meuleuse', 'Le courant près de l’eau de la scie', 'Un sac de colle de 25 kg', 'Le ciment-colle et la poussière de silice'],
  categories: {
    mecanique: 'Meuleuse, scie à eau, éclat de carreau, chute d’une pile de carreaux, glissade sur un sol mouillé.',
    electrique: 'Scie à eau ou malaxeur sur une rallonge dans l’eau, câble abîmé, perçage près d’un câble encastré.',
    thermique: 'Étincelles de la meuleuse près d’un solvant, chiffons et primaires inflammables, décapeur thermique.',
    atmosphere: 'Silice cristalline à la découpe à sec, fibres d’amiante à la dépose, vapeurs de solvant en pièce fermée.',
  },
  processus: {
    contexte: 'découpe d’un carreau en grès cérame à la meuleuse',
    danger: 'Disque de la meuleuse',
    operateur: 'L’apprenti qui découpe',
    situation: 'Il tient le carreau d’une main, calé sur sa cuisse',
    evenement: 'Le disque accroche et éclate',
    dommage: 'Coupure profonde de la cuisse ou de la main',
  },
  exerciceReperage: {
    situation: 'rénovation de la salle de bains d’un appartement ancien, au 3e étage sans ascenseur.',
    elements: [
      'Scie à eau branchée sur une rallonge posée dans l’eau',
      'Découpe à la meuleuse à sec, sans aspiration',
      'Pose du sol à genoux toute la journée, sans genouillères',
      'Sacs de colle de 25 kg à monter par l’escalier',
      'Vieilles dalles vinyle et colle noire à arracher',
      'Primaire à solvant, fenêtre fermée, meuleuse à côté',
    ],
    corrections:
      'Rallonge dans l’eau : électrique, contact avec une partie sous tension, électrisation. Meuleuse à sec : mécanique + atmosphère, éclat de disque ou de carreau, poussière de silice cristalline inhalée, coupure, blessure de l’œil, silicose à long terme (découpe à l’eau, aspiration). Pose à genoux : TMS, appui prolongé sur les genoux, hygroma, douleurs chroniques (genouillères, alterner les tâches). Sacs dans l’escalier : mécanique/manutention, faux mouvement ou chute, lombalgie, entorse. Dalles vinyle et colle noire : amiante possible, inhalation de fibres, maladie professionnelle (ne pas arracher ni poncer, arrêter et signaler, repérage amiante avant travaux). Primaire fenêtre fermée : atmosphère toxique + incendie, vapeurs qui s’accumulent, étincelle de la meuleuse, intoxication, brûlures.',
  },
  principes: 'Principe n° 6 : découper à l’eau plutôt qu’à sec = moins de silice dans l’air. Principe n° 8 : l’aspiration protège toute l’équipe, le masque ne protège que celui qui le porte.',
  protections: {
    prevention: 'découper à l’eau, primaire en phase aqueuse plutôt qu’à solvant, monte-matériaux pour les sacs.',
    collective: 'aspiration sur la meuleuse, aération de la pièce, prise protégée par un différentiel 30 mA.',
    individuelle: 'genouillères, gants nitrile, lunettes, masque FFP3, chaussures de sécurité.',
  },
  exerciceNouveau: {
    titre: 'Le nouvel apprenti et la meuleuse',
    situation:
      'vous posez un carrelage en grès cérame dans une cuisine. Vous recoupez les carreaux de bordure à la meuleuse, dans la pièce. Aujourd’hui, un nouvel apprenti fait son premier jour dans l’entreprise et travaille avec vous !',
    corrections:
      'danger = disque de la meuleuse, éclats et poussière de silice ; situation dangereuse = apprenti non formé à proximité de la découpe ; événement = éclat projeté, disque qui éclate, poussière inhalée ; dommage = blessure de l’œil, coupure, silicose à long terme. Prévention : découpe à la scie à eau ou à la carrelette, hors de la pièce. Collective : aspiration sur la meuleuse, carter en place, zone de découpe balisée. Individuelle : lunettes, masque FFP3, gants, protections auditives. Information : accueil sécurité, montrer où se placer pendant la découpe, ne jamais retirer le carter.',
  },
  droitRetrait: 'Dalles suspectées d’amiante à arracher sans repérage, câble dénudé de la scie à eau dans une flaque, plancher qui fléchit sous les palettes : j’arrête, je sors, j’alerte.',
  sirene: 'Votre réflexe métier : arrêter et débrancher la scie et la meuleuse, refermer les pots de primaire et de résine.',
  proteger:
    'Collègue au sol dans une flaque, près de la scie à eau : je pense d’abord au courant. Je ne touche ni l’eau ni la victime avant d’avoir coupé le courant au tableau électrique.',
  supprimer: 'Couper le courant au disjoncteur, arrêter la scie et la meuleuse, refermer les bidons de solvant.',
  isoler: 'Baliser la zone mouillée et la zone de découpe, fermer la pièce, empêcher le client d’approcher.',
  alerter: 'Seul chez un client ? J’appelle moi-même, haut-parleur activé, sans quitter la victime. Je connais l’adresse, l’étage et le code d’accès avant de commencer.',
  lieuxAlerte: 'Adresse, étage, appartement, salle de bains, code d’accès.',
  natureAlerte: 'Électrisation, coupure, chute, produit dans l’œil…',
  messageAlerte:
    'Je suis apprenti carreleur, je vous appelle du 8 rue Voltaire à Tours, au 3e étage, porte de droite. Mon collègue s’est ouvert l’avant-bras avec le disque de la meuleuse, il saigne beaucoup. Une seule victime, il me parle. Je comprime la plaie. Quelqu’un vous attendra en bas de l’immeuble.',
  urgence: {
    titre: 'Électrisation',
    texte: 'Je coupe le courant avant de toucher la victime, puis j’appelle le 15 : avis médical toujours.',
    notes: 'Électrisation : avis médical systématique, même si la victime dit aller bien. Projection de ciment-colle dans l’œil : rincer tout de suite et faire alerter pendant le rinçage.',
  },
  secourir: {
    saignement: 'Coupure profonde à l’avant-bras avec la meuleuse, main entaillée par l’arête d’un carreau cassé.',
    etouffement: 'Pause déjeuner dans la camionnette : un collègue avale de travers et ne peut plus ni parler ni tousser.',
    malaise: 'Vertiges et maux de tête après un primaire passé en pièce fermée : on sort tous à l’air libre.',
    brulure: 'Ciment-colle ou mortier sur la peau : brûlure chimique. Je rince abondamment et j’ôte les vêtements imbibés en me protégeant.',
    traumatisme: 'Glissade sur un sol mouillé, chute d’escabeau en posant la faïence, dos bloqué en portant un sac de 25 kg.',
    plaie: 'Éclat de carreau dans l’œil ou planté dans la main : je ne le retire jamais. Coupure sur l’arête d’un carreau découpé.',
    inconscient: 'Collègue inconscient au pied de l’escabeau : chute probable, je le laisse sur le dos, voies aériennes libres.',
    arret: 'Électrisation avec la scie à eau ou le malaxeur dans une flaque : couper le courant avant de toucher la victime.',
  },
  produits: 'Ciment-colle, mortier, ragréage (brûlures, eczéma), primaires, résines époxy (allergies), nettoyant acide. Dans l’œil : rincer tout de suite et longtemps.',
  casConcrets: [
    { titre: 'Découpe à la meuleuse', texte: 'Le disque éclate. Votre collègue se tient l’avant-bras, le sang coule fort. La meuleuse tourne encore au sol.' },
    { titre: 'Scie à eau dans la douche', texte: 'Vous retrouvez votre collègue allongé dans l’eau, la scie à eau renversée à côté de lui. Il ne bouge pas.' },
    { titre: 'Recoupe près du solvant', texte: 'Les étincelles de la meuleuse enflamment un bidon de solvant ouvert. Votre collègue a la main et le poignet brûlés.' },
    { titre: 'Primaire en sous-sol', texte: 'Votre collègue passe un primaire à solvant dans un sous-sol sans fenêtre. Il a des vertiges, puis s’assoit, très pâle.' },
  ],
  casConcretsNotes:
    'Quatre scénarios pour les cas concrets, un par catégorie de danger. Pour chacun, faire dérouler : protéger (quel danger persistant ? comment le supprimer ?), examiner, faire alerter, secourir. 1 : meuleuse qui tourne encore (la débrancher à la prise, sans approcher du disque), saignement abondant. 2 : danger électrique persistant (eau + courant : couper au tableau, sans toucher l’eau ni la victime), puis victime qui ne répond pas et ne respire pas. 3 : feu de solvant (éloigner la victime, fermer la porte, extincteur seulement si le feu est petit et qu’on sait s’en servir), brûlure thermique grave (main, poignet) : arroser à l’eau courante tempérée au moins 10 minutes, alerter. 4 : atmosphère toxique (vapeurs de solvant), malaise : refermer le pot, sortir ensemble à l’air libre, ne pas retourner dans le sous-sol, ni flamme ni étincelle, aérer depuis l’extérieur ; mise au repos, questionner, avis médical.',
};
