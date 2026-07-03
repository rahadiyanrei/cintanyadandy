# Undangan Pernikahan Dandy & Intan

Website undangan pernikahan digital yang elegan dan modern, dibuat dengan HTML5, CSS3, dan Vanilla JavaScript.

## 📋 Fitur

- **Opening Cover** - Tampilan pembuka dengan nama tamu dari URL parameter
- **Hero Section** - Tampilan utama dengan nama mempelai dan ayat Quran
- **Countdown Timer** - Hitung mundur menuju hari pernikahan (2 Agustus 2026)
- **Profil Mempelai** - Informasi groom (Barista) dan bride (Pilates Instructor)
- **Love Story Timeline** - Timeline kisah cinta dengan animasi
- **Gallery** - Galeri foto dengan lightbox dan swipe support untuk mobile
- **Wedding Event** - Informasi Akad dan Resepsi dengan tombol Google Maps
- **RSVP Form** - Konfirmasi kehadiran dengan validasi frontend
- **Pesan & Doa** - Tampilan ucapan dari tamu dengan waktu relatif
- **Wedding Gift** - QRIS dan informasi transfer bank dengan fitur copy
- **Background Music** - Musik latar dengan kontrol play/pause
- **Responsive Design** - Mobile-first, optimal untuk semua device
- **Smooth Animations** - Fade, slide, zoom, parallax dengan Intersection Observer
- **Accessibility** - Mendukung prefers-reduced-motion

## 🎨 Desain

**Tema:** Navy Blue & Gold
- Elegan, Romantis, Modern, Premium
- Inspirasi: Fine dining, Luxury hotel, Elegant invitation card

## 🚀 Cara Menggunakan

### 1. Upload ke Hosting

Upload semua file ke folder `public_html` atau folder website Anda di cPanel:

```
/
├── index.html
├── css/
│   ├── style.css
│   ├── animation.css
│   └── responsive.css
├── js/
│   ├── script.js
│   ├── countdown.js
│   ├── gallery.js
│   ├── guest.js
│   ├── music.js
│   └── animation.js
├── images/
│   ├── hero/
│   ├── gallery/
│   ├── icons/
│   └── qris.png
└── audio/
    └── wedding.mp3
```

### 2. Tambahkan Asset

**Gambar:**
- Tambahkan 6 foto pre-wedding ke folder `images/gallery/` dengan nama:
  - `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`, `photo6.jpg`
- Tambahkan gambar QRIS ke `images/qris.png`
- (Opsional) Tambahkan gambar hero ke `images/hero/`

**Audio:**
- Tambahkan file musik latar ke `audio/wedding.mp3`

### 3. Akses Website

Buka website Anda dengan parameter nama tamu:

```
https://yourdomain.com/index.html?to=Bapak%20Budi
```

atau

```
https://yourdomain.com/?to=Ibu%20Siti
```

## 🔧 Kustomisasi

### Mengubah Nama Tamu Default

Edit di `index.html`:
```html
<h1 class="guest-name" id="guestName">Tamu Undangan</h1>
```

### Mengubah Tanggal Pernikahan

Edit di `js/countdown.js`:
```javascript
const weddingDate = new Date('August 2, 2026 08:00:00').getTime();
```

Edit juga di `index.html` pada bagian:
- Hero section
- Countdown section title
- Event cards (Akad & Resepsi)
- Footer

### Mengubah Informasi Mempelai

Edit di `index.html` pada section `couple-section`.

### Mengubah Lokasi Acara

Edit link Google Maps di `index.html`:
```html
<a href="https://maps.google.com/?q=Masjid+Agung+Al-Ikhlas" ...>
```

### Mengubah Nomor Rekening

Edit di `index.html` pada section `gift-section`:
```html
<p class="bank-account">1234567890</p>
<button class="btn-copy" data-account="1234567890">
```

### Mengubah Pesan & Doa Sample

Edit di `index.html` pada section `wishes-section`.

## 📱 Kompatibilitas

- ✅ Chrome/Edge (terbaru)
- ✅ Firefox (terbaru)
- ✅ Safari (terbaru)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Shared hosting (cPanel)
- ✅ Tanpa Node.js, npm, atau build process

## ⚡ Performa

- Lazy loading untuk gambar galeri
- Debounce/throttle untuk scroll events
- Intersection Observer untuk animasi
- CSS-only animations untuk performa optimal
- Minimal JavaScript dependencies

## ♿ Aksesibilitas

- Semantic HTML5
- ARIA labels untuk button
- Focus states yang jelas
- Mendukung keyboard navigation
- Prefers-reduced-motion support
- Skip link untuk screen readers

## 📄 Lisensi

Free to use untuk keperluan pribadi dan komersial.

---

**Dibuat dengan ❤️ untuk Dandy & Intan**
**Tanggal Pernikahan: 2 Agustus 2026**
