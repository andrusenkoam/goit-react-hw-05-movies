import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { getFilmCasts } from 'services/api';
import css from './Cast.module.css';

export const Cast = () => {
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const filmPosterUrl = `https://image.tmdb.org/t/p/w500`;
  const noImages = `https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png`;

  useEffect(() => {
    setIsLoading(true);

    getFilmCasts(movieId)
      .then(resp => {
        if (!resp.ok) {
          return Promise.reject(
            new Error('Oops, something went wrong. Repeat one more time!')
          );
        }

        return resp.json();
      })
      .then(data => setCast(data.cast))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (!cast) {
    return;
  }

  return (
    <Section>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}
      {cast.length !== 0 ? (
        <ul className={css.castList}>
          {cast.map(({ id, name, profile_path, character }) => (
            <li className={css.castItem} key={id}>
              {profile_path ? (
                <img src={`${filmPosterUrl}${profile_path}`} alt={name} />
              ) : (
                <img src={`${noImages}`} alt={name} />
              )}
              <h2 className={css.castTitle}>{name}</h2>
              <p className={css.castText}>Character: {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.castError}>
          Unfortunately, we do not have information about the actors of this
          film.
        </p>
      )}
    </Section>
  );
};
