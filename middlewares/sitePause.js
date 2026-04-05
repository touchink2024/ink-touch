// middlewares/sitePause.js

const pausedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Domain Expired</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      background: #0a0a0f;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Lato', sans-serif;
      position: relative; overflow: hidden; padding: 2rem;
    }
    .stars {
      position: fixed; inset: 0;
      background-image:
        radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 80% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
        radial-gradient(1px 1px at 50% 70%, rgba(255,255,255,0.4) 0%, transparent 100%),
        radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.5) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 65% 50%, rgba(255,255,255,0.3) 0%, transparent 100%),
        radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.5) 0%, transparent 100%),
        radial-gradient(1px 1px at 35% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 75% 85%, rgba(255,255,255,0.3) 0%, transparent 100%),
        radial-gradient(1px 1px at 5% 45%, rgba(255,255,255,0.6) 0%, transparent 100%),
        radial-gradient(1px 1px at 55% 25%, rgba(255,255,255,0.4) 0%, transparent 100%);
    }
    .nebula {
      position: fixed; inset: 0;
      background:
        radial-gradient(ellipse 60% 40% at 20% 50%, rgba(80,40,140,0.25) 0%, transparent 70%),
        radial-gradient(ellipse 50% 60% at 80% 30%, rgba(30,80,160,0.2) 0%, transparent 70%),
        radial-gradient(ellipse 70% 50% at 50% 80%, rgba(140,30,60,0.15) 0%, transparent 70%);
    }
    .grid-lines {
      position: fixed; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .card { position: relative; max-width: 560px; width: 100%; text-align: center; z-index: 10; }
    .icon-wrap { width: 90px; height: 90px; margin: 0 auto 2rem; position: relative; }
    .icon-ring {
      position: absolute; inset: 0; border-radius: 50%;
      border: 1.5px solid rgba(200,130,60,0.4);
      animation: pulse-ring 3s ease-in-out infinite;
    }
    .icon-ring-2 {
      position: absolute; inset: -14px; border-radius: 50%;
      border: 1px solid rgba(200,130,60,0.15);
      animation: pulse-ring 3s ease-in-out infinite 0.6s;
    }
    @keyframes pulse-ring {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.04); }
    }
    .icon-inner {
      position: absolute; inset: 0; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, rgba(200,130,60,0.15), rgba(10,10,20,0.8));
      border: 1.5px solid rgba(200,130,60,0.5);
      display: flex; align-items: center; justify-content: center;
    }
    .brand {
      font-family: 'Cinzel', serif; font-size: 11px;
      letter-spacing: 0.35em; color: rgba(200,130,60,0.7);
      text-transform: uppercase; margin-bottom: 1rem;
    }
    .headline {
      font-family: 'Cinzel', serif; font-size: clamp(26px, 5vw, 38px);
      font-weight: 700; color: #e8dcc8; line-height: 1.15;
      margin-bottom: 1rem; letter-spacing: 0.02em;
    }
    .divider {
      width: 60px; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(200,130,60,0.6), transparent);
      margin: 1.5rem auto;
    }
    .body-text {
      font-size: 15px; color: rgba(220,210,195,0.65);
      line-height: 1.75; font-weight: 300; letter-spacing: 0.02em; margin-bottom: 2rem;
    }
    .body-text strong { color: rgba(220,210,195,0.9); font-weight: 400; }
    .badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(200,130,60,0.08);
      border: 1px solid rgba(200,130,60,0.25);
      border-radius: 100px; padding: 8px 20px;
      font-size: 13px; color: rgba(200,130,60,0.85);
      letter-spacing: 0.06em; text-transform: uppercase;
    }
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: rgba(200,130,60,0.8);
      animation: blink 2s ease-in-out infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
    }
    .contact-box {
      margin-top: 2.5rem; padding: 1.25rem 1.5rem;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07); border-radius: 12px;
    }
    .contact-label {
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: rgba(200,210,220,0.35); margin-bottom: 0.6rem;
    }
    .contact-value { font-size: 14px; color: rgba(180,200,230,0.7); font-weight: 300; letter-spacing: 0.03em; }
    .error-code {
      margin-top: 3rem; font-size: 11px; letter-spacing: 0.2em;
      color: rgba(255,255,255,0.12); text-transform: uppercase;
    }
    .fade-in { animation: fadeUp 0.9s ease both; }
    .fade-in-2 { animation: fadeUp 0.9s ease 0.2s both; }
    .fade-in-3 { animation: fadeUp 0.9s ease 0.4s both; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="stars"></div>
  <div class="nebula"></div>
  <div class="grid-lines"></div>
  <div class="card">
    <div class="icon-wrap fade-in">
      <div class="icon-ring-2"></div>
      <div class="icon-ring"></div>
      <div class="icon-inner">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="7" y="16" width="22" height="16" rx="3" stroke="rgba(200,130,60,0.8)" stroke-width="1.5"/>
          <path d="M12 16V11a6 6 0 0 1 12 0v5" stroke="rgba(200,130,60,0.8)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          <circle cx="18" cy="24" r="2.5" fill="rgba(200,130,60,0.7)"/>
          <line x1="18" y1="26.5" x2="18" y2="29" stroke="rgba(200,130,60,0.7)" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div class="brand fade-in-2">Domain Notice</div>
    <h1 class="headline fade-in-2">Domain Expired</h1>
    <div class="divider fade-in-2"></div>
    <p class="body-text fade-in-3">
      The domain associated with this service has <strong>expired</strong> and is no longer active.
      
    </p>
    <div class="fade-in-3">
      <div class="badge"><div class="badge-dot"></div>Service Suspended</div>
    </div>
    <div class="contact-box fade-in-3">
      <div class="contact-label">To restore access</div>
      <div class="contact-value">Please contact your VPS administrator to restore this service.</div>
    </div>
    <div class="error-code fade-in-3">Error 503 &nbsp;·&nbsp; Service Unavailable &nbsp;·&nbsp; Domain Expired</div>
  </div>
</body>
</html>`;

export const sitePause = (req, res, next) => {
  if (process.env.SITE_PAUSED === 'true') {
    return res.status(503).send(pausedHTML);
  }
  next();
};
