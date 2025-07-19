'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      🌓 Modo {darkMode ? 'Claro' : 'Escuro'}
    </button>
  );
}
