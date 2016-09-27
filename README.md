# css-template
Reduce context-switching when defining `style` in React Component.

# Installation

```bash
npm i -S css-template
```

# Usages

```js
import css from 'css-template';

const COLOR_MAIN = 'white';
const BACKGROUND_MAIN = '#336699';
const awesomeStyles = css`font-size: 200%`;

const styles = {
  header: css`
    padding: 10px 0 20px 10px;
    text-align: center;
  `,
  main: {
    ...awesomeStyles,
    ...css`
      color: ${COLOR_MAIN};
      background-color: ${BACKGROUND_MAIN};
    `
  }
};

const MyComponent = (props) => (
  <div>
    <div style={styles.header}>
    {props.header}
    </div>
    <div style={styles.main}>
    {props.main}
    </div>
  </div>
);
```
