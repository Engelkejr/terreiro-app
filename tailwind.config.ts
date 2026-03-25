import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        terreiro: { 50:'#fdf6ee',100:'#f9e6cc',200:'#f3c88a',300:'#eca94d',400:'#e08d28',500:'#c97018',600:'#a85514',700:'#7f3d13',800:'#5c2c12',900:'#3a1b0b' },
        umbanda: { roxo:'#6b21a8', branco:'#f8f7f4', azul:'#1e3a8a' }
      },
    },
  },
  plugins: [],
}
export default config
