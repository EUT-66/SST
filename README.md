# Mon espace SST

Application web pour organiser les formations **Sauveteur Secouriste du Travail** (formation initiale) en CFA BTP :
supports de cours, QCM, cas pratiques par métier, sessions d’apprentis importées depuis Netyparéo, tirage au sort,
évaluations et **grille de certification INRS** pré-remplie, signée et exportée en PDF.

Technologies : React + TypeScript (Vite), Tailwind CSS, Firebase (Authentication, Firestore, Storage, Hosting), pdf-lib.

---

## Ce que fait l’application

| Espace | Contenu |
| --- | --- |
| **Rôles et permissions** | Le tout premier compte créé devient administrateur. Les formateurs demandent un accès, l’administratrice les valide. Rôles : *administrateur*, *formateur référent* (peut modifier cours, QCM et cas), *formateur*, *désactivé*. Chaque permission peut être ajoutée ou retirée individuellement. Les règles Firestore appliquent ces droits côté serveur. |
| **Sessions** | **Formation initiale ou MAC** (maintien et actualisation des compétences), dates, métier, groupe, import du CSV Netyparéo (colonnes, encodage et métier détectés automatiquement, correspondance modifiable). Ajout, modification, suppression d’apprentis, mise à jour par un nouveau CSV avec aperçu des différences. Chaque formateur ne voit que ses sessions. |
| **Clôture et archives** | Une formation terminée se clôture (lecture seule, grilles toujours téléchargeables) et passe automatiquement dans les **archives** au 1er janvier suivant. |
| **Tirage au sort** | Roue animée (aléa cryptographique) : chaque apprenti tiré sort de la roue. Un cas pratique est tiré **sans remise** (un cas ne retombe pas dans la session), attribué de façon **masquée**, et peut être changé par le formateur. |
| **Évaluation** | Épreuve 1 : actions attendues du cas (Fait / Non fait), chacune reliée aux indicateurs de la grille. Épreuve 2 : prévention (danger, situation, événement, dommage, mesures, remontée d’information) et questions d’entretien. QCM. Le formateur peut trancher chaque indicateur. |
| **Grille de certification** | Le PDF officiel de l’INRS (juin 2020, logos compris) sert de fond : les informations sont écrites à l’emplacement exact de chaque champ (nom, prénom, date de naissance, dates de session, cases, compétences, résultat, nom et signature du formateur). Grille modifiable avant génération. Fichiers nommés « Grille Evaluation SST 2026-2027 NOM Prénom » (l’année scolaire change au 1er septembre), archive ZIP d’une grille par apprenti ou PDF unique de la session. Apprenti absent : même grille sans aucune case cochée, barrée de la mention **ABSENT**. Fiches d’évaluation et export CSV des résultats. |
| **Signature** | Chaque formateur enregistre sa signature dans *Mon profil* : dessinée à l’écran, ou **importée depuis une photo ou un scan** (fond blanc retiré, recadrage automatique). Elle est reprise sur toutes ses grilles. |
| **QCM** | 92 questions classées par compétence C1 à C8. Entraînement (correction immédiate) ou évaluation (résultat reporté dans l’évaluation). Passation sur la tablette du formateur, ou sur les téléphones des apprentis avec un **code** (page `/apprenti`). |
| **Supports de cours** | Cours « SST – CAP MIT » (56 diapositives et notes, repris du PowerPoint) et aide-mémoire INRS, projetables en plein écran (flèches du clavier, touche N pour les notes), modifiables et duplicables, avec fichiers joints. |
| **Cas pratiques** | Les 18 cas MIT des fiches d’évaluation, plus des propositions pour d’autres métiers du BTP et la vie quotidienne (marquées « à relire »). Éditeur complet. |

### Comment la grille est pré-remplie

- **Épreuve 1 (C2 à C5)** : un indicateur est proposé *acquis* si toutes les actions du cas qui s’y rattachent sont « faites », *non acquis* si l’une ne l’est pas. Les indicateurs qu’aucune action ne couvre sont signalés « à évaluer » et se cochent directement.
- **Épreuve 2 (C1, C6, C7, C8)** : réponses de prévention du cas (majorité des éléments acquis pour C7), questions d’entretien et résultat du QCM par compétence (seuil réglable, 70 % par défaut). Dans *Paramètres*, on choisit si le QCM doit **confirmer** l’oral ou ne servir **qu’en l’absence** d’évaluation orale.
- Les compétences et la certification suivent les conditions officielles (indicateurs incontournables ; 8 compétences acquises = certifié). Le formateur garde la main sur chaque case avant de générer le PDF.

---

## Mise en route (une seule fois)

### 1. Configurer le projet Firebase `mon-espace-sst`

Dans la [console Firebase](https://console.firebase.google.com/project/mon-espace-sst) :

1. **Authentication → Sign-in method** : activer **Adresse e-mail/Mot de passe** et **Anonyme** (l’accès anonyme sert uniquement aux apprentis qui rejoignent un QCM avec un code).
2. **Firestore Database** : créer la base en **mode production**, de préférence dans une région européenne (ex. `europe-west9` Paris).
3. *(Facultatif)* **Storage** : uniquement pour joindre des fichiers (PowerPoint, PDF) aux supports de cours. Sur les projets récents, Storage demande le forfait Blaze ; tout le reste fonctionne avec le forfait gratuit Spark.

### 2. Installer et déployer

Prérequis : [Node.js](https://nodejs.org) 20 ou plus.

```bash
npm install
npx firebase-tools@15 login          # connexion à votre compte Google
npm run deploy                       # construit l’application, déploie le site et les règles Firestore
npm run deploy:storage               # seulement si Storage est activé (pièces jointes des cours)
```

L’application est alors en ligne sur `https://mon-espace-sst.web.app`.

### 3. Premier lancement

1. **Créez immédiatement votre compte** sur `/inscription` : le tout premier compte devient administrateur.
2. Sur le tableau de bord, cliquez sur **Installer** (ou *Paramètres → Contenu pédagogique*) pour charger cours, QCM, cas pratiques et métiers.
3. Dans **Mon profil**, enregistrez votre signature (dessinée ou importée en image) : elle sera apposée sur les grilles.
4. Facultatif : *Paramètres → Général* pour le nom du CFA et le seuil du QCM.
5. Partagez l’adresse du site à vos formateurs : ils demandent un accès, vous le validez dans **Utilisateurs**.

### Export Netyparéo

Exportez la liste du groupe au format **CSV** (séparateur `;` ou `,`). Les colonnes sont reconnues automatiquement
(nom, prénom, date de naissance, code apprenant, formation, groupe, entreprise, e-mail…), y compris avec des lignes de titre
au-dessus des en-têtes et un encodage Windows. La correspondance reste modifiable avant l’import. Le métier est détecté à partir
de la formation ou du groupe grâce aux mots-clés réglables dans *Paramètres → Métiers*.

---

## Développement

```bash
npm run dev                 # application branchée sur le vrai projet Firebase
npm run emulateurs          # émulateurs Firebase locaux (Java requis)…
npm run dev:emulateurs      # …et application branchée sur ces émulateurs
npm test                    # tests unitaires (CSV, règles de la grille, contenus, PDF)
npm run test:rules          # tests des règles de sécurité Firestore sur l’émulateur
npm run typecheck
```

Organisation du code :

```
src/
  lib/            logique métier : compétences et règles de la grille, import CSV, QCM, tirage, PDF
  data/           contenus par défaut (cours, questions, cas, métiers) et installation
  pages/          écrans (sessions, évaluation, grille, cours, QCM, cas, administration, page apprenti)
  components/     composants réutilisables (roue, lecteur de QCM, diapositive, signature…)
firestore.rules   droits d’accès (rôles, permissions, sessions par formateur, QCM par code)
tests/            tests des règles de sécurité
```

La configuration web Firebase de `src/lib/firebase.ts` n’est pas secrète : la sécurité repose sur `firestore.rules` et `storage.rules`.

La police Carlito (métriquement compatible avec Calibri, licence SIL OFL, voir `public/fonts/OFL-Carlito.txt`) sert à écrire les informations sur la grille officielle.

### Fond de la grille de certification

`public/grilles/grille-certification-sst-initiale.pdf` est la grille officielle de l’INRS dont on a retiré les champs de
formulaire, le JavaScript et la protection (les deux pages imprimées sont inchangées). Pour une nouvelle version de la grille,
ou pour la grille MAC officielle :

```bash
pip install pypdf
python3 scripts/preparer-grille.py grille-inrs.pdf public/grilles/grille-certification-sst-mac.pdf "Maintien et actualisation des compétences"
```

puis renseigner le fichier dans `TEMPLATE_FILES` (`src/lib/pdf/gridPdf.ts`) et vérifier que les champs sont aux mêmes
emplacements (coordonnées relevées dans ce fichier). Tant que la grille MAC officielle n’est pas ajoutée, les sessions MAC
utilisent la grille de formation initiale avec le sous-titre « Maintien et actualisation des compétences ».
