# Amazon Clone - Product Search

Ce projet est un clone d'interface Amazon basé sur React axé sur la fonctionnalité de recherche de produits, construit avec React 18, TypeScript et Tailwind CSS.

## Caractéristiques

- Interface utilisateur inspirée d'Amazon avec un design réactif
- Recherche de produits en temps réel avec fonction anti-rebond
- Suggestions de recherche/saisie semi-automatique lors de la saisie
- Gestion des erreurs grâce à des messages conviviaux
- Affichage des résultats de recherche avec image, titre, prix et note
- Mise en cache locale des 10 recherches les plus récentes

## Premiers pas

### Prérequis

- Node.js (v16 ou +)
- npm or yarn

### Installation

1. Clonez le dépôt ou téléchargez le code source

2. Installez les dépendances :
   ```bash
   npm install
   ```

3.Créez un fichier `.env` dans le répertoire racine avec :
   ```
   VITE_BOLT_API_KEY=your_api_key_here
   ```

4.Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

5.Ouvrez votre navigateur à l'adresse URL affichée dans votre terminal (généralement http://localhost:5173).

## Structure du projet

```
amazon-clone/
├── public/
│   └── amazon-favicon.svg
├── src/
│   ├── components/         # React components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductSearch.tsx
│   │   └── SearchBar.tsx
│   ├── context/            # React context
│   │   └── ProductContext.tsx
│   ├── hooks/              # Custom hooks
│   │   └── useDebounce.ts
│   ├── services/           # API and mock data
│   │   ├── api.ts
│   │   └── mockData.ts
│   ├── types/              # TypeScript interfaces
│   │   └── Product.ts
│   ├── __tests__/          # Unit tests
│   │   └── SearchBar.test.tsx
│   ├── App.tsx             # Main App component
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── .env                    # Environment variables
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # Project documentation
```

## Intégration d'API

L'application est configurée pour utiliser une API Bolt hypothétique. À des fins de démonstration, elle utilise des données fictives, mais sa structure permet de se connecter facilement à une API réelle en mettant à jour l'URL et la clé de l'API dans le fichier « .env ». Le service API se trouve dans « src/services/api.ts ».

## Tests

Exécutez les tests avec :
```bash
npm run test
```

## Création pour la production

Pour créer une version de production :
```bash
npm run build
```

Les fichiers créés se trouveront dans le répertoire « dist » et pourront être diffusés via n'importe quel serveur de fichiers statique.

## Remarque

Ceci est un projet de démonstration à des fins éducatives uniquement et n'est pas affilié à Amazon.

## Lien du site

https://serene-squirrel-13544f.netlify.app/
