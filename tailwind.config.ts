
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Extended vibrant color palette
				vibrant: {
					blue: {
						DEFAULT: '#4F46E5', // indigo-600
						50: '#EEF2FF',
						100: '#E0E7FF',
						200: '#C7D2FE',
						300: '#A5B4FC',
						400: '#818CF8',
						500: '#6366F1',
						600: '#4F46E5',
						700: '#4338CA',
						800: '#3730A3',
						900: '#312E81',
						950: '#1E1B4B',
					},
					purple: {
						DEFAULT: '#8B5CF6', // violet-600
						50: '#F5F3FF',
						100: '#EDE9FE',
						200: '#DDD6FE',
						300: '#C4B5FD',
						400: '#A78BFA',
						500: '#8B5CF6',
						600: '#7C3AED',
						700: '#6D28D9',
						800: '#5B21B6',
						900: '#4C1D95',
						950: '#2E1065',
					},
					pink: {
						DEFAULT: '#EC4899', // pink-600
						50: '#FDF2F8',
						100: '#FCE7F3',
						200: '#FBCFE8',
						300: '#F9A8D4',
						400: '#F472B6',
						500: '#EC4899',
						600: '#DB2777',
						700: '#BE185D',
						800: '#9D174D',
						900: '#831843',
						950: '#500724',
					},
					cyan: {
						DEFAULT: '#06B6D4', // cyan-600
						50: '#ECFEFF',
						100: '#CFFAFE',
						200: '#A5F3FC',
						300: '#67E8F9',
						400: '#22D3EE',
						500: '#06B6D4',
						600: '#0891B2',
						700: '#0E7490',
						800: '#155E75',
						900: '#164E63',
						950: '#083344',
					},
					teal: {
						DEFAULT: '#14B8A6', // teal-600
						50: '#F0FDFA',
						100: '#CCFBF1',
						200: '#99F6E4',
						300: '#5EEAD4',
						400: '#2DD4BF',
						500: '#14B8A6',
						600: '#0D9488',
						700: '#0F766E',
						800: '#115E59',
						900: '#134E4A',
						950: '#042F2E',
					},
				},
				toolify: {
					50: '#eef5ff',
					100: '#d9e8ff',
					200: '#bbd8ff',
					300: '#8ac1ff',
					400: '#52a1ff',
					500: '#2980fe',
					600: '#1165f4',
					700: '#0b50e2',
					800: '#1043b8',
					900: '#133c91',
					950: '#0f255a'
				},
				purple: {
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
					950: '#2e1065'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': { 
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'morph': {
					'0%, 100%': { 
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' 
					},
					'50%': { 
						borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' 
					}
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'background-shine': {
					'from': { backgroundPosition: '0 0' },
					'to': { backgroundPosition: '-200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 4s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'morph': 'morph 8s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 8s linear infinite',
				'background-shine': 'background-shine 2s linear infinite',
			},
			fontFamily: {
				sans: ['Outfit', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				display: ['Outfit', 'SF Pro Display', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
				'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
				'3d': '0 10px 30px -15px rgba(0, 0, 0, 0.25)',
				'3d-hover': '0 20px 40px -20px rgba(0, 0, 0, 0.3)',
				'colorful': '0 8px 32px -5px rgba(79, 70, 229, 0.2)'
			},
			backgroundImage: {
				'hero-pattern': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.1)), url("/hero-bg.svg")',
				'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
				'shine': 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.1) 50%, transparent 75%)',
				'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.3) 50%, transparent 75%, transparent 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
