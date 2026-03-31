# Panduan Deploy Shared Hosting (Hostinger)

Aplikasi Undangan Sangkolo dirancang ringan namun memerlukan perhatian khusus saat dideploy ke shared hosting (bukan VPS).

## Persiapan Lokal (Build)
Pastikan seluruh aset frontend sudah dibaik-baik:
```bash
npm run build
```
Pastikan folder `public/build` sudah terisi manifest dan aset terkompresi.

## Langkah Upload (File Manager)
1. **Pindahkan Konten**: Pindahkan seluruh file (termasuk folder `app`, `config`, `database`, `vendor`, dll) ke folder utama hosting (misal: `/home/user/public_html/sangkolo_core`).
2. **Setup Folder Public**: Pindahkan isi folder `public` lokal ke folder `public_html` hosting ATAU buat simbolik link dari `public_html` ke folder `public` inti aplikasi.
3. **Edit index.php**: Sesuaikan *path* bootstrap dan vendor di `public_html/index.php` jika Anda memisahkannya.

## Environment & Database
1. Buat database di hPanel Hostinger.
2. Edit `.env` di hosting:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://undangan-sangkolo.com
   
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=db_sangkolo
   DB_USERNAME=user_sangkolo
   DB_PASSWORD=xxxxxx
   
   SESSION_DRIVER=file
   CACHE_STORE=file
   ```

## Finalisasi (Via Terminal hosting/SSH)
```bash
php artisan migrate --force
php artisan optimize
php artisan storage:link
```

## Hal yang Perlu Dihindari di Shared Hosting
- **Redis & Queues**: Gunakan driver `database` atau `sync` agar tidak bergantung pada daemon eksternal.
- **Websockets**: Gunakan polling reguler jika perlu *update* otomatis.
- **Heavy Processing**: Hindari manipulasi gambar massal di controller; biarkan browser yang menangani.
- **Symlinks**: Jika Hostinger membatasi symlink, pindahkan folder uploads secara fisik atau gunakan trik `Route::get('/storage/...')` jika terpaksa.

---
**Catatan Keamanan**: Pastikan file `.env` tidak bisa diakses langsung melalui browser dengan konfigurasi `.htaccess` yang tepat.
