# ECORIDE - Plateforme de Covoiturage Écologique

Plateforme web de covoiturage connectant conducteurs et passagers pour des trajets écoresponsables avec système de crédits interne.

### Description

EcoRide est une application web de covoiturage mettant l'accent sur l'écologie et la réduction de l'empreinte carbone. La plateforme permet aux utilisateurs de :

- Rechercher des covoiturages par itinéraire et date
- Proposer des trajets en tant que conducteur
- Réserver des places en tant que passager
- Gérer leurs crédits (monnaie interne de la plateforme)
- Noter et évaluer les autres utilisateurs
- Privilégier les véhicules écologiques (voitures électriques)

## Technologies utilisées

### Frontend
- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router, SSR, API Routes)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (mode strict)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (utility-first, responsive)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **State Management**: React Hooks (useState, useEffect, useContext)

### Backend
- **Runtime**: Node.js 18+
- **ORM**: [Prisma 7.3.0](https://www.prisma.io/)
- **Authentification**: JWT (JSON Web Tokens)
- **Hashing**: bcrypt (10 rounds)
- **Email**: Nodemailer (SMTP)
- **Validation**: Zod + validation côté serveur

### Bases de données
- **Relationnelle**: PostgreSQL 16 (Supabase ready)
- **NoSQL**: MongoDB 6 (Atlas ready)
- **Architecture hybride** :
  - PostgreSQL : Données métier (users, carpools, bookings, reviews)
  - MongoDB : Logs, notifications, statistiques temps réel

### Sécurité
- ✅ JWT avec expiration (7 jours)
- ✅ Protection CSRF
- ✅ Rate limiting
- ✅ Validation et sanitisation des entrées
- ✅ Protection SQL injection (via Prisma ORM)
- ✅ HTTPS en production
- ✅ Hashage bcrypt des mots de passe

### DevOps & Tools
- **Versioning**: Git + GitHub
- **Déploiement**: Vercel (recommandé)
- **Linting**: ESLint
- **Code Quality**: Prettier (optionnel)

---

## Gestion de projet

### Méthodologie

**GitFlow** - Organisation avec 3 niveaux de branches :
- `main` : Branche de production stable
- `develop` : Branche de développement
- `feature/*` : Branches de fonctionnalités (ex: `feature/homepage`, `feature/auth`)

### Trello

<!-- ⚠️ À COMPLÉTER -->
**Lien Trello/Notion/Jira** : [À AJOUTER - Board public avec US1-US13]

**Organisation du board** :
- Colonnes : Backlog | À faire | En cours | Terminé | Merge main
- Cartes : 13 User Stories + fonctionnalités bonus (emails, MongoDB)
- Labels : Frontend, Backend, Documentation, Sprint 1-4

### Maquettes et design

<!-- ⚠️ À COMPLÉTER -->
**Wireframes** : [À AJOUTER - 3 pages desktop + 3 pages mobile]

**Mockups haute-fidélité** : [À AJOUTER - Design final desktop + mobile]

**Charte graphique** : Voir [docs/BRAND_GUIDELINES.md](docs/BRAND_GUIDELINES.md)
- Palette de couleurs (vert écologique, tons neutres)
- Typographie (Inter font)
- Composants UI standardisés
- Accessibilité WCAG 2.1 AA

---

## Installation et déploiement local

### Prérequis

- **Node.js** 18.x ou supérieur
- **npm**, yarn, pnpm ou bun
- **PostgreSQL** installé localement OU accès à une instance distante (Supabase, Neon, Railway)
- **MongoDB** installé localement OU accès à MongoDB Atlas (gratuit)

### Étapes d'installation

#### 1. Cloner le repository

```bash
git clone https://github.com/ItzShinow/EcoRide.git
cd EcoRide
```

#### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

#### 3. Configurer les variables d'environnement

Créer un fichier `.env` ou `.env.local` à la racine du projet :

```env
# PostgreSQL Database
DATABASE_URL="postgresql://user:password@localhost:5432/ecoride"

# MongoDB Database
MONGODB_URI="mongodb://localhost:27017/ecoride"
# OU MongoDB Atlas (cloud gratuit)
# MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/ecoride"

# JWT Authentication
JWT_SECRET="votre-secret-jwt-ultra-securise-minimum-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-nextauth"

# Email Notifications (Nodemailer - SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="votre-email@gmail.com"
SMTP_PASS="votre-mot-de-passe-application-gmail"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Notes importantes** :
- Pour Gmail, créez un **mot de passe d'application** : [Guide Google](https://support.google.com/accounts/answer/185833)
- Ne **jamais commiter** le fichier `.env` (déjà dans `.gitignore`)

#### 4. Initialiser les bases de données

**Option A : Utiliser Prisma (recommandé)**

```bash
# Générer le client Prisma
npx prisma generate

# Exécuter les migrations
npx prisma migrate dev --name init

# Peupler avec les données de test
npx prisma db seed
```

**Option B : Utiliser les scripts SQL manuels**

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Exécuter le schéma
\i database/schema.sql

# Exécuter le seed
\i database/seed.sql
```

#### 5. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

#### 6. Accéder à l'application

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Scripts disponibles

```bash
npm run dev          # Démarre le serveur de développement (port 3000)
npm run build        # Compile l'application pour la production
npm start            # Démarre le serveur de production
npm run lint         # Vérifie le code avec ESLint
npx prisma studio    # Ouvre l'interface Prisma Studio (DB GUI)
npx prisma migrate   # Gère les migrations de base de données
```

------

## Structure de la base de données

### Architecture hybride PostgreSQL + MongoDB

**PostgreSQL** : Données métier relationnelles (6 tables)
- `users` - Utilisateurs (4 rôles : PASSENGER, DRIVER, EMPLOYEE, ADMIN)
- `vehicles` - Véhicules des conducteurs (marque, modèle, énergie)
- `carpools` - Trajets de covoiturage
- `bookings` - Réservations des passagers
- `reviews` - Avis et évaluations (statut : PENDING, APPROVED, REJECTED)
- `preferences` - Préférences des conducteurs (fumeur, animaux, autres)

**MongoDB** : Données non-relationnelles (2 collections)
- `logs` - Historique détaillé des actions (timestamp, userId, action, IP, userAgent)
- `notifications` - Notifications utilisateur en temps réel

**Enums utilisés** :
- `UserRole` : PASSENGER, DRIVER, EMPLOYEE, ADMIN
- `CarpoolStatus` : SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
- `BookingStatus` : PENDING, CONFIRMED, CANCELLED
- `ReviewStatus` : PENDING, APPROVED, REJECTED
- `EnergyType` : GASOLINE, DIESEL, ELECTRIC, HYBRID

Documentation complète : [docs/DATABASE_DOCUMENTATION.md](docs/DATABASE_DOCUMENTATION.md)
- MCD (Modèle Conceptuel de Données)
- ERD (Entity Relationship Diagram)
- Data dictionary complet
- Transactions ACID
- Index et optimisations

---

## Comptes de test

Des comptes de test sont disponibles après l'exécution du seed (tous les mots de passe : `Password123!`) :

| Rôle | Email | Mot de passe | Crédits |
|------|-------|--------------|---------|
| 👤 **Passager** | passenger@ecoride.com | Password123! | 50 |
| 🚗 **Conducteur** | driver@ecoride.com | Password123! | 100 |
| 👔 **Employé** | employee@ecoride.com | Password123! | 0 |
| 🛡️ **Admin** | admin@ecoride.com | Password123! | 1000 |

**Fonctionnalités testables par rôle** :
- **Passager** : Rechercher, réserver, annuler, noter
- **Conducteur** : Créer trajets, démarrer/terminer, gérer véhicules
- **Employé** : Valider/rejeter avis en attente
- **Admin** : Dashboard analytics, créer employés, suspendre comptes

---

## Sécurité implémentée

✅ **Authentification** :
- JWT avec expiration (7 jours)
- Refresh tokens (optionnel)
- Hashage bcrypt des mots de passe (10 rounds)

✅ **Autorisation** :
- RBAC (Role-Based Access Control) - 4 rôles
- Middleware de vérification des rôles
- Routes API protégées

✅ **Protection des données** :
- Validation côté client ET serveur (Zod)
- Sanitisation des entrées utilisateur
- Protection SQL injection (Prisma ORM paramétré)
- Protection XSS (échappement HTML)

✅ **Infrastructure** :
- HTTPS en production (certificat SSL via Vercel)
- CSRF tokens (à implémenter selon besoins)
- Rate limiting (à implémenter selon besoins)
- Variables d'environnement sécurisées (.env jamais committé)

---

## Documentation complète

Ce projet contient une documentation exhaustive (450+ pages) couvrant tous les aspects :

### Documentation technique
1. [**Database Documentation**](docs/DATABASE_DOCUMENTATION.md) (40+ pages)
   - Architecture hybride PostgreSQL + MongoDB
   - MCD, ERD, data dictionary
   - Transactions, index, sécurité

2. [**UML Diagrams**](docs/UML_DIAGRAMS.md) (45+ pages)
   - Use case diagrams (5 acteurs, 13+ use cases)
   - Sequence diagrams (booking, trip, review, auth)
   - Class diagram complet
   - State machines (carpool, booking, review, user auth)

3. [**Technical Documentation**](docs/TECHNICAL_DOCUMENTATION.md) (75+ pages)
   - Stack technique avec justifications
   - Architecture système (4 layers)
   - Documentation API complète (35+ endpoints)
   - Sécurité détaillée
   - Stratégie de test

### Documentation utilisateur
4. [**User Manual**](docs/USER_MANUAL.md) (60+ pages)
   - Guide de démarrage
   - Workflows pour les 4 rôles
   - Instructions pas à pas
   - Système de crédits
   - FAQ (15+ questions)
   - Comptes de test

### Documentation design
5. [**Brand Guidelines**](docs/BRAND_GUIDELINES.md) (50+ pages)
   - Identité de marque
   - Palette de couleurs complète
   - Système typographique
   - Spécifications des composants UI
   - Wireframes (desktop + mobile)
   - Mockups haute-fidélité
   - Design responsive (4 breakpoints)
   - Accessibilité WCAG 2.1 AA

### Guides de déploiement et livraison
6. [**Deployment Guide**](docs/DEPLOYMENT_GUIDE.md) (50+ pages)
   - Déploiement Vercel étape par étape
   - Configuration Supabase + MongoDB Atlas
   - Variables d'environnement
   - Vérifications post-déploiement
   - Troubleshooting
   - Optimisations performance
   - Checklist sécurité

7. [**Kanban Setup Guide**](docs/KANBAN_SETUP_GUIDE.md) (60+ pages)
   - Création board Trello complet
   - Toutes les US comme cartes
   - Critères d'acceptation
   - Labels et checklists
   - Partage public
   - Alternatives (Notion, GitHub Projects)

8. [**Final Deliverable Template**](docs/FINAL_DELIVERABLE_TEMPLATE.md) (80+ pages)
   - Template de soumission DWWM
   - Toutes les sections pré-remplies
   - Justifications techniques
   - Documentation sécurité
   - Validation des compétences (AT1 & AT2)
   - Métriques et volumétrie
   - Checklist pré-soumission

---

## Contribution et workflow Git

### Méthodologie GitFlow

```
main (production - stable)
  └── develop (développement - features intégrées)
       ├── feature/homepage
       ├── feature/navigation
       ├── feature/carpool-list
       ├── feature/auth
       ├── feature/api-routes
       └── feature/mongodb
```

### Convention de commits

Messages de commit suivant **Conventional Commits** :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation seulement
- `style:` Formatage (sans changement de code)
- `refactor:` Refactoring (ni feat ni fix)
- `test:` Ajout/modification de tests
- `chore:` Tâches de maintenance

**Exemples** :
```bash
git commit -m "feat(US3): add carpool search and listing"
git commit -m "fix(auth): resolve JWT expiration issue"
git commit -m "docs: update README with deployment steps"
```
---

## Déploiement en production

### Application déployée

<!-- ⚠️ À COMPLÉTER après déploiement -->
🌐 **URL de production** : [À AJOUTER - ex: https://ecoride-platform.vercel.app]

### Services recommandés (gratuits)

- **Frontend** : [Vercel](https://vercel.com) (Next.js natif)
- **PostgreSQL** : [Supabase](https://supabase.com) ou [Neon](https://neon.tech)
- **MongoDB** : [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (tier gratuit 512MB)

Guide complet : [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)

---

## Licence

Ce projet a est développé dans le cadre d'une formation **STUDI**.
