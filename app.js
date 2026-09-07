/* ============================================================
   QE Coin — front-end app logic
   Pure vanilla JS, no build step, no server required.
   Everything here is static/client-side, so it runs fine on
   Vercel's free/hobby plan with zero serverless functions used.

   Structure:
     Loader   -> plays the boot loading screen, then shows Dashboard
     Modals   -> generic open/close + the 3 specific sheets
     Toast    -> tiny helper for "coming soon" style feedback
     Telegram -> stub for wiring into the Telegram WebApp SDK later
   ============================================================ */

/* ---------------- Toast ---------------- */
const Toast = (() => {
  const el = document.getElementById('toast');
  let hideTimer = null;
  function show(msg, ms = 1600) {
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => el.classList.remove('show'), ms);
  }
  return { show };
})();

/* ---------------- Loader ---------------- */
const Loader = (() => {
  const stages = [
    { pct: 12,  text: 'Loading resources' },
    { pct: 30,  text: 'Preparing balloon' },
    { pct: 48,  text: 'Drawing the map' },
    { pct: 65,  text: 'Placing the gems' },
    { pct: 80,  text: 'Connecting to server' },
    { pct: 93,  text: 'Almost ready' },
    { pct: 100, text: 'Adventure starting' },
  ];

  const barFill  = document.getElementById('barFill');
  const barPct   = document.getElementById('barPct');
  const statusEl = document.getElementById('statusText');

  function setProgress(pct, label) {
    barFill.style.width = pct + '%';
    barPct.textContent  = pct + '%';
    statusEl.innerHTML  = label + '<span class="dots"></span>';
  }

  function run(onDone) {
    let idx = 0;
    (function playStage() {
      if (idx >= stages.length) { onDone && onDone(); return; }
      const st = stages[idx];
      setProgress(st.pct, st.text);
      idx++;
      setTimeout(playStage, 550 + Math.random() * 300);
    })();
  }

  /* Call Loader.setProgress(pct, label) yourself instead of Loader.run()
     once you wire this up to real asset/data loading. */
  return { run, setProgress };
})();

/* ---------------- Screen switching ---------------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ---------------- Modals ---------------- */
const Modal = (() => {
  const overlay = document.getElementById('modalOverlay');
  const sheets  = {
    withdraw:  document.getElementById('sheetWithdraw'),
    topscores: document.getElementById('sheetTopScores'),
    ads:       document.getElementById('sheetAds'),
  };

  function open(name) {
    Object.values(sheets).forEach(s => s.classList.remove('active'));
    const target = sheets[name];
    if (!target) return;
    target.classList.add('active');
    overlay.classList.add('active');
  }

  function close() {
    overlay.classList.remove('active');
    Object.values(sheets).forEach(s => s.classList.remove('active'));
  }

  // click outside a sheet closes it
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', close);
  });

  return { open, close };
})();

/* ---------------- Withdraw sheet behavior ---------------- */
(function initWithdraw() {
  const tabBinance   = document.getElementById('tabBinance');
  const tabTonkeeper = document.getElementById('tabTonkeeper');
  const gatewayLabel = document.getElementById('gatewayLabel');
  const gatewayInput = document.getElementById('gatewayInput');
  const amountInput  = document.getElementById('amountInput');
  const maxBtn       = document.getElementById('maxBtn');
  const submitBtn    = document.getElementById('withdrawSubmit');

  function selectGateway(name) {
    const isBinance = name === 'binance';
    tabBinance.classList.toggle('selected', isBinance);
    tabTonkeeper.classList.toggle('selected', !isBinance);
    gatewayLabel.textContent = isBinance ? 'Binance UID' : 'Tonkeeper Address';
    gatewayInput.placeholder = isBinance ? 'Enter your Binance UID' : 'UQ... wallet address';
    gatewayInput.value = '';
  }

  tabBinance.addEventListener('click', () => selectGateway('binance'));
  tabTonkeeper.addEventListener('click', () => selectGateway('tonkeeper'));

  maxBtn.addEventListener('click', () => {
    // TODO: replace 0 with the user's real impression balance from your backend/MongoDB
    const impressionBalance = 0;
    amountInput.value = impressionBalance;
  });

  submitBtn.addEventListener('click', () => {
    if (!submitBtn.classList.contains('enabled')) {
      Toast.show('Not enough impressions yet');
      return;
    }
    // TODO: send { gateway, address, amount } to your backend to process the withdrawal
    Toast.show('Withdrawal request sent');
    Modal.close();
  });
})();

/* ---------------- Top Scores sheet (placeholder data) ---------------- */
(function initTopScores() {
  // Placeholder leaderboard — swap this for real data pulled from Telegram +
  // your backend once the referral/leaderboard system is built.
  const placeholderScores = [
    { rank: 2, name: 'MAHI', distance: '99m',  medal: '🥈' },
    { rank: 1, name: 'RASHU', distance: '530m', medal: '🥇' },
  ];

  const row = document.getElementById('scoreRow');

  function render(list) {
    row.innerHTML = '';
    if (!list.length) {
      row.innerHTML = '<div class="score-empty">No scores yet — be the first to fly!</div>';
      return;
    }
    list.forEach(p => {
      const item = document.createElement('div');
      item.className = 'score-item';
      item.innerHTML = `
        <div class="avatar-ring rank${p.rank}">${p.name[0]}</div>
        <div class="medal">${p.medal}</div>
        <div class="score-name">${p.name}</div>
        <div class="score-dist">${p.distance}</div>
      `;
      row.appendChild(item);
    });
  }

  render(placeholderScores);

  /* Hook point for later:
     fetch('/api/leaderboard').then(r => r.json()).then(render);
  */
})();

/* ---------------- Ads & Earn sheet ---------------- */
(function initAds() {
  document.querySelectorAll('.ads-row').forEach(row => {
    row.addEventListener('click', () => {
      const network = row.dataset.network;
      // TODO: call that network's real ad SDK here, then credit DC on completion
      Toast.show(network + ' ad would play here');
    });
  });
})();

/* ---------------- Dashboard buttons ---------------- */
(function initDashboard() {
  document.getElementById('btnWithdrawPill').addEventListener('click', () => Modal.open('withdraw'));
  document.getElementById('btnWithdrawCard').addEventListener('click', () => Modal.open('withdraw'));
  document.getElementById('btnTopScores').addEventListener('click', () => Modal.open('topscores'));
  document.getElementById('btnAds').addEventListener('click', () => Modal.open('ads'));

  document.getElementById('btnFlyBalloon').addEventListener('click', () => {
    // TODO: launch the actual endless-runner game here
    Toast.show('Game launching soon');
  });

  document.getElementById('btnInvite').addEventListener('click', () => {
    // TODO: build referral link using the Telegram user id once the bot backend exists
    Toast.show('Referral system coming soon');
  });

  document.getElementById('btnMenu').addEventListener('click', () => Toast.show('Menu coming soon'));
  document.getElementById('btnBell').addEventListener('click', () => Toast.show('No notifications yet'));

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.nav;
      if (tab === 'home' || tab === 'game') return; // dashboard already shows this view
      Toast.show(tab[0].toUpperCase() + tab.slice(1) + ' tab coming soon');
    });
  });
})();

/* ---------------- Telegram WebApp SDK stub ----------------
   When you deploy this inside Telegram, load
   https://telegram.org/js/telegram-web-app.js in index.html and then:

     const tg = window.Telegram.WebApp;
     tg.ready();
     tg.expand();
     const telegramUser = tg.initDataUnsafe?.user;
     // use telegramUser.id / first_name for balance, referrals, leaderboard, etc.
------------------------------------------------------------- */

/* ---------------- Boot ---------------- */
Loader.run(() => {
  showScreen('dashboardScreen');
});
