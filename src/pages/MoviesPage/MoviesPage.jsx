import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { getMovieByName } from 'services/api';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query');

  const handleSubmit = evt => {
    evt.preventDefault();
    const { value } = evt.target.elements.text;
    if (value.trim() === '') return;
    setSearchText(value.toLowerCase());
    setSearchParams({ query: value.toLowerCase() });
    evt.target.reset();
  };

  useEffect(() => {
    if (query) {
      setSearchText(query);
    }
  }, [query]);

  useEffect(() => {
    if (searchText === '') {
      return;
    }

    setIsLoading(true);

    getMovieByName(searchText)
      .then(resp => {
        if (!resp.ok) {
          return Promise.reject(
            new Error('Oops, something went wrong. Repeat one more time!')
          );
        }

        return resp.json();
      })
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [searchText]);

  return (
    <>
      <Section>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error.message} />}
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <input className={css.searchText} type="text" name="text" autoFocus />
          <button className={css.searchBtn} type="submit" disabled={isLoading}>
            Search
          </button>
        </form>
      </Section>
      <Section>
        {movies.length !== 0 ? (
          <ul className={css.list}>
            {movies.map(({ id, title }) => (
              <li className={css.item} key={id}>
                <Link className={css.link} to={`${id}`} state={location}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.movieError}>
            {searchText !== ''
              ? `There are no results for query ${searchText}`
              : ''}
          </p>
        )}
      </Section>
    </>
  );
};

export default MoviesPage;
