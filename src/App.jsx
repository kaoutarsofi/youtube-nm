import React, { useState, useEffect, useCallback } from 'react';
import { fetchVideos } from './YoutubeAPI';
import VideoList from './VideoList';
import './styles.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('React tutorials');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const fetchedVideos = await fetchVideos(searchQuery);
      setVideos(fetchedVideos);
    } catch (err) {
      setError(err.message);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>YouTube Video Search</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher des vidéos..."
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading}
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </form>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <VideoList videos={videos} />
        )}
      </main>
    </div>
  );
}

export default App;
