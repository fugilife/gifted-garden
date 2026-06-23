/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: '#E8F4F0',
        soil: '#8B5E3C',
        leaf: '#4A7C59',
        sun: '#F5C842',
        orange: '#F07B2A',
        apple: '#D94F3D',
        cream: '#FDF8F0',
        bark: '#5C3D1E',
        nest: {
          bark: '#8B6343',
          straw: '#E8C870',
        },
        egg: '#B8D4E8',
        chick: {
          yellow: '#F5C842',
          beak: '#E07B39',
        },
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
        display: ['Nunito', 'Noto Sans TC', 'sans-serif'],
      },
      keyframes: {
        plantFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        growBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        moneyPop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.3)', color: '#F5C842' },
          '100%': { transform: 'scale(1)' },
        },
        moneyDrop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(0.85)', color: '#D94F3D' },
          '100%': { transform: 'scale(1)' },
        },
        nestDrop: {
          '0%': { transform: 'translateY(-40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        birdFeed: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-15deg) translateY(5px)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-15deg) translateY(5px)' },
        },
        birdFlap: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        birdFly: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(80px)' },
          '100%': { transform: 'translateX(0)' },
        },
        birdSing: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.1)' },
        },
        musicNote: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '100%': { transform: 'translateY(-30px) translateX(10px)', opacity: '0' },
        },
        hop: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-15px) scaleY(1.1)' },
        },
        lookAround: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
        dig: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px) scaleY(0.9)' },
        },
        swingIn: {
          '0%': { transform: 'translateX(100%) rotate(20deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
        },
        swingOut: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-100%) rotate(-20deg)', opacity: '0' },
        },
        celebrationParticle: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(var(--tx), var(--ty)) scale(0)', opacity: '0' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        leafSway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        branchSway: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(1px) rotate(0.5deg)' },
          '75%': { transform: 'translateX(-1px) rotate(-0.5deg)' },
        },
        fruitBob: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-2px) rotate(1deg)' },
        },
      },
      animation: {
        plantFloat: 'plantFloat 3s ease-in-out infinite',
        growBounce: 'growBounce 800ms ease-out',
        moneyPop: 'moneyPop 600ms ease-out',
        moneyDrop: 'moneyDrop 600ms ease-out',
        nestDrop: 'nestDrop 800ms ease-out',
        birdFeed: 'birdFeed 1.5s ease-in-out infinite',
        birdFlap: 'birdFlap 0.3s ease-in-out infinite',
        birdFly: 'birdFly 6s ease-in-out infinite',
        birdSing: 'birdSing 1s ease-in-out',
        musicNote: 'musicNote 1s ease-out forwards',
        hop: 'hop 0.8s ease-in-out',
        lookAround: 'lookAround 3s ease-in-out infinite',
        dig: 'dig 1.5s ease-in-out',
        swingIn: 'swingIn 0.8s ease-out',
        swingOut: 'swingOut 0.8s ease-in',
        celebrationParticle: 'celebrationParticle 2s ease-out forwards',
        slideDown: 'slideDown 300ms ease-out',
        slideIn: 'slideIn 600ms ease-out',
        leafSway: 'leafSway 4s ease-in-out infinite',
        branchSway: 'branchSway 6s ease-in-out infinite',
        fruitBob: 'fruitBob 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
