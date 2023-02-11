import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

import { getTrailer } from '../../services/takeApi';
import { ErrorText, VideoItems, VideoList } from './Trailer.styled';

const Trailer = () => {
  const { movieId } = useParams();
  const [trailer, setTrailer] = useState([]);

  const opts = {
    height: '220',
    width: '400',
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    if (!movieId) {
      return;
    }
    async function fetchData() {
      try {
        const response = await getTrailer(movieId);
        const trailer = response.data.results;
        console.log(response.data.results);
        setTrailer(trailer);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [movieId]);

  const onReady = event => {
    event.target.pauseVideo();
  };

  return trailer.length === 0 ? (
    <ErrorText>We don`t have any trailer</ErrorText>
  ) : (
    <VideoList>
      {trailer.map(film => {
        return (
          <VideoItems key={film.id}>
            <YouTube videoId={film.key} opts={opts} onReady={onReady} />
          </VideoItems>
        );
      })}
    </VideoList>
  );
};

export default Trailer;
