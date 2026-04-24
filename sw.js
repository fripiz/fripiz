const CACHE_NAME = 'fripiz-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/auth.html',
  '/annonce.html',
  '/messages.html',
  '/profil.html',
  '/favoris.html',
  '/transactions.html',
  '/cgu.html'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response
      return fetch(event.request).catch(() => {
        return caches.match('/index.html')
      })
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
})