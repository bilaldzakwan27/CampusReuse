(function () {
  'use strict';
  if (window.CampusReuse) return;
  const accounts = [
    { id: 'pemberi', fullName: 'Ahmad Fauzan', email: 'pemberi@student.itts.ac.id', password: 'demo123', nim: '2024001234', major: 'Teknik Informatika', year: '2024', phone: '081234567890' },
    { id: 'penerima', fullName: 'Dina Maharani', email: 'penerima@student.itts.ac.id', password: 'demo123', nim: '2024005678', major: 'Teknik Elektro', year: '2024', phone: '081298765432' }
  ];
  const protectedPages = ['akun', 'donasi', 'permintaan', 'tambah', 'kelola', 'konfirmasi'];
  const members = accounts.concat([
    { id: 'rizky', fullName: 'Rizky Pratama', major: 'Teknik Informatika', email: 'rizky@student.itts.ac.id', phone: '' },
    { id: 'siti', fullName: 'Siti Nurhaliza', major: 'Teknik Kimia', email: 'siti@student.itts.ac.id', phone: '' },
    { id: 'budi', fullName: 'Budi Santoso', major: 'Teknik Elektro', email: 'budi@student.itts.ac.id', phone: '' },
    { id: 'rina', fullName: 'Rina Wati', major: 'Sistem Informasi', email: 'rina@student.itts.ac.id', phone: '' }
  ]);
  const memberOf = id => members.find(member => member.id === id);
  const nameOf = url => new URL(url, location.href).pathname.split('/').pop().replace('.html', '') || 'index';
  const el = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const app = window.CampusReuse = {
    items: [], requests: [], saved: new Map(), user: null, selected: null, pending: null,
    get profile() { return app.user ? JSON.stringify(app.user) : null; },
    set profile(value) { if (app.user) Object.assign(app.user, JSON.parse(value)); },
    async navigate(path, push = true) {
      if (protectedPages.includes(nameOf(path)) && !app.user) return app.login(() => app.navigate(path, push));
      if (nameOf(path) === 'konfirmasi' && app.selected?.owner === app.user?.id) path = 'kelola.html';
      if (app.loading) return;
      app.loading = true;
      try {
        await app.ready;
        const url = new URL(path, location.href);
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const page = new DOMParser().parseFromString(await response.text(), 'text/html');
        const scriptURL = page.querySelector('[data-page-script]')?.getAttribute('src');
        const next = page.querySelector('link[href^="css/"]').cloneNode(true);
        await new Promise((resolve, reject) => { next.onload = resolve; next.onerror = reject; document.head.append(next); });
        document.querySelectorAll('link[href^="css/"]:not([data-session-style])').forEach(link => { if (link !== next) link.remove(); });
        document.head.append(document.querySelector('[data-session-style]'));
        if (push) history.pushState(null, '', url);
        document.title = page.title;
        document.body.replaceWith(page.body);
        document.querySelectorAll('script').forEach(script => script.remove());
        app.render();
        if (scriptURL && ['index', 'tambah', 'akun'].includes(nameOf(url))) {
          const script = document.createElement('script'); script.src = scriptURL; document.body.append(script);
        }
        window.scrollTo(0, 0);
      } catch { alert('Halaman gagal dimuat. Gunakan server lokal dan coba lagi.'); }
      finally { app.loading = false; }
    },
    login(action) {
      if (document.getElementById('demoLogin')) return;
      app.pending = action;
      const dialog = el('dialog', 'demo-login'); dialog.id = 'demoLogin';
      const title = el('h2', '', 'Masuk ke CampusReuse');
      title.id = 'loginTitle'; dialog.setAttribute('aria-labelledby', title.id);
      const description = el('p', '', 'Masuk untuk memasang barang, menyimpan, atau mengajukan permintaan.');
      const demo = el('div', 'demo-credentials');
      demo.append(el('strong', '', 'Akun demo'), el('p', '', 'Pemberi: pemberi@student.itts.ac.id'), el('p', '', 'Penerima: penerima@student.itts.ac.id'), el('p', '', 'Password keduanya: demo123'), el('p', '', 'Login dan perubahan hanya sementara. Refresh mengembalikan data awal.'));
      const form = el('form');
      const emailLabel = el('label', '', 'Email'); const email = el('input'); email.type = 'email'; email.required = true; email.autocomplete = 'username'; emailLabel.append(email);
      const passwordLabel = el('label', '', 'Password'); const password = el('input'); password.type = 'password'; password.required = true; password.autocomplete = 'current-password'; passwordLabel.append(password);
      const error = el('p', 'login-error'); error.setAttribute('role', 'alert');
      const submit = el('button', 'demo-primary', 'Masuk'); submit.type = 'submit';
      const cancel = el('button', '', 'Batal'); cancel.type = 'button'; cancel.onclick = () => dialog.close();
      form.append(emailLabel, passwordLabel, error, submit, cancel);
      form.onsubmit = event => {
        event.preventDefault();
        const user = accounts.find(account => account.email === email.value.trim().toLowerCase() && account.password === password.value);
        if (!user) { error.textContent = 'Email atau password salah.'; return; }
        app.user = user;
        document.querySelectorAll('.user-avatar-circle').forEach(node => { node.textContent = user.fullName.split(' ').map(word => word[0]).join(''); });
        dialog.close();
        const pending = app.pending; app.pending = null;
        if (pending) pending(); else app.navigate('index.html');
      };
      dialog.append(title, description, demo, form);
      dialog.addEventListener('close', () => dialog.remove());
      document.body.append(dialog); dialog.showModal();
    },
    require(action) { if (!app.user) app.login(action); else action(); },
    addDonation() {
      if (!app.user) return;
      const value = id => document.getElementById(id).value.trim();
      app.items.push({ id: 'donasi-' + Date.now(), owner: app.user.id, name: value('itemName'), category: value('itemCategory'), condition: value('itemCondition'), image: document.getElementById('previewImg').src, description: value('itemDesc'), functionality: value('itemFunction'), defects: value('itemDefects'), status: 'Tersedia' });
    },
    request() {
      const item = app.selected;
      if (!app.user || !item) return;
      if (item.owner === app.user.id) return alert('Kamu tidak dapat meminta barang sendiri.');
      if (item.status !== 'Tersedia') return alert('Barang ini tidak tersedia.');
      if (app.requests.some(request => request.item === item.id && request.user === app.user.id)) return alert('Kamu sudah mengajukan permintaan barang ini.');
      app.requests.push({ id: Date.now(), item: item.id, user: app.user.id, status: 'Menunggu' });
      app.navigate('permintaan.html');
    },
    button(label, action, variant = 'secondary') { const button = el('button', 'session-button session-button--' + variant, label); button.type = 'button'; button.onclick = action; return button; },
    render() {
      const page = nameOf(location.href);
      document.body.dataset.page = page;
      const text = (selector, value) => document.querySelectorAll(selector).forEach(node => { node.textContent = value; });
      document.querySelectorAll('.user-avatar-circle').forEach(node => { node.textContent = app.user ? app.user.fullName.split(' ').map(word => word[0]).join('') : 'Masuk'; });
      text('.legal-band > div:last-child', 'Berbagi barang, memperpanjang manfaat.');
      if (page === 'index') {
        const grid = document.getElementById('itemsGrid');
        const template = grid.querySelector('.property-card').cloneNode(true); grid.replaceChildren();
        app.items.forEach(item => {
          const card = template.cloneNode(true); card.dataset.id = item.id; card.dataset.name = item.name; card.dataset.category = item.category; card.dataset.condition = item.condition;
          card.querySelector('.property-card__title').textContent = item.name;
          card.querySelector('.property-card__subtitle').textContent = memberOf(item.owner).fullName + ' • ' + memberOf(item.owner).major;
          card.querySelector('.property-card__condition').textContent = 'Kondisi: ' + item.condition + ' • ' + item.status;
          card.querySelectorAll('a[href="detail.html"]').forEach(link => { link.href = 'detail.html?id=' + encodeURIComponent(item.id); });
          const image = card.querySelector('img'); image.src = item.image; image.alt = item.name;
          const heart = card.querySelector('.heart-btn'); heart.removeAttribute('onclick'); heart.classList.toggle('is-saved', app.saved.get(app.user?.id)?.has(item.id) || false);
          grid.append(card);
        });
      }
      if (['detail', 'konfirmasi'].includes(page)) {
        const requestedId = new URL(location.href).searchParams.get('id');
        const item = app.items.find(item => item.id === requestedId) || app.selected || app.items[0]; app.selected = item;
        if (!item) return;
        text('.listing-headline__title, .summary-card__title, .mobile-sticky-bar__title', item.name);
        text('.summary-card__cat', item.category + ' • Kondisi: ' + item.condition);
        const owner = memberOf(item.owner);
        text('.host-card__name, .summary-card__donor', 'Pemberi: ' + owner.fullName);
        text('.host-card__avatar', owner.fullName.split(' ').map(word => word[0]).join(''));
        text('.host-card__meta', owner.major + ' • Institut Teknologi Tangerang Selatan');
        text('.meta-location', 'Institut Teknologi Tangerang Selatan');
        text('.section-text', 'Koordinasikan lokasi dan waktu serah terima di area kampus setelah permintaan disetujui.');
        text('.meta-status span:last-child, .mobile-sticky-bar__status', item.status);
        text('.reservation-card__status-line', 'Status: ' + item.status);
        const availability = document.querySelector('.reservation-card__cell-val');
        if (availability) availability.textContent = item.status === 'Tersedia' ? 'Siap untuk Diajukan' : 'Tidak tersedia untuk permintaan baru';
        text('.listing-headline__meta > span:last-child', item.category);
        text('.description-block p', item.description || 'Barang donasi mahasiswa untuk menunjang kegiatan perkuliahan.');
        document.querySelectorAll('.amenity-row__title').forEach((node, i) => { node.textContent = ['Kondisi: ' + item.condition, 'Fungsi: ' + (item.functionality || 'Siap digunakan'), 'Kekurangan: ' + (item.defects || 'Konfirmasikan dengan pemberi')][i]; });
        text('.amenity-row__desc', '');
        document.querySelectorAll('.listing-photo-frame img, .summary-card__img').forEach(image => { image.src = item.image; image.alt = item.name; });
        const photoFrame = document.querySelector('.listing-photo-frame');
        if (photoFrame && item.id.startsWith('contoh-')) {
          const credit = el('p', 'session-photo-credit', 'Foto ilustrasi barang · ');
          const link = el('a', '', 'Kredit foto'); link.href = 'assets/PHOTO-CREDITS.md'; link.target = '_blank'; link.rel = 'noopener'; credit.append(link); photoFrame.after(credit);
        }
        document.title = item.name + ' - CampusReuse';
        document.querySelectorAll('a[href="konfirmasi.html"]').forEach(link => {
          if (app.user?.id === item.owner) {
            link.href = 'kelola.html'; link.textContent = 'Kelola Barang Saya';
          } else if (item.status !== 'Tersedia') {
            link.removeAttribute('href'); link.textContent = item.status; link.setAttribute('aria-disabled', 'true');
          }
        });
        document.querySelectorAll('.listing-action-btn').forEach((button, i) => {
          button.removeAttribute('onclick');
          button.onclick = () => i ? app.toggleSaved(item.id, button) : navigator.clipboard.writeText(location.href).then(() => { button.textContent = 'Tautan disalin'; }).catch(() => window.prompt('Salin tautan:', location.href));
        });
        const confirm = document.getElementById('btnConfirm'); if (confirm) confirm.onclick = () => app.request();
      }
      if (['donasi', 'permintaan', 'kelola'].includes(page)) app.renderPrivate(page);
      if (page === 'akun' && app.user) {
        text('.account-card__desc', 'Kelola aktivitas akunmu selama sesi ini.');
        const notice = el('p', 'session-empty', 'Sesi demo sementara. Logout untuk berganti akun. Refresh akan menghapus login dan seluruh perubahan.');
        document.querySelector('main').prepend(notice);
      }
    },
    toggleSaved(id, button) {
      app.require(() => {
        if (!app.saved.has(app.user.id)) app.saved.set(app.user.id, new Set());
        const saved = app.saved.get(app.user.id); saved.has(id) ? saved.delete(id) : saved.add(id);
        button.classList.toggle('is-saved', saved.has(id)); button.setAttribute('aria-pressed', saved.has(id));
        if (button.classList.contains('listing-action-btn')) button.textContent = saved.has(id) ? 'Tersimpan' : 'Simpan';
      });
    },
    renderPrivate(page) {
      const main = document.querySelector('main'); main.replaceChildren();
      main.classList.add('session-workspace');
      main.append(app.button(page === 'kelola' ? '← Donasi saya' : '← Kembali ke katalog', () => app.navigate(page === 'kelola' ? 'donasi.html' : 'index.html'), 'text'));
      const heading = el('header', 'session-heading'); const intro = el('div');
      intro.append(el('p', 'session-eyebrow', 'RUANG BERBAGI KAMU'), el('h1', '', page === 'donasi' ? 'Donasi saya' : page === 'permintaan' ? 'Permintaan saya' : 'Kelola permintaan'), el('p', 'session-description', page === 'donasi' ? 'Barang yang tak lagi terpakai bisa jadi berarti untuk teman kampus.' : page === 'permintaan' ? 'Pantau pengajuanmu dan temukan kabar terbaru dari pemberi.' : 'Pilih penerima dan koordinasikan serah terima dengan nyaman.'));
      heading.append(intro);
      if (page === 'donasi') heading.append(app.button('+ Tambah barang', () => app.navigate('tambah.html'), 'primary'));
      main.append(heading);
      const list = el('div', 'session-list');
      const ownItems = app.items.filter(item => item.owner === app.user.id);
      const ownRequests = app.requests.filter(request => request.user === app.user.id);
      if (page !== 'kelola') {
        const metrics = el('div', 'session-metrics');
        const values = page === 'donasi' ? [['Barang dibagikan', ownItems.length], ['Permintaan masuk', app.requests.filter(request => ownItems.some(item => item.id === request.item)).length], ['Berhasil diberikan', ownItems.filter(item => item.status === 'Sudah Diberikan').length]] : [['Total pengajuan', ownRequests.length], ['Menunggu kabar', ownRequests.filter(request => request.status === 'Menunggu').length], ['Disetujui & selesai', ownRequests.filter(request => ['Disetujui', 'Selesai'].includes(request.status)).length]];
        values.forEach(([label, value]) => { const metric = el('div', 'session-metric'); metric.append(el('span', '', label), el('strong', '', String(value))); metrics.append(metric); });
        main.append(metrics);
        const tabs = el('div', 'session-tabs'); tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', 'Filter status');
        const filters = page === 'donasi' ? ['Semua', 'Tersedia', 'Dipesan', 'Sudah Diberikan'] : ['Semua', 'Menunggu', 'Disetujui', 'Selesai', 'Tidak Terpilih'];
        filters.forEach((label, i) => {
          const tab = app.button(label, () => {
            tabs.querySelectorAll('button').forEach(button => { button.classList.toggle('is-active', button === tab); button.setAttribute('aria-pressed', button === tab); });
            list.querySelectorAll('[data-status]').forEach(card => { card.hidden = label !== 'Semua' && card.dataset.status !== label; });
            const none = !Array.from(list.querySelectorAll('[data-status]')).some(card => !card.hidden);
            let empty = list.querySelector('.session-filter-empty');
            if (none && list.querySelector('[data-status]') && !empty) { empty = el('p', 'session-filter-empty', 'Belum ada aktivitas dengan status ini.'); list.append(empty); }
            if (empty) empty.hidden = !none;
          }, 'tab');
          tab.classList.toggle('is-active', i === 0); tab.setAttribute('aria-pressed', i === 0); tabs.append(tab);
        });
        main.append(tabs);
      }
      main.append(list);
      if (page === 'donasi') {
        ownItems.forEach(item => {
          const card = app.itemCard(item, item.status);
          const count = app.requests.filter(request => request.item === item.id).length;
          card.querySelector('.session-card__body').append(el('p', 'session-card__note', count + ' mahasiswa mengajukan permintaan'));
          const actions = el('div', 'session-card__actions'); actions.append(app.button('Kelola permintaan →', () => { app.selected = item; app.navigate('kelola.html'); })); card.append(actions); list.append(card);
        });
      } else if (page === 'permintaan') {
        ownRequests.forEach(request => {
          const item = app.items.find(item => item.id === request.item); const card = app.itemCard(item, request.status);
          card.querySelector('.session-card__body').append(el('p', 'session-card__note', 'Pemberi: ' + memberOf(item.owner).fullName));
          const actions = el('div', 'session-card__actions');
          actions.append(app.button('Lihat detail →', () => { app.selected = item; app.navigate('detail.html?id=' + item.id); }));
          if (request.status === 'Disetujui') actions.append(app.button('Kontak pemberi', () => { const owner = memberOf(item.owner); alert(owner.fullName + '\nEmail: ' + owner.email + '\nWhatsApp: ' + (owner.phone || 'Belum diisi')); }));
          card.append(actions);
          list.append(card);
        });
      } else {
        const item = app.selected;
        if (!item || item.owner !== app.user.id) { list.append(app.emptyState('Pilih barang terlebih dahulu', 'Buka Donasi Saya untuk mengelola barang yang kamu pasang.', 'Lihat donasi saya', () => app.navigate('donasi.html'))); return; }
        const layout = el('div', 'session-manage-layout'); const summary = el('aside', 'session-summary'); const recipients = el('section', 'session-recipients');
        summary.append(app.itemCard(item, item.status));
        const steps = el('ol', 'session-steps');
        ['Barang dipublikasikan', 'Penerima dipilih', 'Barang diserahkan'].forEach((label, index) => { const step = el('li', '', label); step.classList.toggle('is-complete', index === 0 || (index === 1 && item.status !== 'Tersedia') || (index === 2 && item.status === 'Sudah Diberikan')); steps.append(step); });
        summary.append(steps); layout.append(summary, recipients); list.append(layout);
        const incoming = app.requests.filter(request => request.item === item.id);
        recipients.append(el('h2', 'session-section-title', 'Permintaan masuk (' + incoming.length + ')'));
        app.requests.filter(request => request.item === item.id).forEach(request => {
          const card = el('article', 'session-recipient');
          const user = accounts.find(account => account.id === request.user);
          const identity = el('div', 'session-recipient__identity'); const avatar = el('span', 'session-avatar', user.fullName.split(' ').map(word => word[0]).join(''));
          const bio = el('div'); bio.append(el('h3', '', user.fullName), el('p', 'session-card__meta', user.major)); identity.append(avatar, bio);
          card.append(identity, el('span', 'session-status', request.status));
          if (item.status === 'Tersedia' && request.status === 'Menunggu') card.append(app.button('Pilih Penerima', () => {
            app.requests.filter(other => other.item === item.id).forEach(other => { other.status = other === request ? 'Disetujui' : 'Tidak Terpilih'; });
            item.status = 'Dipesan'; app.renderPrivate(page);
          }));
          if (request.status === 'Disetujui') {
            card.append(el('p', '', 'Kontak penerima: ' + user.email + ' • ' + (user.phone || 'Nomor belum diisi')));
            card.append(app.button('Tandai sudah diserahkan', () => { if (confirm('Barang sudah diserahkan ke penerima?')) { item.status = 'Sudah Diberikan'; request.status = 'Selesai'; app.renderPrivate(page); } }, 'primary'));
          }
          recipients.append(card);
        });
        if (!incoming.length) recipients.append(app.emptyState('Menunggu teman yang membutuhkan', 'Barangmu sudah tampil di katalog. Permintaan mahasiswa akan muncul di sini.'));
      }
      if (!list.children.length) list.append(page === 'donasi' ? app.emptyState('Mulai berbagi dari satu barang', 'Belum ada donasi darimu. Unggah barang layak pakai dan bantu teman kampus yang membutuhkannya.', 'Bagikan barang pertama', () => app.navigate('tambah.html')) : app.emptyState('Temukan yang kamu butuhkan', 'Belum ada pengajuan. Jelajahi barang dari teman kampus dan ajukan permintaan dari halaman detail.', 'Jelajahi barang', () => app.navigate('index.html')));
    },
    emptyState(title, description, label, action) {
      const empty = el('div', 'session-empty-state');
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); icon.setAttribute('viewBox', '0 0 48 48'); icon.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('d', 'M8 15 24 6l16 9v19l-16 9L8 34V15Zm0 0 16 9 16-9M24 24v19M16 10l16 9v8'); icon.append(path);
      empty.append(icon, el('h2', '', title), el('p', '', description));
      if (label) empty.append(app.button(label, action, 'primary')); return empty;
    },
    itemCard(item, status) {
      const card = el('article', 'session-card'); const image = el('img'); image.src = item.image; image.alt = item.name;
      card.dataset.status = status;
      const body = el('div', 'session-card__body');
      body.append(el('span', 'session-card__category', item.category), el('h2', '', item.name), el('p', 'session-card__meta', 'Kondisi: ' + item.condition), el('span', 'session-status', status));
      card.append(image, body); return card;
    }
  };
  const style = document.createElement('link'); style.rel = 'stylesheet'; style.href = 'css/session.css'; style.setAttribute('data-session-style', ''); document.head.append(style);
  app.ready = (async () => {
    const response = await fetch('index.html'); if (!response.ok) throw new Error('Katalog gagal dimuat');
    const page = new DOMParser().parseFromString(await response.text(), 'text/html');
    const owners = ['rizky', 'siti', 'budi', 'budi', 'rina', 'rizky', 'rina', 'budi'];
    page.querySelectorAll('.property-card').forEach((card, i) => app.items.push({ id: 'contoh-' + i, owner: owners[i % owners.length], name: card.dataset.name, category: card.dataset.category, condition: card.dataset.condition, image: card.querySelector('img').src, status: 'Tersedia' }));
  })();
  document.addEventListener('click', event => {
    const heart = event.target.closest('.heart-btn');
    if (heart) { event.preventDefault(); app.toggleSaved(heart.closest('.property-card').dataset.id, heart); return; }
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href); if (url.origin !== location.origin || !url.pathname.endsWith('.html') || url.hash) return;
    const card = link.closest('.property-card'); if (card) app.selected = app.items.find(item => item.id === card.dataset.id);
    event.preventDefault();
    app.navigate(url.href);
  });
  window.addEventListener('popstate', () => app.navigate(location.href, false));
  app.ready.then(() => {
    if (protectedPages.includes(nameOf(location.href))) {
      document.querySelector('main')?.replaceChildren(el('p', 'session-empty', 'Silakan login untuk mengakses halaman ini.'));
      app.login(() => app.navigate(location.href, false));
    } else {
      app.render();
      if (nameOf(location.href) === 'index') {
        const script = document.createElement('script'); script.src = 'js/index.js'; document.body.append(script);
      }
    }
  }).catch(() => alert('Katalog gagal dimuat. Jalankan website menggunakan server lokal.'));
})();
