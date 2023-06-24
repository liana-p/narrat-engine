const fileRegex = /\.(narrat|nar)$/;

export default function narratPlugin() {
  return {
    name: 'narrat',

    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: `
const narratCode = ${JSON.stringify(src)};

const HMREventHandler = (newModule) => {
  console.log('Received HMR update for ' + '${id}');
  const narrat = window.narrat
  if (narrat) {
    narrat.vm.handleHMR(newModule);
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
  fileName: '${id.split('/').pop()}',
  id: '${id}',
};
`,
          map: null, // provide source map if available
        };
      }
    },
  };
}
