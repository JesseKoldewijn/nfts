/** @vitest-environment happy-dom */
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { render } from '@solidjs/testing-library';
import { LandingPage } from '../src/routes/index';

describe('Accessibility', () => {
  it('landing page should have no violations in light mode', async () => {
    const { container } = render(() => (
      <main>
        <LandingPage />
      </main>
    ));
    
    // Simulate light mode
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('landing page should have no violations in dark mode', async () => {
    const { container } = render(() => (
      <main>
        <LandingPage />
      </main>
    ));
    
    // Simulate dark mode
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

