const toCamel = snake =>
  snake.replace(
    /\-\w/g,
    $1 => $1.slice(1).toUpperCase()
  );

const normalizeAttr = attr => toCamel(attr.trim());
const normalizeValue = value => value.trim().replace(/\s+/g, ' ');

const getAttrAndValue = rule => {
  console.log('rule', rule);
  const trimmed = rule.trim();
  if (!trimmed) {
    return {};
  }
  const [attr, value] = trimmed.split(':');
  return { [normalizeAttr(attr)]: normalizeValue(value) };
};

const withoutOpeningBracket = string => {
  return string.replace(/^(\s|\{)*/, '');
}

const withoutClosingBracket = string => {
  return string.replace(/(\s|\})*$/, '');
}

const interpolate = (strings, params) =>
  withoutClosingBracket(params.reduce((acc, param, index) => {
    return acc + param + strings[index + 1];
  }, withoutOpeningBracket(strings[0]))).split(';');


module.exports = (strings, ...params) => {
  const originalRules = interpolate(strings, params);
  const rules = originalRules.map(getAttrAndValue);
  return Object.assign(...rules);
};
