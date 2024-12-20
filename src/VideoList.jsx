import React, { useState } from 'react';
import PropTypes from 'prop-types';

const VideoList = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!videos.length) {
    return <div className="no-videos">Aucune vidéo trouvée</div>;
  }

  return (
    <div className="video-container">
      <div className="main-video">
        {selectedVideo ? (
          <div className="video-player">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="video-placeholder">
            <h2>Sélectionnez une vidéo pour commencer</h2>
          </div>
        )}
      </div>

      <div className="video-list">
        {videos.map((video) => (
          <div 
            key={video.id.videoId} 
            className={`video-item ${selectedVideo?.id.videoId === video.id.videoId ? 'selected' : ''}`}
            onClick={() => setSelectedVideo(video)}
          >
            <div className="video-thumbnail-container">
              <img 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title}
                className="video-thumbnail"
              />
              <div className="play-icon">▶</div>
            </div>
            <div className="video-info">
              <h3>{video.snippet.title}</h3>
              <span className="channel-name">{video.snippet.channelTitle}</span>
              <p className="video-description">{video.snippet.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        videoId: PropTypes.string.isRequired
      }).isRequired,
      snippet: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnails: PropTypes.shape({
          medium: PropTypes.shape({
            url: PropTypes.string.isRequired
          }).isRequired
        }).isRequired,
        channelTitle: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};

export default VideoList; 