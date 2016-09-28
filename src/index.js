const REGEX_RULE = /([\w\-]+)\s*:\s*([^;]+)\;/g;

const toCamel = snake =>
  snake.replace(
    /\-\w/g,
    $1 => $1.slice(1).toUpperCase()
  );

const normalizeAttr = attr => toCamel(attr.trim());

const normalizeValue = value =>
  value.replace(/(\s+)/g, ' ') // remove extra spaces

const addTrailingCharacter = char => str => str[str.length - 1] === char ? str : (str + char);

const handleLiteral = literal => {
  let match;
  let indexStart = -1;
  let indexEnd = 0;
  const rules = [];

  while(match = REGEX_RULE.exec(literal)) {
    const [rule, attr, value] = match;
    // console.log(' >>>> rule', rule);
    if (!indexStart) {
      indexStart = match.index;
    }
    indexEnd = match.index + rule.length;
    rules.push([normalizeAttr(attr), normalizeValue(value)]);
  }

  const prefix = literal.substr(0, indexStart).trim();
  const suffix = literal.slice(indexEnd).trim();

  const ret = {
    rules,
    prefix,
    suffix,
  };
  console.log(
    '<----------\nparse input\n  %s\n  result ==>\n  %j\n---------->\n\n',
    literal, ret
  );
  return ret;
}

const isComposes = str => str.match(/(^|\s)composes\s*:\s*$/);
const parseComposes = param => ({
  rules: Object.keys(param).map(key => [key, param[key]]),
  prefix: '',
  suffix: '',
});

const reduce = (current, param, nextLiteral) => {
  console.log('current', current);
  console.log('param', param);
  console.log('nextLiteral', nextLiteral);

  const { rules, prefix, suffix } = current;
  const next = handleLiteral(nextLiteral);

  if (!suffix) {
    console.error('params as an attr');
    throw new Error('feature: [params as an attr] is not implemented yet')
  }

  if (isComposes(suffix)) {
    const rules = Object.keys(param).map(key => [key, param[key]]);
  }
  const interpolated = isComposes(suffix) ?
    (console.log('composes'), parseComposes(param)) :
    handleLiteral([suffix, param, next.prefix].join(' '));

  // console.log('interpolated', interpolated);

  return {
    rules: [].concat(rules, interpolated.rules, next.rules),
    suffix: interpolated.suffix + next.suffix
  };
}

const convertToObject = (array) => array.reduce(
  (current, pairs) => (current[pairs[0]] = pairs[1], current), {}
);

module.exports = (strings, ...params) => {
  const reduced = params.reduce(
    (acc, param, index) => reduce(acc, param, strings[index + 1]),
    handleLiteral(strings[0])
  );

  // console.log('\n\nreduced\n\n', reduced);
  if (reduced.prefix && reduced.prefix !== '{') {
    throw new Error(`unexpected starting sequence of "${reduced.prefix}"`);
  }

  if (reduced.suffix && reduced.suffix !== '}') {
    const finalRule = handleLiteral(addTrailingCharacter(';')(reduced.suffix));
    reduced.rules.push(...finalRule.rules);
    if (finalRule.suffix) {
      throw new Error(`unexpected ending sequence of ${finalRule.suffix}`);
    }
  }

  console.log('final:', reduced);
  return convertToObject(reduced.rules);
};
