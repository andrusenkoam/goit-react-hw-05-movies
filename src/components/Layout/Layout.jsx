import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={css.container}>
      <header className={css.pageHeader}>
        <nav>
          <ul className={css.list}>
            <li className={css.item}>
              <NavLink className={css.link} to="/">
                Home
              </NavLink>
            </li>
            <li className={css.item}>
              <NavLink className={css.link} to="/movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer />
    </div>
  );
};
