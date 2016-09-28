const { assert } = require('chai');
const css = require('../src/index');

describe('css tag', () => {
  it('should work with single rule without `;`', () => {
    assert.deepEqual(css`padding: 10px`, { padding: '10px' });
  });

  it('should work with single rule with `;`', () => {
    assert.deepEqual(css`padding: 10px;`, { padding: '10px' });
  });

  it('should work with `%` unit', () => {
    assert.deepEqual(css`width: 100%`, { width: '100%' });
  });

  it('should work with rgba()', () => {
    assert.deepEqual(css`color: rgba(100, 200, 150, 0.1)`, {
      color: 'rgba(100, 200, 150, 0.1)'
    });
  });

  it('should work with multiple rules without final `;`', () => {
    assert.deepEqual(css`padding: 10px; margin: 20px`, {
      padding: '10px',
      margin: '20px'
    });
  });

  it('should work with multiple rules with final `;`', () => {
    assert.deepEqual(css`padding: 10px; margin: 20px;`, {
      padding: '10px',
      margin: '20px'
    });
  });

  it('should work with multiple lines without final `;`', () => {
    assert.deepEqual(css`
      padding: 10px;
      margin: 20px
    `, {
      padding: '10px',
      margin: '20px'
    });
  });

  it('should work with multiple lines with final `;`', () => {
    assert.deepEqual(css`
      padding: 10px;
      margin: 20px;
    `, {
      padding: '10px',
      margin: '20px'
    });
  });

  it('should convert snakecase to camelCase', () => {
    assert.deepEqual(
      css`padding-top: 10px; margin-bottom-or-longer: 20px;`, {
        paddingTop: '10px',
        marginBottomOrLonger: '20px'
      });
  });

  it('should convert single-value variable', () => {
    assert.deepEqual(css`padding: ${100 * 2}px;`, { padding: '200px' });
  });

  it('should convert multiple-value variable', () => {
    assert.deepEqual(css`padding: 10px ${100 * 2}px;`, { padding: '10px 200px' });
    assert.deepEqual(css`padding: ${100 * 2}px 10px;`, { padding: '200px 10px' });
  });

  it('should work with extra spaces', () => {
    assert.deepEqual(css`padding  :   200px    `, { padding: '200px' });
  });

  it('should remove extra spaces in between values', () => {
    assert.deepEqual(css`padding: 20px   10px   30px  40px`, { padding: '20px 10px 30px 40px' });
  });

  it('should ignore single-line bounding brackets', () => {
    assert.deepEqual(
      css`{ color: white; background: black; }`,
      { color: 'white', background: 'black' }
    );
  });

  it('should ignore multiple-line bounding brackets', () => {
    assert.deepEqual(
      css`{
        width: 100%;
        margin: 0 10px;
      }`,
      { width: '100%', margin: '0 10px' }
    );
  });

  it.skip('should handle composes', () => {
    const style = { padding: '6px', color: 'red' };
    assert.deepEqual(css`{
      composes: ${style};
      padding: 10px;
      margin: 10px;
    }`, {
      color: 'red',
      padding: '10px',
      margin: '10px'
    });
  });
});
