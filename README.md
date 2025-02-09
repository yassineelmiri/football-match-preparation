# Football Match Preparation

![image](https://github.com/user-attachments/assets/948000ec-c116-40f5-b7b2-d58a4e621de7)


Bienvenue dans le projet **Football Match Preparation**! Ce projet a été développé pour concevoir un écran de préparation de match pour un club de football, avec une interface réactive permettant de gérer les joueurs, le staff technique et d'organiser l'équipe de football avant un match.

## Objectifs du Projet

Le but de ce projet est de créer une interface fluide et interactive permettant de :

- **Lister les joueurs** : Afficher les informations des joueurs dans une table (Nom, Numéro, Licence, Statut).
- **Drag & Drop** : Implémenter un système de glisser-déposer pour :
  - Placer les joueurs sur un terrain avec un schéma tactique (1-4-3-3 ou 1-3-5-2).
  - Déplacer les joueurs vers le banc des remplaçants.
  - Ajouter des joueurs au staff technique.
- **Capitaine d’équipe** : Désigner un joueur comme capitaine de l’équipe.
- **Version Web et Mobile** : Développer l'interface en **React.js** (v18.2.0) et **React Native** (v0.73.3).

## Structure de l'équipe (Exemple JSON)

Voici un exemple de la structure JSON utilisée pour décrire les joueurs et le staff technique :

```json
{
  "Players": [
    {
      "nom": "MONTHY",
      "prenom": "MARCUS",
      "id": 1823,
      "equipe_id": 9,
      "num_shirt": "0",
      "role": "Player",
      "licenceNumber": "106PMMW08",
      "category": "U17",
      "dateNaissance": "2008-08-18",
      "nationality": "Maroc",
      "image": "http://localhost:3000/uploads/profil-default.jpg",
      "post": null,
      "shirtNumber": "0"
    }
  ],
  "staffs": [
    {
      "nom": "AHMED",
      "prenom": "ELALAOUI",
      "id": 2105,
      "equipe_id": 9,
      "role": "COACH",
      "licenceNumber": "128PLWW08",
      "dateNaissance": "2008-10-05",
      "nationality": "Maroc",
      "image": "http://localhost:3000/uploads/profil-default.jpg"
    }
  ]
}
```

## Fonctionnalités principales

- **Gestion des joueurs** : Ajout, modification et suppression des joueurs avec un affichage détaillé.
- **Drag and Drop** : Gestion dynamique des joueurs, leur placement tactique, leur ajout au banc ou au staff avec la fonctionnalité Drag & Drop.
- **Schéma tactique** : Affichage de schémas tactiques 1-4-3-3 et 1-3-5-2 pour organiser les joueurs sur le terrain.
- **Désignation du capitaine** : Sélectionner un joueur pour devenir le capitaine de l’équipe.

## Technologies utilisées

- **React.js (v18.2.0)** : Pour la version web de l’application.
- **React Native (v0.73.3)** : Pour la version mobile de l’application.
- **Redux / Context API** : Pour la gestion de l’état de l’application.
- **Material-UI / Tailwind CSS** : Pour la création de l’interface utilisateur.
- **React Native Paper / Styled Components** : Pour l'UI sur la version mobile.

## Installation

### Prérequis

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn** pour gérer les dépendances.

### Étapes d'installation

1. Clonez ce repository :

```bash
git clone https://github.com/yassineelmiri/football-match-preparation.git
```

2. Allez dans le dossier du projet :

```bash
cd football-match-preparation
```

3. Installez les dépendances :

```bash
npm install
```

4. Pour démarrer l'application en mode développement sur le web :

```bash
npm start
```

5. Pour démarrer l'application sur mobile avec **React Native** :

```bash
npx react-native run-android    # Sur Android
npx react-native run-ios        # Sur iOS
```

## Structure du projet

Voici un aperçu des dossiers principaux du projet :

- **`public/`** : Contient les fichiers statiques (images, icônes, etc.).
- **`src/`** : Contient tout le code source :
  - **`components/`** : Composants React pour l'interface, comme le terrain, la liste des joueurs, le banc, etc.
  - **`store/`** : Gestion d’état via Redux ou Context API.
  - **`assets/`** : Images et autres ressources.
  - **`types/`** : Types TypeScript pour l'application.
  - **`App.tsx`** : Le composant principal de l'application web.
  - **`index.tsx`** : Le point d'entrée de l’application React.

## Tests

Les tests sont réalisés avec **Jest** et **React Testing Library**. Vous pouvez exécuter les tests avec la commande suivante :

```bash
npm test
```

## Auteurs

- **Yassine Elmiri** - Développeur principal et contributeur.
