# css-template
Reduce context-switching when defining `style` in React Component.

To use inline styles in React, you often find yourself writing this type of code:

```js
const styles = {
  title: {
    borderBottomLeftRadius: '10px',
    //    ^     ^   ^       ^    ^^
    //    |     |   |       |    ||___ annoying trailing comma
    //    |     |   |       |____|____ annoying JS quotes
    //    |_____|___|_________________ annoying camel case
    //
    //    (╯°□°）╯︵ ┻━┻ I WANT CSS BACK!!!
  }
}
```

With `css-template`, those times are gone! Instead of writing this:

```js
const styles = {
  title: {
    marginTop: '10px',
    fontSize: '120%',
    lineHeight: '1.5',
    textAlign: 'center',
    backgroundColor: 'rgba(100, 255, 100, 0.7)',
  },
  footer: {
    width: 'calc(100% - 16px)',
    textAlign: 'right',
    marginTop: '20px',
  }
};
```

you can write something like this

```js
const styles = {
  title: css`{
    margin-top: 10px;
    font-size: 120%;
    line-height: 1.5;
    text-align: center;
    background-color: rgba(100, 255, 100, 0.7);
  }`,
  footer: css`{
    width: calc(100% - 16px);
    text-align: right;
    margin-top: 20px;
  }`,
};
```

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

# ROADMAP

- [ ] `composes: ${otherStyles};` just like postcss composes feature
- [ ] optional auto-prefixer
- [ ] spread numeric values like `padding: ${[10, 20, 0, 10]}px;`
