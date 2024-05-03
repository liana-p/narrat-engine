import { Parser } from '@/types/parser';
import { error } from '@/utils/error-handling';

export function commandRuntimeError(
  cmd: Parser.Command<any, any>,
  errorText: string,
) {
  console.error(`Runtime error =========================`);
  console.error(`Command: ${cmd.commandType}`);
  console.error('Args: ', cmd.args);
  console.error('Options: ', cmd.options);
  error(`Runtime error at ${cmd.fileName}:${cmd.line + 1} (${cmd.commandType}) ${cmd.code}. - 
  <br />
  Error: ${errorText}`);
  console.error('============================');
}

export function commandLog(cmd: Parser.Command<any, any>, ...log: any[]) {
  console.log(`[${cmd.fileName}:${cmd.line + 1}] log: `, ...log);
}
