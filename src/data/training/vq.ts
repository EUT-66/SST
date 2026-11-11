// Cas d'entraînement – Vie quotidienne (tous métiers) : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-vq-01',
    title: 'La tronçonneuse au fond du jardin',
    geste: 'Saignement abondant : garrot (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Samedi matin, chez tes grands-parents. Ton cousin Mathis, 22 ans, coupe du bois au fond du jardin avec une tronçonneuse, en jean et en baskets. Tu entends un cri : il est assis dans l’herbe, les deux mains sur la cuisse droite, le jean trempé de sang. La tronçonneuse est par terre à côté de lui, le moteur tourne encore. Ta grand-mère arrive en courant.',
    victime:
      'Assis dans l’herbe, conscient, tu tiens ta cuisse qui saigne beaucoup. La tête te tourne si tu restes assis. Le formateur annonce que le sang continue de couler malgré la compression : le SST doit poser un garrot. Tu as froid, tu as peur et tu demandes si c’est grave.',
    temoin:
      'Ta grand-mère. Veut mettre Mathis dans la voiture pour l’emmener elle-même aux urgences. Appelle le 15 si le SST le lui demande, puis va ouvrir le portail et attendre les secours dans la rue.',
    materiel:
      'Tapis, tissu ou maquillage rouge sur le pantalon, objet pour figurer la tronçonneuse, gants ou sac plastique, garrot de formation (ou lien large et bâton), stylo, couverture, téléphone factice, montre.',
    actions: [
      act('Arrête le moteur avec le bouton d’arrêt, sans passer la main près de la chaîne, et écarte la tronçonneuse', 'C2a', 'C2c'),
      act('Repère le saignement abondant de la cuisse', 'C3a'),
      act('Comprime immédiatement l’endroit qui saigne, main protégée (gant, sac plastique)', 'C5a', 'C5b'),
      act('Allonge la victime sans relâcher la compression', 'C5b'),
      act('Refuse le transport en voiture et fait alerter le 15 par la grand-mère : adresse, blessure à la cuisse par tronçonneuse, saignement abondant, compression en cours', 'C4a'),
      act('Constate que la compression ne suffit pas et pose un garrot à quelques centimètres au-dessus de la plaie, jamais sur une articulation, serré jusqu’à l’arrêt du saignement', 'C5a', 'C5b'),
      act('Note l’heure de pose, laisse le garrot visible et ne le desserre jamais', 'C5b'),
      act('Fait guider les secours du portail jusqu’au fond du jardin', 'C4b'),
      act('Couvre la victime, la rassure et surveille son état et le saignement jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'La chaîne en mouvement de la tronçonneuse',
      situation: 'Mathis coupe seul des branches posées au sol, sans pantalon de protection',
      evenement: 'La chaîne touche le sol et la tronçonneuse rebondit vers sa jambe',
      dommage: 'Plaie profonde de la cuisse avec saignement abondant',
      eviter:
        'Acheter du bois déjà coupé ou faire appel à un professionnel. Sinon : chevalet pour couper à bonne hauteur, chaîne affûtée et frein de chaîne vérifié, ne jamais couper seul ; pantalon anti-coupure, chaussures de sécurité, gants, casque avec visière et protections auditives ; lire la notice avant de s’en servir.',
      remonter: 'Les grands-parents, propriétaires de la tronçonneuse, et la famille : plus de coupe de bois sans équipement ni seul.',
    },
  }),
  makeCase({
    id: 'ent-vq-02',
    title: 'La soirée crêpes à l’internat',
    geste: 'Étouffement : obstruction totale (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Mercredi soir, soirée crêpes dans la cuisine commune de l’internat. La poêle est sur la plaque allumée et le beurre commence à fumer. Yanis, qui fait le clown, avale d’un coup une crêpe roulée presque entière en riant. Tout à coup, il se lève, les mains sur la gorge, la bouche ouverte, sans un son. Deux internes rient : ils croient qu’il fait semblant.',
    victime:
      'Debout, mains sur la gorge, bouche ouverte. Tu ne parles pas, tu ne tousses pas, tu fais « oui » de la tête si on te demande si tu t’étouffes. Les claques dans le dos ne suffisent pas. À la deuxième compression abdominale, tu « recraches » le morceau, tu tousses, puis tu reparles.',
    temoin:
      'Lucie, une interne. Croit d’abord à une blague, puis dit à Yanis de lever les bras et veut lui donner un verre d’eau. Éteint la plaque, retire la poêle et va chercher le surveillant si le SST le lui demande.',
    materiel:
      'Chaise, assiette, poêle et plaque figurées (carton), verre, téléphone factice. Claques et compressions mimées : mains bien placées, geste retenu.',
    actions: [
      act('Fait éteindre la plaque et retirer la poêle du feu par Lucie, en une phrase, sans perdre de temps', 'C2a', 'C2c'),
      act('Demande « Tu t’étouffes ? » et constate l’obstruction totale : il ne parle pas, ne tousse pas, aucun son ne sort', 'C3a', 'C3b'),
      act('Refuse le verre d’eau et les bras levés', 'C5b'),
      act('Se place sur le côté et un peu en arrière, penche la victime en avant et donne 1 à 5 claques vigoureuses entre les omoplates', 'C5a', 'C5b'),
      act('Les claques étant inefficaces, enchaîne 1 à 5 compressions abdominales, poing au creux de l’estomac, et alterne si besoin', 'C5b'),
      act('S’arrête dès que la victime tousse, respire et parle, l’installe dans la position où elle se sent le mieux et la réconforte', 'C5c'),
      act('Fait prévenir le surveillant et appelle le 15 pour un avis médical, en signalant les compressions abdominales', 'C4a'),
      act('Surveille la victime et sait que, si elle perd connaissance, on alerte et on commence la réanimation', 'C5c'),
    ],
    prevention: {
      danger: 'La bouchée de crêpe, beaucoup trop grosse',
      situation: 'Yanis avale une crêpe presque entière en faisant le clown et en riant',
      evenement: 'La bouchée part dans les voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque d’arrêt cardiaque',
      eviter:
        'Manger assis, par petites bouchées, sans parler ni rire la bouche pleine ; pas de « défi » qui consiste à avaler le plus possible. En cuisine : ne jamais laisser une poêle chauffer sans surveillance.',
      remonter: 'Le surveillant ou le CPE de l’internat, même si tout s’est bien fini, et la famille de Yanis.',
    },
  }),
  makeCase({
    id: 'ent-vq-03',
    title: 'Le beach-volley en plein soleil',
    geste: 'Malaise dû à la chaleur (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Un samedi d’août, 15 h, sur la plage. Avec des amis, tu joues au beach-volley depuis deux heures en plein soleil. Chloé, 19 ans, s’arrête et s’assoit dans le sable brûlant. Elle est rouge, en sueur, dit qu’elle a mal à la tête, envie de vomir et que « tout tourne ». Sa bouteille d’eau est vide depuis longtemps. Les autres veulent finir le match.',
    victime:
      'Assise dans le sable, consciente. Tu as très chaud, mal à la tête, la nausée et la tête qui tourne. Tu réponds aux questions : pas de maladie, pas de médicament, tu n’as presque rien bu depuis midi. Tu vas un peu mieux après quelques minutes à l’ombre, rafraîchie, en buvant par petites gorgées.',
    temoin:
      'Un ami. Veut l’emmener se baigner « pour la rafraîchir » et lui faire boire d’un coup une bouteille d’eau glacée. Va chercher un parasol ou les sauveteurs du poste de secours si le SST le lui demande.',
    materiel:
      'Serviette de plage ou tapis, parasol ou drap tendu pour faire de l’ombre, bouteille d’eau, linges mouillés ou brumisateur, ballon, téléphone factice.',
    actions: [
      act('Repère la chaleur et le soleil comme danger pour Chloé et pour les autres joueurs, et fait arrêter le match', 'C2a', 'C2b'),
      act('Met la victime au repos à l’ombre, dans un endroit frais et aéré (parasol, poste de secours)', 'C5a', 'C5b'),
      act('Observe les signes et questionne : depuis quand, ce qu’elle a bu, maladie, traitement', 'C3a', 'C3b'),
      act('Refuse la baignade et l’eau glacée avalée d’un coup', 'C5b'),
      act('La rafraîchit (linges mouillés, brumisateur) et lui fait boire de l’eau fraîche par petites quantités, puisqu’elle est consciente et peut boire', 'C5b'),
      act('Fait prévenir le poste de secours de la plage et appelle le 15 pour un avis médical, puis suit ses conseils', 'C4a'),
      act('Fait guider les sauveteurs ou les secours jusqu’au terrain', 'C4b'),
      act('Reste avec elle et la surveille : si elle devient confuse ou ne répond plus, rappelle aussitôt les secours', 'C5c'),
    ],
    prevention: {
      danger: 'La chaleur et le soleil',
      situation: 'Chloé fait un effort intense en plein soleil, aux heures les plus chaudes, sans boire',
      evenement: 'Son corps n’arrive plus à évacuer la chaleur',
      dommage: 'Malaise dû à la chaleur, avec risque de coup de chaleur',
      eviter:
        'Jouer le matin ou en fin d’après-midi plutôt qu’aux heures les plus chaudes ; installer un coin d’ombre et faire des pauses régulières ; prévoir assez d’eau et boire sans attendre d’avoir soif ; casquette et vêtements légers ; se surveiller les uns les autres.',
      remonter: 'Le poste de secours de la plage et le médecin du 15 ; le groupe d’amis, pour mieux organiser les prochaines sorties.',
    },
  }),
  makeCase({
    id: 'ent-vq-04',
    title: 'La prise du salon',
    geste: 'Brûlure électrique (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Samedi après-midi, chez toi. Ton grand frère Sofiane, 23 ans, remplace une prise de courant dans le salon. Il a seulement éteint la lumière, sans couper au tableau électrique. Tu entends un claquement : il est assis par terre et secoue sa main droite. Les fils dénudés sortent encore du mur, le tournevis est tombé sur le parquet. Ta mère arrive de la cuisine.',
    victime:
      'Assis par terre, conscient. Tu as mal à la main : petite brûlure noirâtre au bout du pouce et de l’index. Tu portes une bague et une montre. Sur le coup, tu as senti ton cœur s’emballer. Tu dis que ça va et tu veux finir la prise. Tu acceptes de passer la main sous l’eau si le SST insiste.',
    temoin:
      'Ta mère. Veut ramasser le tournevis et remettre le cache de la prise, puis mettre une pommade sur la brûlure. Coupe le courant au tableau électrique ou appelle le 15 si le SST le lui demande.',
    materiel:
      'Boîtier et fils figurés (ruban adhésif rouge), tournevis, feuille avec un disjoncteur dessiné, bassine ou bouteilles d’eau, bague et montre à retirer, chaise, couverture, téléphone factice (son chronomètre sert à mesurer le temps d’arrosage).',
    actions: [
      act('Interdit à tous de toucher les fils, le tournevis et le mur', 'C2a', 'C2b'),
      act('Fait couper le courant au disjoncteur général du tableau électrique avant de toucher quoi que ce soit', 'C2c'),
      act('Examine : la victime répond, se plaint de la main, brûlure au bout des doigts', 'C3a', 'C3b'),
      act('Arrose immédiatement la brûlure à l’eau courante tempérée, au moins 10 minutes, idéalement 20', 'C5a', 'C5b'),
      act('Retire la bague et la montre pendant l’arrosage et refuse la pommade', 'C5b'),
      act('Appelle ou fait appeler le 15 malgré l’avis de la victime : une brûlure électrique est toujours grave', 'C4a'),
      act('Applique les consignes du médecin, met la victime au repos et la couvre', 'C5b'),
      act('La surveille en permanence, prêt à réanimer si elle perd connaissance ou ne respire plus', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique dans les fils de la prise',
      situation: 'Sofiane travaille sur la prise sans avoir coupé le courant au tableau',
      evenement: 'Le tournevis touche un fil sous tension',
      dommage: 'Électrisation et brûlure électrique de la main',
      eviter:
        'Couper le circuit au disjoncteur du tableau et vérifier l’absence de tension avec un testeur avant de toucher ; tester régulièrement le disjoncteur différentiel (bouton test) ; outils isolés ; confier le travail à un électricien si on ne sait pas faire.',
      remonter: 'Les parents, pour faire vérifier l’installation et terminer la prise par une personne compétente.',
    },
  }),
  makeCase({
    id: 'ent-vq-05',
    title: 'Le plongeon dans le petit bain',
    geste: 'Traumatisme du cou (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Juillet, chez les parents d’un ami qui ont une piscine. Lucas, 18 ans, plonge tête la première dans le petit bain. Il ressort en se tenant la nuque, marche jusqu’aux marches et s’assoit sur le rebord, les pieds dans l’eau. Il dit qu’il a très mal au cou et des fourmis dans les mains. Les autres continuent de sauter dans l’eau juste à côté de lui.',
    victime:
      'Assis sur le rebord, les pieds dans l’eau, les mains sur la nuque. Conscient, tu réponds. Très mal au cou, fourmillements dans les deux mains. Tu n’as pas perdu connaissance. Tu as froid et tu veux aller t’allonger sur un transat.',
    temoin:
      'Un copain. Veut lui faire tourner doucement la tête « pour débloquer », puis l’aider à se lever pour l’installer sur un transat. Fait sortir les autres de l’eau, appelle ou ouvre le portail aux secours si le SST le lui demande.',
    materiel: 'Banc ou chaise pour le rebord, tissu bleu ou serviettes pour figurer l’eau, serviettes de bain, téléphone factice.',
    actions: [
      act('Fait arrêter les sauts et sortir les autres de l’eau, loin de Lucas', 'C2a', 'C2b', 'C2c'),
      act('Demande à la victime de ne pas bouger la tête et de rester assise', 'C5a', 'C5b'),
      act('Se place derrière elle et maintient sa tête à deux mains, dans la position où elle se trouve', 'C5b'),
      act('Questionne : douleur, fourmillements, perte de connaissance, a-t-il avalé de l’eau', 'C3a', 'C3b'),
      act('Refuse qu’on lui tourne la tête, qu’on le lève ou qu’on le déplace', 'C5b'),
      act('Fait alerter le 15 ou le 18 : adresse, plongeon en eau peu profonde, douleur au cou et fourmillements', 'C4a'),
      act('Fait ouvrir le portail et guider les secours jusqu’à la piscine', 'C4b'),
      act('Fait couvrir la victime avec des serviettes, la rassure et garde le maintien de la tête jusqu’au relais des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le fond du petit bain, trop peu profond pour plonger',
      situation: 'Lucas plonge tête la première dans une eau peu profonde',
      evenement: 'Sa tête heurte le fond',
      dommage: 'Traumatisme du cou avec risque d’atteinte de la moelle épinière',
      eviter:
        'Règle de la maison : pas de plongeon dans le petit bain, on saute les pieds en avant ; profondeur marquée sur la margelle et panneau « plongeon interdit » ; vérifier la profondeur avant de plonger ; pas d’alcool avant la baignade.',
      remonter: 'Les parents de ton ami, propriétaires de la piscine, pour afficher la règle et marquer la profondeur.',
    },
  }),
  makeCase({
    id: 'ent-vq-06',
    title: 'La porte vitrée du foyer',
    geste: 'Plaie grave de l’abdomen, corps étranger (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Pause de 10 h au CFA. Au foyer des apprentis, Bilal et un copain chahutent. Bilal est poussé contre la porte vitrée, qui se brise. Il est assis par terre à côté de la porte, la main sur le ventre : un éclat de verre est planté sur le côté de son abdomen. Des morceaux de verre couvrent le sol et un grand morceau pointu pend encore dans le cadre. Une dizaine d’apprentis s’approchent pour voir.',
    victime:
      'Assis par terre, conscient, pâle. Un éclat de verre est planté sur le côté du ventre ; ça saigne un peu autour, pas beaucoup. Tu as mal, tu veux retirer l’éclat et aller toi-même à l’accueil. Tu te laisses installer si le SST t’explique.',
    temoin:
      'Le copain qui l’a poussé, paniqué. Veut retirer l’éclat « pour que ça ne s’enfonce pas » et aider Bilal à marcher jusqu’à l’accueil. Fait reculer les autres, prévient l’accueil ou va au-devant des secours si le SST le lui demande.',
    materiel:
      'Tapis, faux éclat en carton scotché sur le tee-shirt, papier froissé pour le verre au sol, ruban de balisage ou chaises, sac pour caler les jambes, gants, couverture, téléphone factice.',
    actions: [
      act('Fait reculer les apprentis, interdit le passage par la porte et l’accès aux éclats', 'C2a', 'C2b', 'C2d'),
      act('Écarte du pied les éclats autour de la victime pour pouvoir s’agenouiller, sans toucher au morceau qui pend dans le cadre', 'C2c'),
      act('Examine : la victime répond, saigne peu, plaie de l’abdomen avec un éclat planté', 'C3a', 'C3b'),
      act('Interdit de retirer l’éclat', 'C5b'),
      act('Allonge la victime à plat dos, jambes fléchies, sans appuyer sur l’éclat', 'C5a', 'C5b'),
      act('Fait alerter le 15 et prévenir l’accueil du CFA, selon l’organisation des secours du centre', 'C4a'),
      act('Fait accueillir et guider les secours de l’entrée jusqu’au foyer', 'C4b'),
      act('Couvre, ne donne rien à boire, rassure et surveille jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'La vitre de la porte du foyer, en verre ordinaire',
      situation: 'Bilal et son copain chahutent juste devant la porte vitrée',
      evenement: 'Bilal est poussé contre la vitre, qui se brise',
      dommage: 'Plaie de l’abdomen avec un éclat de verre planté',
      eviter:
        'Remplacer la vitre par du verre de sécurité (feuilleté ou trempé) ou par un panneau plein ; en attendant, film de protection sur la vitre ; règle du foyer : pas de chahut près des portes et des vitres.',
      remonter: 'La vie scolaire ou le CPE du CFA, qui préviendra la direction pour faire changer la vitre.',
    },
  }),
  makeCase({
    id: 'ent-vq-07',
    title: 'La fin de soirée près du brasero',
    geste: 'Ne répond pas, respire (alcool, sans choc : PLS) (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Samedi, 1 h du matin, anniversaire dans le jardin d’un copain. La musique est forte, un brasero brûle encore. Jade, 17 ans, a bu beaucoup de vodka. Tu la trouves allongée sur le dos dans l’herbe, à un mètre du brasero ; quelques braises fument dans l’herbe près de sa tête. Son amie Manon te dit : « Elle s’est assise sur le banc, puis elle s’est couchée là toute seule pour dormir. Elle ne s’est pas cognée. »',
    victime:
      'Allongée sur le dos, yeux fermés. Tu ne réponds pas, tu ne serres pas la main, tu respires normalement. Origine non traumatique : pas de chute, pas de choc, aucune blessure. Quelques minutes après avoir été mise en PLS, tu fais un bruit de vomissement.',
    temoin:
      'Manon, son amie. Veut lui passer la tête sous l’eau froide, lui faire boire du café, puis la coucher seule dans une chambre ; supplie de ne pas appeler : « Ses parents vont la tuer. » Confirme qu’elle ne s’est pas cognée. Éteint les braises ou accueille les secours dans la rue si le SST le lui demande.',
    materiel: 'Tapis, bouteille vide, seau, objet pour figurer le brasero, couverture ou veste, téléphone factice.',
    actions: [
      act('Fait éteindre les braises dans l’herbe et le brasero avec un seau d’eau, et écarte les bouteilles', 'C2a', 'C2c'),
      act('Examine : ne répond pas, ne serre pas la main ; libère les voies aériennes et constate qu’elle respire', 'C3a', 'C3b'),
      act('Fait confirmer par Manon qu’il n’y a eu ni chute ni choc : l’origine est connue et non traumatique (alcool)', 'C3a'),
      act('Met la victime en position latérale de sécurité, du côté opposé au brasero', 'C5a', 'C5b'),
      act('Refuse l’eau froide, le café et l’idée de la laisser dormir seule', 'C5b'),
      act('Appelle ou fait appeler le 15 malgré les supplications : jeune fille de 17 ans, a bu beaucoup d’alcool, ne répond pas, respire, en PLS', 'C4a'),
      act('Fait baisser la musique, allumer l’éclairage et accueillir les secours dans la rue', 'C4b'),
      act('La couvre et surveille sa respiration en permanence jusqu’aux secours, prêt à réanimer', 'C5c'),
    ],
    prevention: {
      danger: 'L’alcool fort',
      situation: 'Jade, 17 ans, boit beaucoup de vodka en peu de temps, sans manger',
      evenement: 'L’alcool atteint un taux dangereux dans son sang',
      dommage: 'Perte de connaissance, avec risque d’étouffement par les vomissements et de refroidissement',
      eviter:
        'Pas d’alcool fort, et pas d’alcool pour les mineurs ; prévoir à manger et des boissons sans alcool ; un ou deux amis qui restent sobres pour veiller sur les autres ; ne jamais laisser seul un ami qui a trop bu ; brasero entouré, surveillé et éteint en fin de soirée.',
      remonter: 'Le copain qui organise et ses parents, ainsi que les parents de Jade, qui est mineure ; le médecin du 15.',
    },
  }),
  makeCase({
    id: 'ent-vq-08',
    title: 'L’escalier mécanique du centre commercial',
    geste: 'Arrêt cardiaque : défibrillateur (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Samedi après-midi, au centre commercial. Devant toi, un homme d’une cinquantaine d’années, chargé de sacs, descend l’escalier mécanique. Arrivé en bas, il s’effondre juste à la sortie de l’escalier, qui continue d’amener des gens vers lui. Sa femme crie son nom et le secoue. Un agent de sécurité arrive en courant ; un défibrillateur est accroché près de l’accueil.',
    victime: 'Mannequin allongé sur le dos au pied de l’escalier. Ne répond pas, ne respire pas.',
    temoin:
      'Deux camarades. La femme de la victime : le secoue, veut lui jeter de l’eau au visage, dit qu’il avait mal dans la poitrine une heure avant. L’agent de sécurité : veut le mettre en PLS ; arrête l’escalier, alerte, apporte le défibrillateur et guide les secours si le SST le lui demande.',
    materiel:
      'Mannequin, défibrillateur de formation, sacs de courses, feuille avec le bouton d’arrêt d’urgence dessiné, téléphone factice.',
    actions: [
      act('Appuie ou fait appuyer sur le bouton d’arrêt d’urgence de l’escalier et fait contourner la zone', 'C2a', 'C2b', 'C2c'),
      act('Examine : ne répond pas, ne respire pas', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 par l’agent de sécurité et fait apporter le défibrillateur', 'C4a'),
      act('Commence aussitôt les compressions thoraciques à 100 à 120 par minute : 30 compressions et 2 insufflations, ou compressions seules si les insufflations sont impossibles', 'C5a', 'C5b'),
      act('Refuse la PLS et l’eau au visage', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée, suit ses instructions et fait écarter tout le monde pendant l’analyse et le choc', 'C5b'),
      act('Fait guider les secours par l’agent de sécurité jusqu’au bon niveau du centre', 'C4b'),
      act('Poursuit la réanimation en interrompant le moins possible les compressions, en se relayant toutes les 2 minutes si une autre personne formée est là, jusqu’au relais des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Pas de danger extérieur : l’arrêt cardiaque vient de l’état de santé (point à discuter)',
      situation: 'L’homme a eu mal dans la poitrine une heure avant et a continué ses courses, chargé de sacs',
      evenement: 'Trouble grave du rythme cardiaque',
      dommage: 'Arrêt cardiaque',
      eviter:
        'Une douleur dans la poitrine qui serre, même si elle passe, justifie d’appeler le 15 tout de suite. Repérer où se trouvent les défibrillateurs dans les lieux qu’on fréquente ; se former aux gestes qui sauvent.',
      remonter: 'Le service de sécurité du centre commercial (défibrillateur à remettre en état, escalier arrêté) ; le médecin du 15.',
    },
  }),
  makeCase({
    id: 'ent-vq-09',
    title: 'Le chauffage d’appoint du studio',
    geste: 'Malaise : intoxication au monoxyde de carbone (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Un dimanche de janvier, il fait très froid. Tu rejoins trois amis qui jouent à la console depuis midi dans le petit studio d’Adam. Les fenêtres sont fermées, un chauffage d’appoint au pétrole tourne au milieu de la pièce. En entrant, tu trouves l’air lourd. Adam a très mal à la tête et envie de vomir ; Camille est assise par terre et dit que la tête lui tourne. Inès dit qu’elle a juste un peu mal à la tête.',
    victime:
      'Deux camarades. Adam : assis sur le canapé, très mal à la tête, nausées, répond normalement. Camille : assise par terre, vertiges, très fatiguée, répond lentement ; elle peut marcher si on la soutient. Tous les deux vont un peu mieux à l’air frais.',
    temoin:
      'Inès, qui a un peu mal à la tête. Pense que « c’est la pizza » et veut rester au chaud en entrouvrant juste la fenêtre ; une fois dehors, veut remonter chercher son téléphone. Aide Camille à sortir et appelle les secours si le SST le lui demande.',
    materiel: 'Carton pour figurer le chauffage, canapé ou chaises, porte et fenêtre figurées, couvertures, téléphone factice.',
    actions: [
      act('Repère le danger : un appareil qui brûle du pétrole dans une pièce fermée et plusieurs personnes avec les mêmes signes', 'C2a', 'C2b'),
      act('Éteint le chauffage et ouvre en grand fenêtres et porte, sans rester dans la pièce plus que nécessaire', 'C2c'),
      act('Fait sortir tout le monde à l’air frais, en soutenant Camille, et interdit de remonter', 'C2b', 'C2e'),
      act('Examine chaque victime dehors : elles répondent, maux de tête, nausées, vertiges', 'C3a', 'C3b'),
      act('Met les victimes au repos, assises ou allongées, et les couvre', 'C5a', 'C5b'),
      act('Appelle le 18, le 15 ou le 112 : trois personnes avec des signes d’intoxication au monoxyde de carbone, chauffage d’appoint au pétrole, adresse et étage', 'C4a'),
      act('Suit les conseils des secours et ne laisse personne prendre le volant ou repartir seul', 'C5b'),
      act('Fait accueillir les secours en bas de l’immeuble et surveille les victimes, surtout Camille, jusqu’à leur arrivée', 'C4b', 'C5c'),
    ],
    prevention: {
      danger: 'Le monoxyde de carbone dégagé par le chauffage d’appoint, un gaz invisible et sans odeur',
      situation: 'Trois amis restent des heures dans une petite pièce fermée avec le chauffage allumé',
      evenement: 'Le gaz s’accumule dans la pièce et ils le respirent',
      dommage: 'Intoxication au monoxyde de carbone : maux de tête, nausées, vertiges, risque de perte de connaissance',
      eviter:
        'Ne pas se chauffer en continu avec un chauffage d’appoint à combustion et faire réparer le chauffage principal ; aérer la pièce chaque jour et ne jamais boucher les aérations ; faire entretenir les appareils ; installer un détecteur de monoxyde de carbone ; connaître les signes.',
      remonter: 'Le propriétaire du studio (chauffage principal, aérations) et la famille d’Adam.',
    },
  }),
  makeCase({
    id: 'ent-vq-10',
    title: 'Le déboucheur dans l’évier',
    geste: 'Brûlure chimique (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la cuisine de ta colocation, l’évier est bouché. Maëlys, 20 ans, verse un déboucheur liquide directement dans l’évier, penchée au-dessus, sans gants. Le produit bouillonne et gicle : elle crie, elle a des projections sur l’avant-bras et dans le cou, et son tee-shirt est mouillé de produit sur l’épaule. Le flacon ouvert est posé au bord de l’évier, qui fume encore. Ton colocataire Théo arrive.',
    victime:
      'Debout, consciente. Ça brûle sur l’avant-bras droit et dans le cou, la peau est rouge. Rien dans les yeux. Tu veux te frotter le cou avec un torchon. Tu te laisses rincer et tu acceptes qu’on retire ton tee-shirt si le SST t’explique comment.',
    temoin:
      'Théo, le colocataire. Veut « neutraliser » avec du vinaigre et mettre de la crème, ou rincer quelques secondes dans l’évier. Ouvre la fenêtre, apporte des ciseaux et des gants ou appelle le 15 si le SST le lui demande.',
    materiel:
      'Flacon vide avec une étiquette, gants de ménage, ciseaux à bouts ronds, vieux tee-shirt, douche figurée ou bassine et bouteilles d’eau, serviette, couverture, téléphone factice, montre.',
    actions: [
      act('Fait refermer le flacon avec des gants, l’écarte, ouvre la fenêtre et ne touche pas au produit resté dans l’évier', 'C2a', 'C2c'),
      act('Examine : la victime répond, brûlures de l’avant-bras et du cou, rien dans les yeux', 'C3a', 'C3b'),
      act('Rince immédiatement et longuement à l’eau courante tempérée, sous la douche plutôt que dans l’évier où reste le produit', 'C5a', 'C5b'),
      act('Oriente le rinçage du cou vers le bas, tête penchée, pour que l’eau ne coule ni vers les yeux ni sur la peau saine', 'C5b'),
      act('Met des gants et retire le tee-shirt imbibé en le découpant, sans le faire passer sur le visage', 'C5b'),
      act('Refuse le vinaigre, la crème et le frottement', 'C5b'),
      act('Fait alerter le 15 en donnant le nom du produit lu sur l’étiquette, et garde le flacon pour les secours', 'C4a'),
      act('Poursuit le rinçage selon les consignes du médecin, puis couvre, réconforte et surveille', 'C5c'),
    ],
    prevention: {
      danger: 'Le déboucheur, produit corrosif',
      situation: 'Maëlys verse le produit penchée au-dessus de l’évier, sans gants ni lunettes',
      evenement: 'Le produit bouillonne et gicle sur elle',
      dommage: 'Brûlures chimiques de l’avant-bras et du cou',
      eviter:
        'Déboucher d’abord sans produit (ventouse, furet, démontage du siphon) ; si on utilise un déboucheur : lire l’étiquette et ses pictogrammes, respecter la dose, ne jamais le mélanger avec un autre produit ; gants, lunettes et manches longues ; ranger le flacon fermé, hors de portée.',
      remonter: 'Les colocataires (achat d’une ventouse, rangement des produits) et le propriétaire si l’évier se bouche souvent.',
    },
  }),
  makeCase({
    id: 'ent-vq-11',
    title: 'La chute à la salle d’escalade',
    geste: 'Traumatisme du poignet (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Mercredi soir, à la salle d’escalade de bloc. Sarah, 18 ans, tente un passage difficile, lâche prise en haut du mur et se reçoit sur la main, au bord du tapis. Elle est assise sur le tapis au pied du mur et tient son avant-bras gauche contre son ventre ; son poignet a une forme bizarre. Juste au-dessus d’elle, un autre grimpeur continue de monter sur le même mur.',
    victime:
      'Assise, consciente, tu soutiens ton avant-bras gauche avec ta main droite. Très mal au poignet, qui est déformé. Tu ne t’es cognée ni la tête ni le dos. Tu veux te lever pour aller t’asseoir à l’accueil.',
    temoin:
      'Un ami de grimpe. Veut tirer doucement sur la main « pour remettre le poignet droit », puis l’aider à se lever. Fait descendre le grimpeur, prévient l’accueil et guide les secours si le SST le lui demande.',
    materiel: 'Tapis, deux chaises ou un mur pour figurer le bloc, couverture, téléphone factice.',
    actions: [
      act('Fait désescalader le grimpeur au-dessus de Sarah et interdit l’accès à la zone de chute de ce mur', 'C2a', 'C2b', 'C2d'),
      act('Demande à la victime de ne pas bouger le bras et respecte la position qu’elle a prise', 'C5a', 'C5b'),
      act('Questionne : douleur, choc à la tête ou au dos, sensibilité des doigts', 'C3a', 'C3b'),
      act('Refuse qu’on remette le poignet en place et qu’on la fasse se lever', 'C5b'),
      act('Fait alerter le 15 par l’accueil de la salle : chute d’un mur d’escalade, poignet déformé', 'C4a'),
      act('Fait guider les secours de l’entrée jusqu’au mur', 'C4b'),
      act('Couvre, rassure et surveille la victime (douleur, couleur des doigts) jusqu’aux secours', 'C5c'),
    ],
    prevention: {
      danger: 'La hauteur du mur de bloc',
      situation: 'En fin de séance, Sarah tente un passage trop difficile pour elle, au-dessus du bord du tapis',
      evenement: 'Elle lâche prise et se reçoit sur la main tendue',
      dommage: 'Traumatisme du poignet, fracture possible',
      eviter:
        'Choisir des passages de son niveau et désescalader plutôt que sauter depuis le haut ; tapis sans espace entre eux et zone de chute dégagée ; un seul grimpeur par mur à la fois ; s’échauffer et apprendre à chuter (genoux fléchis, rouler en arrière, sans tendre les bras).',
      remonter: 'Le personnel d’accueil de la salle (bord du tapis, règle d’un seul grimpeur par mur).',
    },
  }),
  makeCase({
    id: 'ent-vq-12',
    title: 'La trottinette et la portière',
    geste: 'Ne répond pas, respire (après un choc : sur le dos) (vie quotidienne)',
    category: 'vie_quotidienne',
    tradeIds: [],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Vendredi, 23 h, tu rentres à pied en ville. Devant toi, Noah, 19 ans, sans casque, roule en trottinette électrique le long des voitures garées. Un conducteur ouvre sa portière sans regarder : Noah la percute, il est projeté et sa tête heurte la chaussée. Il est allongé sur le dos au milieu de la voie et ne bouge plus. Des voitures arrivent dans les deux sens ; le conducteur, choqué, est sorti de sa voiture.',
    victime:
      'Allongé sur le dos, yeux fermés. Tu ne réponds pas, tu ne serres pas la main, tu respires. Origine traumatique : choc de la tête sur la chaussée, bosse et un peu de sang sur le front (maquillage). Tu ne bouges pas jusqu’aux secours.',
    temoin:
      'Le conducteur. Veut tirer Noah sur le trottoir, puis le mettre « en position de sécurité comme dans les films ». Allume ses feux de détresse, signale l’accident aux voitures avec la lampe de son téléphone ou appelle les secours si le SST le lui demande.',
    materiel: 'Tapis, trottinette ou chaise couchée, gilet jaune, lampe ou téléphone, maquillage rouge, couverture, téléphone factice.',
    actions: [
      act('Regarde la circulation avant de s’engager sur la chaussée et se rend visible (gilet, lampe)', 'C2a'),
      act('Fait allumer les feux de détresse et fait signaler l’accident de chaque côté, assez loin pour que les voitures ralentissent à temps', 'C2b', 'C2d'),
      act('Examine : ne répond pas, ne serre pas la main ; libère les voies aériennes avec précaution et constate qu’il respire', 'C3a', 'C3b'),
      act('Le laisse sur le dos, car l’origine est traumatique (choc à la tête), maintient sa tête à deux mains et garde ses voies aériennes libres', 'C5a', 'C5b'),
      act('Refuse la PLS et ne le déplace pas : le balisage contrôle le danger, un dégagement d’urgence n’est pas justifié', 'C5b'),
      act('Fait alerter le 15, le 18 ou le 112 : adresse précise, trottinette contre une portière, choc à la tête, ne répond pas, respire', 'C4a'),
      act('Fait accueillir et guider les secours jusqu’à la victime', 'C4b'),
      act('Le fait couvrir et surveille sa respiration en permanence, prêt à réanimer s’il ne respire plus', 'C5c'),
    ],
    prevention: {
      danger: 'La portière qui s’ouvre et la circulation',
      situation: 'Noah roule de nuit, sans casque, tout près des voitures garées',
      evenement: 'Une portière s’ouvre devant lui, il la percute et sa tête heurte la chaussée',
      dommage: 'Traumatisme de la tête avec perte de connaissance',
      eviter:
        'Prendre les pistes cyclables quand il y en a ; rouler à distance des portières des voitures garées ; casque, éclairage et vêtements réfléchissants ; vitesse adaptée. Pour les conducteurs : regarder dans le rétroviseur et ouvrir la portière avec la main opposée, ce qui oblige à se tourner et à voir arriver vélos et trottinettes.',
      remonter: 'La police ou la gendarmerie venue sur place et la famille de Noah ; si c’était sur le trajet du travail ou du CFA, l’employeur et le CFA (accident de trajet).',
    },
  }),
];
