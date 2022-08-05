import { useMain } from '@/stores/main-store';
import { ParserContext } from '@/vm/vm-parser';

export function parserError(ctx: ParserContext, line: number, text: string) {
  console.error(`Parser error: ${ctx.fileName}:${ctx.currentLine}`, text);
  const errorText = `[Parser Error] in <span class="error-filename">${
    ctx.fileName
  }:${line + 1}</span> - <b>${text}</b>`;
  error(errorText);
}

export function error(text: string, ...args: any[]) {
  const mainStore = useMain();
  console.error(text, ...args);
  text = text.replace(/[\r\n]/g, `\n<br />`);
  mainStore.createError(`❌ ${text}`);
}

export function warning(text: string, ...args: any[]) {
  const mainStore = useMain();
  console.warn(text, ...args);
  text = text.replace(/[\r\n]/g, `\n<br />`);
  mainStore.createWarning(`⚠️ ${text}`);
}
