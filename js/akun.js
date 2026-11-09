(function() {
      'use strict';
      const btnLogout = document.getElementById('btnLogoutTrigger');
      const modal = document.getElementById('logoutModal');
      const btnCancel = document.getElementById('btnCancelLogout');
      const btnConfirm = document.getElementById('btnConfirmLogout');

      btnLogout.addEventListener('click', function() {
        modal.classList.add('dialog-scrim--visible');
      });

      btnCancel.addEventListener('click', function() {
        modal.classList.remove('dialog-scrim--visible');
      });

      btnConfirm.addEventListener('click', function() {
        CampusReuse.user = null;
        modal.classList.remove('dialog-scrim--visible');
        CampusReuse.navigate('index.html');
      });

      modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('dialog-scrim--visible');
      });
    })();

    (function() {
      'use strict';
      const STORAGE_KEY = 'campusreuse-account';
      const form = document.getElementById('profileForm');
      if (!form) return;

      const defaults = {
        fullName: 'Ahmad Fauzan',
        email: 'ahmad.fauzan@student.itts.ac.id',
        nim: '2024001234',
        major: 'Teknik Informatika',
        year: '2024',
        phone: ''
      };

      const fieldNames = Object.keys(defaults);
      const displayName = document.getElementById('profileDisplayName');
      const displayMeta = document.getElementById('profileDisplayMeta');
      const profileAvatar = document.getElementById('profileAvatar');
      const statusEl = document.getElementById('formStatus');
      const resetBtn = document.getElementById('btnResetProfile');
      let statusTimer = null;

      function loadSaved() {
        try {
          const raw = CampusReuse.profile;
          return raw ? JSON.parse(raw) : {};
        } catch (error) {
          return {};
        }
      }

      function currentData() {
        return Object.assign({}, defaults, CampusReuse.user || {}, loadSaved());
      }

      function initialsOf(name) {
        const parts = String(name).trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return 'AF';
        return parts.slice(0, 2).map(function(part) {
          return part.charAt(0);
        }).join('').toUpperCase();
      }

      function renderSummary(data) {
        displayName.textContent = data.fullName;
        displayMeta.textContent = 'NIM ' + data.nim + ' • ' + data.major;
        const initials = initialsOf(data.fullName);
        profileAvatar.textContent = initials;
        document.querySelectorAll('.user-avatar-circle').forEach(function(el) {
          el.textContent = initials;
        });
      }

      function setError(name, message) {
        const field = form.elements[name];
        const errorEl = document.getElementById(name + 'Error');
        if (!field || !errorEl) return;
        errorEl.textContent = message || '';
        errorEl.classList.toggle('profile-error--visible', Boolean(message));
        if (message) {
          field.setAttribute('aria-invalid', 'true');
          field.setAttribute('aria-describedby', name + 'Error');
        } else {
          field.removeAttribute('aria-invalid');
          field.removeAttribute('aria-describedby');
        }
      }

      function clearError(name) {
        setError(name, '');
      }

      function fillForm(data) {
        fieldNames.forEach(function(name) {
          const field = form.elements[name];
          if (field && data[name] !== undefined) field.value = data[name];
          clearError(name);
        });
        renderSummary(data);
      }

      const validators = {
        fullName: function(value) {
          return value.trim().length >= 3 ? '' : 'Nama lengkap minimal 3 karakter.';
        },
        email: function(value) {
          const email = value.trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Masukkan alamat email yang valid.';
          if (!/@student\.itts\.ac\.id$/i.test(email)) return 'Gunakan email kampus @student.itts.ac.id.';
          return '';
        },
        nim: function(value) {
          return /^\d{8,12}$/.test(value.trim()) ? '' : 'NIM berisi 8–12 angka.';
        },
        major: function(value) {
          return value ? '' : 'Pilih program studi.';
        },
        year: function(value) {
          return value ? '' : 'Pilih angkatan.';
        },
        phone: function(value) {
          const digits = value.replace(/[\s\-().]/g, '');
          if (!digits) return '';
          return /^(\+?62|0)8\d{7,12}$/.test(digits) ? '' : 'Nomor WhatsApp tidak valid. Contoh: 0812 3456 7890.';
        }
      };

      function showStatus(message, isSuccess) {
        if (statusTimer) window.clearTimeout(statusTimer);
        statusEl.textContent = message || '';
        statusEl.classList.toggle('form-status--visible', Boolean(message) && !isSuccess);
        statusEl.classList.toggle('form-status--success', Boolean(message) && Boolean(isSuccess));
        if (message) {
          statusTimer = window.setTimeout(function() {
            statusEl.textContent = '';
            statusEl.classList.remove('form-status--visible', 'form-status--success');
          }, 4000);
        }
      }

      fieldNames.forEach(function(name) {
        const field = form.elements[name];
        if (!field) return;
        field.addEventListener('input', function() { clearError(name); });
        field.addEventListener('change', function() { clearError(name); });
      });

      form.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = {};
        let firstInvalid = null;

        fieldNames.forEach(function(name) {
          const field = form.elements[name];
          const value = field.value.trim();
          data[name] = value;
          const message = validators[name](value);
          setError(name, message);
          if (message && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
          showStatus('Periksa kembali data yang ditandai.', false);
          firstInvalid.focus();
          return;
        }

        try {
          CampusReuse.profile = JSON.stringify(data);
        } catch (error) {
          
        }

        renderSummary(data);
        showStatus('Perubahan berhasil disimpan.', true);
      });

      resetBtn.addEventListener('click', function() {
        fillForm(currentData());
        showStatus('Perubahan dibatalkan.', false);
      });

      fillForm(currentData());
    })();
