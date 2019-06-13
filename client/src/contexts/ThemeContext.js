import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  const theme = useState({
    primary: '#2D9CDB',
    secondary: '#f50057',
    third: '#36474F',
    gitlab: '#FCA326',
    github: '#333333',
    google: '#DD4B39',
    textWhite: '#ffffff',
  });
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <ThemeContext.Provider value={theme[0]}>{children}</ThemeContext.Provider>
  );
}
