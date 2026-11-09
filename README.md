# CampusReuse

CampusReuse adalah website berbagi barang layak pakai antar mahasiswa Institut Teknologi Tangerang Selatan. Barang yang sudah tidak terpakai dapat didonasikan kepada teman kampus yang membutuhkan.

Aplikasi ini merupakan **demo frontend statis** berbasis HTML, CSS, dan JavaScript, tanpa backend atau database.

## Fitur

- Melihat katalog dan detail barang tanpa login.
- Mencari barang serta memfilter kategori dan kondisi.
- Login menggunakan dua akun demo.
- Memasang donasi dengan foto, kategori, kondisi, dan deskripsi barang.
- Menyimpan barang dan mengajukan permintaan setelah login.
- Memantau donasi dan riwayat permintaan masing-masing akun.
- Memilih penerima dan menandai barang sudah diserahkan.
- Mengubah profil sementara dan berganti akun melalui logout/login.

## Download

### Menggunakan Git

```bash
git clone https://github.com/bilaldzakwan27/CampusReuse.git
cd CampusReuse
```

### Tanpa Git

1. Buka [repository CampusReuse](https://github.com/bilaldzakwan27/CampusReuse).
2. Klik **Code → Download ZIP**.
3. Ekstrak ZIP, lalu buka folder hasil ekstrak.

## Menjalankan Website

Jalankan melalui **server lokal**, bukan membuka `index.html` langsung dengan `file://`. Navigasi website menggunakan `fetch` untuk memuat halaman tanpa menghapus data sementara.

### Pilihan 1: Python

Pastikan Python 3 sudah terpasang. Buka terminal di folder project, kemudian jalankan:

```bash
python3 -m http.server 8000
```

Pada Windows, dapat menggunakan:

```powershell
py -m http.server 8000
```

Buka **http://localhost:8000** di browser. Untuk menghentikan server, tekan `Ctrl + C` di terminal.

Jika port 8000 sudah digunakan, ganti dengan port lain, misalnya:

```bash
python3 -m http.server 8001
```

Kemudian buka **http://localhost:8001**.

### Pilihan 2: VS Code Live Server

1. Buka folder project di Visual Studio Code.
2. Pasang ekstensi **Live Server**.
3. Klik kanan `index.html` → **Open with Live Server**.

Tidak perlu menjalankan `npm install` atau proses build.

## Akun Demo

Popup login akan muncul saat pengunjung mengakses aktivitas yang membutuhkan akun.

| Akun | Email | Password |
| --- | --- | --- |
| Pemberi | `pemberi@student.itts.ac.id` | `demo123` |
| Penerima | `penerima@student.itts.ac.id` | `demo123` |

Barang contoh di katalog dimiliki mahasiswa lain, bukan kedua akun demo. Donasi dan riwayat permintaan akun demo pada awal sesi masih kosong.

## Cara Menggunakan

### Melihat dan Meminta Barang

1. Jelajahi katalog, atau gunakan pencarian dan filter.
2. Buka detail barang, kemudian klik **Saya Butuh**.
3. Login menggunakan akun demo jika diminta.
4. Konfirmasi pengajuan, lalu pantau statusnya melalui halaman **Permintaan**.

### Mencoba Alur Lengkap Antar Akun

1. Login sebagai **pemberi**.
2. Buka **Donasi Saya → Tambah barang**.
3. Unggah foto dan lengkapi informasi barang, kemudian publikasikan.
4. Logout melalui halaman akun, lalu login sebagai **penerima**.
5. Cari barang yang baru dipublikasikan di katalog dan ajukan permintaan.
6. Logout, lalu login kembali sebagai **pemberi**.
7. Buka **Donasi Saya → Kelola permintaan**, kemudian pilih penerima.
8. Setelah simulasi serah terima, klik **Tandai sudah diserahkan**.
9. Login kembali sebagai penerima untuk melihat status permintaan menjadi **Selesai**.

Lakukan pengujian dalam **tab yang sama** dan pindah halaman melalui navigasi website. Untuk menguji persetujuan menggunakan dua akun demo, gunakan barang yang baru dipasang akun pemberi; pemilik barang contoh tidak tersedia sebagai akun login demo.

## Data Sementara dan Batasan

- Semua perubahan hanya disimpan di memori JavaScript pada tab yang sedang digunakan.
- Navigasi melalui website dan logout/login tidak menghapus data selama sesi tersebut.
- **Refresh, menutup tab, atau membuka ulang website akan menghapus login dan seluruh perubahan.** Katalog kembali ke barang contoh awal.
- Tab berbeda memiliki data sementara masing-masing dan tidak saling tersinkronisasi.
- Tidak menggunakan database, `localStorage`, atau `sessionStorage` untuk menyimpan perubahan.
- Login dan kontak merupakan simulasi frontend, bukan autentikasi aman atau sistem pengiriman pesan sungguhan. Jangan memasukkan data pribadi sensitif.

## Struktur Project

```text
CampusReuse/
├── assets/
│   ├── images/          Foto barang contoh
│   └── PHOTO-CREDITS.md Kredit dan lisensi foto
├── css/                 Stylesheet halaman dan komponen sesi
├── js/                  Logika halaman dan data sementara
├── index.html           Katalog barang
├── detail.html          Detail barang
├── konfirmasi.html      Konfirmasi permintaan
├── donasi.html          Donasi milik akun aktif
├── tambah.html          Form publikasi donasi
├── kelola.html          Pemilihan penerima dan serah terima
├── permintaan.html      Riwayat permintaan akun aktif
├── akun.html            Profil dan logout
├── DESIGN.md            Panduan desain antarmuka
└── README.md
```

## Kredit Foto

Foto katalog digunakan sebagai ilustrasi barang demo. Sumber, pembuat, dan lisensi masing-masing foto tersedia di [assets/PHOTO-CREDITS.md](assets/PHOTO-CREDITS.md).
