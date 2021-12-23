import { NavLink } from 'react-router-dom';
import './Navigation.scss';

export default function Navigation() {
  return (
    <nav>
      <NavLink exact to="/" className="link" activeClassName="activeLink">
        Home
      </NavLink>
      <NavLink to="/movies" className="link" activeClassName="activeLink">
        Movies
      </NavLink>
    </nav>
  );
}
