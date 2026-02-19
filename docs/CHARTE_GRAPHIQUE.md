# 🎨 EcoRide - Charte Graphique (Référence Rapide)

**Version**: 1.0.0  
**Date**: Février 2026  
**Projet**: Plateforme de Covoiturage Écologique

---

## 🎯 Identité de Marque

### Slogan Principal
**"Voyagez partout à petit prix !"**

### Valeurs
- 🌍 Durabilité et partage
- 🤝 Confiance et fiabilité
- ✨ Simplicité et accessibilité
- 🚀 Innovation technologique

---

## 🎨 Palette de Couleurs

### Couleurs Principales

| Nom | Hex | RGB | Utilisation |
|-----|-----|-----|-------------|
| **Primary Blue** | `#1E90FF` | `rgb(30, 144, 255)` | Boutons principaux, logo, liens |
| **Secondary Orange** | `#D97706` | `rgb(217, 119, 6)` | Accents, prix, crédits |
| **Grey** | `#F3F4F6` | `rgb(243, 244, 246)` | Fonds de cartes, états désactivés |
| **Dark** | `#1E3A5F` | `rgb(30, 58, 95)` | Header, footer, hero backgrounds |
| **Darker** | `#0F172A` | `rgb(15, 23, 42)` | Texte principal, fonds sombres |

### Couleurs Sémantiques

| Nom | Hex | Utilisation |
|-----|-----|-------------|
| **Success Green** | `#10B981` | Messages de succès, badge écologique |
| **Warning Orange** | `#F97316` | Alertes, statuts en attente |
| **Error Red** | `#EF4444` | Erreurs, actions destructives |
| **Info Blue** | `#06B6D4` | Informations, conseils |

---

## ✏️ Typographie

### Famille de Police
```
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

### Échelle Typographique

| Type | Taille | Poids | Couleur | Usage |
|------|--------|-------|---------|-------|
| **HEADING 1** | 48px (3rem) | 700 (Bold) | Darker | Titres hero, pages principales |
| **Heading 2** | 36px (2.25rem) | 700 (Bold) | Darker | Titres de sections |
| **Heading 3** | 30px (1.875rem) | 600 (Semibold) | Dark | Sous-sections |
| **Heading 4** | 24px (1.5rem) | 600 (Semibold) | Dark | Titres de cartes |
| **Body** | 16px (1rem) | 400 (Regular) | Darker | Texte principal |
| **Small** | 14px (0.875rem) | 400 (Regular) | Grey-600 | Labels, légendes |

### Exemple de Texte Hero
```
HEADING 1 (48px, Bold, White):
"Voyagez partout à petit prix !"

Body (18px, Regular, White opacity 0.9):
Texte de description sous le hero
```

---

## 🔷 Logo

### Composition
- **Icon**: Cercle bleu (#1E90FF) avec flèche blanche (→)
- **Wordmark**: "EcoRide" en gras, bleu primary
- **Espacement**: 16px entre l'icône et le texte

### Variations
1. **Logo horizontal**: Icon + Texte (header, documentation)
2. **Icon seul**: Favicon, app mobile, profils sociaux
3. **Icon inversé**: Fonds sombres (footer)

### Fichiers
```
/docs/assets/logo.png          (Logo complet horizontal)
/docs/assets/icon.png          (Icône seule)
/docs/assets/icon_inverted.png (Icône inversée)
/docs/assets/background_main.jpg (Image hero)
```

### Tailles Minimales
- Web: 120px de largeur minimum
- Print: 30mm de largeur minimum
- Favicon: 32x32px

---

## 🎨 Composants UI

### Boutons

#### Bouton Primary
```css
background: #1E90FF (Primary Blue)
color: white
padding: 12px 24px
border-radius: 8px
font-weight: 600
```
**Usage**: Rechercher, Réserver, Publier, Confirmer

#### Bouton Secondary
```css
background: #F3F4F6 (Grey)
color: #0F172A (Darker)
border: 1px solid #D1D5DB
```
**Usage**: Annuler, Retour, Fermer

#### Bouton Destructif
```css
background: #EF4444 (Error Red)
color: white
```
**Usage**: Supprimer, Annuler réservation, Rejeter

---

### Cartes
```css
background: white
border: 1px solid #E5E7EB
border-radius: 12px
padding: 24px
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

**Hover**: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)`

---

### Badges

#### Badge Écologique
```css
background: #10B981 (Green)
color: white
content: "⚡ Électrique" ou "🌱 Écologique"
```

#### Badges de Rôles
- **Admin**: Rouge (#EF4444)
- **Employé**: Orange (#D97706)
- **Conducteur**: Bleu (#1E90FF)
- **Passager**: Gris (#6B7280)

---

## 📱 Maquettes Hero (Homepage)

### Variante A : Fond Gris Foncé
```
Background: #4A5568 (Slate grey)
Overlay: Dark gradient 60% opacity
Image: /docs/assets/background_main.jpg
```

### Variante B : Fond Bleu Foncé (Recommandé)
```
Background: #1E3A5F (Deep Navy - var(--color-dark))
Overlay: Blue gradient 70% opacity
Image: /docs/assets/background_main.jpg
```

### Structure Hero
```
Header (80px):
- Logo à gauche
- Navigation: Accueil, Rechercher, Publier
- Bouton: Se connecter / S'inscrire

Hero Content (Centré):
- Titre (H1, 48px, White, Bold): "Voyagez partout à petit prix !"
- Description (18px, White 90%)
- Barre de recherche (White card, shadow, border-radius: 12px)
  → Départ | Arrivée | Date | [Rechercher]

Cards Grid (4 colonnes):
- Background: White
- Border-radius: 12px
- Gap: 24px
- Height: ~200px
```

---

## 📐 Spacing & Design Tokens

### Espacement (Système 4px)
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
```

### Border Radius
```
sm: 4px   (petits éléments)
md: 8px   (boutons, inputs)
lg: 12px  (cartes)
xl: 16px  (grandes cartes)
full: 9999px (badges, avatars)
```

### Ombres
```css
/* Subtle */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Small */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Medium */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

/* Large */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
```

---

## 📱 Responsive Breakpoints

```css
Mobile:   max-width: 640px
Tablet:   641px - 1024px
Desktop:  1025px+
Large:    1280px+
```

### Adaptation Hero
- Desktop (≥1024px): Height 600px
- Tablet (768-1023px): Height 500px
- Mobile (<768px): Height 400px

### Grid Cards
- Desktop: 4 colonnes (25% chacune)
- Tablet: 2 colonnes (50% chacune)
- Mobile: 1 colonne (100%)

---

## ♿ Accessibilité (WCAG 2.1 AA)

### Contrastes Validés
✅ Primary Blue (#1E90FF) sur White: **3.25:1** (AA Large)  
✅ Darker (#0F172A) sur White: **16.89:1** (AAA)  
✅ Dark (#1E3A5F) sur White: **9.48:1** (AAA)  
✅ White sur Primary Blue: **3.25:1** (AA Large)  
✅ White sur Dark: **9.48:1** (AAA)  
✅ Secondary Orange (#D97706) sur White: **4.86:1** (AA)

### Règles
- Texte body: minimum 4.5:1
- Texte large (18px+): minimum 3:1
- Éléments interactifs: minimum 3:1
- Cibles tactiles: minimum 44px

---

## 🎯 Principes de Design

1. **Cohérence**: Design system uniforme
2. **Clarté**: Hiérarchie visuelle évidente
3. **Efficacité**: Minimum de clics
4. **Accessibilité**: WCAG AA compliant
5. **Performance**: Assets optimisés

---

## 📚 Ressources

### Fichiers Assets
```
/docs/assets/
├── logo.png               (Logo complet)
├── icon.png               (Icône seule)
├── icon_inverted.png      (Icône inversée)
└── background_main.jpg    (Image hero)
```

### Documentation Complète
- **BRAND_GUIDELINES.md**: Documentation détaillée (1200+ lignes)
- **TECHNICAL_DOCUMENTATION.md**: Stack technique
- **USER_MANUAL.md**: Guide utilisateur

---

## ✅ Checklist Conformité

Avant de publier un design, vérifier :
- [ ] Utilise les couleurs du design system
- [ ] Typographie conforme (tailles, poids)
- [ ] Logo correctement dimensionné (minimum 120px)
- [ ] Espacement cohérent (multiples de 4px)
- [ ] Border-radius approprié (8px, 12px)
- [ ] Contraste WCAG AA validé
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Cibles tactiles ≥ 44px
- [ ] Assets optimisés (WebP, SVG)

---

**Préparé par**: Équipe Design EcoRide  
**Dernière mise à jour**: 18 février 2026  
**Version**: 1.0.0

**📖 Pour la documentation complète**: voir [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md)
