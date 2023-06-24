const fileRegex = /\.(narrat|nar)$/;

export default function narratPlugin() {
  return {
    name: 'narrat',

    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: `
const narratCode = ${JSON.stringify(src)};
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
