# Theme-UI Modifiers

This library enhances [`theme-ui`](https://github.com/system-ui/theme-ui) by allowing you to use BEM-flavored conventions when building your components. It is inspired by and designed to provide similar functionality as [`styled-components-modifiers`](https://github.com/Decisiv/styled-components-modifiers).

## Installation

`yarn add @fabulas/theme-ui-modifiers`

## Usage

```jsx
/** @jsx jsx */
import { jsx, Text as ThemeUIText } from 'theme-ui';
import { useModifiers, getVariant } from '@fabulas/theme-ui-modifiers';

const TextModifiers = {
  bold: { fontWeight: 700 },
  orange: { color: 'orange' },
  bigger: ({ theme, variant }) => {
    const { fontSize } = getVariant(theme, variant);
    if (Array.isArray(fontSize)) {
      return { fontSize: fontSize.map(s => s + 1) };
    }
    return { fontSize: fontSize + 1 };
  },
};

function Text({ children, ...props }) {
  const modifiers = useModifiers(props);

  return (
    <ThemeUIText variant={props.variant} sx={modifiers}>
      {children}
    </ThemeUIText>
  );
}

function App() {
  return (
    <div>
      <Text variant="h1" modifiers={['bigger', 'bold', 'orange']}>
        Hello!
      </Text>
    </div>
  );
}
```
