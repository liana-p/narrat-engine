export namespace Parser {
  export type Primitive = string | number | boolean | undefined | null;
  export type Expression = Array<Primitive | Expression>;

  export interface IfOptions {
    condition: string;
    success: Branch;
    failure?: Branch;
  }

  export interface ChoiceOptions {
    prompt: ParsedExpression;
    choices: ChoicePrompt[];
  }
  export interface ChoicePrompt {
    choice: string;
    branch: Branch;
    condition?: string;
    skillCheck?: SkillCheckOptions;
    index: number;
  }

  export interface PlayOptions {
    mode: 'sound' | 'music';
    audio: string;
  }

  export interface StopOptions {
    mode: 'sound' | 'music';
    audio?: string;
  }

  export interface SkillCheckOptions {
    id: string;
    skill: string;
    value: number;
    hideAfterRoll: boolean;
    success: Branch;
    failure: Branch;
  }

  export interface JumpOptions {
    label: string;
  }

  export interface WaitOptions {
    duration: number;
  }

  export interface TextOptions {
    text: string;
  }

  export interface SetScreenOption {
    screen: string;
  }
  export interface EmptyOptions {}

  export type DefaultArg = {
    [key: string]: Arg;
  };
  export type CommandOptions<T = DefaultArg> = T;

  export interface Command<Options = CommandOptions, StaticOptions = {}> {
    args: Arg[];
    commandType: string;
    options: Options;
    code: string;
    staticOptions: StaticOptions;
    operator: string;
    line: number;
    fileName: string;
    finishCommand?: (res: any) => void;
  }

  export type Arg = ParsedExpression | Primitive;
  export interface ParsedExpression<
    Options = CommandOptions,
    StaticOptions = {},
  > {
    code: string;
    command: {
      commandType: string;
      operator: string;
      args: Arg[];
      options: Options;
      staticOptions: StaticOptions;
    };
    fileName: string;
    line: number;
  }

  export type Branch = ParsedExpression[];

  export interface ParsedScript {
    [key: string]: ParsedLabel;
  }

  export interface ParsedLabel {
    branch: Parser.Branch;
    args?: string[];
  }
  export interface Line {
    code: string;
    indentation: number;
    line: number;
    expression: Expression;
    branch?: Line[];
  }
}
