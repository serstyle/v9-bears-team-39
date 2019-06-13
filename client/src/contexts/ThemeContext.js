import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  const theme = useState({
    primary: '#2D9CDB',
    secondary: '#f50057',
  });
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <ThemeContext.Provider value={theme[0]}>{children}</ThemeContext.Provider>
  );
}
