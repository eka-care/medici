const fs = require("fs");
const path = require("path");

const cursorDts = path.resolve(__dirname, "../node_modules/mongoose/types/cursor.d.ts");

if (!fs.existsSync(cursorDts)) {
  console.error("❌ cursor.d.ts not found");
  process.exit(1);
}

let content = fs.readFileSync(cursorDts, "utf8");
const removed = content.replace(/^\s*\[Symbol\.asyncDispose\]\(\): void;\s*$/m, "");

if (content !== removed) {
  fs.writeFileSync(cursorDts, removed, "utf8");
  console.log("✅ Patched mongoose to remove Symbol.asyncDispose");
} else {
  console.log("ℹ️ Symbol.asyncDispose not found, already patched?");
}
