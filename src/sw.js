const CACHE_NAME = 'v1_cache_app_weather_fitness',
    urlsToCache = [
        './',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
        './assets/css/style.css',
        './assets/js/index.js',
        './assets/img/ProgramadorFitness.png',
        './assets/img/favicon.png'
    ];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Falló registro de cache', err))
    );
});

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            .then(() => self.clients.claim())
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res;
                }
                return fetch(e.request);
            })
    )
});