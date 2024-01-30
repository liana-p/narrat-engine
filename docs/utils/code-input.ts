import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import narrat from './narrat-hljs';
import yaml from 'highlight.js/lib/languages/yaml';
import 'highlight.js/styles/github-dark.css';

let codeInput: any;
let codeInputResolver: any;
let codeInputPromise: Promise<any> | undefined;
function lookForCodeInput() {
  if ((window as any).codeInput) {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('python', python as any);
    hljs.registerLanguage('narrat', narrat as any);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('yaml', yaml);
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
  if (codeInputPromise) {
    return codeInputPromise;
  } else {
    codeInputPromise = new Promise((resolve) => {
      codeInputResolver = resolve;
    });
    lookForCodeInput();
  }
}
