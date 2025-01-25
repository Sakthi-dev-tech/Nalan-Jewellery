import localFont from 'next/font/local'

// Define the local font
export const NunitoSans = localFont({
  src: [{
    path: '../fonts/NunitoSans.ttf',
    style: 'normal'
  }],
  variable: '--font-nunito-sans', // For Tailwind CSS
  display: 'swap',
})

export const Parisienne = localFont({
  src: [{
    path: '../fonts/Parisienne.ttf',
    style: 'normal'
  }],
  variable: '--font-parisienne', // For Tailwind CSS
  display: 'swap',
})