const fs = require('fs');
const path = './package.json';

const pkg = JSON.parse(fs.readFileSync(path));
console.log('pkg', pkg);
pkg.scripts = {
  ...pkg.scripts,
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint \"src/**/*\" && prettier --check \"src/**/*.{css,scss,json}\"",
  "lint:fix": "eslint \"src/**/*\" --fix && prettier --write \"src/**/*.{css,scss,json}\"",
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:coverage": "vitest --coverage --silent",
  "test:ui": "vitest --watch --ui",
  "e2e": "playwright test",
  "e2e:ui": "playwright test --ui"
};

fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
console.log("✔ Scripts ajoutés (fusionnés) dans package.json ✅");