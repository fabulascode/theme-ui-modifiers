/** @jsx jsx */
import { ThemeProvider, jsx, css } from 'theme-ui';
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Text as RText } from 'rebass';
import { useModifiers, getVariant } from '../dist';

const TEXT_MODIFIERS = {
  bold: { fontWeight: 700 },
  underline: () => ({ textDecoration: 'underline' }),
  bigger: ({ theme, variant }) => {
    const { fontSize } = getVariant(theme, variant);
    if (Array.isArray(fontSize)) {
      return { fontSize: fontSize.map(size => size + 1) };
    }
    return {
      fontSize: fontSize + 1,
    };
  },
  smaller: ({ theme, variant }) => {
    const { fontSize } = getVariant(theme, variant);
    if (Array.isArray(fontSize)) {
      return { fontSize: fontSize.map(size => size - 1) };
    }
    return {
      fontSize: fontSize - 1,
    };
  },
};

const Text: React.FC<{ variant: string; modifiers?: string | string[] }> = ({
  children,
  ...props
}) => {
  const overrides = useModifiers({
    config: TEXT_MODIFIERS,
    ...props,
  });

  return (
    <RText sx={overrides} css={theme => css(overrides(theme))} {...props}>
      {children}
    </RText>
  );
};

const App = () => {
  return (
    <div>
      <Text variant="text.h1" modifiers={['bold']}>
        This is some text
      </Text>
      <Text variant="text.h2" modifiers={['bigger', 'bold']}>
        This is some text
      </Text>
      <Text variant="text.h1" modifiers={['smaller', 'bold', 'underline']}>
        This is some text
      </Text>
    </div>
  );
};

const theme = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  text: {
    h1: {
      fontSize: [5, 7],
    },
    h2: {
      fontSize: [4, 6],
    },
    h3: {
      fontSize: [3, 5],
    },
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
