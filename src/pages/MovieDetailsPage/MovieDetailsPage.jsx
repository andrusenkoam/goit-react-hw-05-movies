import { useState, useEffect, useRef, Suspense } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { getMovieById } from 'services/api';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state ?? '/');

  useEffect(() => {
    setIsLoading(true);

    getMovieById(movieId)
      .then(resp => {
        if (!resp.ok) {
          return Promise.reject(
            new Error('Oops, something went wrong. Repeat one more time!')
          );
        }

        return resp.json();
      })
      .then(data => setItems(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (!items) return;

  const { title, vote_average, overview, genres, poster_path } = items;
  const procent = Math.round(Number(vote_average) * 10);
  const filmPosterUrl = `https://image.tmdb.org/t/p/w500`;
  const noImages = `https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png`;

  return (
    <>
      <Link className={css.goBackBtn} to={backLinkLocationRef.current}>
        <GoArrowLeft />
        Go back
      </Link>
      <Section>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error.message} />}
        <div className={css.details}>
          <div className={css.imageWraper}>
            {poster_path ? (
              <img src={`${filmPosterUrl}${poster_path}`} alt={title} />
            ) : (
              <img src={`${noImages}`} alt={title} />
            )}
          </div>
          <div className={css.detailsWraper}>
            <h2 className={css.detailsTitle}>{title}</h2>
            <p className={css.scoreInfo}>
              User score:<span> {procent}</span>%
            </p>
            <h3 className={css.overwiesTitle}>Overwies</h3>
            <p className={css.overwiesInfo}>{overview}</p>
            <h3 className={css.genresTitle}>Genres</h3>
            <p>
              {genres.length > 0
                ? genres.map(genre => genre.name).join(', ')
                : 'No info'}
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <div className={css.information}>
          <h3 className={css.informationTitle}>Additional information</h3>
          <ul className={css.informationList}>
            <li>
              <Link className={css.link} to="cast">
                Cast
              </Link>
            </li>
            <li>
              <Link className={css.link} to="reviews">
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </Section>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
