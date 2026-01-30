import pino from 'pino';

export interface AppLogger {
  debug(message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
  child(context: Record<string, unknown>): AppLogger;
}

function createChildLogger(pinoInstance: pino.Logger): AppLogger {
  return {
    debug: (msg, meta) => pinoInstance.debug(meta, msg),
    info: (msg, meta) => pinoInstance.info(meta, msg),
    warn: (msg, meta) => pinoInstance.warn(meta, msg),
    error: (msg, meta) => pinoInstance.error(meta, msg),
    child: (ctx) => createChildLogger(pinoInstance.child(ctx)),
  };
}

export function createLogger(): AppLogger {
  const logLevel = process.env.LOG_LEVEL || 'info';
  const isDevelopment = process.env.NODE_ENV === 'development';

  const base = pino({
    level: logLevel,
    ...(isDevelopment && {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
    }),
  });

  return createChildLogger(base);
}

export const logger = createLogger();