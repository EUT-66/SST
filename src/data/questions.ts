// Banque de questions SST, classée selon les 8 compétences de la grille de certification.
// Contenus établis d'après l'aide-mémoire INRS ED 4085 (2024) et le support de cours MIT.
import type { CompetenceId, Question, QuestionTheme, QuizTemplate } from '../lib/types';

/** Les réponses justes commencent par « * ». */
function q(
  id: string,
  competence: CompetenceId,
  theme: QuestionTheme,
  text: string,
  choices: string[],
  explanation: string,
  tradeIds: string[] = [],
): Question {
  return {
    id,
    competence,
    theme,
    text,
    choices: choices.map((c) => ({ text: c.replace(/^\*/, ''), correct: c.startsWith('*') })),
    explanation,
    tradeIds,
    usage: 'both',
  };
}

export const DEFAULT_QUESTIONS: Question[] = [
  // ------------------------------------------------------------ C1 – Champ d'intervention
  q('q-c1-01', 'C1', 'cadre', 'Jusqu’à quand le SST intervient-il auprès d’une victime ?', [
    '*Jusqu’à la prise en charge de la victime par les secours (internes ou externes)',
    'Jusqu’à ce que la victime se relève',
    'Pendant 10 minutes au maximum',
    'Jusqu’à l’arrivée du chef d’équipe',
  ], 'Le SST intervient le plus tôt possible et jusqu’à la prise en charge de la victime par les secours.'),
  q('q-c1-02', 'C1', 'cadre', 'Dans l’entreprise, sous la responsabilité de qui le SST intervient-il ?', [
    '*De l’employeur',
    'Du médecin du SAMU',
    'Du CSE',
    'De personne : il est seul responsable',
  ], 'Le SST intervient sous la responsabilité de l’employeur, dans le cadre de l’organisation des secours de l’entreprise.'),
  q('q-c1-03', 'C1', 'cadre', 'Avec quels moyens le SST intervient-il dans l’entreprise ?', [
    '*Les moyens mis en place par l’employeur et/ou le médecin du travail',
    'Ses propres médicaments',
    'Le matériel des pompiers',
    'Aucun : il doit tout apporter lui-même',
  ], 'Il agit avec les moyens prévus par l’employeur et/ou le médecin du travail (trousse, défibrillateur…).'),
  q('q-c1-04', 'C1', 'cadre', 'En dehors de son travail, le SST peut-il porter secours ?', [
    '*Oui : comme tout citoyen, il doit porter assistance à une personne en péril, sans se mettre en danger',
    'Non : son certificat ne vaut qu’en entreprise',
    'Seulement s’il porte sa tenue de travail',
    'Seulement avec l’accord de son employeur',
  ], 'Article 223-6 du Code pénal : obligation de porter assistance, sans risque pour soi ni pour les tiers.'),
  q('q-c1-05', 'C1', 'cadre', 'Que risque une personne qui s’abstient volontairement de porter assistance à une personne en péril ?', [
    '*Jusqu’à 5 ans d’emprisonnement et 75 000 € d’amende',
    'Rien, ce n’est pas obligatoire',
    'Une amende de 135 €',
    'Un simple avertissement',
  ], 'Article 223-6 du Code pénal. Le minimum attendu de tout citoyen est d’alerter les secours.'),
  q('q-c1-06', 'C1', 'cadre', 'Quelle est la durée de validité du certificat SST ?', ['*24 mois', '12 mois', '5 ans', 'À vie'],
    'Le certificat est valable 24 mois ; il est prolongé par une formation de maintien et d’actualisation des compétences (MAC).'),
  q('q-c1-07', 'C1', 'cadre', 'Pour garder son certificat valide, le SST doit suivre :', [
    '*Une formation de maintien et d’actualisation des compétences (MAC)',
    'Une nouvelle formation initiale complète',
    'Rien du tout',
    'Une visite médicale',
  ], 'La MAC (7 h) est à suivre tous les 24 mois.'),
  q('q-c1-08', 'C1', 'cadre', 'Le SST peut-il donner un médicament à une victime de sa propre initiative ?', [
    '*Non : il peut seulement l’aider à prendre un médicament ou du sucre à sa demande, ou appliquer les consignes du médecin',
    'Oui, s’il connaît bien le médicament',
    'Oui, un antidouleur léger',
    'Oui, s’il y en a dans la trousse de secours',
  ], 'Le SST ne fait pas de diagnostic et ne prescrit pas : il aide la victime à sa demande et suit l’avis médical.'),
  q('q-c1-09', 'C1', 'cadre', 'Un SST peut-il remplacer l’infirmier de l’entreprise ?', [
    '*Non',
    'Oui, dans tous les cas',
    'Oui, la nuit',
    'Oui, sur les chantiers du BTP',
  ], 'Les travailleurs formés aux premiers secours ne peuvent pas remplacer les infirmiers.'),
  q('q-c1-10', 'C1', 'cadre', 'Le danger persistant ne peut être ni supprimé ni isolé, et la victime n’est pas facile à atteindre. Que fait le SST ?', [
    '*Il interdit l’accès à la zone et fait alerter les secours',
    'Il entre quand même, le plus vite possible',
    'Il attend que le danger disparaisse sans alerter',
    'Il demande à un collègue d’y aller à sa place',
  ], 'Le SST ne s’expose jamais lui-même au danger : il interdit l’accès et fait alerter.'),

  // ------------------------------------------------------------ C2 – Protéger
  q('q-c2-01', 'C2', 'proteger', 'Quelles sont les catégories de dangers persistants retenues par l’INRS ?', [
    '*Mécanique, électrique, thermique (incendie, explosion), atmosphère toxique ou irrespirable',
    'Chimique, biologique, sonore, lumineux',
    'Chute, coupure, brûlure, choc',
    'Bruit, poussière, chaleur, froid',
  ], 'Aide-mémoire INRS : mécanique ; électrique ; thermique ou pouvant provoquer un incendie ou une explosion ; atmosphère toxique ou irrespirable.'),
  q('q-c2-02', 'C2', 'proteger', 'Face à un danger persistant, quelle est la première question à se poser ?', [
    '*Peut-on le supprimer de façon permanente et sans risque ?',
    'Peut-on dégager la victime tout de suite ?',
    'Qui est responsable de l’accident ?',
    'Faut-il prévenir la famille ?',
  ], 'Supprimer d’abord ; sinon isoler la zone ; sinon soustraire la victime au danger.'),
  q('q-c2-03', 'C2', 'proteger', 'Le danger ne peut pas être supprimé. Que cherche alors à faire le SST ?', [
    '*Isoler la zone dangereuse de façon permanente et sans risque, et en interdire l’accès',
    'Attendre les secours sans rien faire',
    'Dégager la victime dans tous les cas',
    'Prendre une photo pour l’enquête',
  ], 'Si le danger ne peut pas être supprimé, on isole la zone (et on interdit l’accès).'),
  q('q-c2-04', 'C2', 'proteger', 'Dans quelles conditions le SST réalise-t-il un dégagement d’urgence ? (plusieurs réponses)', [
    '*Le danger persistant est réel, immédiat, non contrôlable et menace la vie de la victime',
    '*La victime est visible, facile à atteindre et rien ne gêne le dégagement',
    'La victime se plaint du dos',
    'Le SST est seul et pressé',
  ], 'Le dégagement d’urgence est une manœuvre exceptionnelle, réalisée sans s’exposer soi-même.'),
  q('q-c2-05', 'C2', 'proteger', 'Un collègue est au sol, la main sur un appareil électrique. Quel est le premier geste ?', [
    '*Couper le courant (disjoncteur, prise) sans toucher la victime',
    'Tirer la victime par le bras',
    'Vérifier sa respiration',
    'L’arroser d’eau',
  ], 'Tant que le courant n’est pas coupé, toucher la victime expose le SST à l’électrisation.'),
  q('q-c2-06', 'C2', 'proteger', 'Odeur de gaz dans une chaufferie, un collègue est au sol. Que ne faut-il surtout pas faire ?', [
    '*Actionner un interrupteur ou téléphoner dans le local',
    'Aérer depuis l’extérieur si c’est possible',
    'Empêcher les autres d’entrer',
    'Alerter depuis l’extérieur',
  ], 'Toute étincelle peut provoquer une explosion : on n’actionne rien et on alerte depuis l’extérieur.', ['mit', 'mis', 'froid']),
  q('q-c2-07', 'C2', 'proteger', 'Qui peut être exposé à un danger persistant après un accident ?', [
    '*La victime, le SST, les témoins et toute personne qui pourrait approcher',
    'Uniquement la victime',
    'Uniquement les témoins',
    'Plus personne une fois l’accident arrivé',
  ], 'Repérer toutes les personnes exposées permet d’éviter le sur-accident.'),
  q('q-c2-08', 'C2', 'proteger', 'Accident de scooter devant le CFA. Que fait le SST en premier ?', [
    '*Il se protège et fait ralentir ou arrêter la circulation de part et d’autre',
    'Il court sur la chaussée vers la victime',
    'Il retire le casque du conducteur',
    'Il déplace la victime sur le trottoir',
  ], 'Protéger d’abord : on évite le sur-accident avant de s’approcher de la victime.'),
  q('q-c2-09', 'C2', 'proteger', 'Protéger, c’est :', [
    '*Agir, sans risque pour sa propre sécurité, afin d’éviter un sur-accident',
    'Mettre une couverture sur la victime',
    'Rassurer la victime',
    'Appeler les secours',
  ], 'Définition de l’aide-mémoire INRS.'),

  // ------------------------------------------------------------ C3 – Examiner
  q('q-c3-01', 'C3', 'examiner', 'Dans quel ordre le SST examine-t-il la victime ?', [
    '*Saigne-t-elle abondamment ? S’étouffe-t-elle ? Répond-elle ? Respire-t-elle ?',
    'Respire-t-elle ? Répond-elle ? Saigne-t-elle ? S’étouffe-t-elle ?',
    'Répond-elle ? Saigne-t-elle ? Respire-t-elle ? S’étouffe-t-elle ?',
    'L’ordre n’a pas d’importance',
  ], 'L’examen suit un ordre déterminé : saignement abondant, étouffement, réponse, respiration.'),
  q('q-c3-02', 'C3', 'examiner', 'Comment le SST vérifie-t-il la respiration d’une victime qui ne répond pas ?', [
    '*Il bascule doucement la tête en arrière, élève le menton, puis regarde, écoute et sent pendant 10 secondes au plus',
    'Il place un miroir devant la bouche pendant une minute',
    'Il prend le pouls au poignet',
    'Il secoue fortement la victime',
  ], 'Libérer les voies aériennes puis contrôler la respiration pendant 10 secondes au maximum.'),
  q('q-c3-03', 'C3', 'examiner', 'La victime est sur le ventre et ne répond pas. Pour vérifier sa respiration :', [
    '*Je la mets sur le dos',
    'Je la laisse sur le ventre',
    'Je la mets directement en PLS',
    'Je l’assois',
  ], 'Aide-mémoire INRS : dans le cas où la victime est sur le ventre, la mettre sur le dos.'),
  q('q-c3-04', 'C3', 'examiner', 'Examiner, c’est :', [
    '*Rechercher les signes qui indiquent que la vie de la victime est menacée',
    'Chercher la cause de l’accident',
    'Poser un diagnostic médical',
    'Prendre la tension',
  ], 'Définition de l’aide-mémoire INRS.'),
  q('q-c3-05', 'C3', 'examiner', 'Comment savoir si une victime répond ?', [
    '*Lui poser des questions simples, lui demander de serrer la main et d’ouvrir les yeux',
    'Lui donner une gifle',
    'Lui verser de l’eau sur le visage',
    'Attendre qu’elle parle seule',
  ], '« Vous m’entendez ? Serrez-moi la main, ouvrez les yeux. »'),
  q('q-c3-06', 'C3', 'examiner', 'Quel signe indique une obstruction totale des voies aériennes ?', [
    '*La victime ne peut plus parler, tousser ni émettre de son, bouche ouverte',
    'La victime tousse fort',
    'La victime parle avec difficulté',
    'La victime a les joues rouges',
  ], 'Si la victime tousse ou parle, l’obstruction est partielle.'),
  q('q-c3-07', 'C3', 'examiner', 'Face à une victime qui se plaint d’un malaise, quelles questions le SST pose-t-il ?', [
    '*Depuis quand ? Est-ce la première fois ? Prend-elle un traitement ? A-t-elle une maladie ou une hospitalisation récente ?',
    'Quel est son salaire ?',
    'A-t-elle bien dormi ?',
    'Aucune : il appelle sans parler à la victime',
  ], 'Ces réponses sont transmises au médecin régulateur.'),
  q('q-c3-08', 'C3', 'examiner', 'Quels signes font penser à un accident vasculaire cérébral ? (plusieurs réponses)', [
    '*Visage déformé (sourire de travers)',
    '*Bras qui ne se lève plus',
    '*Difficulté à parler',
    'Fièvre',
  ], 'Visage, bras, parole : appeler le 15 sans attendre et noter l’heure de début des signes.'),

  // ------------------------------------------------------------ C4 – Faire alerter
  q('q-c4-01', 'C4', 'alerter', 'Quel est le numéro du SAMU ?', ['*15', '18', '17', '115'], '15 : SAMU, urgence médicale.'),
  q('q-c4-02', 'C4', 'alerter', 'Quel est le numéro d’urgence européen ?', ['*112', '911', '999', '114'], 'Le 112 fonctionne dans toute l’Union européenne.'),
  q('q-c4-03', 'C4', 'alerter', 'Quel numéro permet aux personnes sourdes ou malentendantes d’alerter ?', ['*114 (SMS, application, visio)', '115', '119', '116 117'],
    'Le 114 est accessible par SMS, application ou visio.'),
  q('q-c4-04', 'C4', 'alerter', 'Que doit contenir le message d’alerte ? (plusieurs réponses)', [
    '*Le lieu précis de l’accident',
    '*La nature de l’accident',
    '*Le nombre de victimes et leur état',
    '*Les actions déjà engagées',
    'Le nom du chef d’entreprise',
  ], 'Lieu, nature, nombre et état des victimes, actions engagées. Ne jamais raccrocher le premier.'),
  q('q-c4-05', 'C4', 'alerter', 'Pendant l’appel aux secours, qui raccroche en premier ?', [
    '*Les secours : le SST ne raccroche jamais le premier',
    'Le SST, dès qu’il a donné l’adresse',
    'Peu importe',
    'La victime',
  ], 'Les secours peuvent avoir besoin de précisions ou donner des consignes.'),
  q('q-c4-06', 'C4', 'alerter', 'Après avoir fait alerter, que fait le SST ?', [
    '*Il s’assure que l’alerte a bien été donnée et fait accueillir les secours pour les guider au plus près de la victime',
    'Il part chercher son chef',
    'Il quitte la victime pour attendre dehors',
    'Il range le matériel',
  ], 'Actions complémentaires de l’aide-mémoire : vérifier l’alerte et organiser l’accès des secours.'),
  q('q-c4-07', 'C4', 'alerter', 'Qui le SST choisit-il pour faire alerter ?', [
    '*Si possible la personne la plus apte (calme, connaissant les lieux), lui-même restant auprès de la victime',
    'Le plus jeune',
    'Personne : le SST appelle toujours lui-même',
    'La victime',
  ], 'Choisir, si possible, la personne la plus apte pour faire alerter les secours.'),
  q('q-c4-08', 'C4', 'alerter', 'Dans l’entreprise, qui le SST fait-il alerter ?', [
    '*Les secours et les personnes prévus dans l’organisation des secours de l’entreprise',
    'Toujours la police (17)',
    'La famille de la victime',
    'Le client',
  ], 'Il suit l’organisation des secours prévue par l’employeur.'),
  q('q-c4-09', 'C4', 'alerter', 'En cas de fuite de gaz, d’où faut-il appeler les secours ?', [
    '*De l’extérieur, après être sorti du local',
    'Depuis le local, pour décrire ce qu’on voit',
    'Avec le téléphone fixe du local',
    'Il ne faut pas appeler',
  ], 'Un téléphone peut provoquer une étincelle : on sort d’abord, puis on appelle le 18 ou l’Urgence Sécurité Gaz.'),
  q('q-c4-10', 'C4', 'alerter', 'Tu es seul chez un client avec une victime. Comment alertes-tu ?', [
    '*J’appelle moi-même, haut-parleur activé, sans quitter la victime',
    'Je pars chercher un voisin',
    'J’attends de voir si la victime va mieux',
    'J’appelle d’abord mon patron',
  ], 'Connaître l’adresse exacte du chantier avant de commencer permet d’alerter vite.'),

  // ------------------------------------------------------------ C5 – Secourir
  q('q-c5-01', 'C5', 'secourir', 'La victime saigne abondamment. Quel est le premier geste ?', [
    '*Comprimer immédiatement l’endroit qui saigne, main protégée si possible',
    'Poser systématiquement un garrot',
    'Surélever la tête',
    'Désinfecter la plaie',
  ], 'Résultat à atteindre : arrêter le saignement.'),
  q('q-c5-02', 'C5', 'secourir', 'La compression manuelle d’un saignement de membre est inefficace. Que fait le SST ?', [
    '*Il pose un garrot',
    'Il arrête de comprimer',
    'Il met de la glace',
    'Il fait boire la victime',
  ], 'Si la compression manuelle est inefficace : garrot (laisser visible).'),
  q('q-c5-03', 'C5', 'secourir', 'Conduite à tenir face à un saignement de nez :', [
    '*Asseoir la victime tête penchée en avant, la faire se moucher, puis comprimer les narines 10 minutes',
    'Basculer la tête en arrière',
    'Mettre du coton dans la narine',
    'Allonger la victime sur le dos',
  ], 'Aide-mémoire INRS, cas particulier du saignement de nez.'),
  q('q-c5-04', 'C5', 'secourir', 'Un adulte s’étouffe (obstruction totale). Que fait le SST ?', [
    '*1 à 5 claques dans le dos, puis si c’est inefficace 1 à 5 compressions abdominales',
    'Il lui fait boire de l’eau',
    'Il commence d’emblée des compressions thoraciques',
    'Il l’allonge sur le dos',
  ], 'Alterner claques dans le dos et compressions abdominales jusqu’à la désobstruction.'),
  q('q-c5-05', 'C5', 'secourir', 'La victime tousse et peut parler après avoir avalé de travers. Que fait le SST ?', [
    '*Il l’installe dans la position où elle se sent le mieux, l’encourage à tousser et suit les conseils des secours',
    'Il donne des claques dans le dos',
    'Il pratique des compressions abdominales',
    'Il lui donne du pain',
  ], 'Obstruction partielle : aucune technique de désobstruction.'),
  q('q-c5-06', 'C5', 'secourir', 'Une femme enceinte s’étouffe et les claques dans le dos sont inefficaces. Quel geste ?', [
    '*Des compressions thoraciques',
    'Des compressions abdominales',
    'Rien d’autre',
    'Encore 20 claques dans le dos',
  ], 'Femme enceinte ou personne obèse : compressions thoraciques.'),
  q('q-c5-07', 'C5', 'secourir', 'Quel est le rythme des compressions thoraciques chez l’adulte ?', ['*100 à 120 par minute', '60 par minute', '30 par minute', '150 à 180 par minute'],
    'Comprimer le thorax en respectant un rythme de 100 à 120 par minute.'),
  q('q-c5-08', 'C5', 'secourir', 'Chez l’adulte, la réanimation cardio-pulmonaire alterne :', [
    '*30 compressions et 2 insufflations',
    '15 compressions et 2 insufflations',
    '5 compressions et 1 insufflation',
    '30 compressions et 5 insufflations',
  ], 'Cycles de 30 compressions et 2 insufflations ; chez l’enfant et le nourrisson, 15 et 2 après 5 insufflations initiales.'),
  q('q-c5-09', 'C5', 'secourir', 'Chez l’enfant ou le nourrisson qui ne respire pas, on commence par :', ['*5 insufflations', '30 compressions', '2 insufflations', 'Le défibrillateur'],
    'Même conduite que chez l’adulte, mais en débutant par 5 insufflations.'),
  q('q-c5-10', 'C5', 'secourir', 'Quand faut-il mettre en œuvre le défibrillateur ?', [
    '*Le plus tôt possible',
    'Après 10 minutes de massage',
    'Uniquement en présence d’un médecin',
    'Jamais en entreprise',
  ], 'Mettre en œuvre le DAE le plus tôt possible, en le faisant apporter par un témoin.'),
  q('q-c5-11', 'C5', 'secourir', 'La victime ne répond pas mais respire, après un malaise sans chute. Quelle position ?', [
    '*La position latérale de sécurité (PLS)',
    'Sur le dos, jambes surélevées',
    'Assise',
    'Aucune : on commence le massage cardiaque',
  ], 'État d’origine non traumatique : PLS.'),
  q('q-c5-12', 'C5', 'secourir', 'La victime ne répond pas mais respire, après une chute de hauteur. Que fait le SST ?', [
    '*Il la laisse sur le dos et maintient la liberté des voies aériennes',
    'Il la met en PLS',
    'Il l’assoit',
    'Il la relève',
  ], 'Aide-mémoire INRS 2024 : en cas d’évènement traumatique ou d’origine inconnue, laisser la victime sur le dos et maintenir la liberté des voies aériennes.'),
  q('q-c5-13', 'C5', 'secourir', 'Conduite à tenir face à une brûlure thermique :', [
    '*Arroser immédiatement à l’eau courante tempérée pendant au moins 10 minutes (idéalement 20)',
    'Appliquer de la glace',
    'Mettre du beurre ou une pommade',
    'Percer les cloques',
  ], 'En parallèle, retirer les vêtements s’ils n’adhèrent pas à la peau.'),
  q('q-c5-14', 'C5', 'secourir', 'Conduite à tenir face à une brûlure chimique de la peau :', [
    '*Rincer immédiatement et abondamment à l’eau tempérée, sans contaminer les zones saines, et ôter les vêtements imbibés en se protégeant',
    'Neutraliser avec du vinaigre',
    'Essuyer avec un chiffon',
    'Appliquer une pommade',
  ], 'Consulter et conserver la fiche de données de sécurité du produit.'),
  q('q-c5-15', 'C5', 'secourir', 'Une personne a avalé un produit caustique. Que fait le SST ?', [
    '*Il ne la fait ni vomir ni boire, et demande un avis médical',
    'Il la fait vomir',
    'Il lui donne du lait',
    'Il lui donne beaucoup d’eau',
  ], 'Placer la victime assise en cas de difficultés respiratoires.'),
  q('q-c5-16', 'C5', 'secourir', 'Une brûlure est grave quand… (plusieurs réponses)', [
    '*Les cloques ont une surface supérieure à la moitié de la paume de la main de la victime',
    '*Elle touche le visage, les mains, les articulations ou les orifices',
    '*Elle présente une destruction profonde (aspect blanchâtre ou noirâtre)',
    'Il s’agit d’une simple rougeur sans cloque',
  ], 'Une victime fragile (enfant, personne âgée) aggrave aussi la situation.'),
  q('q-c5-17', 'C5', 'secourir', 'Après une chute, la victime se plaint du cou. Que fait le SST ?', [
    '*Il lui demande de ne pas bouger la tête et la maintient à deux mains dans la position où elle se trouve',
    'Il lui fait tourner la tête pour tester',
    'Il place un coussin sous sa tête',
    'Il l’aide à se relever',
  ], 'Éviter toute manipulation intempestive et stabiliser le rachis cervical si possible.'),
  q('q-c5-18', 'C5', 'secourir', 'Conduite à tenir face à un traumatisme d’un membre :', [
    '*Demander de ne pas bouger la partie atteinte et respecter la position prise par la victime',
    'Remettre le membre en place',
    'Faire marcher la victime',
    'Masser la zone douloureuse',
  ], 'On ne remet jamais un membre « en place ».'),
  q('q-c5-19', 'C5', 'secourir', 'Dans quelle position installer une victime qui a une plaie grave du thorax ?', [
    '*Assise, la plaie laissée à l’air libre',
    'À plat dos, jambes fléchies',
    'En PLS',
    'Debout',
  ], 'Plaie de l’abdomen : à plat dos, jambes fléchies. Plaie de l’œil : allongée, les deux yeux fermés.'),
  q('q-c5-20', 'C5', 'secourir', 'Dans quelle position installer une victime qui a une plaie grave de l’abdomen ?', [
    '*À plat dos, jambes fléchies',
    'Assise',
    'Sur le ventre',
    'Debout',
  ], 'Aide-mémoire INRS : plaie de l’abdomen, à plat dos, jambes fléchies.'),
  q('q-c5-21', 'C5', 'secourir', 'Un éclat est entré dans l’œil d’un collègue. Que fait le SST ?', [
    '*Il l’allonge, lui demande de fermer les deux yeux et maintient sa tête',
    'Il rince l’œil et retire l’éclat',
    'Il lui fait fermer seulement l’œil blessé',
    'Il l’assoit tête en arrière',
  ], 'Ne jamais retirer un corps étranger.'),
  q('q-c5-22', 'C5', 'secourir', 'Un objet est planté dans une plaie. Que fait le SST ?', [
    '*Il ne le retire pas',
    'Il le retire doucement',
    'Il le tire d’un coup sec',
    'Il le coupe au ras de la peau',
  ], 'Le corps étranger peut limiter le saignement : on ne le retire jamais.'),
  q('q-c5-23', 'C5', 'secourir', 'Conduite à tenir face à une plaie simple :', [
    '*Se laver les mains, nettoyer la plaie à l’eau et au savon, la protéger par un pansement',
    'Mettre du ruban adhésif d’électricien',
    'Souffler dessus et continuer à travailler',
    'Ne rien faire',
  ], 'Puis conseiller de vérifier la vaccination antitétanique.'),
  q('q-c5-24', 'C5', 'secourir', 'Après une plaie simple, que conseille le SST ? (plusieurs réponses)', [
    '*Vérifier que la vaccination antitétanique est à jour',
    '*Consulter un médecin en cas de fièvre ou de zone chaude, rouge, gonflée ou douloureuse',
    'Retirer le pansement au bout d’une heure',
    'Ne jamais consulter',
  ], 'Actions complémentaires de l’aide-mémoire INRS.'),
  q('q-c5-25', 'C5', 'secourir', 'Un doigt a été sectionné. Que fait-on du segment ?', [
    '*On le place dans un sac fermé, posé dans un contenant réfrigéré, et on le remet aux secours',
    'On le met directement dans la glace',
    'On le jette',
    'On le fixe avec du ruban adhésif',
  ], 'Protéger aussi le moignon avec un champ stérile, des compresses ou un linge propre.'),
  q('q-c5-26', 'C5', 'secourir', 'La victime se plaint d’un malaise. Que fait le SST ?', [
    '*Il la met au repos, l’écoute, la questionne, demande un avis médical et suit les conseils donnés',
    'Il la fait marcher pour la réveiller',
    'Il lui donne un verre d’alcool',
    'Il la laisse seule se reposer',
  ], 'Résultat à atteindre : éviter l’aggravation et prendre un avis médical.'),
  q('q-c5-27', 'C5', 'secourir', 'Un collègue diabétique en malaise réclame du sucre. Que fait le SST ?', [
    '*Il lui en donne, puisqu’il en réclame, et demande un avis médical',
    'Il refuse',
    'Il lui fait une injection d’insuline',
    'Il attend que ça passe',
  ], 'Le SST aide, à sa demande, la victime à prendre un médicament ou du sucre.'),
  q('q-c5-28', 'C5', 'secourir', 'Malaise provoqué par la chaleur, victime consciente : que fait le SST ?', [
    '*Il l’installe au frais et à l’air, la rafraîchit et la fait boire de l’eau fraîche par petites quantités si elle peut boire',
    'Il la couvre chaudement',
    'Il la laisse reprendre le travail',
    'Il lui fait boire un litre d’eau glacée d’un coup',
  ], 'Aide-mémoire INRS, cas particulier du malaise provoqué par la chaleur.'),
  q('q-c5-29', 'C5', 'secourir', 'Deux SST pratiquent une réanimation. Comment s’organisent-ils ?', [
    '*Ils se relaient toutes les 2 minutes en interrompant le moins possible les compressions',
    'Ils se relaient toutes les 10 minutes',
    'Ils ne se relaient jamais',
    'Ils arrêtent le massage pendant une minute à chaque relais',
  ], 'Pratiquer, si possible, la RCP à 2 SST.'),
  q('q-c5-30', 'C5', 'secourir', 'Les insufflations sont impossibles. Que fait le SST ?', [
    '*Il réalise des compressions thoraciques en continu',
    'Il arrête la réanimation',
    'Il attend les secours',
    'Il fait uniquement des insufflations',
  ], 'Si les insufflations ne peuvent pas être effectuées, compressions thoraciques en continu.'),

  // ------------------------------------------------------------ C6 – Rôle dans la prévention
  q('q-c6-01', 'C6', 'prevention', 'En tant qu’acteur de la prévention, que fait le SST ? (plusieurs réponses)', [
    '*Il repère les situations dangereuses',
    '*Il supprime ou fait supprimer les dangers, dans la limite de son champ de compétences',
    '*Il informe et fait remonter les situations dangereuses aux personnes concernées',
    'Il sanctionne les collègues imprudents',
  ], 'Aide-mémoire INRS : le SST au service de la prévention dans son entreprise.'),
  q('q-c6-02', 'C6', 'prevention', 'À qui le SST fait-il remonter une situation dangereuse ?', [
    '*Aux personnes chargées de la prévention : employeur, chef d’équipe, maître d’apprentissage, CSE…',
    'Sur les réseaux sociaux',
    'Directement à l’inspection du travail, sans prévenir l’employeur',
    'À personne si rien ne s’est passé',
  ], 'L’information suit l’organisation de la prévention de l’entreprise.'),
  q('q-c6-03', 'C6', 'prevention', 'Toute situation dangereuse repérée doit faire l’objet :', [
    '*D’une remontée d’informations',
    'D’une sanction',
    'D’une photo publiée en ligne',
    'De rien tant que personne n’est blessé',
  ], 'Aide-mémoire INRS.'),
  q('q-c6-04', 'C6', 'prevention', 'Le droit de retrait s’exerce face à :', [
    '*Un danger grave et imminent pour sa vie ou sa santé',
    'Une tâche désagréable',
    'Un temps pluvieux',
    'Un désaccord avec son chef',
  ], 'Article L4131-1 du Code du travail.'),
  q('q-c6-05', 'C6', 'prevention', 'Face à un danger grave et imminent, que fait d’abord le salarié ?', [
    '*Il alerte immédiatement l’employeur',
    'Il prévient ses amis',
    'Il termine son travail',
    'Il ne dit rien et rentre chez lui',
  ], 'J’alerte l’employeur, je peux me retirer, on ne peut pas m’obliger à reprendre tant que le danger persiste.'),
  q('q-c6-06', 'C6', 'prevention', 'Quels acteurs de la prévention sont extérieurs à l’entreprise ? (plusieurs réponses)', [
    '*Le médecin du travail (service de prévention et de santé au travail)',
    '*L’OPPBTP',
    '*La Carsat',
    'Le fournisseur de matériaux',
  ], 'Aussi : l’inspection du travail et l’INRS.'),
  q('q-c6-07', 'C6', 'prevention', 'Pour contribuer concrètement à la prévention sur un chantier, le SST peut :', [
    '*Observer son poste avant de commencer et signaler ce qui peut faire mal',
    'Attendre qu’un accident arrive pour agir',
    'Retirer lui-même les protections qui gênent',
    'Laisser la sécurité au seul chef de chantier',
  ], 'Observer, analyser, informer : deux minutes d’observation avant de sortir les outils.'),

  // ------------------------------------------------------------ C7 – Caractériser les risques
  q('q-c7-01', 'C7', 'prevention', 'Le danger, c’est :', [
    '*Ce qui peut faire mal : une cause capable de provoquer une lésion ou une atteinte à la santé',
    'La blessure',
    'La probabilité qu’un accident arrive',
    'L’accident lui-même',
  ], '« Ce qui peut faire mal ou fait mal. »'),
  q('q-c7-02', 'C7', 'prevention', 'La situation dangereuse, c’est :', [
    '*Une situation dans laquelle une personne est exposée à un danger',
    'Le dommage subi',
    'L’événement déclencheur',
    'Un lieu interdit au public',
  ], 'Danger + personne exposée = situation dangereuse.'),
  q('q-c7-03', 'C7', 'prevention', 'L’événement dangereux, c’est :', [
    '*Ce qui se produit et transforme la situation dangereuse en accident',
    'La blessure',
    'Le danger',
    'La mesure de prévention',
  ], 'C’est le déclencheur : si rien n’est fait, il finit par se produire.'),
  q('q-c7-04', 'C7', 'prevention', 'Le dommage, c’est :', [
    '*La lésion ou l’atteinte à la santé qui en résulte',
    'Le danger',
    'L’événement dangereux',
    'Le coût de la réparation',
  ], 'Dernière étape du processus d’apparition du dommage.'),
  q('q-c7-05', 'C7', 'prevention', 'Le risque est la combinaison :', [
    '*De la probabilité qu’un événement dangereux se produise et de la gravité du dommage',
    'Du danger et de l’opérateur',
    'De l’accident et de la maladie',
    'Du lieu et de l’heure de travail',
  ], 'Définition reprise dans le support de cours.'),
  q('q-c7-06', 'C7', 'prevention', 'Un apprenti brase au chalumeau à côté d’un isolant. Quel est le danger ?', [
    '*La flamme du chalumeau',
    'L’apprenti',
    'La brûlure de la main',
    'L’isolant qui s’enflamme',
  ], 'La brûlure est le dommage ; l’isolant qui s’enflamme est l’événement dangereux.', ['mit', 'mis']),
  q('q-c7-07', 'C7', 'prevention', 'Qu’est-ce qu’un accident de trajet ?', [
    '*Un accident survenu sur le parcours entre le domicile et le lieu de travail (ou le lieu de repas)',
    'Un accident survenu pendant une mission chez un client',
    'Une maladie liée au travail',
    'Un accident à la maison le week-end',
  ], 'À ne pas confondre avec l’accident du travail.'),
  q('q-c7-08', 'C7', 'prevention', 'Qu’est-ce qu’une maladie professionnelle ?', [
    '*Une maladie liée à l’exposition à un risque pendant l’activité, reconnue si elle figure dans un tableau de la Sécurité sociale',
    'Une grippe attrapée au travail',
    'Un événement soudain survenu au travail',
    'Toute maladie d’un salarié',
  ], 'Exemples : TMS de l’épaule, maladies liées à l’amiante.'),
  q('q-c7-09', 'C7', 'prevention', 'Une accumulation de monoxyde de carbone appartient à quelle catégorie de danger ?', [
    '*Atmosphère toxique ou irrespirable',
    'Mécanique',
    'Électrique',
    'Thermique',
  ], 'Le monoxyde de carbone est invisible et inodore : seul un détecteur le repère.'),
  q('q-c7-10', 'C7', 'prevention', 'Un vieux calorifuge s’effrite sur des tuyaux à déposer. Que faut-il penser et faire ?', [
    '*Amiante possible : arrêter, ne pas toucher et signaler',
    'Aucun risque : continuer',
    'Le gratter pour vérifier',
    'Le balayer à sec',
  ], 'L’inhalation de fibres d’amiante peut provoquer des maladies professionnelles graves.', ['mit', 'mis']),

  // ------------------------------------------------------------ C8 – Maîtriser les risques
  q('q-c8-01', 'C8', 'prevention', 'Quel est le premier des principes généraux de prévention ?', [
    '*Éviter les risques',
    'Fournir des équipements de protection individuelle',
    'Former les salariés',
    'Sanctionner les imprudents',
  ], 'Les 9 principes commencent par éviter les risques, puis évaluer ceux qui ne peuvent pas être évités.'),
  q('q-c8-02', 'C8', 'prevention', 'Entre protection collective et protection individuelle, laquelle privilégier ?', [
    '*La protection collective',
    'La protection individuelle',
    'C’est indifférent',
    'Aucune des deux',
  ], 'Un garde-corps protège toute l’équipe ; le harnais ne protège que celui qui le porte.'),
  q('q-c8-03', 'C8', 'prevention', 'Sertir un raccord plutôt que le braser illustre quel principe ?', [
    '*Remplacer ce qui est dangereux par ce qui l’est moins',
    'Planifier la prévention',
    'Donner les instructions appropriées',
    'Évaluer les risques',
  ], 'Plus de flamme sur le chantier : le danger est supprimé.', ['mit', 'mis']),
  q('q-c8-04', 'C8', 'prevention', 'Lequel de ces exemples est une protection collective ?', ['*Un garde-corps', 'Un harnais', 'Des gants', 'Des lunettes de protection'],
    'La protection collective protège toutes les personnes exposées.'),
  q('q-c8-05', 'C8', 'prevention', 'Le danger ne peut pas être supprimé. Que peut faire le SST ?', [
    '*Proposer des pistes d’amélioration pour réduire le risque',
    'Ne rien faire',
    'Retirer les protections qui gênent',
    'Attendre qu’un accident survienne',
  ], 'Contribuer à la réduction du risque en proposant des pistes d’amélioration.'),
  q('q-c8-06', 'C8', 'prevention', 'Lequel de ces exemples est un équipement de protection individuelle (EPI) ?', [
    '*Des chaussures de sécurité',
    'Un garde-corps',
    'Une ventilation mécanique',
    'Un écran pare-flamme',
  ], 'Les EPI viennent en complément, quand les protections collectives ne suffisent pas.'),
  q('q-c8-07', 'C8', 'prevention', 'Lequel de ces exemples correspond à « combattre les risques à la source » ?', [
    '*Aspirer les poussières au point où elles sont émises',
    'Distribuer des masques',
    'Afficher une consigne',
    'Organiser une formation',
  ], 'On agit directement sur l’origine du risque.'),
  q('q-c8-08', 'C8', 'prevention', 'Consigner une installation électrique avant d’intervenir permet de :', [
    '*Supprimer le danger électrique pendant l’intervention',
    'Réduire seulement la gravité d’une électrisation',
    'Protéger uniquement les autres personnes',
    'Rien de particulier',
  ], 'Couper, condamner, identifier, vérifier l’absence de tension.'),
];

const pick = (prefix: string, n: number) => DEFAULT_QUESTIONS.filter((x) => x.id.startsWith(prefix)).slice(0, n).map((x) => x.id);

export const DEFAULT_QUIZZES: QuizTemplate[] = [
  {
    id: 'quiz-eval-initiale',
    title: 'QCM d’évaluation – formation initiale',
    description: '20 questions réparties sur les 8 compétences, avec un poids plus fort sur l’épreuve 2 (C1, C6, C7, C8).',
    type: 'evaluation',
    tradeIds: [],
    questionIds: [
      ...pick('q-c1-', 3),
      ...pick('q-c2-', 2),
      ...pick('q-c3-', 2),
      ...pick('q-c4-', 2),
      ...pick('q-c5-', 3),
      ...pick('q-c6-', 3),
      ...pick('q-c7-', 3),
      ...pick('q-c8-', 2),
    ],
  },
  {
    id: 'quiz-train-proteger-examiner',
    title: 'Entraînement – Protéger et examiner',
    type: 'entrainement',
    tradeIds: [],
    questionIds: [...pick('q-c2-', 9), ...pick('q-c3-', 8)],
  },
  {
    id: 'quiz-train-alerter-secourir',
    title: 'Entraînement – Faire alerter et secourir',
    type: 'entrainement',
    tradeIds: [],
    questionIds: [...pick('q-c4-', 10), ...pick('q-c5-', 30)],
  },
  {
    id: 'quiz-train-prevention',
    title: 'Entraînement – Cadre du SST et prévention',
    type: 'entrainement',
    tradeIds: [],
    questionIds: [...pick('q-c1-', 10), ...pick('q-c6-', 7), ...pick('q-c7-', 10), ...pick('q-c8-', 8)],
  },
];
