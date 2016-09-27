const toCamel = snake =>
  snake.replace(
    /\-\w/g,
    $1 => $1.slice(1).toUpperCase()
  );

const normalizeAttr = attr => toCamel(attr.trim());
const normalizeValue = value => value.trim().replace(/\s+/g, ' ');

const getAttrAndValue = rule => {
  const trimmed = rule.trim();
  if (!trimmed) {
    return {};
  }
  const [attr, value] = trimmed.split(':');
  return { [normalizeAttr(attr)]: normalizeValue(value) };
};

const interpolate = (strings, params) =>
  params.reduce((acc, param, index) => {
    return acc + param + strings[index + 1];
  }, strings[0]).split(';');


module.exports = (strings, ...params) => {
  const originalRules = interpolate(strings, params);
  const rules = originalRules.map(getAttrAndValue);
  return Object.assign(...rules);
};
