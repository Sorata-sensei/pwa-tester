if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered', reg);

      // listen for updates
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // new update available
              document.getElementById('status').textContent = 'Status: Update available — refresh to activate';
            } else {
              document.getElementById('status').textContent = 'Status: Content cached for offline use';
            }
          }
        });
      });
    } catch (err) {
      console.error('SW register failed', err);
      document.getElementById('status').textContent = 'Status: Service worker registration failed';
    }
  });
}

// Simple UI actions
document.getElementById('btn-update').addEventListener('click', async () => {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    document.getElementById('status').textContent = 'Status: Sent skipWaiting to SW';
  } else {
    document.getElementById('status').textContent = 'Status: No active service worker';
  }
});

document.getElementById('btn-notify').addEventListener('click', async () => {
  if (!('Notification' in window)) {
    alert('Notification API not supported in this browser.');
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    new Notification('PWA Starter', { body: 'This is a test notification from your PWA.' });
  } else {
    alert('Permission not granted: ' + perm);
  }
});

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('btn-install');
  btn.style.display = 'inline-block';
  btn.addEventListener('click', async () => {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    deferredPrompt = null;
    btn.style.display = 'none';
  });
});
