import { ChevronLeft, Plus, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [articles, setArticles] = useState([]);
  const { selectedAvatar } = useUser();

  const toggleSidebar = () => setExpanded(!expanded);

  /* ------------------------------------------------------------------ */
  /* Fetch GBV‑related news articles with NewsAPI once component mounts  */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: '"gender‑based violence" OR "domestic violence" OR GBV',
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 6,
            apiKey:"9fe131a283cf41348953ee31d573ebfc", // store key in env
          },
        });
        setArticles(data.articles ?? []);
      } catch (err) {
        console.error('Failed to fetch news', err);
      }
    };
    fetchNews();
  }, []);

  /* ------------------------ COLLAPSED SIDEBAR ----------------------- */
  if (!expanded) {
    return (
      <div className="h-screen bg-gray-50 w-16 p-2 flex flex-col items-center border-r border-gray-200">
        <button onClick={toggleSidebar} className="p-1 rounded-lg bg-blue-500 text-white mb-6 mt-4">
          <ChevronLeft className="rotate-180 w-5 h-5" />
        </button>
        <div className="flex flex-col items-center space-y-6">
          <button className="p-2 rounded-lg bg-blue-500 text-white">
            <Plus className="w-5 h-5" />
          </button>
          <button className="bg-blue-500 p-1 rounded text-white">
            <FileText className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-auto mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            {selectedAvatar?.image ? (
              <img
                src={selectedAvatar.image}
                alt={selectedAvatar.name}
                className="h-full w-full object-cover"
                onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/default-avatar.png';
                }}
              />
            ) : (
              <div className="h-full w-full bg-gray-400" />
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------ EXPANDED SIDEBAR ------------------------ */
  return (
    <div className="h-screen bg-gray-50 w-80 p-4 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-500">Ally</h1>
        <button onClick={toggleSidebar} className="p-1 rounded-lg bg-blue-500 text-white ml-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* New Chat Section */}
      <div className="mb-8">
        <button className="flex items-center gap-2 mb-4 w-full bg-white px-3 py-2 rounded-md shadow-sm hover:bg-blue-50">
          <div className="bg-blue-500 p-1 rounded text-white">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-gray-600">New chat</span>
        </button>
      </div>

      {/* Trending News Section */}
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-500 p-1 rounded text-white">
          <FileText className="w-5 h-5" />
        </div>
        <span className="text-gray-600 font-medium">Trending News</span>
      </div>

      {/* News Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex-1 bg-blue-50 rounded-lg p-4 space-y-6">
          {articles.length === 0 ? (
            <p className="text-center text-sm text-gray-500">Loading news...</p>
          ) : (
            articles.map((article, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-medium text-gray-700 text-center">
                  {article.title}
                </h3>
                <h4 className="text-sm text-gray-600 mb-1 text-center">
                  {article.source.name} – {new Date(article.publishedAt).toLocaleDateString()}
                </h4>
                <p className="text-sm text-gray-500 text-center">
                  {article.description ?? 'No description available.'}
                </p>
                <p className="text-center mt-2">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm underline"
                  >
                    Read more
                  </a>
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Avatar */}
      <div className="mt-auto py-4 flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
          {selectedAvatar?.image ? (
            <img
              src={selectedAvatar.image}
              alt={selectedAvatar.name}
              className="h-full w-full object-cover"
              onError={e => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
          ) : (
            <div className="h-full w-full bg-gray-400" />
          )}
        </div>
        {selectedAvatar?.name && (
          <span className="text-gray-700 font-medium">{selectedAvatar.name}</span>
        )}
      </div>
    </div>
  );
}
