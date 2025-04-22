
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';

export function ThemeProvider({ children }) {
  const { isDarkMode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <>{children}</>;
}
