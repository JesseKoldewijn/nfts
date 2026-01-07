import { defineRoute } from 'nfts';
import { For } from 'solid-js';

export const LandingPage = () => {
  const techStack = [
    {
      name: 'SolidJS',
      version: 'v1.9',
      description:
        'Declarative, efficient, and flexible JavaScript library for building user interfaces.',
    },
    {
      name: 'Nitro',
      version: 'v2.10',
      description:
        'Next-generation server engine for productive and performant web applications.',
    },
    {
      name: 'Vite',
      version: 'v6.0',
      description: "Next generation frontend tooling. It's fast!",
    },
    {
      name: 'Tailwind CSS',
      version: 'v4.0',
      description: 'A utility-first CSS framework packed with classes.',
    },
  ];

  const frameworkFeatures = [
    {
      title: 'Nitro Engine',
      description:
        'Built on top of Nitro, providing cross-platform deployment, smart caching, and an elegant server API.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Universal SSR',
      description:
        'Framework agnostic server-side rendering with zero-flash theme support and optimized asset injection.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
    {
      title: 'Instant HMR',
      description:
        'Development mode with Hot Module Replacement for both your application code and the framework itself.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
    {
      title: 'File Routing',
      description:
        "Automatic routing based on your file system. Just add a file to the routes directory and you're live.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
  ];

  return (
    <div class="relative min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      {/* Dynamic Background */}
      <div class="fixed inset-0 -z-10 bg-background overflow-hidden">
        <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse opacity-50 dark:opacity-20" />
        <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] animate-pulse delay-700 opacity-50 dark:opacity-20" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div class="container mx-auto px-6 py-20 relative">
        {/* Hero Section */}
        <section class="max-w-5xl mx-auto text-center space-y-10 py-12 md:py-24">
          <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-1000">
            <span class="flex h-2 w-2 rounded-full bg-primary animate-ping" />
            <span>NFTS Framework Example App</span>
          </div>

          <h1 class="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            Experience the <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-emerald-500 animate-gradient bg-300%">
              Next-Gen Web.
            </span>
          </h1>

          <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            This is a production-ready example of the{' '}
            <strong>NFTS Framework</strong>. Combining the raw power of Nitro
            with a framework-agnostic core for ultimate flexibility.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
            <button class="w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2">
              Explore the Code
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <div class="w-full sm:w-auto px-8 py-5 bg-slate-50/80 dark:bg-secondary text-secondary-foreground rounded-2xl font-mono text-sm border border-slate-200 dark:border-border/50 flex items-center gap-3 select-all cursor-text group relative">
              <span class="text-primary font-bold opacity-100">$</span>
              npx nfts@latest init my-app
              <div class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Click to copy
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Grid */}
        <section class="mt-20 md:mt-40">
          <h2 class="text-3xl font-bold mb-12 text-center tracking-tight">
            The NFTS Core Stack
          </h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <For each={techStack}>
              {(tech) => (
                <div class="p-8 rounded-3xl bg-white dark:bg-card/40 backdrop-blur-sm border border-slate-200 dark:border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-lg font-bold">{tech.name}</span>
                    <span class="text-xs font-mono px-2 py-1 rounded bg-primary text-primary-foreground">
                      {tech.version}
                    </span>
                  </div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              )}
            </For>
          </div>
        </section>

        {/* Framework Features */}
        <section class="mt-40 grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              A Framework Designed <br />
              <span class="text-primary">for Developers.</span>
            </h2>
            <p class="text-lg text-muted-foreground leading-relaxed">
              NFTS isn't just another meta-framework. It's a carefully crafted
              integration of the best tools in the ecosystem, optimized for
              performance and developer experience from day one.
            </p>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold">Zero-Config SSR</h3>
                  <p class="text-sm text-muted-foreground">
                    Automatic server-side rendering with no complex setup.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold">Edge Ready</h3>
                  <p class="text-sm text-muted-foreground">
                    Deploy to Vercel, Netlify, Cloudflare Workers, and more via
                    Nitro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <For each={frameworkFeatures}>
              {(feature) => (
                <div class="p-8 rounded-[2rem] bg-white dark:bg-card/60 backdrop-blur-md border border-slate-200 dark:border-border/50 hover:border-primary/50 transition-all duration-500 shadow-xl shadow-transparent hover:shadow-primary/5">
                  <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {feature.icon}
                  </div>
                  <h3 class="text-xl font-bold mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )}
            </For>
          </div>
        </section>

        {/* Integration Showcase */}
        <section class="mt-40 py-24 rounded-[3rem] bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 border border-border/50 relative overflow-hidden">
          <div class="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-black/[0.02]" />
          <div class="relative z-10 text-center max-w-3xl mx-auto space-y-8 px-6">
            <h2 class="text-4xl md:text-6xl font-black tracking-tight italic text-primary">
              Nitro + Any Framework
            </h2>
            <p class="text-xl text-muted-foreground leading-relaxed">
              Experience the best of both worlds. The fastest server-side
              execution meets your favorite frontend framework.
            </p>
            <div class="pt-8 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-50">
              <div class="font-bold text-2xl tracking-tighter hover:grayscale-0 transition-all">
                VITE
              </div>
              <div class="font-bold text-2xl tracking-tighter hover:grayscale-0 transition-all">
                NITRO
              </div>
              <div class="font-bold text-2xl tracking-tighter hover:grayscale-0 transition-all">
                SOLID
              </div>
              <div class="font-bold text-2xl tracking-tighter hover:grayscale-0 transition-all">
                REACT
              </div>
              <div class="font-bold text-2xl tracking-tighter hover:grayscale-0 transition-all">
                VUE
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section class="mt-40 mb-20 text-center">
          <div class="p-12 md:p-24 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.1)] dark:shadow-none">
            <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div class="relative z-10 space-y-8">
              <h2 class="text-5xl md:text-7xl font-black tracking-tight">
                Built for Speed.
              </h2>
              <p class="text-xl md:text-2xl text-slate-300 max-w-xl mx-auto leading-relaxed">
                Ready to build your next high-performance application with NFTS?
                Check out our documentation to get started.
              </p>
              <div class="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button class="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all">
                  Read the Docs
                </button>
                <button class="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                  Star on GitHub
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer class="container mx-auto px-6 py-12 text-center text-muted-foreground border-t border-border/30">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <p class="text-sm font-medium">
            © 2026 NFTS Framework. Powered by Nitro & Any Framework.
          </p>
          <div class="flex items-center space-x-6 text-sm">
            <a href="#" class="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" class="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" class="hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" class="hover:text-primary transition-colors">
              Discord
            </a>
          </div>
        </div>
      </footer>

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-in-from-bottom {
            from { transform: translateY(3rem); }
            to { transform: translateY(0); }
          }
          @keyframes slide-in-from-top {
            from { transform: translateY(-1rem); }
            to { transform: translateY(0); }
          }
          .animate-gradient {
            background-size: 300% 300%;
            animation: gradient 12s ease infinite;
          }
          .animate-in {
            animation-fill-mode: both;
            animation-duration: 1000ms;
          }
          .fade-in {
            animation-name: fade-in;
          }
          .slide-in-from-bottom-8 {
            animation-name: slide-in-from-bottom;
          }
          .slide-in-from-bottom-12 {
            animation-name: slide-in-from-bottom;
          }
          .slide-in-from-top-4 {
            animation-name: slide-in-from-top;
          }
          .bg-300% {
            background-size: 300% 300%;
          }
          .delay-300 {
            animation-delay: 300ms;
          }
          .delay-500 {
            animation-delay: 500ms;
          }
          .delay-700 {
            animation-delay: 700ms;
          }
          .fill-mode-both {
            animation-fill-mode: both;
          }
        `}
      </style>
    </div>
  );
};

export default defineRoute(LandingPage);
