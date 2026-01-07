export const ThemeToggle = () => {
  return (
    <button
      // @ts-expect-error - Using raw onclick for non-hydrated toggle
      onclick="window.__toggleTheme()"
      class="p-2.5 rounded-xl bg-white dark:bg-white/5 backdrop-blur-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-xl group"
      aria-label="Toggle theme"
    >
      <svg
        id="theme-sun"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 18v1m9-11h1M3 12H2m15.364-6.364l.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728L12 12z"
        />
      </svg>
      <svg
        id="theme-moon"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-indigo-400 group-hover:-rotate-12 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};
