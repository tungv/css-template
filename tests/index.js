const { expect } = require('chai');
const css = require('../src/index');

describe('css tag', () => {
  it('should work with single rule', () => {
    expect(
      css`padding: 10px`
    ).to.deep.equal({
      padding: '10px'
    })
  });

  it('should work with multiple rules', () => {
    expect(
      css`
        padding: 10px;
        margin: 20px;
      `
    ).to.deep.equal({
      padding: '10px',
      margin: '20px'
    });
  });

  it('should convert snakecase to camelCase', () => {
    expect(
      css`
        padding-top: 10px;
        margin-bottom-or-longer: 20px;
      `
    ).to.deep.equal({
      paddingTop: '10px',
      marginBottomOrLonger: '20px'
    });
  });

  it('should convert variable', () => {
    expect(
      css`
        padding: ${100 * 2}px;
      `
    ).to.deep.equal({
      padding: '200px'
    })
  });

  it('should work with extra spaces', () => {
    expect(css`padding  :   200px    `).to.deep.equal({ padding: '200px' });
  });

  it('should remove extra spaces in between values', () => {
    expect(css`padding: 20px   10px   30px  40px`).to.deep.equal({ padding: '20px 10px 30px 40px' });
  });

  it('should ignore brackets', () => {
    expect(css`{
      color: white;
      background: black;
    }`).to.deep.equal({ color: 'white', background: 'black' });
  });
});
