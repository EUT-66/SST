// Cas d'entraînement – Métallier (serrurier) : réservés à l'entraînement, propositions à relire par la formatrice.
import { act, makeCase } from '../caseHelpers';
import type { PracticalCase } from '../../lib/types';

const SRC = 'Cas d’entraînement – proposition à relire';

export const cases: PracticalCase[] = [
  makeCase({
    id: 'ent-met-01',
    title: 'La meuleuse qui rebondit',
    geste: 'Saignement abondant',
    category: 'metier',
    tradeIds: ['metallier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Dans la cage d’escalier d’une résidence neuve, Yanis recoupe à la meuleuse une main courante qu’il tient de la main gauche. Le disque se coince, la meuleuse rebondit et lui entaille la cuisse ; il la lâche et elle continue de tourner au sol sur le palier, bloquée en marche et toujours branchée à la rallonge du coffret de chantier. Quand tu arrives, Yanis est assis sur une marche, son pantalon est rouge de sang. Un plaquiste qui travaille à l’étage accourt.',
    victime:
      'Assis sur une marche, se tient la cuisse, saignement abondant. Pâle, inquiet, répond aux questions et respire normalement. Quand la compression est bien faite, le formateur annonce que le saignement s’arrête.',
    temoin:
      'Le plaquiste. Veut attraper la meuleuse qui tourne pour l’arrêter. Débranche la rallonge au coffret, appelle les secours puis descend les attendre en bas de l’immeuble si le SST le lui demande.',
    materiel:
      'Meuleuse factice et rallonge, tissu rouge, gants, compresses et bande, garrot de formation, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère la meuleuse qui tourne au sol et fait débrancher la rallonge au coffret avant d’approcher', 'C2a', 'C2c'),
      act('Repère le saignement abondant de la cuisse', 'C3a'),
      act('Comprime immédiatement l’endroit qui saigne avec la paume de la main protégée (gant), ou le fait comprimer par Yanis', 'C5a', 'C5b'),
      act('Allonge la victime sur le palier sans relâcher la compression', 'C5b'),
      act('Fait alerter le 15 : adresse et étage, saignement abondant de la cuisse, compression en cours', 'C4a'),
      act('Compression efficace : pose un pansement compressif ; si le saignement continue malgré la compression : pose un garrot', 'C5b'),
      act('Fait attendre les secours en bas de l’immeuble et les guider jusqu’au palier', 'C4b'),
      act('Couvre, réconforte et surveille l’arrêt du saignement et l’état de la victime', 'C5c'),
    ],
    prevention: {
      danger: 'Le disque de la meuleuse en rotation',
      situation: 'Yanis coupe dans l’escalier une pièce tenue à la main, avec une meuleuse dont l’interrupteur est bloqué en marche',
      evenement: 'Le disque se coince et la meuleuse rebondit vers sa jambe',
      dommage: 'Plaie profonde de la cuisse, saignement abondant',
      eviter:
        'Préparer les coupes à l’atelier ; sinon pièce bridée (serre-joints, étau) et position stable, meuleuse avec poignée et interrupteur « homme mort » (elle s’arrête dès qu’on la lâche), carter en place, disque adapté ; gants, lunettes et vêtements de travail adaptés.',
      remonter: 'Chef de chantier ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-met-02',
    title: 'Casse-croûte près de la trémie',
    geste: 'Étouffement (obstruction totale)',
    category: 'metier',
    tradeIds: ['metallier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Sur le chantier d’un magasin, tu poses avec Inès un escalier métallique qui monte à une mezzanine. À la pause casse-croûte, vous mangez assis sur la mezzanine avec un électricien, à deux mètres de la trémie qui n’a pas encore de garde-corps. Inès croque dans une pomme en riant, puis se lève d’un coup, les mains à la gorge, la bouche ouverte, sans un son, et recule vers le bord de la trémie.',
    victime:
      'Debout, mains à la gorge, bouche ouverte. Ne parle pas, ne tousse pas, fait oui de la tête si on lui demande si elle s’étouffe. Recule vers la trémie. Les claques dans le dos ne suffisent pas ; à la deuxième compression abdominale, recrache le morceau, tousse et reparle.',
    temoin:
      'L’électricien. Lui tend une bouteille d’eau et lui dit de lever les bras. Appelle le 15 et passe le téléphone au SST si on le lui demande.',
    materiel:
      'Ruban au sol pour délimiter la trémie, caisses pour s’asseoir, pomme ou emballage, téléphone factice. Claques et compressions mimées, geste retenu.',
    actions: [
      act('Repère la trémie sans garde-corps et éloigne Inès du bord avant d’agir', 'C2a', 'C2b'),
      act('Demande « Tu t’étouffes ? » et constate l’obstruction totale (ne parle pas, ne tousse pas)', 'C3a', 'C3b'),
      act('Refuse qu’on lui donne de l’eau', 'C5b'),
      act('Penche la victime en avant et donne 1 à 5 claques vigoureuses dans le dos, entre les omoplates', 'C5a', 'C5b'),
      act('Si les claques sont inefficaces : 1 à 5 compressions abdominales, mains bien placées, en alternance avec les claques', 'C5b'),
      act('Une fois la victime désobstruée : l’installe dans la position où elle se sent le mieux et la réconforte', 'C5c'),
      act('Demande un avis médical au 15 (compressions abdominales réalisées) et suit ses conseils', 'C4a'),
      act('Couvre et surveille la victime', 'C5c'),
    ],
    prevention: {
      danger: 'Le morceau de nourriture (et la trémie non protégée à côté)',
      situation: 'Inès mange vite en parlant et en riant, assise près d’une trémie sans garde-corps',
      evenement: 'Un morceau de pomme part dans les voies aériennes',
      dommage: 'Obstruction totale des voies aériennes, risque de chute dans la trémie',
      eviter:
        'Protéger la trémie dès son ouverture (garde-corps provisoire ou plancher fermé), prendre la pause dans un endroit aménagé (base vie) ; manger assis, lentement, petites bouchées, sans parler la bouche pleine.',
      remonter: 'Chef de chantier (trémie non protégée et lieu de pause).',
    },
  }),
  makeCase({
    id: 'ent-met-03',
    title: 'Le chalumeau resté allumé',
    geste: 'Malaise dû à la chaleur',
    category: 'metier',
    tradeIds: ['metallier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Début juillet, il fait très chaud dans l’atelier sous le toit en tôle. Depuis le début de l’après-midi, Mathis chauffe des barres au chalumeau oxyacétylénique pour les cintrer, en veste de soudeur. Il pose le chalumeau encore allumé sur l’établi, la flamme tournée vers un tas de chiffons, et s’assoit par terre, tout rouge et en sueur. Tu arrives avec un collègue.',
    victime:
      'Assis par terre, rouge, transpire beaucoup. Dit : « J’ai mal à la tête, j’ai envie de vomir, tout tourne. » Répond aux questions, respire normalement. N’a pas bu depuis midi, pas de maladie ni de traitement. Peut boire seul et va un peu mieux au frais.',
    temoin:
      'Un collègue. Veut lui faire boire d’un coup une grande bouteille d’eau glacée. Sait éteindre le chalumeau et fermer les bouteilles ; le fait si le SST le lui demande, puis appelle le 15.',
    materiel:
      'Chalumeau factice (ou tuyau), chiffons, tapis ou chaise, bouteille d’eau, linge mouillé, téléphone factice.',
    actions: [
      act('Fait fermer les robinets du chalumeau puis ceux des bouteilles, et éloigne les chiffons de l’établi', 'C2a', 'C2c'),
      act('Examine et questionne : répond, mal de tête, nausées, vertiges, respire normalement, n’a pas bu depuis midi', 'C3a', 'C3b'),
      act('Reconnaît un malaise dû à la chaleur et installe Mathis au repos dans un endroit frais et aéré', 'C5a', 'C5b'),
      act('Lui retire la veste de soudeur et le rafraîchit (linge mouillé, ventilation)', 'C5b'),
      act('Lui fait boire de l’eau fraîche par petites quantités (il est conscient et peut boire), refuse la grande bouteille d’un coup', 'C5b'),
      act('Fait alerter le 15 pour un avis médical en décrivant les signes, et applique ses conseils', 'C4a'),
      act('Réconforte et surveille ; ne le laisse ni seul ni reprendre le travail', 'C5c'),
    ],
    prevention: {
      danger: 'La chaleur (atelier surchauffé et flamme du chalumeau)',
      situation: 'Mathis chauffe des barres pendant des heures, en veste de soudeur, sous un toit en tôle en plein été, sans boire',
      evenement: 'Son corps n’arrive plus à évacuer la chaleur',
      dommage: 'Malaise dû à la chaleur (risque de coup de chaleur)',
      eviter:
        'Cintrer à froid à la cintreuse quand c’est possible ; sinon travaux chauds aux heures fraîches, atelier ventilé ou rafraîchi, toiture isolée, pauses régulières au frais, eau fraîche à disposition, travail à deux pour se surveiller ; chalumeau toujours éteint et posé sur son support.',
      remonter: 'Chef d’atelier ou chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-met-04',
    title: 'Le bidon de dérouillant',
    geste: 'Brûlure chimique',
    category: 'metier',
    tradeIds: ['metallier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'À l’atelier, dans la zone de préparation avant peinture, Chloé transvase un dérouillant acide d’un bidon de 20 litres dans un pulvérisateur, sans gants ni lunettes. Le bidon lui échappe : le produit éclabousse son avant-bras et imbibe son pantalon à la cuisse. Quand tu arrives, le bidon est couché sur l’établi et le produit coule encore jusqu’au sol. Un lavabo avec douchette se trouve à quelques mètres.',
    victime:
      'Debout, se frotte l’avant-bras qui pique et devient rouge, dit que sa cuisse commence à brûler à travers le pantalon mouillé. Répond aux questions, respire normalement. Les yeux ne sont pas touchés.',
    temoin:
      'Un collègue. Veut essuyer le produit avec un chiffon sec et redresser le bidon à mains nues. Met des gants, ferme le bidon, éloigne les autres et apporte la fiche de données de sécurité si le SST le lui demande.',
    materiel:
      'Bidon vide étiqueté « corrosif », gants, bouteilles d’eau ou tuyau, bassine, fiche de données de sécurité factice, couverture, téléphone factice.',
    actions: [
      act('Met des gants, fait redresser et fermer le bidon, et écarte les collègues de la flaque', 'C2a', 'C2c', 'C2d'),
      act('Examine : brûlure chimique de l’avant-bras et de la cuisse, répond, respire normalement', 'C3a', 'C3b'),
      act('Rince immédiatement et abondamment à l’eau courante tempérée', 'C5a', 'C5b'),
      act('Fait retirer le pantalon imbibé pendant le rinçage, en se protégeant les mains', 'C5b'),
      act('Oriente l’eau pour qu’elle ne coule pas sur des zones saines', 'C5b'),
      act('Refuse le chiffon et fait apporter l’étiquette ou la fiche de données de sécurité du produit', 'C5b'),
      act('Fait alerter le 15 en donnant le nom du produit, et suit ses conseils', 'C4a'),
      act('Poursuit le rinçage selon les conseils, couvre, réconforte et surveille', 'C5c'),
    ],
    prevention: {
      danger: 'Le dérouillant acide (produit corrosif)',
      situation: 'Chloé transvase à la main un bidon lourd, sans gants ni lunettes',
      evenement: 'Le bidon lui échappe et le produit l’éclabousse',
      dommage: 'Brûlure chimique de l’avant-bras et de la cuisse',
      eviter:
        'Préparation mécanique (brossage, grenaillage) ou produit moins dangereux quand c’est possible ; sinon petit conditionnement ou pompe de transvasement, bac de rétention ; gants, lunettes et tablier adaptés (voir la fiche de données de sécurité), point d’eau à proximité.',
      remonter: 'Chef d’atelier.',
    },
  }),
  makeCase({
    id: 'ent-met-05',
    title: 'Le vantail qui glisse des gonds',
    geste: 'Traumatisme de la jambe',
    category: 'metier',
    tradeIds: ['metallier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Chez un particulier, tu poses un portail battant avec Sofiane. Vous soulevez à deux le premier vantail pour l’engager sur ses gonds : il glisse, bascule et heurte violemment le tibia de Sofiane avant de tomber à plat dans l’allée. Sofiane est assis par terre et crie de douleur. Le deuxième vantail est appuyé debout contre le pilier, sans cale, et bouge avec le vent.',
    victime:
      'Assis par terre, jambe droite déformée sous le genou, très douloureuse. Répond, respire normalement, ne saigne pas. Ne peut pas bouger la jambe et demande qu’on la remette droite.',
    temoin:
      'Le client. Veut aider Sofiane à se relever pour l’emmener aux urgences dans sa voiture. Aide à coucher le deuxième vantail au sol, appelle les secours et va les attendre dans la rue si le SST le lui demande.',
    materiel: 'Deux grands cartons pour les vantaux, tapis, couverture, téléphone factice.',
    actions: [
      act('Repère le deuxième vantail instable et le couche au sol avec le client, loin de la victime', 'C2a', 'C2c'),
      act('Examine : répond, respire, ne saigne pas, douleur avec déformation de la jambe', 'C3a', 'C3b'),
      act('Demande à Sofiane de ne pas bouger la jambe ; refuse qu’on le relève ou qu’on remette la jambe droite', 'C5a', 'C5b'),
      act('Respecte la position prise par la victime et évite toute manipulation', 'C5b'),
      act('Fait alerter le 18 ou le 15 : vantail tombé sur la jambe, déformation, ne peut pas se lever', 'C4a'),
      act('Fait dégager l’accès et attendre les secours dans la rue', 'C4b'),
      act('Couvre, réconforte et surveille jusqu’à l’arrivée des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le vantail lourd soulevé à la main',
      situation: 'Sofiane présente le vantail sur ses gonds à bout de bras, les jambes dessous',
      evenement: 'Le vantail glisse du gond et bascule',
      dommage: 'Traumatisme de la jambe (fracture supposée)',
      eviter:
        'Lever et présenter le vantail avec un moyen mécanique (chariot porte-vantail, palan, petite grue), caler et étayer les vantaux en attente, préparer les gonds avec un gabarit ; chaussures de sécurité ; formation à la manutention.',
      remonter: 'Chef d’entreprise.',
    },
  }),
  makeCase({
    id: 'ent-met-06',
    title: 'L’éclat au touret à meuler',
    geste: 'Plaie grave : corps étranger dans l’œil',
    category: 'metier',
    tradeIds: ['metallier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'À l’atelier, Jade ébavure de petites pièces au touret à meuler. Elle a relevé l’écran du touret et n’a pas mis ses lunettes. Un éclat de métal l’atteint à l’œil droit : elle lâche la pièce et se tient l’œil en criant, à côté du touret qui tourne toujours. Tu travailles à la perceuse à colonne voisine avec un apprenti.',
    victime:
      'Debout, main sur l’œil droit, pleure, a très mal et voit flou. Le formateur indique qu’un petit éclat est planté dans l’œil. Veut se frotter l’œil ou le rincer. Répond, respire normalement.',
    temoin:
      'L’apprenti. Veut retirer l’éclat avec le coin d’un mouchoir. Appelle le 15 et va attendre les secours à l’entrée de l’atelier si le SST le lui demande.',
    materiel: 'Tapis, vêtements roulés pour caler la tête, couverture, téléphone factice.',
    actions: [
      act('Arrête le touret avant d’approcher (interrupteur ou arrêt d’urgence)', 'C2a', 'C2c'),
      act('Examine : répond, respire, plaie de l’œil avec un éclat planté', 'C3a', 'C3b'),
      act('Interdit de frotter, de rincer ou de retirer l’éclat', 'C5b'),
      act('Allonge la victime et lui demande de fermer les deux yeux', 'C5a', 'C5b'),
      act('Maintient sa tête à deux mains ou la cale pour qu’elle ne bouge pas', 'C5b'),
      act('Fait alerter le 15 : plaie de l’œil avec corps étranger planté', 'C4a'),
      act('Fait guider les secours jusqu’à l’atelier', 'C4b'),
      act('Réconforte, l’aide à garder les yeux fermés et surveille', 'C5c'),
    ],
    prevention: {
      danger: 'La meule du touret en rotation et les éclats projetés',
      situation: 'Jade meule avec l’écran relevé et sans lunettes',
      evenement: 'Un éclat de métal est projeté vers son visage',
      dommage: 'Plaie de l’œil avec corps étranger',
      eviter:
        'Écran du touret toujours en place, support de pièce réglé près de la meule, meule en bon état ; lunettes de protection obligatoires au poste, consigne affichée ; ne jamais relever l’écran.',
      remonter: 'Chef d’atelier.',
    },
  }),
  makeCase({
    id: 'ent-met-07',
    title: 'Chute d’échelle en façade',
    geste: 'Ne répond pas, respire (traumatisme)',
    category: 'metier',
    tradeIds: ['metallier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'En centre-ville, Léa pose une grille de défense devant la fenêtre du premier étage d’une boutique, seule sur une échelle posée sur le trottoir mouillé. Pendant que tu vas chercher des chevilles au camion, l’échelle glisse : Léa tombe d’environ 2,50 m et sa tête heurte le trottoir. Quand tu reviens, elle est allongée sur le dos, l’échelle en travers du trottoir, et des passants s’approchent.',
    victime:
      'Allongée sur le dos. Ne répond pas, respire. Origine traumatique (chute avec choc à la tête) : on la laisse sur le dos, pas de PLS.',
    temoin:
      'La commerçante, sortie en entendant le bruit. Veut mettre Léa sur le côté « comme à la télé ». Balise et écarte les passants, appelle les secours puis les attend devant la boutique si le SST le lui demande.',
    materiel:
      'Tapis, échelle couchée (ou ligne au sol), cônes ou ruban de balisage, couverture, téléphone factice.',
    actions: [
      act('Repère les dangers (passants, échelle en travers, trottoir glissant) et fait baliser la zone autour de la victime', 'C2a', 'C2b', 'C2d'),
      act('Examine : ne répond pas, libère les voies aériennes, respire', 'C3a', 'C3b'),
      act('Identifie une origine traumatique (chute, choc à la tête) : laisse la victime sur le dos et refuse la PLS', 'C5a'),
      act('Maintient la liberté des voies aériennes en bougeant la victime le moins possible', 'C5b'),
      act('Fait alerter le 15, le 18 ou le 112 : adresse, chute d’environ 2,50 m, ne répond pas, respire', 'C4a'),
      act('Fait attendre et guider les secours devant la boutique', 'C4b'),
      act('Couvre et surveille la respiration en permanence ; si elle ne respire plus, commence la réanimation', 'C5c'),
    ],
    prevention: {
      danger: 'La hauteur (fenêtre du premier étage, environ 2,50 m)',
      situation: 'Léa travaille seule sur une échelle posée sur un trottoir mouillé',
      evenement: 'Le pied de l’échelle glisse',
      dommage: 'Traumatisme de la tête, perte de connaissance',
      eviter:
        'Travailler depuis une plateforme individuelle roulante, un échafaudage roulant ou une nacelle plutôt que depuis une échelle (moyen d’accès, pas poste de travail) ; baliser le trottoir ; ne pas travailler seule ; casque avec jugulaire.',
      remonter: 'Chef d’entreprise (choix du matériel pour travailler en hauteur en façade).',
    },
  }),
  makeCase({
    id: 'ent-met-08',
    title: 'Soudage à l’arc sous la pluie',
    geste: 'Arrêt cardiaque',
    category: 'metier',
    tradeIds: ['metallier'],
    trainingOnly: true,
    reviewed: false,
    source: SRC,
    scenario:
      'Il a plu toute la matinée. Devant un gymnase, Nathan soude à l’arc les poteaux d’une rampe d’accès, à genoux sur le béton mouillé, gants trempés, avec une pince porte-électrode à la gaine fendue ; le poste est branché sur le coffret de chantier. Tu l’entends crier pendant qu’il change d’électrode : quand tu arrives, il est au sol, immobile, la pince encore dans la main. Le gardien du gymnase accourt ; un défibrillateur est dans le hall.',
    victime: 'Mannequin sur le dos, pince factice dans la main. Ne répond pas, ne respire pas.',
    temoin:
      'Le gardien. Veut tirer Nathan par les épaules. Rapporte le défibrillateur du hall si le SST le lui demande, puis accueille et guide les secours.',
    materiel:
      'Mannequin, défibrillateur de formation, câble et pince factices, carton pour le poste à souder, serviette, téléphone factice.',
    actions: [
      act('Ne touche pas la victime et interdit au gardien de la toucher tant que le courant n’est pas coupé', 'C2b', 'C2d'),
      act('Coupe le poste à souder ou le courant au coffret de chantier', 'C2a', 'C2c'),
      act('Examine : ne répond pas, ne respire pas', 'C3a', 'C3b'),
      act('Fait alerter le 15 ou le 112 (électrisation, arrêt cardiaque) et fait apporter le défibrillateur', 'C4a'),
      act('Débute aussitôt la réanimation : 30 compressions et 2 insufflations, 100 à 120 compressions par minute (ou compressions seules)', 'C5a', 'C5b'),
      act('Met en œuvre le défibrillateur dès son arrivée, poitrine séchée, et suit ses instructions', 'C5b'),
      act('Fait accueillir et guider les secours jusqu’à la victime', 'C4b'),
      act('Poursuit la réanimation en interrompant le moins possible les compressions, jusqu’au relais des secours', 'C5c'),
    ],
    prevention: {
      danger: 'Le courant électrique du poste à souder à l’arc',
      situation: 'Nathan soude à genoux sur un sol mouillé, gants trempés, avec une pince porte-électrode abîmée',
      evenement: 'Il touche une partie sous tension en changeant d’électrode',
      dommage: 'Électrisation, arrêt cardiaque',
      eviter:
        'Reporter le soudage ou travailler à l’abri sur un sol sec ; poste adapté aux lieux humides (réduction de la tension à vide), protection différentielle au coffret, câbles et pince vérifiés et remplacés s’ils sont abîmés ; gants de soudeur secs, chaussures de sécurité, tapis isolant.',
      remonter: 'Chef de chantier ou chef d’entreprise ; retirer la pince abîmée du service.',
    },
  }),
];
