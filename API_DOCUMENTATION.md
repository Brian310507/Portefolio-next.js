# API Actualités IA - Documentation

## Vue d'ensemble

Cette API permet de récupérer les dernières actualités sur l'intelligence artificielle. Elle propose deux endpoints :

1. **API principale** (`/api/news`) - Utilise NewsAPI (nécessite une clé API)
2. **API alternative** (`/api/news/alternative`) - Utilise des sources RSS gratuites

## Endpoints disponibles

### 1. API Alternative (Recommandée - Gratuite)

#### GET `/api/news/alternative`
Récupère les actualités IA depuis des sources RSS gratuites.

**Réponse :**
```json
{
  "success": true,
  "articles": [
    {
      "id": "unique_id",
      "title": "Titre de l'article",
      "description": "Description de l'article",
      "url": "https://lien-vers-larticle.com",
      "imageUrl": "https://image-article.jpg",
      "source": "Nom de la source",
      "publishedAt": "2024-01-15T10:30:00.000Z",
      "author": "Nom de l'auteur"
    }
  ],
  "totalResults": 20,
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "fromCache": false
}
```

#### POST `/api/news/alternative`
Force la mise à jour du cache et récupère de nouvelles actualités.

**Réponse :**
```json
{
  "success": true,
  "articles": [...],
  "totalResults": 20,
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "message": "Cache mis à jour avec succès",
  "fromCache": false
}
```

### 2. API Principale (Nécessite une clé API)

#### GET `/api/news`
Récupère les actualités depuis NewsAPI (nécessite `NEWS_API_KEY`).

#### POST `/api/news`
Force la mise à jour du cache.

## Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet :

```env
# Pour l'API principale (optionnel)
NEWS_API_KEY=votre_cle_api_newsapi

# Pour l'API alternative (aucune clé nécessaire)
```

### Obtenir une clé NewsAPI (optionnel)

1. Allez sur [newsapi.org](https://newsapi.org)
2. Créez un compte gratuit
3. Obtenez votre clé API
4. Ajoutez-la dans votre fichier `.env.local`

## Fonctionnalités

### Cache intelligent
- **Durée du cache** : 30 minutes
- **Mise à jour automatique** : Les données sont automatiquement rafraîchies
- **Optimisation des performances** : Réduction des appels API externes

### Gestion d'erreurs
- **Fallback automatique** : Si une source échoue, les autres continuent de fonctionner
- **Messages d'erreur clairs** : Informations détaillées en cas de problème
- **Actualités de secours** : Contenu statique si aucune source n'est disponible

### Sources de données
- **RSS feeds** : Le Monde, Numerama, 01net
- **Filtrage IA** : Seuls les articles liés à l'IA sont inclus
- **Tri par date** : Articles les plus récents en premier

## Utilisation dans votre application

### Exemple avec fetch

```javascript
// Récupérer les actualités
const response = await fetch('/api/news/alternative');
const data = await response.json();

if (data.success) {
  console.log('Actualités:', data.articles);
  console.log('Dernière mise à jour:', data.lastUpdated);
}

// Forcer la mise à jour
const updateResponse = await fetch('/api/news/alternative', {
  method: 'POST'
});
const updateData = await updateResponse.json();
```

### Exemple avec React (composant fourni)

```jsx
import NewsSection from './components/NewsSection';

function App() {
  return (
    <div>
      <h1>Mon Portfolio</h1>
      <NewsSection />
    </div>
  );
}
```

## Intégration dans votre portfolio

1. **Ajoutez le composant** dans votre page principale :
   ```jsx
   import NewsSection from './components/NewsSection';
   ```

2. **Personnalisez le style** en modifiant les classes Tailwind dans `NewsSection.js`

3. **Testez l'API** en visitant `/api/news/alternative` dans votre navigateur

## Fonctionnalités avancées

### Personnalisation des sources RSS

Modifiez le tableau `RSS_SOURCES` dans `/api/news/alternative/route.js` :

```javascript
const RSS_SOURCES = [
  {
    name: "Votre Source",
    url: "https://votre-source.com/feed",
    category: "tech"
  }
];
```

### Modification de la durée de cache

Changez `CACHE_DURATION` dans les fichiers de route :

```javascript
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure
```

### Ajout de nouvelles sources

Pour ajouter de nouvelles sources d'actualités :

1. Ajoutez l'URL RSS dans `RSS_SOURCES`
2. Modifiez la fonction `parseRSS` si nécessaire
3. Testez avec l'endpoint POST

## Dépannage

### Problèmes courants

1. **Aucune actualité affichée**
   - Vérifiez que votre serveur Next.js fonctionne
   - Consultez les logs du serveur pour les erreurs
   - Testez l'endpoint directement dans le navigateur

2. **Erreurs CORS**
   - Les APIs sont configurées pour fonctionner côté serveur
   - Utilisez les endpoints depuis votre application Next.js

3. **Images manquantes**
   - Les images sont optionnelles
   - Le composant gère automatiquement les erreurs d'images

### Logs et débogage

Activez les logs détaillés en ajoutant dans vos routes :

```javascript
console.log('Données récupérées:', data);
```

## Performance

- **Cache en mémoire** : Réduction des appels API
- **Revalidation Next.js** : Optimisation automatique
- **Lazy loading** : Chargement progressif des images
- **Compression** : Réponses JSON optimisées

## Sécurité

- **Validation des URLs** : Protection contre les injections
- **Limitation des requêtes** : Cache pour éviter le spam
- **Headers sécurisés** : Configuration CORS appropriée
- **Gestion d'erreurs** : Pas d'exposition d'informations sensibles

## Support

Pour toute question ou problème :
1. Vérifiez cette documentation
2. Consultez les logs du serveur
3. Testez les endpoints individuellement
4. Vérifiez votre configuration d'environnement 