import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.imageWraper}>
      <img
        src="https://media.istockphoto.com/vectors/page-not-found-error-with-film-flap-design-vector-id1265221960?k=20&m=1265221960&s=170667a&w=0&h=jCITUlo5a7s5fue3XrX2WB8FOK9VnbaWeLCHB8Ovj-c="
        alt="page not found"
      />
      <Link className={css.link} to="/">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
