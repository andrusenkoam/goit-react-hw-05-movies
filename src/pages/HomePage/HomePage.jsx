import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { getTrendingMovies } from 'services/api';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    getTrendingMovies()
      .then(resp => {
        if (!resp.ok) {
          return Promise.reject(
            new Error('Oops, something went wrong. Repeat one more time!')
          );
        }

        return resp.json();
      })
      .then(data => setMovies(data.results))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Section title="Trending today">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}
      {movies && (
        <ul className={css.list}>
          {movies.map(({ id, title }) => (
            <li className={css.item} key={id}>
              <Link className={css.link} to={`/movies/${id}`} state={location}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
};

export default HomePage;
