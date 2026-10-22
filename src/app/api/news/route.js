import { NextResponse } from "next/server";

// Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY || 'demo'; // Vous devrez obtenir une clé gratuite sur newsapi.org
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes en millisecondes

// Cache en mémoire (en production, utilisez Redis ou une base de données)
let newsCache = {
  data: null,
  timestamp: null
};

async function fetchNewsFromAPI() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=artificial intelligence OR AI&language=fr&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 } // Revalidation toutes les 30 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Traitement et nettoyage des données
    const processedNews = data.articles?.map(article => ({
      id: article.url || Math.random().toString(36).substr(2, 9),
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source?.name,
      publishedAt: article.publishedAt,
      author: article.author
    })) || [];

    return {
      success: true,
      articles: processedNews,
      totalResults: data.totalResults || 0,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
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
    const newsData = await fetchNewsFromAPI();
    
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
    console.error('Erreur dans l\'API news:', error);
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

// Endpoint pour forcer la mise à jour du cache
export async function POST(request) {
  try {
    // Forcer la récupération de nouvelles données
    const newsData = await fetchNewsFromAPI();
    
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