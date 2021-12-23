import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import Navigation from '../Navigation/Navigation';
import './AppBar.scss';

export default function AppBar() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <header>
      <Navigation />
      <input type="checkbox" checked={isDark} onChange={toggleTheme}></input>
    </header>
  );
}
