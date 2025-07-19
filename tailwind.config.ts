
import type { Config } from "tailwindcss";



export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
'./layouts/**/*.{js,ts,jsx,tsx,mdx}',
  './node_modules/@skeletonlabs/skeleton/**/*.{js,ts,jsx,tsx,svelte}',

    


  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        rocher: ['Rocher', 'sans-serif'],
      },
       boxShadow: {
        box1: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      },
     
      
    },
  },
  plugins: [
  


  ],
} satisfies Config;
