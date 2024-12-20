import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyDi-_1uHeCjxz456Gtn8aBHkcXVaMysEC8';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtubeApi = axios.create({
  baseURL: BASE_URL,
  params: {
    part: 'snippet',
    maxResults: 10,
    key: API_KEY,
  },
});

export const fetchVideos = async (query) => {
  try {
    const response = await youtubeApi.get('/search', {
      params: {
        q: query,
        type: 'video',
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos:', error);
    throw new Error('Impossible de récupérer les vidéos. Veuillez réessayer plus tard.');
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        id: videoId,
        part: 'snippet,statistics',
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la vidéo:', error);
    throw new Error('Impossible de récupérer les détails de la vidéo.');
  }
}; 