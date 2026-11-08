import { CSS_PROPERTIES } from '../../data/cssProperties';

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8');

  const propertyEntries = CSS_PROPERTIES.map((p) => {
    return `### ${p.name}
- Category: ${p.category}
- Syntax: \`${p.syntax}\`
- Default: \`${p.defaultValue}\`
- Description: ${p.description}
- Common Examples:
${p.exampleValues.map((e) => `  - \`${e}\``).join('\n')}
${p.moduleLink ? `- Interactive Generator: https://cascadecraft.dev${p.moduleLink}` : ''}
`;
  }).join('\n---\n\n');

  return `# CascadeCraft - Comprehensive CSS Knowledge Specification (LLM Full Dump)

This document contains structured definitions, syntax rules, and interactive generator bindings for modern CSS specifications.

${propertyEntries}
`;
});
