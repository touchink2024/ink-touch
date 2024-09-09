import https from 'https';
import cron from 'node-cron';

const url = 'https://ink-touch.onrender.com/auth/login';

function keepAlive(url) {
  https.get(url, (res) => {}).on('error', (error) => {});
}

cron.schedule('*/5 * * * *', () => {
  keepAlive(url);
});

export { keepAlive };
