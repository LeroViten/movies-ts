import { createContext, useEffect, useState, useCallback } from 'react';
import IChildrenProps from '../interfaces/ChildrenProps.interface';

interface IThemeContext {
  isDark?: boolean;
  toggleTheme?: () => void;
}

const defaultState = {
  isDark: false,
};

export const ThemeContext = createContext<IThemeContext>(defaultState);

export const ThemeProvider = ({ children }: IChildrenProps) => {
  const [isDark, setIsDark] = useState(defaultState.isDark);

  const updateBodyStyles = useCallback(() => {
    if (isDark) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
    if (!isDark) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    updateBodyStyles();
    localStorage.setItem('isDark', JSON.stringify(!isDark));
  };

  useEffect(() => {
    const isDark = localStorage.getItem('isDark') === 'true';
    setIsDark(isDark);
  }, []);

  useEffect(() => {
    updateBodyStyles();
  }, [updateBodyStyles]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
