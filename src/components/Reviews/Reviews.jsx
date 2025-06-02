import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { getFilmReviews } from 'services/api';
import css from './Reviews.module.css';

export const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getFilmReviews(movieId)
      .then(resp => {
        if (!resp.ok) {
          return Promise.reject(
            new Error('Oops, something went wrong. Repeat one more time!')
          );
        }

        return resp.json();
      })
      .then(data => setReviews(data.results))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (!reviews) {
    return;
  }

  return (
    <Section>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}
      {reviews.length !== 0 ? (
        <ul className={css.reviewList}>
          {reviews.map(({ id, author, content }) => (
            <li className={css.reviewItem} key={id}>
              <h2 className={css.reviewTitle}>Author: {author}</h2>
              <p className={css.reviewText}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.reviewError}>
          Sorry we don't have any reviews for this movie
        </p>
      )}
    </Section>
  );
};
