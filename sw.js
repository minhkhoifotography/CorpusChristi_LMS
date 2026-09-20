const CACHE_NAME = 'corpus-lms-v45';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './Logo_TNTT_HIV.jpg'
];

// Cài đặt và đưa các file quan trọng vào bộ nhớ đệm
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Chặn kết nối mạng để ưu tiên tải dữ liệu từ bộ nhớ đệm (Tăng tốc độ x3 lần)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Nếu có trong cache thì trả về ngay, không thì tải từ internet
            return response || fetch(event.request);
        })
    );
});
