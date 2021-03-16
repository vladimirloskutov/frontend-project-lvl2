const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    if (currentValue === null) {
      return null;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
        .entries(currentValue)
        .map(([key, val]) => {
          return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
        });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const data = {
  hello: 'world',
  is: true,
  nested: {
    count: 5
  }
};

console.log(stringify(data));