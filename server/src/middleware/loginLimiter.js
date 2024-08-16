const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dəqiqəlik zaman pəncərəsi
  max: 5, // 15 dəqiqə ərzində maksimum 5 giriş cəhdi
  message: 'Çoxlu sayda uğursuz giriş cəhdi. Xahiş edirik, bir müddət sonra yenidən cəhd edin.'
});

module.exports = loginLimiter;