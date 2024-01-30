import hljs from 'highlight.js/lib/core';

let codeInput: any;
let codeInputResolver: any;
const codeInputPromise: Promise<any> = new Promise((resolve) => {
  codeInputResolver = resolve;
});
function lookForCodeInput() {
  if ((window as any).codeInput) {
    codeInput = (window as any).codeInput;
    codeInput.registerTemplate(
      'syntax-highlighted',
      codeInput.templates.hljs(hljs, [] /* Array of plugins (see below) */),
    );
    codeInputResolver(codeInput);
  } else {
    setTimeout(lookForCodeInput, 100);
  }
}
export async function getCodeInput(): Promise<any> {
  return codeInputPromise;
}

lookForCodeInput();
