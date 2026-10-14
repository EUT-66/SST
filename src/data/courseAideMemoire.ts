// Fiches de révision reprenant l'aide-mémoire SST de l'INRS (ED 4085, 6e édition, 2024).
import type { Callout, Course, Slide, SlideItem } from '../lib/types';

let n = 0;
const id = () => `am-s${String(++n).padStart(2, '0')}`;
const items = (...pairs: [string, string?, string?][]): SlideItem[] =>
  pairs.map(([title, text, value]) => ({ title, text, value }));
const plus = (text: string): Callout => ({ kind: 'info', title: 'Actions complémentaires', text });
const verifier: Callout = {
  kind: 'attention',
  title: 'Vérifier',
  text: 'Vérifier, par observation, l’atteinte et la persistance du résultat attendu, jusqu’à la prise en charge de la victime par les secours.',
};

const slides: Slide[] = [
  {
    id: id(),
    layout: 'cover',
    kicker: 'Prévention et secours',
    title: 'Aide-mémoire du Sauveteur Secouriste du Travail',
    subtitle: 'L’essentiel des conduites à tenir, d’après l’aide-mémoire INRS ED 4085 (2024)',
  },
  {
    id: id(),
    layout: 'steps',
    kicker: 'Prévention',
    title: 'Être acteur de la prévention des risques professionnels',
    items: items(
      ['Repérer', 'Les situations dangereuses, les dangers pouvant entraîner une atteinte à la santé et les personnes exposées.'],
      ['Supprimer ou faire supprimer', 'Les dangers, dans la limite de son champ de compétences, de son autonomie et dans le respect de l’organisation de l’entreprise.'],
      ['Relayer', 'Aux personnes concernées les informations liées aux situations dangereuses repérées.'],
    ),
    callouts: [{ kind: 'info', text: 'Une situation professionnelle est dangereuse lorsqu’un ou plusieurs individus sont exposés à un ou plusieurs dangers pouvant entraîner un accident ou une maladie.' }],
  },
  {
    id: id(),
    layout: 'cards',
    kicker: 'Prévention',
    title: 'Supprimer le danger, réduire le risque',
    items: items(
      ['Contribuer à la suppression du danger', 'Si vous repérez une situation dangereuse, la solution à privilégier est de supprimer le danger, par votre action ou celle d’un tiers, s’il est possible d’agir directement.'],
      ['Contribuer à la réduction du risque', 'Si le danger ne peut pas être supprimé, proposez des pistes d’amélioration en matière de prévention.'],
      ['Actions complémentaires', 'Lorsque la prévention ne suffit pas : mesures de protection, en privilégiant les protections collectives aux protections individuelles.'],
    ),
    callouts: [{ kind: 'attention', text: 'Toute situation dangereuse repérée doit faire l’objet d’une remontée d’informations.' }],
  },
  {
    id: id(),
    layout: 'cards',
    kicker: 'Secours',
    title: 'Intervenir face à une situation d’accident du travail',
    body: 'Le SST intervient sur son lieu de travail pour porter les premiers secours à toute victime d’un accident, dans les limites de son champ d’intervention :',
    items: items(
      ['Le plus tôt possible', 'Et jusqu’à la prise en charge de la victime par les secours (internes ou externes).'],
      ['Sous la responsabilité de l’employeur', 'Au sein de l’entreprise.'],
      ['Avec les moyens prévus', 'Mis en place par l’employeur et/ou le médecin du travail.'],
    ),
    callouts: [{ kind: 'info', text: 'Il peut aussi être amené à intervenir en dehors de son lieu de travail pour porter assistance à une personne en péril.' }],
  },
  {
    id: id(),
    layout: 'steps',
    kicker: 'Les conduites à tenir',
    title: 'Protéger',
    body: 'C’est agir, sans risque pour sa propre sécurité, afin d’éviter un sur-accident, lorsque la victime et toute autre personne sont exposées à un danger persistant.',
    items: items(
      ['Identifier le(s) danger(s) persistant(s)', 'Mécanique · Électrique · Thermique ou pouvant provoquer un incendie ou une explosion · Atmosphère toxique ou irrespirable.'],
      ['Peut-on les supprimer de façon permanente et sans risque ?', 'Si oui, le faire ou le faire faire.'],
      ['Sinon, peut-on isoler la zone dangereuse de façon permanente et sans risque ?', 'Si oui, le faire ou le faire faire. Interdire l’accès à la zone dangereuse.'],
    ),
    callouts: [plus('Si le danger persistant est réel, immédiat, non contrôlable et menace la vie de la victime : effectuer une manœuvre exceptionnelle de dégagement d’urgence.')],
  },
  {
    id: id(),
    layout: 'steps',
    kicker: 'Les conduites à tenir',
    title: 'Examiner',
    body: 'C’est rechercher les signes qui indiquent que la vie de la victime est menacée.',
    items: items(
      ['La victime saigne-t-elle abondamment ?'],
      ['La victime s’étouffe-t-elle ?'],
      ['La victime répond-elle aux questions ? Se plaint-elle ?'],
      ['La victime, si elle ne répond pas, respire-t-elle ?', 'Dans le cas où la victime est sur le ventre, la mettre sur le dos.'],
    ),
  },
  {
    id: id(),
    layout: 'cards',
    kicker: 'Les conduites à tenir',
    title: 'Faire alerter',
    body: 'C’est transmettre les informations nécessaires et suffisantes pour que les secours puissent organiser leur intervention. L’alerte doit être la plus précoce possible.',
    items: items(
      ['Qui ?', 'Les secours et les personnes prévus dans l’organisation des secours de l’entreprise. Le 114 est le numéro d’appel pour les sourds et malentendants.'],
      ['Comment ?', 'Choisir, si possible, la personne la plus apte pour faire alerter les secours.'],
      ['Le message', 'Le lieu · La nature de l’accident · Le nombre de victimes · L’état de la (des) victime(s) · Les actions déjà engagées. Ne jamais raccrocher le premier.'],
    ),
    callouts: [plus('S’assurer que l’alerte a bien été donnée. Envoyer une personne au-devant des secours et organiser leur accès au plus près de la victime.')],
  },
  {
    id: id(),
    layout: 'steps',
    kicker: 'Secourir',
    title: 'La victime saigne abondamment',
    result: 'Arrêter le saignement',
    items: items(
      ['Faire comprimer ou comprimer l’endroit qui saigne avec la paume de la main (protégée si possible).'],
      ['Allonger la victime.'],
      ['Si compression manuelle inefficace : garrot.'],
      ['Si compression manuelle efficace : pansement compressif si besoin. Si le saignement reprend : compression manuelle sur le pansement. S’il se poursuit : garrot.'],
    ),
    callouts: [
      { kind: 'info', title: 'Cas particuliers', text: 'Saignement de nez : asseoir, tête penchée en avant ; faire moucher, puis comprimer les narines 10 minutes. Vomissements ou crachats sanglants : position où la victime se sent le mieux.' },
      plus('Surveiller l’efficacité de la technique. Couvrir (si un garrot est posé, le laisser visible). Réconforter.'),
    ],
  },
  {
    id: id(),
    layout: 'cards',
    kicker: 'Secourir',
    title: 'La victime s’étouffe',
    result: 'Lui permettre de respirer',
    items: items(
      ['Obstruction complète', 'La victime ne peut plus parler, tousser ou émettre un son, garde la bouche ouverte. Donner 1 à 5 claques dans le dos. Si inefficace : adulte, grand enfant : compressions abdominales ; femme enceinte, personne obèse : compressions thoraciques ; nourrisson : compressions thoraciques avec deux doigts.'],
      ['Obstruction partielle', 'La victime peut parler, tousser et respirer, même avec un bruit surajouté. La mettre dans la position où elle se sent le mieux, l’encourager à tousser, suivre les conseils des secours.'],
    ),
    callouts: [verifier, plus('Position où elle se sent le mieux, couvrir et surveiller, réconforter, suivre les conseils des secours.')],
  },
  {
    id: id(),
    layout: 'steps',
    kicker: 'Secourir',
    title: 'La victime ne répond pas, elle ne respire pas',
    result: 'Rétablir artificiellement une respiration et une circulation sanguine efficaces',
    items: items(
      ['Comprimer le thorax (30 compressions) à un rythme de 100 à 120 par minute.'],
      ['Souffler de l’air dans les poumons (2 insufflations).'],
      ['Répéter des cycles de 30 compressions et 2 insufflations.'],
      ['Mettre en œuvre le plus tôt possible le défibrillateur (DAE), en le faisant rapporter par un témoin.'],
    ),
    callouts: [
      { kind: 'info', title: 'Enfant et nourrisson', text: 'Débuter par 5 insufflations, puis répéter des cycles de 15 compressions et 2 insufflations. Poursuivre jusqu’à l’arrivée des secours.' },
      plus('Pratiquer si possible la RCP à 2 SST en se relayant toutes les 2 minutes. Si les insufflations sont impossibles : compressions thoraciques en continu.'),
    ],
  },
  {
    id: id(),
    layout: 'steps',
    kicker: 'Secourir',
    title: 'La victime ne répond pas, elle respire',
    result: 'Lui permettre de continuer à respirer',
    items: items(
      ['Allonger la victime sur le dos.'],
      ['Libérer les voies respiratoires.'],
      ['Évènement non traumatique : mettre la victime sur le côté (position latérale de sécurité).'],
      ['Évènement traumatique ou d’origine inconnue : laisser la victime sur le dos et maintenir la liberté des voies aériennes.'],
    ),
    callouts: [verifier, plus('Couvrir. Surveiller en permanence sa respiration.')],
  },
  {
    id: id(),
    layout: 'steps',
    kicker: 'Secourir',
    title: 'La victime se plaint de malaise',
    result: 'Éviter l’aggravation et prendre un avis médical',
    items: items(
      ['Observer les signes du malaise, en particulier les signes d’AVC, d’accident cardiaque ou de maladie infectieuse.'],
      ['Mettre la victime au repos.'],
      ['Écouter, questionner la victime et/ou son entourage.'],
      ['Suivre les conseils donnés par les secours.'],
    ),
    callouts: [
      { kind: 'info', title: 'Cas particuliers', text: 'Malaise vagal connu de la victime : position accroupie tête baissée, ou croiser les jambes et contracter les muscles, ou agripper les mains et écarter les coudes. Malaise dû à la chaleur : endroit frais et aéré, rafraîchir, faire boire de l’eau fraîche par petites quantités si la victime est consciente et capable de boire.' },
      plus('Aider, à sa demande, la victime à prendre un médicament ou du sucre. Réconforter et surveiller.'),
    ],
  },
  {
    id: id(),
    layout: 'cards',
    kicker: 'Secourir',
    title: 'La victime se plaint de brûlures',
    result: 'Éviter l’aggravation de la brûlure',
    items: items(
      ['Thermique ou électrique', 'Arroser immédiatement à l’eau courante tempérée pendant au moins 10 minutes (idéalement 20). En parallèle, retirer les vêtements s’ils n’adhèrent pas à la peau.'],
      ['Chimique', 'Rincer immédiatement à l’eau courante tempérée pour éliminer le produit, sans contaminer les zones saines ; ôter les vêtements imbibés en se protégeant.'],
      ['Ingestion ou inhalation de produits caustiques', 'Ne pas faire vomir ni boire. Placer la victime en position assise en cas de difficultés respiratoires.'],
    ),
    callouts: [verifier, plus('Faire allonger, ou asseoir en cas de difficultés respiratoires. Produit chimique : consulter et conserver la fiche de données de sécurité. Couvrir, réconforter, surveiller.')],
  },
  {
    id: id(),
    layout: 'cards',
    kicker: 'Secourir',
    title: 'Douleur empêchant certains mouvements',
    result: 'Éviter l’aggravation du traumatisme supposé',
    items: items(
      ['Douleur au cou à la suite d’un traumatisme', 'Demander à la victime de ne pas bouger la tête. Éviter toute manipulation intempestive. Stabiliser si possible le rachis cervical, dans la position où il se trouve, en maintenant la tête à deux mains.'],
      ['Traumatisme d’un membre', 'Demander à la victime de ne pas bouger la partie atteinte. Éviter toute manipulation intempestive. Respecter la position prise par la victime.'],
    ),
    callouts: [verifier, plus('Couvrir. Réconforter et surveiller.')],
  },
  {
    id: id(),
    layout: 'cards',
    kicker: 'Secourir',
    title: 'Plaie qui ne saigne pas abondamment',
    result: 'Éviter l’aggravation de la plaie',
    items: items(
      ['Plaie grave : position d’attente', 'Thorax : assise, plaie à l’air libre. Abdomen : à plat dos, jambes fléchies. Œil : allongée, les deux yeux fermés, tête maintenue à deux mains si possible.'],
      ['Corps étranger, section de membre', 'Ne pas retirer les corps étrangers. Section de membre : protéger le moignon et isoler le segment dans un sac placé dans un contenant réfrigéré.'],
      ['Plaie simple', 'Nettoyer et protéger la plaie.'],
    ),
    callouts: [plus('Demander à la victime de vérifier sa vaccination antitétanique et de consulter en cas de fièvre ou de zone chaude, rouge, gonflée ou douloureuse dans les jours qui suivent.')],
  },
  {
    id: id(),
    layout: 'steps',
    kicker: 'Plan d’intervention SST',
    title: 'Moins de trois minutes pour agir',
    items: items(['Protéger'], ['Examiner'], ['Faire alerter'], ['Secourir']),
    callouts: [{ kind: 'info', text: 'Pour conserver la validité de son certificat, le SST suit une formation « Maintien et actualisation des compétences » tous les 24 mois.' }],
  },
];

export const COURSE_AIDE_MEMOIRE: Course = {
  id: 'cours-aide-memoire',
  title: 'Aide-mémoire SST (INRS)',
  description: 'Fiches de révision des conduites à tenir, valables pour tous les métiers.',
  tradeIds: [],
  order: 0,
  slides,
};
