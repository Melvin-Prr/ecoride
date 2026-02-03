# 🚗 EcoRide Platform

Plateforme de covoiturage écologique connectant conducteurs et passagers pour des trajets écoresponsables.

## 📋 Description

EcoRide est une application web de covoiturage mettant l'accent sur l'écologie et la réduction de l'empreinte carbone. Les utilisateurs peuvent rechercher, proposer et réserver des trajets tout en bénéficiant d'un système de crédits interne.

## 🛠️ Technologies utilisées

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Base de données relationnelle**: PostgreSQL (via Prisma)
- **Base de données NoSQL**: MongoDB (logs et notifications)
- **Authentification**: JWT / NextAuth.js
- **Déploiement**: Vercel

## 🚀 Installation et déploiement local

### Prérequis

- Node.js 18.x ou supérieur
- npm, yarn, pnpm ou bun
- PostgreSQL installé localement ou accès à une instance distante
- MongoDB installé localement ou accès à MongoDB Atlas

### Étapes d'installation

1. **Cloner le repository**

   ```bash
   git clone https://github.com/[votre-username]/ecoride-platform.git
   cd ecoride-platform
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configurer les variables d'environnement**

   Créer un fichier `.env.local` à la racine du projet :

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/ecoride"
   MONGODB_URI="mongodb://localhost:27017/ecoride"

   # Authentication
   JWT_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"

   # Email (pour les notifications)
   SMTP_HOST="smtp.example.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@example.com"
   SMTP_PASSWORD="your-password"
   ```

4. **Initialiser la base de données**

   ```bash
   # Exécuter les migrations Prisma
   npx prisma migrate dev

   # Peupler la base de données avec des données de test
   npx prisma db seed
   ```

5. **Lancer le serveur de développement**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

6. **Accéder à l'application**

   Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm start` - Démarre le serveur de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run format` - Formate le code avec Prettier
- `npx prisma studio` - Ouvre l'interface Prisma Studio

## 🗄️ Structure de la base de données

### PostgreSQL (Données relationnelles)

- `users` - Utilisateurs de la plateforme
- `vehicles` - Véhicules des conducteurs
- `carpools` - Trajets de covoiturage
- `bookings` - Réservations des passagers
- `reviews` - Avis et évaluations
- `preferences` - Préférences des conducteurs

### MongoDB (Données non-relationnelles)

- `logs` - Historique des actions
- `notifications` - Notifications utilisateur
- `statistics` - Statistiques d'utilisation

## 👥 Comptes de test

Des comptes de test sont disponibles après l'exécution du seed :

- **Admin**: admin@ecoride.com / Admin123!
- **Employé**: employee@ecoride.com / Employee123!
- **Conducteur**: driver@ecoride.com / Driver123!
- **Passager**: passenger@ecoride.com / Passenger123!

## 🔒 Sécurité

- Authentification JWT
- Protection CSRF
- Rate limiting
- Validation et sanitisation des entrées
- HTTPS en production
- Hashage des mots de passe (bcrypt)

## 📖 Documentation

- [Manuel utilisateur](./docs/user-manual.pdf)
- [Documentation technique](./docs/technical-documentation.pdf)
- [Charte graphique](./docs/brand-guidelines.pdf)
- [Documentation de gestion de projet](./docs/project-management.pdf)

## 🤝 Contribution

Ce projet suit la méthodologie GitFlow :

- `main` - Branche de production
- `develop` - Branche de développement
- `feature/*` - Branches de fonctionnalités

## 📄 Licence

Ce projet est développé dans le cadre d'une formation Studi.

## 📧 Contact

Pour toute question : contact@ecoride.com
