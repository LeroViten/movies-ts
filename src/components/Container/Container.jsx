import { addBackToTop } from 'vanilla-back-to-top';
import PropTypes from 'prop-types';
import './Container.scss';

export default function Container({ children }) {
  addBackToTop({
    diameter: 50,
    textColor: '#fff',
    scrollDuration: 400,
    backgroundColor: '#ac3377',
  });

  return <div className="container">{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
};
