(function() {
      'use strict';
      const btn = document.getElementById('btnConfirm');
      btn.addEventListener('click', function() {
        CampusReuse.request();
        CampusReuse.navigate('permintaan.html');
      });
    })();
