import { Inject, Injectable, InjectionToken, Optional, isDevMode } from "@angular/core";
import pino, { Logger, WriteFn } from "pino";

export const COLOR = {
  green: `\x1b[32m`,
  red: `\x1b[31m`,
  white: `\x1b[37m`,
  yellow: `\x1b[33m`,
  cyan: `\x1b[36m`,
  clear: `\x1b[0m`,
};

export const LEVEL_COLORS = {
  fatal: COLOR.red,
  error: COLOR.red,
  warn: COLOR.yellow,
  info: COLOR.green,
  debug: COLOR.cyan,
  trace: COLOR.white,
};

type ConsoleFunction = "error" | "warn" | "info" | "debug" | "trace" | "log";

export const CONSOLE_LEVEL_FUNCTION: Record<string, ConsoleFunction> = {
  fatal: "error",
  error: "error",
  warn: "warn",
  info: "info",
  debug: "debug",
  trace: "trace",
} as const;

export function formatLogLevel(level: string): string {
  const levelLower = level.toLowerCase();
  const color = LEVEL_COLORS[levelLower as keyof typeof LEVEL_COLORS];
  return color ? `${color}[${level.toUpperCase()}]${COLOR.clear}` : `[${level.toUpperCase()}]`;
}

export function formatLogScope(scope?: string): string {
  return scope ? ` ${COLOR.cyan}[${scope}]${COLOR.clear} ` : " ";
}

export function getConsoleFunction(level: string): ConsoleFunction {
  const levelLower = level.toLowerCase();
  return CONSOLE_LEVEL_FUNCTION[levelLower] || "log";
}


export const browserWriteFn: WriteFn = (logObj) => {
  // Get attributes from log object
  const { level, msg, scope, ...rest } = logObj as Record<string, unknown>;

  const levelFormatted = formatLogLevel(String(level));
  const scopeFormatted = formatLogScope(scope as string);
  const consoleFunc = getConsoleFunction(String(level));

  // Remove unnecessary attributes in developmet mode
  delete rest["time"];

  if (rest && Object.keys(rest).length > 0) {
    // eslint-disable-next-line no-console
    console[consoleFunc](`${levelFormatted}${scopeFormatted}${msg}`, rest);
  } else {
    // eslint-disable-next-line no-console
    console[consoleFunc](`${levelFormatted}${scopeFormatted}${msg}`);
  }
};

export function createPinoLogger(): Logger {
  if (isDevMode()) {
    // Development mode print with colorize
    return pino({
      level: "debug",
      browser: {
        write: browserWriteFn,
        formatters: {
          level: (label: string) => ({ level: label }),
        },
      },
    });
  } else {
    // Production: return log as object. Useful when remote write log
    return pino({
      level: "warn",
      browser: { asObject: true },
    });
  }
}

export const LOGGER_SCOPE = new InjectionToken<string>("LOGGER_SCOPE");

export function provideLoggerScope(scope: string) {
  return { provide: LOGGER_SCOPE, useValue: scope };
}

export const PINO_LOGGER = new InjectionToken<Logger>("PINO_LOGGER");

@Injectable({ providedIn: "root" })
export class LoggerService {
  private logger: Logger;

  constructor(
    @Optional() @Inject(LOGGER_SCOPE) private scope?: string,
    @Optional() @Inject(PINO_LOGGER) logger?: Logger
  ) {
    this.logger = logger ?? createPinoLogger();
    if (this.scope) {
      this.logger = this.logger.child({ scope: this.scope });
    }
  }

  create(scope: string): LoggerService {
    return new LoggerService(scope, this.logger);
  }

  debug(msg: string, obj?: object) {
    this.logger.debug(obj || {}, msg);
  }

  info(msg: string, obj?: object) {
    this.logger.info(obj || {}, msg);
  }

  warn(msg: string, obj?: object) {
    this.logger.warn(obj || {}, msg);
  }

  error(msg: string, obj?: object) {
    this.logger.error(obj || {}, msg);
  }

  fatal(msg: string, obj?: object) {
    this.logger.fatal(obj || {}, msg);
  }
}
