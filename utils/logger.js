import pino from 'pino';
import dayjs from 'dayjs';

const isProduction = process.env.NODE_ENV === 'production';

export const log = pino({
  ...(isProduction
    ? {} // No transport in production for lightweight JSON logging
    : {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: { colorize: true },
            },
          ],
        },
      }),
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
