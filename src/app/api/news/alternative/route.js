import { NextResponse } from "next/server";

// Configuration
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Cache en mémoire
let newsCache = {
  data: null,
  timestamp: null
};

// Sources RSS gratuites sur l'IA
const RSS_SOURCES = [
  {
    name: "Google News - IA",
    url: "https://news.google.com/rss/search?q=%22intelligence%20artificielle%22%20OR%20%22IA%22%20OR%20ChatGPT&hl=fr&gl=FR&ceid=FR:fr",
    category: "ia"
  },
  {
    name: "Le Monde - Tech",
    url: "https://www.lemonde.fr/rss/technologies.xml",
    category: "technologies"
  },
  {
    name: "Numerama",
    url: "https://www.numerama.com/feed/",
    category: "tech"
  },
  {
    name: "01net",
    url: "https://www.01net.com/feed/",
    category: "tech"
  },
  {
    name: "Frandroid",
    url: "https://www.frandroid.com/feed",
    category: "tech"
  }
];

// Fonction pour nettoyer les entités HTML et le balisage des flux RSS
function cleanHtmlEntities(text) {
  if (!text) return '';
  return text
    // Retirer les balises CDATA : <![CDATA[ ... ]]>
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    // Retirer les balises HTML (images, liens, etc.)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;/g, "'")   //Apostrophe typographique
    .replace(/&#8216;/g, "'")   //Apostrophe simple
    .replace(/&quot;/g, '"')    //Guillemets double
    .replace(/&amp;/g, '&')     // Et commercial
    .replace(/&lt;/g, '<')      // inférieur à 
    .replace(/&gt;/g, '>')      // supérieur à 
    .replace(/&nbsp;/g, ' ')    // Espace insécable
    .replace(/&#160;/g, ' ')    // Espace insécable
    .replace(/&#8230;/g, '…')   // Points de suspension
    .replace(/&hellip;/g, '…')
    // Re-baliser après décodage (les flux échappent leurs balises : <a ...>)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')       // Espaces multiples
    .trim();                    // Espace début et fin
}

// Fonction pour extraire les images du contenu HTML
function extractImageFromContent(content) {
  if (!content) return null;
  
  // Chercher les balises img
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (imgMatch) {
    return imgMatch[1];
  }

  // Chercher les médias encodés (media:content, enclosure)
  const mediaMatch = content.match(/<(?:media:content|enclosure)[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (mediaMatch && /^https?:\/\//i.test(mediaMatch[1])) {
    return mediaMatch[1];
  }
  
  // Chercher les balises image dans les flux RSS
  const imageMatch = content.match(/<image[^>]*>.*?<url[^>]*>([^<]+)<\/url>/is);
  if (imageMatch) {
    return imageMatch[1];
  }
  
  // Chercher les liens d'images dans les descriptions
  const urlMatch = content.match(/https?:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/i);
  if (urlMatch) {
    return urlMatch[0];
  }
  
  return null;
}

// Fonction pour vérifier si un article est lié à l'IA
// Matching par mot entier : évite de valider tous les articles
// contenant « ia » ou « ai » n'importe où dans un mot (ex. « vraiment »).
function isAIRelated(title, description) {
  const aiKeywords = [
    'ia', 'ias', 'intelligence artificielle', 'ai',
    'machine learning', 'deep learning', 'chatgpt', 'openai', 'gpt',
    'gemini', 'claude', 'copilot', 'llm', 'neural', 'neurone',
    'algorithm', 'algorithmique', 'automatisation', 'robot',
    'data', 'big data', 'analytics', 'prédictif',
    'assistant virtuel', 'chatbot', 'langage naturel',
    'nlp', 'computer vision', 'intelligent', 'générative'
  ];

  const text = `${title} ${description}`.toLowerCase();
  return aiKeywords.some((keyword) => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
  });
}

// Fonction pour parser le XML RSS avec extraction d'images
function parseRSS(xmlText, sourceName = 'RSS Feed') {
  const articles = [];
  
  try {
    // Extraction des items RSS
    const itemMatches = xmlText.match(/<item[^>]*>([\s\S]*?)<\/item>/gi);
    
    if (itemMatches) {
      itemMatches.forEach((item) => {
        // Extraire le titre
        const titleMatch = item.match(/<title[^>]*>([^<]+)<\/title>/i);
        const rawTitle = titleMatch ? titleMatch[1] : '';
        const title = cleanHtmlEntities(rawTitle);

        // Google News suffixe les titres : « Titre - Source »
        let articleTitle = title;
        let articleSource = sourceName;
        if (sourceName.startsWith('Google News')) {
          const sepIndex = title.lastIndexOf(' - ');
          if (sepIndex > 0) {
            articleTitle = title.slice(0, sepIndex).trim();
            articleSource = title.slice(sepIndex + 3).trim() || sourceName;
          }
        }
        
        // Extraire le lien
        const linkMatch = item.match(/<link[^>]*>([^<]+)<\/link>/i);
        const link = linkMatch ? linkMatch[1].trim() : '';
        
        // Extraire la description
        const descMatch = item.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
        const rawDescription = descMatch ? descMatch[1] : '';
        const description = cleanHtmlEntities(rawDescription);
        
        // Extraire l'image AVANT nettoyage (le nettoyage supprime les balises)
        const imageUrl =
          extractImageFromContent(rawDescription) ||
          extractImageFromContent(item);
        
        // Extraire la date
        const dateMatch = item.match(/<pubDate[^>]*>([^<]+)<\/pubDate>/i);
        const pubDate = dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString();
        
        // Filtrer les articles liés à l'IA
        if (isAIRelated(articleTitle, description)) {
          articles.push({
            id: link || Math.random().toString(36).substr(2, 9),
            title: articleTitle,
            description: description,
            url: link,
            imageUrl: imageUrl,
            source: articleSource,
            publishedAt: pubDate,
            author: 'Source RSS'
          });
        }
      });
    }
  } catch (error) {
    console.error('Erreur lors du parsing RSS:', error);
  }
  
  return articles;
}

// Fonction pour récupérer des actualités depuis les sources RSS
async function fetchNewsFromRSS() {
  const articlesBySource = [];
  
  for (const source of RSS_SOURCES) {
    try {
      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
        },
        next: { revalidate: 1800 }
      });
      
      if (response.ok) {
        const xmlText = await response.text();
        const articles = parseRSS(xmlText, source.name);
        // Plafond par source : évite qu'une seule source domine la section
        const sourceArticles = articles
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
          .slice(0, 8);
        articlesBySource.push(sourceArticles);
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération de ${source.name}:`, error);
    }
  }
  
  // Entrelacer les sources : alterne articles récents (Google News, sans image)
  // et articles illustrés (Le Monde, Numerama, 01net, Frandroid)
  const interleaved = [];
  const maxLength = Math.max(0, ...articlesBySource.map((a) => a.length));
  for (let i = 0; i < maxLength && interleaved.length < 20; i++) {
    for (const sourceArticles of articlesBySource) {
      if (sourceArticles[i]) {
        interleaved.push(sourceArticles[i]);
      }
      if (interleaved.length >= 20) break;
    }
  }
  
  return {
    success: true,
    articles: interleaved,
    totalResults: interleaved.length,
    lastUpdated: new Date().toISOString()
  };
}

// Fonction pour récupérer des actualités depuis des sources alternatives
async function fetchAlternativeNews() {
  try {
    // Essayer d'abord les sources RSS
    const rssNews = await fetchNewsFromRSS();
    
    if (rssNews.articles.length > 0) {
      return rssNews;
    }
    
    // Si pas d'articles RSS, retourner des actualités statiques d'exemple avec images
    return {
      success: true,
      articles: [
        {
          id: '1',
          title: 'L\'intelligence artificielle révolutionne le développement web',
          description: 'Les nouvelles technologies d\'IA transforment la façon dont nous créons et maintenons les sites web modernes.',
          url: '#',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
          source: 'Tech News',
          publishedAt: new Date().toISOString(),
          author: 'Équipe Tech'
        },
        {
          id: '2',
          title: 'ChatGPT et les assistants IA : impact sur la productivité',
          description: 'Comment les outils d\'IA générative changent le travail des développeurs et créateurs.',
          url: '#',
          imageUrl: 'https://images.unsplash.com/photo-1676299251950-0d9c4c8c5c5c?w=400&h=300&fit=crop',
          source: 'AI Insights',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          author: 'Expert IA'
        },
        {
          id: '3',
          title: 'Les frameworks JavaScript adoptent l\'IA',
          description: 'Next.js, React et autres frameworks intègrent de plus en plus de fonctionnalités basées sur l\'IA.',
          url: '#',
          imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
          source: 'Dev Weekly',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          author: 'Dev Community'
        },
        {
          id: '4',
          title: 'Machine Learning : les nouvelles tendances en 2025',
          description: 'Découvrez les dernières avancées en machine learning et leurs applications pratiques.',
          url: '#',
          imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
          source: 'ML Trends',
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          author: 'Data Scientist'
        },
        {
          id: '5',
          title: 'IA et cybersécurité : protection automatique',
          description: 'Comment l\'intelligence artificielle améliore la sécurité informatique et la détection de menaces.',
          url: '#',
          imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
          source: 'Security Weekly',
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          author: 'Security Expert'
        }
      ],
      totalResults: 5,
      lastUpdated: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités alternatives:', error);
    return {
      success: false,
      error: error.message,
      articles: [],
      totalResults: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

function isCacheValid() {
  if (!newsCache.data || !newsCache.timestamp) {
    return false;
  }
  
  const now = Date.now();
  const cacheAge = now - newsCache.timestamp;
  return cacheAge < CACHE_DURATION;
}

export async function GET(request) {
  try {
    // Vérifier si le cache est valide
    if (isCacheValid()) {
      return NextResponse.json({
        ...newsCache.data,
        fromCache: true
      });
    }

    // Récupérer de nouvelles données
    const newsData = await fetchAlternativeNews();
    
    // Mettre à jour le cache
    newsCache = {
      data: newsData,
      timestamp: Date.now()
    };

    return NextResponse.json({
      ...newsData,
      fromCache: false
    });

  } catch (error) {
    console.error('Erreur dans l\'API news alternative:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur interne du serveur',
        articles: [],
        totalResults: 0,
        lastUpdated: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Forcer la récupération de nouvelles données
    const newsData = await fetchAlternativeNews();
    
    // Mettre à jour le cache
    newsCache = {
      data: newsData,
      timestamp: Date.now()
    };

    return NextResponse.json({
      ...newsData,
      message: 'Cache mis à jour avec succès',
      fromCache: false
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du cache:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la mise à jour',
        articles: [],
        totalResults: 0,
        lastUpdated: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 