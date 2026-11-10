# Tugas React JS Lanjutan – Routing & Service Otorisasi Berbasis Peran (RBAC)

Aplikasi antarmuka pengguna (**Frontend**) berbasis **React JS (React 19)**, **React Router v7**, **Tailwind CSS v4**, dan **Context API** yang mengimplementasikan sistem routing terlindungi (*Protected Route*) serta otorisasi berbasis peran (*Role-Based Access Control*) antara pengguna biasa (**user**) dan administrator (**admin**).

Proyek ini terintegrasi dan selaras dengan backend **Laravel Booksales API** (`routes/api.php`, model `User`, `AuthController`, middleware `['auth.api', 'admin']`).

---

## 🎯 Pemenuhan Ketentuan Tugas

| No | Ketentuan Tugas | Implementasi di Proyek | Status |
|---|---|---|---|
| 1 | **Logika Hak Akses User vs Admin** | Service otorisasi (`authService.js`), `AuthContext`, dan `ProtectedRoute` memverifikasi token dan `user.role` (`user` vs `admin`). | ✅ Terpenuhi |
| 2 | **Membatasi Akses ke Halaman Tertentu** | • Dashboard Admin (`/admin`): Hanya untuk role **admin**.<br>• Halaman Profil (`/profile`) & Transaksi (`/transactions`): Terbuka untuk semua user terotentikasi (**user** & **admin**).<br>• Beranda (`/`): Terbuka untuk publik / semua orang. | ✅ Terpenuhi |
| 3 | **Tools: React Router, Context API, LocalStorage** | • **React Router v7**: `BrowserRouter`, `Routes`, `Route`, `Navigate`, `Outlet`, `useLocation`.<br>• **Context API**: `AuthContext` & `useAuth()` untuk state autentikasi global.<br>• **localStorage**: Menyimpan sesi token (`booksales_auth`) dan database mock user. | ✅ Terpenuhi |
| 4 | **Kode Tertata Rapi & Modular** | Pemisahan arsitektur yang bersih ke dalam folder `components/routes/`, `context/`, `services/`, `pages/`, `layout/`, dan `components/common/`. | ✅ Terpenuhi |
| 5 | **Halaman 403 (Akses Ditolak) & 404** | Disediakan halaman khusus `UnauthorizedPage` (403 Forbidden) saat user biasa mencoba mengakses halaman admin, serta halaman `NotFoundPage` (404). | ✅ Terpenuhi |

---

## 🔐 Matriks Hak Akses Route (Role-Based Access Control)

| Path Route | Jenis Route | Akses Publik / Tamu | Akses User Biasa (`user`) | Akses Administrator (`admin`) | Perilaku Jika Tidak Memiliki Izin |
|---|---|:---:|:---:|:---:|---|
| `/` | Publik | ✅ Ya | ✅ Ya | ✅ Ya | Semua pengunjung dapat melihat Beranda |
| `/login` & `/register` | Guest Route | ✅ Ya | ❌ Dialihkan | ❌ Dialihkan | Sudah login dialihkan ke `/profile` atau `/admin` |
| `/profile` | Protected Route | ❌ Wajib Login | ✅ Ya | ✅ Ya | Belum login dialihkan ke `/login` |
| `/transactions` | Protected Route | ❌ Wajib Login | ✅ Ya | ✅ Ya | Belum login dialihkan ke `/login` |
| `/admin` | Role Guarded (`admin`) | ❌ Wajib Login | ❌ Ditolak (403) | ✅ Ya | User biasa diarahkan ke `/unauthorized` (403) |
| `/unauthorized` | Error Page (403) | ✅ Ya | ✅ Ya | ✅ Ya | Penjelasan hak akses & tombol ganti akun |
| `*` | Fallback (404) | ✅ Ya | ✅ Ya | ✅ Ya | Halaman 404 Not Found |

---

## 📁 Struktur Direktori Proyek

```text
frontend/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                         # Entry point aplikasi React
    ├── App.jsx                          # Router utama, hierarki Route & Guard
    ├── index.css                        # Styling Tailwind CSS
    │
    ├── context/
    │   └── AuthContext.jsx              # React Context API untuk autentikasi & peran global
    │
    ├── services/
    │   └── authService.js               # Service login, register, token, dan sinkronisasi API/Storage
    │
    ├── components/
    │   ├── routes/
    │   │   ├── ProtectedRoute.jsx       # Guard komponen: cek login & verifikasi role ('admin'/'user')
    │   │   └── GuestRoute.jsx           # Guard komponen: mencegah akses ganda ke login/register
    │   ├── layout/
    │   │   ├── Navbar.jsx               # Navigasi dinamis menyesuaikan role aktif
    │   │   ├── Footer.jsx               # Footer informasi status keamanan
    │   │   └── MainLayout.jsx           # Wrapper layout konsisten & glassmorphism
    │   ├── auth/
    │   │   ├── RegisterCard.jsx         # Form registrasi dengan pilihan role
    │   │   ├── PasswordStrengthMeter.jsx
    │   │   ├── SuccessModal.jsx
    │   │   └── RegisteredUsersModal.jsx
    │   └── common/
    │       ├── InputField.jsx
    │       ├── Button.jsx
    │       └── Alert.jsx
    │
    └── pages/
        ├── HomePage.jsx                 # Beranda publik & rangkuman hak akses
        ├── LoginPage.jsx                # Halaman login dengan 1-klik akun demo
        ├── RegisterPage.jsx             # Halaman registrasi akun baru
        ├── ProfilePage.jsx              # Profil pribadi (diakses semua user login)
        ├── AdminDashboardPage.jsx       # Dashboard khusus peran Administrator
        ├── UserTransactionsPage.jsx     # Transaksi pembelian khusus customer
        ├── UnauthorizedPage.jsx         # Halaman 403 Forbidden jika role tidak sesuai
        └── NotFoundPage.jsx             # Halaman 404 Route Not Found
```

---

## 🔑 Akun Demo Siap Pakai (Untuk Evaluasi Cepat)

Tersedia tombol **1-Klik Isi Kredensial** pada halaman Login atau akun default berikut:

| Peran (Role) | Email | Kata Sandi | Hak Akses Utama |
|---|---|---|---|
| **Administrator** | `admin@booksales.com` | `password123` | Akses penuh ke `/admin`, `/profile`, `/transactions`, kelola katalog |
| **User Biasa** | `user@booksales.com` | `password123` | Akses ke `/profile`, `/transactions`, katalog. Akses `/admin` **diblokir (403)** |

> **Fitur Tambahan Evaluator:** Pada navbar atas tersedia tombol **"Simulasi Role"**, yang memungkinkan dosen atau penguji mengganti peran secara instan antara Admin dan User tanpa perlu logout berulang kali untuk menguji respon router.

---

## 🚀 Cara Menjalankan Frontend

```bash
# 1. Masuk ke direktori frontend
cd frontend

# 2. Install dependensi (jika belum)
npm install

# 3. Jalankan server pengembangan Vite
npm run dev
```

Server lokal akan berjalan di `http://localhost:5173/`.
