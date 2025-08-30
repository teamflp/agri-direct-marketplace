import pino from 'pino';

const isDevelopment = import.meta.env.DEV;

const logger = pino({
  level: isDevelopment ? 'trace' : 'info',
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  browser: {
    asObject: true,
  },
});

export default logger;
