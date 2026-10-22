import localFont from 'next/font/local'

/** Switzer (Fontshare) — display / headings */
export const switzer = localFont({
  src: [
    {
      path: '../fonts/switzer/Switzer-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/switzer/Switzer-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/switzer/Switzer-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-switzer',
  display: 'swap',
})

/**
 * Host Grotesk (Google Fonts). Not in next/font/google for Next 14 — self-hosted
 * woff2 with next/font/local for the same swap + metrics behavior.
 */
export const hostGrotesk = localFont({
  src: [
    {
      path: '../fonts/host-grotesk/HostGrotesk-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/host-grotesk/HostGrotesk-500.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-grotesk',
  display: 'swap',
})

export const siteFontVariables = `${switzer.variable} ${hostGrotesk.variable}`
