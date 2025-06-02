import PropTypes from 'prop-types';
import css from './ErrorMessage.module.css';

export const ErrorMessage = ({ message }) => {
  return <p className={css.errorMessage}>{message}</p>;
};

ErrorMessage.propTypes = { message: PropTypes.string.isRequired };
