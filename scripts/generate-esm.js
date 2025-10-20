// Generates a lightweight ESM wrapper that imports the CJS build
const fs = require("fs");
const path = require("path");

const esm = `import c from './index.cjs.js';
export * from './index.cjs.js';
export default c;
`;
fs.writeFileSync(path.join(__dirname, "../dist/index.esm.js"), esm);
console.log("Generated dist/index.esm.js");
