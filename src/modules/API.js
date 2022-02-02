import Render from './render.js';

const involveApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const involveApiId = 'r0Jfm9NG0qKGASTjFlWm';

const GetLikes = async () => {
  const response = await fetch(`${involveApiUrl}${involveApiId}/likes`);
  const result = await response.json();
  return result;
};

const PostLikes = async (movieId) => {
  const response = await fetch(`${involveApiUrl}${involveApiId}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: movieId,
    }),
  });
  return response.status;
};

const GetDataFromAPI = async () => {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=dog');
  const likesArray = await GetLikes();
  const result = await response.json();
  result.forEach((movie) => {
    const movieId = movie.show.id;
    const likesObject = likesArray.filter((item) => item.item_id === movieId);
    const like = likesObject[0].likes;
    Render(movie, like);
  });
};

export {
  GetDataFromAPI, PostLikes, GetLikes,
};