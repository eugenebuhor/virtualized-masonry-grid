import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  const [isDarkMode] = useState(false);

  return <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{/* ... */}</ThemeProvider>;
}

export default App;
