import { FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import vite from '../assets/ally logo.svg';
import sidebar from '../assets/sidebar.svg';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [articles, setArticles] = useState([]);
  const { selectedAvatar } = useUser();

  const toggleSidebar = () => setExpanded(!expanded);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: '"gender-based violence" OR "domestic violence" OR GBV',
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 6,
            apiKey: import.meta.env.VITE_NEWS_API_KEY || "9fe131a283cf41348953ee31d573ebfc",
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
      <div
        className="h-screen w-16 p-2 flex flex-col items-center border-r"
        style={{ background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.06)' }}
      >
        {/* Expand toggle - visible on mobile too */}
        <button
          onClick={toggleSidebar}
          className="p-1 mb-6 mt-4 flex items-center justify-center"
          aria-label="Expand sidebar"
          title="Expand"
        >
          <img
            src={sidebar}
            alt="Expand"
            className="w-5 h-5"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-toggle.svg'; }}
          />
        </button>

        <div className="flex flex-col items-center space-y-6">
          {/* FileText icon (no white background box) */}
          <button className="p-2 rounded-lg" aria-label="Trending news">
            <FileText className="w-5 h-5 text-black/25" />
          </button>
        </div>

        <div className="mt-auto mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm">
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
              <div className="h-full w-full bg-black/10" />
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------ EXPANDED SIDEBAR ------------------------ */
  return (
    <div
      className="h-screen w-80 p-4 flex flex-col border-r"
      style={{ background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.06)' }}
    >
      {/* Header: only logo SVG (no name / subtitle) and collapse toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center "
            aria-hidden
            title="Ally logo"
          >
            <img
              src={vite}
              alt="Ally logo"
              className="w-7 h-7 object-contain"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-logo.svg'; }}
            />
          </div>
        </div>

        {/* Collapse button - visible on mobile too */}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg "
          aria-label="Collapse sidebar"
          title="Collapse"
        >
          <img
            src={sidebar}
            alt="Collapse"
            className="w-5 h-5 rotate-180"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-toggle.svg'; }}
          />
        </button>
      </div>

      {/* Trending News Section */}
      <div className="flex items-center gap-2 mb-4">
        {/* FileText icon now without a colored box */}
        <div className="p-0">
          <FileText className="w-5 h-5 text-black/25" />
        </div>
        <span className="text-sm font-medium text-black/25">Trending News</span>
      </div>

      {/* News Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white rounded-lg p-4 space-y-6 shadow-sm">
          {articles.length === 0 ? (
            <p className="text-center text-sm text-black/50">Loading news...</p>
          ) : (
            articles.map((article, idx) => (
              <div key={idx} className="py-2 border-b last:border-b-0 border-black/6">
                <h3 className="text-lg font-medium text-black/90 text-center">
                  {article.title}
                </h3>
                <h4 className="text-sm text-black/50 mb-1 text-center">
                  {article.source?.name} – {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
                </h4>
                <p className="text-sm text-black/75 text-center">
                  {article.description ?? 'No description available.'}
                </p>
                <p className="text-center mt-2">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/90 text-sm underline"
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
        <div className="h-10 w-10 rounded-full overflow-hidden bg-white shadow-sm">
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
            <div className="h-full w-full bg-black/10" />
          )}
        </div>
        {selectedAvatar?.name && (
          <span className="text-black/90 font-medium">{selectedAvatar.name}</span>
        )}
      </div>
    </div>
  );
}
