import { JSX } from 'solid-js/jsx-runtime';
import '../styles/tailwind.css';
import { ThemeToggle } from '../components/ThemeToggle';

export const RootLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NFTS - Framework Agnostic SSR</title>
        <script
          innerHTML={`
            (function() {
              window.__toggleTheme = () => {
                const isDark = document.documentElement.classList.toggle('dark');
                document.documentElement.classList.remove(isDark ? 'light' : 'dark');
                document.documentElement.classList.add(isDark ? 'dark' : 'light');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
              };
              const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
            })();
          `}
        />
        <style
          innerHTML={`
            #theme-sun { display: block; }
            #theme-moon { display: none; }
            .dark #theme-sun { display: none; }
            .dark #theme-moon { display: block; }
          `}
        />
      </head>
      <body class="min-h-screen font-sans bg-background text-foreground transition-colors duration-300">
        <header class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white dark:bg-background border-b border-slate-200 dark:border-border">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-primary-foreground shadow-lg shadow-primary/20">
              N
            </div>
            <span class="font-bold text-xl tracking-tight">NFTS</span>
          </div>
          <nav class="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
            <a href="#" class="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" class="hover:text-primary transition-colors">
              Docs
            </a>
            <a href="#" class="hover:text-primary transition-colors">
              Github
            </a>
          </nav>
          <div class="flex items-center space-x-4">
            <ThemeToggle />
            <button class="hidden sm:block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </header>
        <main id="main-content" class="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
