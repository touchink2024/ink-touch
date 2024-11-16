import https from 'https';
import cron from 'node-cron';
import { log } from '../utils/index.js';

const url = 'https://inktouch.onrender.com/auth/login';

function keepAlive(url) {
  const request = https.get(url, (res) => {
    log.info(`Status: ${res.statusCode} - ${res.statusMessage}`);
    res.on('data', (chunk) => {
      log.info(`Response data: ${chunk}`);
    });
  });

  // Handle errors
  request.on('error', (error) => {
    log.error(`Error: ${error.message}`);
  });

  // Set a timeout to avoid hanging connections
  request.setTimeout(10000, () => {
    log.error('Request timed out');
    request.abort();
  });
}

cron.schedule('*/10 * * * *', () => {
  keepAlive(url);
  log.info('Pinging the server every 5 minutes');
});

export { keepAlive };
