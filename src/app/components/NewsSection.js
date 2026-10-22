'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // Essayer d'abord l'API alternative (gratuite)
      const response = await fetch('/api/news/alternative');
      const data = await response.json();
      
      if (data.success) {
        setNews(data.articles);
        setLastUpdated(data.lastUpdated);
        setError(null);
      } else {
        throw new Error(data.error || 'Erreur lors de la récupération des actualités');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger les actualités pour le moment');
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news/alternative', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        setNews(data.articles);
        setLastUpdated(data.lastUpdated);
        setError(null);
      }
    } catch (err) {
      console.error('Erreur lors du rafraîchissement:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading && news.length === 0) {
    return (
      <section id="news" className="py-16">
        <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
          Actualités IA
        </h2>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Chargement des actualités IA...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-16">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Actualités IA
      </h2>
      
      {/* Refresh button */}
      <div className="text-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshNews}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Actualisation...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualiser les actualités
            </>
          )}
        </motion.button>
        
        {lastUpdated && (
          <p className="text-sm text-gray-500 mt-4">
            Dernière mise à jour : {formatDate(lastUpdated)}
          </p>
        )}
      </div>

      {/* Error message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-red-400">{error}</p>
          <button 
            onClick={fetchNews}
            className="mt-2 text-red-300 underline hover:no-underline"
          >
            Réessayer
          </button>
        </motion.div>
      )}

      {/* News grid - Cards with title below */}
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {news.map((article, index) => (
          <motion.li
            key={article.id}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.08 }}
            className="group"
          >
            <a 
              href={article.url} 
              target={article.url && article.url !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="block"
            >
              {/* Card container */}
              <div className="bg-[#1d1d1d] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-800 group-hover:border-blue-500/50 group-hover:scale-105">
                
                {/* Image container */}
                <div className="relative h-48 overflow-hidden">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const img = e.target;
                        img.style.display = 'none';
                        if (img.nextSibling) {
                          img.nextSibling.style.display = 'flex';
                        }
                      }}
                      priority={index < 3} // Priorité pour les 3 premières images
                    />
                  ) : null}
                  
                  {/* Fallback image if no image or error */}
                  <div 
                    className="w-full h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-900/60 via-indigo-900/50 to-purple-900/60"
                    style={{ display: article.imageUrl ? 'none' : 'flex' }}
                  >
                    <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span className="text-xs text-blue-200 font-medium px-3 text-center">
                      {article.source}
                    </span>
                  </div>
                  
                  {/* Source badge overlay */}
                  <div className="absolute top-2 left-2 max-w-[60%]">
                    <span className="text-xs font-medium text-blue-400 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm block truncate">
                      {article.source}
                    </span>
                  </div>
                  
                  {/* Date overlay */}
                  <div className="absolute top-2 right-2">
                    <span className="text-xs text-gray-300 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </span>
                  </div>
                </div>
                
                {/* Title below image */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white line-clamp-3 group-hover:text-blue-400 transition-colors duration-200 leading-tight">
                    {article.title}
                  </h3>
                  
                  {/* Read more indicator */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                      Lire la suite
                    </span>
                    <svg className="w-3 h-3 text-blue-400 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Empty state */}
      {!loading && !error && news.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p className="text-gray-400">Aucune actualité disponible pour le moment</p>
        </motion.div>
      )}
    </section>
  );
};

export default NewsSection; 