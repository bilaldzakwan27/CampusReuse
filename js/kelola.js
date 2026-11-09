(function() {
      'use strict';
      const btnDina = document.getElementById('btnSelectDina');
      const btnRizky = document.getElementById('btnSelectRizky');
      const cardDina = document.getElementById('cardDina');
      const cardRizky = document.getElementById('cardRizky');
      const actionPanel = document.getElementById('actionPanel');
      const selectedName = document.getElementById('selectedRecipientName');
      const statusLabel = document.getElementById('currentStatusLabel');
      const step2 = document.getElementById('step2');
      const step3 = document.getElementById('step3');
      const btnHandover = document.getElementById('btnMarkHandover');

      function selectRecipient(name, cardToSelect, otherCard, btnToSelect, otherBtn) {
        cardToSelect.classList.add('is-selected');
        otherCard.classList.remove('is-selected');
        btnToSelect.classList.add('selected');
        btnToSelect.textContent = 'Penerima Terpilih ✓';
        otherBtn.classList.remove('selected');
        otherBtn.textContent = 'Pilih Penerima';

        selectedName.textContent = name;
        actionPanel.style.display = 'flex';
        statusLabel.textContent = 'Dipesan';
        step2.classList.add('is-active');
      }

      btnDina.addEventListener('click', function() {
        selectRecipient('Dina Maharani (Teknik Elektro)', cardDina, cardRizky, btnDina, btnRizky);
      });

      btnRizky.addEventListener('click', function() {
        selectRecipient('Rizky Pratama (Teknik Informatika)', cardRizky, cardDina, btnRizky, btnDina);
      });

      btnHandover.addEventListener('click', function() {
        statusLabel.textContent = 'Sudah Diberikan';
        step3.classList.add('is-active');
        CampusReuse.complete();
        CampusReuse.navigate('donasi.html');
      });
    })();
