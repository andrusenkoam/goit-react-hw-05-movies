import { Oval } from 'react-loader-spinner';
import './Loader.css';

export function Loader() {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="oval-loading"
      wrapperClass="loader"
    />
  );
}
