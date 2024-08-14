
# Kitabxana İdarəetmə Sistemi

## Layihə Haqqında
Bu layihə **React** və **Express** istifadə edərək hazırlanmış sadə, lakin funksionallı kitabxana idarəetmə sistemidir. Tətbiq istifadəçilərə kitabları axtarmaq, filtrləmək və idarə etmək imkanı verir, həmçinin istifadəçi autentifikasiyası, rol əsaslı giriş və admin paneli kimi xüsusiyyətlər təklif edir.

## Frontend Texnologiyaları
- **React.js**: Əsas frontend kitabxanası.
- **React Router DOM**: Səhifələr arasında yönləndirmə üçün.
- **Context API**: Global state idarəetməsi üçün.
- **Axios**: Backend API-ləri ilə əlaqə qurmaq üçün.
- **CSS/Sass (SCSS)**: Stil yazmaq üçün.
- **Bootstrap və ya Tailwind CSS**: Sürətli UI inkişafı üçün əlavə CSS framework-ləri.

## Backend Texnologiyaları
- **Node.js**: Server mühiti.
- **Express.js**: Backend üçün web framework.
- **MongoDB**: Verilənlər bazası.
- **Mongoose**: MongoDB üçün ORM.
- **JWT (JSON Web Token)**: İstifadəçi autentifikasiyası və səlahiyyətlər üçün.
- **bcrypt**: Şifrələrin hash edilməsi üçün.
- **CORS**: Cross-Origin Resource Sharing ilə bağlı sorğuların idarə edilməsi üçün middleware.

## Layihə Strukturunun Təşkili

### Frontend Struktur
- **components/**: Tətbiqin əsas komponentləri.
- **pages/**: Hər bir səhifə üçün ayrılmış komponentlər.
- **context/**: Context API-nin konfiqurasiya və istifadəsi.
- **services/**: API sorğuları və verilənlər bazası əlaqəsi.
- **styles/**: Global və komponent səviyyəsində stillər.

### Backend Struktur
- **models/**: Mongoose modelləri və verilənlər bazası strukturları.
- **routes/**: API yolları və kontrollerlər.
- **controllers/**: API sorğularının emalı.
- **middlewares/**: Orta qat funksiyaları, məsələn, autentifikasiya və səlahiyyətlər.
- **config/**: Verilənlər bazası və server konfiqurasiyaları.
- **utils/**: Yardımçı funksiyalar və alətlər.

## Əsas Funksiyalar
- **Kitabların Axtarışı və Filtrlənməsi**: Başlıq, müəllif və janr kimi kriteriyalara görə axtarış funksionallığı.
- **Kitab Qiymətləndirməsi və Şərhlər**: İstifadəçilər kitabları qiymətləndirə və şərh yaza bilər.
- **İstifadəçi Qeydiyyatı və Giriş**: Yeni istifadəçilər qeydiyyatdan keçə və sisteme daxil ola bilər.
- **Rol Əsaslı Giriş İcazələri**: Admin və adi istifadəçilər üçün fərqli icazələr.
- **Admin Paneli**: İstifadəçilərin və kitabların idarə olunması üçün panel.

## Layihəni İşlətmək
1. Repozitoriyanı klonlayın.
2. `npm install` ilə asılılıqları quraşdırın.
3. MongoDB bağlantısı və JWT üçün mühit dəyişənlərini qurun.
4. Backend serverini `npm run dev` ilə işə salın.
5. Frontend tətbiqini `npm run start` ilə başladın.

## Gələcək Təkmilləşdirmələr
- Kitablar siyahısı üçün səhifələmə əlavə edin.
- Əlavə təhlükəsizlik tədbirləri həyata keçirin.
- Admin panelini daha çox xüsusiyyətlə genişləndirin.

