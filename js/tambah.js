(function() {
      'use strict';
      const fileInput = document.getElementById('itemPhotoInput');
      const dropBox = document.getElementById('dropBox');
      const previewBox = document.getElementById('previewBox');
      const previewImg = document.getElementById('previewImg');
      const btnRemovePreview = document.getElementById('btnRemovePreview');
      const photoError = document.getElementById('photoError');

      const form = document.getElementById('addDonationForm');
      const itemName = document.getElementById('itemName');
      const itemCategory = document.getElementById('itemCategory');
      const itemCondition = document.getElementById('itemCondition');
      const nameError = document.getElementById('nameError');
      const categoryError = document.getElementById('categoryError');
      const conditionError = document.getElementById('conditionError');

      let hasPhoto = false;

      fileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          reader.onload = function(event) {
            previewImg.src = event.target.result;
            previewBox.style.display = 'block';
            dropBox.style.display = 'none';
            hasPhoto = true;
            photoError.style.display = 'none';
          };
          reader.readAsDataURL(this.files[0]);
        }
      });

      btnRemovePreview.addEventListener('click', function() {
        fileInput.value = '';
        previewImg.src = '';
        previewBox.style.display = 'none';
        dropBox.style.display = 'block';
        hasPhoto = false;
      });

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        if (!hasPhoto && !fileInput.files.length) {
          photoError.style.display = 'block';
          valid = false;
        } else {
          photoError.style.display = 'none';
        }

        if (!itemName.value.trim()) {
          nameError.style.display = 'block';
          valid = false;
        } else {
          nameError.style.display = 'none';
        }

        if (!itemCategory.value) {
          categoryError.style.display = 'block';
          valid = false;
        } else {
          categoryError.style.display = 'none';
        }

        if (!itemCondition.value) {
          conditionError.style.display = 'block';
          valid = false;
        } else {
          conditionError.style.display = 'none';
        }

        if (valid) {
          CampusReuse.addDonation();
          CampusReuse.navigate('donasi.html');
        }
      });
    })();
