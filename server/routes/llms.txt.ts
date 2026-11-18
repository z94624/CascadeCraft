export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8');

  const domain = (process.env.NUXT_PUBLIC_SITE_URL || 'https://z94624.github.io/CascadeCraft').replace(/\/$/, '');

  return `# CascadeCraft - LLM Search Engine Knowledge Base

> CascadeCraft is a high-aesthetic, zero-learning-curve interactive CSS playground and property reference platform built on Nuxt 4, TypeScript, SCSS, and Tailwind CSS.
> Optimized for AI-assisted coding, Generative Engine Optimization (GEO), and direct export of CSS, SCSS, and Tailwind utility classes.

## Interactive CSS Playgrounds
- [Box Shadow Generator](${domain}/box-shadow/): Multi-layer elevation, diffuse shadows, glow effects, and inset box shadows.
- [Cubic Bezier Curves](${domain}/cubic-bezier/): Visual 2-point curve editor (P1, P2), spring physics, transition-timing-function exporter, dual racer preview.
- [Flexbox Visualizer](${domain}/flexbox/): Visual flex container and item properties (direction, justify, align, gap, wrap).
- [CSS Grid Builder](${domain}/grid/): Dynamic 2D matrix layout generator with fr/px ratios and gap controls.
- [Glassmorphism Studio](${domain}/glassmorphism/): Backdrop-filter blur, saturation, border highlights, and frosted glass simulation.
- [Gradient Mixer](${domain}/gradient/): Linear, radial, and conic gradients with angle rotators and multiple stops.
- [Fancy Border Radius](${domain}/border-radius/): 8-point asymmetric radius curves for organic blob shapes.
- [CSS Properties Reference](${domain}/reference/): Interactive MDN CSS property reference index.

## Code Export Formats
Every tool supports instantaneous generation of:
1. Standard W3C CSS declarations
2. SCSS modular variables
3. Tailwind CSS arbitrary and semantic utility classes

## Full Index
For complete CSS rules, syntax tables, and code snippets, see: ${domain}/llms-full.txt
`;
});
