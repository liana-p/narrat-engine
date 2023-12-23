const yaml = require('js-yaml');
const toSource = require('tosource');

const narratRegex = /\.(narrat|nar)$/;
const yamlRegex = /\.(yaml|yml)$/;

function transformNarratYaml(src, id) {
  const fileName = id.match(/[^/\\]*$/)[0];
  const yamlData = yaml.load(src, {
    filename: id,
    onWarning: (warning) => console.warn(warning.toString()),
  });
  return {
    code: `const data = ${toSource(yamlData)};

    if (import.meta.hot) {
      import.meta.hot.accept(window.narratHMRHandler);
    }
    export default {
      code: data,
      fileName: '${fileName}',
      id: '${id}',
      type: 'yaml',
    };
`,
    map: null,
  };
}

function transformNarratScript(src, id) {
  const fileName = id.match(/[^/\\]*$/)[0];
  return {
    code: `
const narratCode = ${JSON.stringify(src)};

if (import.meta.hot) {
  import.meta.hot.accept(window.narratHMRHandler);
}
export default {
  code: narratCode,
  fileName: '${fileName}',
  id: '${id}',
  type: 'script',
};
`,
    map: null, // provide source map if available
  };
}

function narratPlugin() {
  return {
    name: 'narrat',

    transform(src, id) {
      if (narratRegex.test(id)) {
        return transformNarratScript(src, id);
      } else if (yamlRegex.test(id)) {
        return transformNarratYaml(src, id);
      }
    },
  };
}

module.exports = narratPlugin;
