import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';

export const MyPreset = definePreset({
  semantic: {
    colorScheme: {
      light: {
        root: {
          '-tooltip-background': '#f9f9fb',
          '-tooltip-color': '#001533',
          '-surface-e': '#ffffff',
          '-text-color': '#001533',
          '-multiselect-background': '',
          '-multiselect-border-color': '',
        },

        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      dark: {
        root: {
          '-tooltip-background': '#363c43',
          '-tooltip-color': '#fff',
          '-surface-e': '#2a323d',
          '-text-color': '#fff',
        },

        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
    },
  },
});
