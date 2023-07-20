const fileRegex = /\.(narrat|nar)$/;

function narratPlugin() {
  return {
    name: 'yaml-hmr',

    transform(src, id) {
      if (fileRegex.test(id)) {
        const fileName = id.match(/[^/\\]*$/)[0];
        return {
          code: `
const narratCode = ${JSON.stringify(src)};

const HMREventHandler = (newModule) => {
  console.log('Received HMR update for ' + '${id}');
  const narrat = window.narrat
  if (narrat) {
    narrat.handleHMR(newModule);
  }
  const event = new CustomEvent('narrat-hmr', {
    detail: {
      newModule,
    },
  });
  document.body.dispatchEvent(event);
}
if (import.meta.hot) {
  console.log('Accepting HMR update to ' + '${id}');
  import.meta.hot.accept(HMREventHandler);
}
export default {
  code: narratCode,
  fileName: '${fileName}',
  id: '${id}',
};
`,
          map: null, // provide source map if available
        };
      }
    },
  };
}

module.exports = narratPlugin;
