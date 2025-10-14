# PWA Starter (Demo)

Project termasuk:
- index.html
- app.js (handles install prompt, notifications, update)
- service-worker.js (simple cache + offline fallback)
- manifest.json
- icons/*.svg
- style.css

Cara menjalankan lokal:
1. Jalankan server lokal (bisa `npx http-server` atau `python -m http.server 8000`)
2. Buka http://localhost:8000
3. Buka DevTools → Application untuk cek manifest & Service Worker
4. Untuk installable app, buka lewat HTTPS (or localhost)

Deploy ke GitHub Pages:
- Buat repo baru, push seluruh folder, lalu aktifkan GitHub Pages di branch `main` atau `gh-pages`.

Catatan:
- Ini starter minimal untuk testing. Tambahkan icons PNG jika butuh dukungan luas.
