# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# CampusReuse
### Student Item Sharing Platform

| Informasi | Detail |
|---|---|
| Product Name | CampusReuse |
| Document Version | 1.1 |
| Product Type | Responsive Web Application |
| Target Users | Mahasiswa |
| Platform | Web |
| Status | Development Specification |
| Design Reference | DESIGN.md |

---

## 1. Product Overview

### 1.1 Deskripsi Produk

CampusReuse merupakan platform berbasis web yang memfasilitasi mahasiswa untuk mendonasikan dan memperoleh barang layak pakai secara gratis di lingkungan kampus.

Platform ini mempertemukan mahasiswa yang memiliki barang tidak terpakai dengan mahasiswa lain yang membutuhkan barang tersebut.

Kategori barang meliputi:
- Aksesori teknologi.
- Perlengkapan praktikum.
- Peralatan pendukung proyek.
- Perlengkapan kegiatan mahasiswa.
- Barang kebutuhan akademik lainnya.

CampusReuse bukan marketplace jual beli. Tidak terdapat transaksi pembayaran dalam ruang lingkup versi awal.

### 1.2 Problem Statement

Berdasarkan hasil riset kebutuhan pengguna pada PT M2, terdapat dua permasalahan utama:

1. Mahasiswa yang memiliki barang layak pakai mengalami kesulitan menemukan penerima yang membutuhkan sehingga barang berpotensi hanya disimpan dan tidak dimanfaatkan.
2. Mahasiswa yang membutuhkan barang belum selalu memperoleh informasi yang cukup mengenai kondisi, kualitas, fungsi, dan kekurangan barang sebelum mengajukan permintaan.

### 1.3 Product Goals

1. Mempermudah mahasiswa menemukan barang yang tersedia.
2. Memfasilitasi publikasi barang donasi.
3. Menyediakan informasi kondisi barang secara transparan.
4. Mempermudah proses pengajuan permintaan barang.
5. Mempermudah pemberi dalam mengelola permintaan.
6. Menampilkan status barang secara jelas.

### 1.4 Non-Goals

Fitur berikut tidak termasuk dalam versi awal:
- Transaksi jual beli dan pembayaran.
- Pengiriman barang menggunakan kurir.
- Rekomendasi barang berbasis AI.
- Chat real-time.
- Sistem rating dan ulasan.
- Integrasi pembayaran digital.

---

## 2. User & Role Definition

CampusReuse memiliki dua peran utama. Satu akun mahasiswa dapat menjalankan kedua peran tersebut.

### 2.1 Donor (Pemberi Donasi)

Mahasiswa yang ingin memberikan barang layak pakai kepada mahasiswa lain.

Kebutuhan:
- Menambahkan barang donasi.
- Mengunggah foto dan informasi kondisi barang.
- Melihat daftar barang yang telah didonasikan.
- Melihat permintaan dari mahasiswa lain.
- Memilih penerima barang.
- Memperbarui status barang.

### 2.2 Recipient (Penerima Donasi)

Mahasiswa yang ingin memperoleh barang dari mahasiswa lain.

Kebutuhan:
- Mencari barang.
- Memfilter barang berdasarkan kategori.
- Melihat informasi dan kondisi barang.
- Mengajukan permintaan.
- Memantau status permintaan.

---

## 3. Information Architecture & Navigation

### 3.1 Main Navigation

Pola navigasi utama menggunakan **Flat Navigation / Tab Navigation**.

Terdapat empat bagian utama:

1. Beranda
2. Donasi
3. Permintaan
4. Akun

Navigasi ditampilkan melalui bottom navigation pada perangkat mobile dan navigasi yang sesuai pada desktop.

Halaman detail barang, konfirmasi permintaan, dan pengelolaan permintaan merupakan halaman turunan yang diakses melalui alur pengguna.

### 3.2 Sitemap

Beranda / Cari Barang
- Detail Barang
  - Konfirmasi Permintaan

Donasi
- Tambah Barang
- Donasi Saya
  - Kelola Permintaan Donasi

Permintaan Saya

Akun

### 3.3 Navigation Requirements

- Pengguna dapat mengakses empat bagian utama secara langsung.
- Halaman turunan dapat dicapai maksimal tiga klik dari Beranda atau melalui jalan pintas.
- Nama navigasi menggunakan bahasa yang mudah dipahami mahasiswa.
- Navigasi utama harus konsisten pada seluruh halaman.

---

## 4. Functional Requirements

### FR-01 — Publikasi Barang Donasi

Sistem menyediakan formulir untuk menambahkan barang donasi.

Informasi yang diperlukan:
- Foto barang.
- Nama barang.
- Kategori.
- Kondisi barang.
- Fungsi barang.
- Kekurangan atau kerusakan.
- Deskripsi tambahan.

Ketentuan:
- Nama barang wajib diisi.
- Kategori wajib dipilih.
- Kondisi wajib dipilih.
- Foto barang wajib tersedia.
- Barang yang berhasil dipublikasikan memiliki status awal **Tersedia**.

### FR-02 — Pencarian dan Filter Barang

Pengguna dapat:
- Mencari barang berdasarkan nama atau kata kunci.
- Memfilter barang berdasarkan kategori.
- Melihat barang yang masih tersedia.
- Mengakses detail barang dari daftar hasil pencarian.

### FR-03 — Detail Barang

Halaman detail harus menampilkan:
- Foto barang.
- Nama barang.
- Kategori.
- Kondisi.
- Fungsi barang.
- Kekurangan atau kerusakan.
- Deskripsi.
- Status ketersediaan.
- Informasi pemberi.

Jika informasi opsional belum tersedia, sistem menampilkan teks **"Belum diinformasikan"**.

### FR-04 — Pengajuan Permintaan Barang

Pengguna dapat mengajukan permintaan barang melalui tombol **"Saya Butuh"**.

Ketentuan:
- Pengguna harus sudah masuk menggunakan akun.
- Pengguna tidak boleh meminta barang miliknya sendiri.
- Barang harus berstatus Tersedia.
- Pengguna harus mengonfirmasi pengajuan.
- Satu pengguna tidak dapat membuat permintaan ganda untuk barang yang sama.

Setelah berhasil:
- Permintaan tersimpan.
- Status permintaan menjadi **Menunggu**.
- Pengguna dapat melihat permintaan melalui halaman Permintaan Saya.

### FR-05 — Pengelolaan Permintaan Donasi

Pemilik barang dapat:
- Melihat barang yang telah didonasikan.
- Melihat daftar permintaan yang masuk.
- Melihat informasi calon penerima.
- Memilih mahasiswa sebagai penerima.
- Memperbarui status barang.

Alur status barang:

**Tersedia → Dipesan → Sudah Diberikan**

Ketentuan:
- Hanya pemilik barang yang dapat mengelola permintaan.
- Barang yang telah dipesan tidak dapat menerima permintaan baru.
- Status diperbarui berdasarkan tindakan pemilik barang.

### FR-06 — Daftar Permintaan Saya

Pengguna dapat melihat seluruh permintaan yang pernah diajukan.

Informasi yang ditampilkan:
- Foto barang.
- Nama barang.
- Tanggal permintaan.
- Nama pemberi.
- Status permintaan.

Status yang dapat ditampilkan:
- Menunggu.
- Dipesan.
- Sudah Diberikan.

### FR-07 — Akun Pengguna

Halaman akun menampilkan:
- Informasi profil mahasiswa.
- Nama pengguna.
- Informasi akun.
- Pengaturan dasar.
- Tombol keluar.

---

## 5. Page Specification

### PAGE-01 — Beranda / Cari Barang

Tujuan: membantu mahasiswa menemukan barang yang tersedia.

Komponen:
- Header CampusReuse.
- Search bar.
- Filter kategori.
- Daftar barang terbaru.
- Kartu barang.
- Navigasi utama.

Setiap kartu barang menampilkan:
- Foto.
- Nama.
- Kategori.
- Kondisi.
- Status ketersediaan.

Interaksi:
- Search bar menjalankan pencarian.
- Filter kategori memperbarui daftar.
- Klik kartu membuka Detail Barang.

### PAGE-02 — Detail Barang

Tujuan: memberikan informasi lengkap sebelum pengguna meminta barang.

Komponen:
- Tombol kembali.
- Foto barang.
- Nama dan kategori.
- Status barang.
- Informasi kondisi.
- Fungsi dan kekurangan.
- Deskripsi.
- Informasi pemberi.
- Tombol Saya Butuh.

Interaksi:
- Tombol Saya Butuh membuka Konfirmasi Permintaan.
- Jika barang tidak tersedia, tombol permintaan dinonaktifkan.

### PAGE-03 — Konfirmasi Permintaan

Tujuan: memastikan pengguna benar-benar ingin mengajukan permintaan.

Komponen:
- Ringkasan barang.
- Foto barang.
- Nama barang.
- Informasi kondisi.
- Informasi pemberi.
- Tombol konfirmasi.
- Tombol kembali.

Interaksi:
- Konfirmasi menyimpan permintaan.
- Pengguna diarahkan ke Permintaan Saya.
- Sistem menampilkan status Menunggu.

### PAGE-04 — Donasi

Tujuan: menyediakan akses ke aktivitas donasi pengguna.

Komponen:
- Header Donasi.
- Tombol Tambah Barang.
- Daftar barang milik pengguna.
- Informasi status barang.
- Tombol Kelola Permintaan.

Interaksi:
- Tambah Barang membuka formulir donasi.
- Kelola Permintaan membuka halaman pengelolaan barang terkait.

### PAGE-05 — Tambah Barang

Tujuan: memudahkan mahasiswa mempublikasikan barang.

Komponen:
- Upload foto.
- Input nama barang.
- Pilihan kategori.
- Pilihan kondisi.
- Input fungsi barang.
- Input kekurangan.
- Textarea deskripsi.
- Tombol Publikasikan Donasi.

Interaksi:
- Validasi input.
- Preview foto.
- Publikasi barang.
- Redirect ke halaman Donasi setelah berhasil.

### PAGE-06 — Kelola Permintaan Donasi

Tujuan: membantu pemberi mengelola calon penerima barang.

Komponen:
- Informasi barang.
- Foto barang.
- Status barang.
- Daftar permintaan masuk.
- Informasi pemohon.
- Tombol pilih penerima.
- Tombol perbarui status.

Interaksi:
- Pemilik dapat memilih satu penerima.
- Status barang berubah menjadi Dipesan.
- Setelah serah terima, pemilik dapat mengubah status menjadi Sudah Diberikan.

### PAGE-07 — Permintaan Saya

Tujuan: membantu pengguna memantau barang yang diminta.

Komponen:
- Daftar permintaan.
- Foto barang.
- Nama barang.
- Tanggal pengajuan.
- Informasi pemberi.
- Status permintaan.

### PAGE-08 — Akun

Tujuan: menyediakan informasi dan pengaturan akun pengguna.

Komponen:
- Avatar atau foto profil.
- Nama pengguna.
- Informasi akun mahasiswa.
- Pengaturan dasar.
- Tombol keluar.

---

## 6. User Flow

### FLOW-A — Mengajukan Permintaan

Beranda → Detail Barang → Saya Butuh → Konfirmasi Permintaan → Permintaan Saya.

Hasil akhir: permintaan berhasil dibuat dengan status Menunggu.

### FLOW-B — Membuat Donasi

Donasi → Tambah Barang → Mengisi Informasi → Publikasikan Donasi → Donasi Saya.

Hasil akhir: barang berhasil ditambahkan dengan status Tersedia.

### FLOW-C — Mengelola Permintaan

Donasi → Donasi Saya → Kelola Permintaan → Pilih Penerima → Status Dipesan → Serah Terima → Status Sudah Diberikan.

Hasil akhir: barang tercatat telah diberikan kepada penerima.

---

## 7. Design Requirements

### 7.1 Design Source of Truth

Seluruh keputusan visual CampusReuse wajib mengikuti dokumen **DESIGN.md** yang diberikan sebagai referensi desain proyek.

DESIGN.md merupakan sumber utama untuk:
- Color palette.
- Typography.
- Font family.
- Spacing tokens.
- Border dan radius.
- Button styles.
- Input styles.
- Card styles.
- Layout.
- Responsive breakpoints.
- Komponen visual.
- Interaction states.

Tidak diperbolehkan membuat design system alternatif yang bertentangan dengan DESIGN.md.

### 7.2 Design Consistency

- Seluruh halaman menggunakan token desain yang sama.
- Komponen yang memiliki fungsi sama harus memiliki tampilan konsisten.
- Hierarki visual harus menonjolkan informasi barang dan tindakan utama.
- Penggunaan whitespace harus mengikuti skala spacing.
- Tampilan mobile dan desktop harus mengikuti aturan responsif pada DESIGN.md.

### 7.3 Design-to-Figma Compatibility

Struktur halaman harus mudah dipetakan menjadi frame dan komponen Figma.

Persyaratan:
- Setiap halaman memiliki struktur yang jelas.
- Komponen UI dipisahkan berdasarkan fungsi.
- Penamaan komponen dan elemen konsisten.
- Layout menggunakan sistem grid dan alignment yang konsisten.
- Tidak menggunakan elemen visual yang bertentangan dengan DESIGN.md.

---

## 8. Non-Functional Requirements

### NFR-01 — Performance

Target performa:
- LCP ≤ 2,5 detik.
- INP ≤ 200 ms.
- CLS ≤ 0,1.

Target ini perlu diuji setelah implementasi.

### NFR-02 — Accessibility

- Navigasi dapat digunakan dengan keyboard.
- Fokus keyboard terlihat jelas.
- Gambar memiliki alternative text.
- Kontras teks normal minimal 4,5:1.
- Target interaktif memenuhi WCAG 2.2 AA.
- Form memiliki label yang jelas.

### NFR-03 — Responsive Design

Aplikasi mendukung:
- Mobile: 320–767 px.
- Tablet: 768–1023 px.
- Desktop: 1024–1440 px.

Layout harus menyesuaikan ukuran layar dan tidak menimbulkan horizontal scrolling yang tidak diperlukan.

### NFR-04 — Security & Privacy

- Pengguna harus terautentikasi untuk mengajukan permintaan.
- Hanya pemilik barang yang dapat mengelola barang dan permintaannya.
- Pengguna tidak dapat mengubah data barang milik pengguna lain.
- Informasi kontak tidak boleh ditampilkan secara publik tanpa persetujuan.
- Akses tidak sah harus ditolak.

---

## 9. Prototype Requirements

Prototype harus mensimulasikan alur utama CampusReuse.

Interaksi minimum:
1. Navigasi antarhalaman.
2. Pencarian barang.
3. Filter kategori.
4. Membuka detail barang.
5. Mengajukan permintaan.
6. Konfirmasi permintaan.
7. Menambahkan barang donasi.
8. Melihat daftar donasi.
9. Melihat permintaan masuk.
10. Memilih penerima.
11. Memperbarui status barang.
12. Melihat riwayat permintaan.

Prototype harus dapat digunakan untuk pengujian oleh teman sekelas.

---

## 10. Acceptance Criteria

CampusReuse dinyatakan memenuhi kebutuhan versi awal apabila:

- Pengguna dapat melihat daftar barang.
- Pencarian dan filter dapat digunakan.
- Detail barang menampilkan informasi yang diperlukan.
- Pengguna dapat mengajukan permintaan.
- Sistem mencegah permintaan ganda.
- Pengguna dapat menambahkan barang donasi.
- Pemberi dapat melihat permintaan masuk.
- Pemberi dapat memilih penerima.
- Status barang dapat diperbarui sesuai alur.
- Navigasi utama konsisten.
- Halaman responsif.
- Komponen mengikuti DESIGN.md.
- Prototype dapat digunakan untuk menguji tiga skenario utama.

---

## 11. Out of Scope & Future Development

Fitur yang dapat dipertimbangkan untuk pengembangan berikutnya:

- Integrasi database MySQL.
- Autentikasi mahasiswa dan verifikasi kampus.
- Notifikasi permintaan.
- Riwayat donasi.
- Informasi lokasi serah terima.
- Chat antar pengguna.
- Dashboard administrator.
- Moderasi konten dan pelaporan barang.

---

## 12. Reference Documents

1. PT M2 — Riset Kebutuhan Pengguna CampusReuse.
2. PT M4 — Kebutuhan Fungsional dan Non-Fungsional CampusReuse.
3. PT M5 — Arsitektur Layout dan Navigasi.
4. DESIGN.md — Design System dan Visual Guidelines CampusReuse.

---

**END OF DOCUMENT**

CampusReuse PRD v1.1