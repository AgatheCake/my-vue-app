# Description  

Ce projet **"my-vue-app"** est la partie front-end du projet **"af_scores"**.  
L'application permet de calculer et d'afficher toutes les combinaisons possibles pour un score donné dans un match de football américain.  

L'utilisateur entre deux scores, soumet le formulaire et le backend lui renverra la liste des possibilités.

## Technologies

Vue3
Vite
Vitest
CSS avec l'architechture BEM

### Installation

- Cloner et installer le projet front-end : <https://github.com/AgatheCake/my-vue-app>
- yarn install
- pour lancer le projet: yarn dev
- pour lancer les tests: yarn run test:unit

- Cloner et installer le projet back-end: <https://github.com/AgatheCake/af_scores>

### Structure du projet

├── src/
│   ├── assets/        # Ressources statiques (images, icons en svg)
│   ├── components/    # Composants Vue
│       ├── tests      # Test des composants
│   ├── views/         # Vues principales
│       ├── tests      # Test des composants views
│   ├── main.js        # Point d'entrée principal
├── package.json       # Dépendances et scripts
├── vite.config.js     # Configuration Vite

#### Choix techniques et bonnes pratiques

**Vue 3** :

- La Composition API permet une meilleure organisation du code.
- J'ai utilisé l'objet `ref`, ainsi que les fonctions `computed` et `watch` pour une meilleure réactivité et des performances optimisées.  

**Vite** :  

J'ai utilisé Vite, qui est plus performant que Webpack et qui fonctionne bien avec Vue.

**CSS / BEM** :

- L'architecture BEM permet une meilleure organisation et une meilleure lisibilité du code.  
- Une classe bien nommée permet une meilleure compréhension des tests.

**Bonnes pratiques :**

- **Composants génériques**, de façon à les rendre facilement réutilisables. 
  On passe des props depuis le parent pour ajuster l'effet visuel (couleur, background, icône...) du composant enfant.

- **Responsabilité unique** : chaque composant remplit une seule responsabilité.

- **Encapsulation** : le composant encapsule sa logique pour éviter de l'exposer à l'extérieur.

- **Tests unitaires** : tous les composants sont testés. On teste le rendu visuel du composant, les requêtes au back-end, et la fonction de validation des datas envoyées au back.

- Application **responsive et user-friendly**.

- Balise `<style scoped>` pour isoler le style au composant et éviter les effets de bord.

- **Commentaires** : J'ai volontairement laissé quelques commentaires :
  - Soit pour expliquer une fonction (ScoreForm.vue, ligne 90).
  - Soit lorsque j'ai utilisé un élément inhabituel (ScoreInput.spec.js, ligne 9).
  - Soit pour expliquer les étapes de mes tests (ScoreForm.spec.js, lignes 46 et 73).

#### Améliorations

J'ai fait le choix de fournir une interface MVP simple mais efficace, afin de respecter le temps imparti.  
Mon objectif était de me conformer aux bonnes pratiques citées plus haut.

Les optimisations envisageables pour une version 2 :

- Utilisation de **TypeScript** :  
  - Créer une interface pour l'objet "combinations" récupéré de l'API.  
  - Typage des props pour mieux gérer les événements.

- Utiliser **Tailwind** :  
  - Permet de gérer le CSS directement dans le HTML et d'alléger le CSS dans la balise `<style>`.

- Utiliser une librairie comme **Vuetify** :  
  - Ajouter un loader en attendant le retour de l'API.  
  - Un tooltip pour notifier à l'utilisateur qu'il a atteint le seuil de limite de l'API.  
  - Un composant bouton et input un peu moins générique.

- Un Store avec **Pinia** :  
  - Si l'application est vouée à se développer et à utiliser plusieurs composants, cela permet une meilleure communication entre les composants, en évitant de passer des props en cascade.

- Utilisation d'un fichier externe type **i18n**
  -Permet de gérer les traductions si projet internationnal
  -Meilleure maintenabilité et réutilisation via les clés de trad
  -A noter que j'ai volontairement passé mes props label en dur pour ne pas surcharger le code avec des const.

- Changer le nom du projet en **af_scores_frontend** pour plus de cohérence avec l'application backend "af_scores".
