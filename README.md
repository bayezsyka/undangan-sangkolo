# Undangan Sangkolo - Admin Panel MVP

Sistem manajemen internal untuk jasa undangan digital Sangkolo. Dibangun dengan Laravel 11, Inertia.js (React), dan Tailwind CSS 4.0.

## Fitur Utama
- **Dashboard**: Statistik slot aktif (Max 3), leads, dan ringkasan project.
- **Leads**: Manajemen prospek klien dari berbagai sumber.
- **Projects**: Pengelolaan antrean kerja dengan pembatasan slot aktif otomatis.
- **Templates**: Katalog desain dasar dengan setelan visual default.
- **RSVP & Messages**: Pantau interaksi tamu secara real-time.
- **Public Invitation**: Halaman undangan mobile-first yang ringan dan modular.

## Setup Lokal
1. **Clone & Install**:
   ```bash
   composer install
   npm install
   ```
2. **Environment**:
   Salin `.env.example` ke `.env` dan sesuaikan database.
3. **Database**:
   ```bash
   php artisan key:generate
   php artisan migrate --seed
   ```
4. **Run**:
   ```bash
   php artisan serve
   npm run dev
   ```

## Kredensial Demo
- **URL**: `/login`
- **Email**: `admin@undangan-sangkolo.com`
- **Password**: `password`
