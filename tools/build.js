#!/usr/bin/env node
/* Precompile every .jsx file to a .js file next to it, so pages no longer
   download Babel (3 MB) and transpile in the browser.

   Uses the same vendored Babel and the same options that <script type="text/babel">
   used, so the output is identical to what the browser produced before.

   Edit the .jsx files, then run:   node tools/build.js
   Check nothing is stale:           node tools/build.js --check   */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const Babel = require(path.join(root, "shared/vendor/babel.min.js"));
const check = process.argv.includes("--check");

// Babel standalone's defaults for <script type="text/babel">
const OPTIONS = {
  presets: ["react", "env"],
  plugins: ["transform-class-properties", "transform-object-rest-spread", "transform-flow-strip-types"],
};

function findJsx(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules" || e.name === "vendor") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) findJsx(p, out);
    else if (e.name.endsWith(".jsx")) out.push(p);
  }
  return out;
}

let stale = 0;
for (const file of findJsx(root)) {
  const rel = path.relative(root, file);
  const { code } = Babel.transform(fs.readFileSync(file, "utf8"), { ...OPTIONS, filename: rel });
  const out = `/* Generated from ${path.basename(rel)} by tools/build.js. Edit the .jsx, not this file. */\n${code}\n`;
  const target = file.replace(/\.jsx$/, ".js");
  const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : null;
  if (current === out) continue;
  if (check) { console.error(`stale: ${path.relative(root, target)}`); stale++; }
  else { fs.writeFileSync(target, out); console.log(`built ${path.relative(root, target)}`); }
}
if (check && stale) { console.error(`${stale} file(s) out of date. Run: node tools/build.js`); process.exit(1); }
