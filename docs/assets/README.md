# 📁 EcoRide - Assets Visuels

Ce dossier contient tous les assets graphiques du projet EcoRide.

---

## 📂 Contenu du Dossier

### 🔷 **logo.png**
**Dimensions**: Variable (scalable)  
**Format**: PNG avec transparence  
**Contenu**: Logo complet horizontal (icône + wordmark "EcoRide")  
**Couleurs**: 
- Cercle: Bleu primary (#1E90FF)
- Flèche: Blanc (#FFFFFF)
- Texte: Bleu primary (#1E90FF)

**Utilisation**:
- Header du site web
- Documentation (README, guides)
- Signatures email
- Landing pages
- Présentations

**Taille minimale**: 120px de largeur

---

### 🔵 **icon.png**
**Dimensions**: Carré (ex: 512x512px)  
**Format**: PNG avec transparence  
**Contenu**: Icône seule (cercle bleu avec flèche blanche)  
**Couleurs**: 
- Cercle: Bleu primary (#1E90FF)
- Flèche: Blanc (#FFFFFF)

**Utilisation**:
- Favicon (16x16, 32x32, 64x64)
- App mobile icon (512x512, 1024x1024)
- Profils réseaux sociaux
- Headers compacts (mobile)
- Loading spinners

**Génération de favicons**:
```bash
# Utiliser un outil comme https://realfavicongenerator.net/
# ou créer manuellement les tailles :
# - favicon-16x16.png
# - favicon-32x32.png
# - apple-touch-icon.png (180x180)
# - android-chrome-192x192.png
# - android-chrome-512x512.png
```

---

### 🔲 **icon_inverted.png**
**Dimensions**: Carré (ex: 512x512px)  
**Format**: PNG avec transparence  
**Contenu**: Icône avec couleurs inversées  
**Couleurs (Option 1)**: 
- Cercle: Blanc (#FFFFFF) ou transparent
- Flèche: Bleu primary (#1E90FF)

**Couleurs (Option 2)**:
- Cercle: Bleu primary (#1E90FF)
- Flèche: Blanc (#FFFFFF)

**Utilisation**:
- Footer (fond sombre #0F172A)
- Mode sombre
- Hero sections avec fond foncé
- Overlays et modals sombres
- Print sur fond sombre

---

### 🖼️ **background_main.jpg**
**Dimensions**: Haute résolution (ex: 1920x1080 ou supérieur)  
**Format**: JPG optimisé  
**Contenu**: Photo de personne conduisant une voiture  
**Sujet**: Vue depuis l'intérieur d'une voiture avec chauffeur  
**Ambiance**: Conviviale, rassurante, évoque le voyage et le partage

**Utilisation**:
- Hero section de la homepage
- Bannières de pages principales
- Backgrounds avec overlay
- Mockups et présentations

**Traitement recommandé**:
```css
/* Hero avec overlay */
background-image: 
  linear-gradient(rgba(30, 58, 95, 0.7), rgba(15, 23, 42, 0.7)),
  url('/docs/assets/background_main.jpg');
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
```

**Overlays suggérés**:
- **Variante A**: `rgba(74, 85, 104, 0.6)` - Gris foncé 60%
- **Variante B**: `rgba(30, 58, 95, 0.7)` - Bleu foncé 70% (Recommandé)
- **Gradient**: De Dark (#1E3A5F) vers Darker (#0F172A)

**Optimisation Web**:
- Convertir en WebP pour performance
- Générer versions responsive:
  - Mobile: 640px width
  - Tablet: 1024px width
  - Desktop: 1920px width

```bash
# Exemple de conversion (avec cwebp ou autre tool)
cwebp -q 80 background_main.jpg -o background_main.webp
```

---

## 🎨 Design System (Résumé)

### Palette de Couleurs

#### Couleurs Principales
```css
--color-primary: #1E90FF      /* Bleu Dodger */
--color-secondary: #D97706    /* Orange burnt */
--color-grey: #F3F4F6         /* Gris clair */
--color-dark: #1E3A5F         /* Bleu marine foncé */
--color-darker: #0F172A       /* Slate presque noir */
```

#### Couleurs Sémantiques
```css
--color-success: #10B981      /* Vert (badge écologique) */
--color-warning: #F97316      /* Orange warning */
--color-error: #EF4444        /* Rouge erreur */
--color-info: #06B6D4         /* Bleu cyan info */
```

### Typographie
```
Font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
Tailles: 48px (H1), 36px (H2), 30px (H3), 24px (H4), 16px (Body)
Poids: 700 (Bold), 600 (Semibold), 400 (Regular)
```

---

## 📐 Spécifications Techniques

### Format des Fichiers

| Fichier | Format | Transparence | Compression | Poids estimé |
|---------|--------|--------------|-------------|--------------|
| logo.png | PNG-24 | Oui | Optimisé | ~150 KB |
| icon.png | PNG-24 | Oui | Optimisé | ~3 KB |
| icon_inverted.png | PNG-24 | Oui | Optimisé | ~2.5 KB |
| background_main.jpg | JPEG | Non | 80% quality | ~2.8 MB |

### Recommandations pour la Production

1. **Logo et Icons**:
   - Convertir en SVG pour scalabilité parfaite
   - Garder PNG comme fallback
   - Taille maximale 200KB

2. **Background**:
   - Convertir en WebP (gain ~30-50%)
   - Générer versions responsive
   - Lazy loading sur la page
   - Utiliser `srcset` pour responsive images

3. **Optimisation**:
   ```bash
   # Optimiser les PNGs
   optipng -o7 icon.png
   pngquant --quality=65-80 logo.png
   
   # Optimiser les JPEGs
   jpegoptim --max=80 background_main.jpg
   
   # Convertir en WebP
   cwebp -q 80 background_main.jpg -o background_main.webp
   ```

---

## 🖼️ Utilisation dans le Code

### Next.js Image Component
```tsx
import Image from 'next/image';

// Logo dans le header
<Image 
  src="/docs/assets/logo.png" 
  alt="EcoRide" 
  width={150} 
  height={40}
  priority
/>

// Icon (favicon dans layout)
<link rel="icon" href="/docs/assets/icon.png" />

// Background hero
<div className="hero" style={{
  backgroundImage: `
    linear-gradient(rgba(30, 58, 95, 0.7), rgba(15, 23, 42, 0.7)),
    url('/docs/assets/background_main.jpg')
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>
  <h1>Voyagez partout à petit prix !</h1>
</div>
```

### CSS Background
```css
.hero {
  background-image: 
    linear-gradient(rgba(30, 58, 95, 0.7), rgba(15, 23, 42, 0.7)),
    url('/docs/assets/background_main.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 600px;
}
```

---

## 📋 Checklist Avant Export

Avant d'exporter un asset, vérifier :
- [ ] Résolution suffisante (minimum 72dpi pour web, 300dpi pour print)
- [ ] Format approprié (PNG pour transparence, JPG pour photos)
- [ ] Couleurs conformes au design system
- [ ] Fichier optimisé (compression, taille raisonnable)
- [ ] Nom de fichier clair et descriptif
- [ ] Métadonnées correctes (alt text prévu)
- [ ] Versions responsive générées si nécessaire
- [ ] Version WebP créée pour performance

---

## 🔗 Ressources Complémentaires

**Documentation**:
- [BRAND_GUIDELINES.md](../BRAND_GUIDELINES.md) - Charte graphique complète
- [CHARTE_GRAPHIQUE.md](../CHARTE_GRAPHIQUE.md) - Référence rapide
- [TECHNICAL_DOCUMENTATION.md](../TECHNICAL_DOCUMENTATION.md) -Stack technique

**Outils Recommandés**:
- [TinyPNG](https://tinypng.com/) - Compression PNG/JPG
- [Squoosh](https://squoosh.app/) - Conversion et optimisation
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Génération favicons
- [ImageOptim](https://imageoptim.com/) - Optimisation batch (Mac)

---

**Préparé par**: Équipe Design EcoRide  
**Dernière mise à jour**: 18 février 2026  
**Version**: 1.0.0
