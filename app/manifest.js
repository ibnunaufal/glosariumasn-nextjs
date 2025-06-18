export default function manifest() {
    return {
      name: 'GlosariumASN',
      short_name: 'GlosariumASN',
      description: 'GlosariumASN is a platform for searching definitions.',
      start_url: '/',
      display: 'standalone',
      background_color: '#FFF4E0',
      theme_color: '#FFF4E0',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  }