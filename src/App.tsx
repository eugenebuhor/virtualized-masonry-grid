import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global.ts';
import { lightTheme, darkTheme } from './styles/theme.ts';

function App() {
  const [isDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      {/* ... */}
    </ThemeProvider>
  );
}

export default App;
