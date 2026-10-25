import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const puppeteer = require("/mnt/d/Vyuk Projects/Rayhan-099/node_modules/puppeteer-core");

const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const PORTFOLIO_URL = "http://localhost:3000";
const ECHO_URL = "http://localhost:8085";
const OUTPUT_DIR = path.resolve("./screenshots_mission9_baseline");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "desktop_1440x900", width: 1440, height: 900 },
  { name: "desktop_1280x800", width: 1280, height: 800 },
  { name: "mobile_390x844", width: 390, height: 844 },
  { name: "mobile_360x800", width: 360, height: 800 },
];

async function capture() {
  console.log("=== CAPTURING MISSION 9 BASELINE SCREENSHOTS ===");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // 1. Capture ECHO Reference at 1440x900
  console.log("Capturing ECHO reference at 1440x900...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(ECHO_URL, { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_fullpage_1440.png"), fullPage: true });

  // 2. Capture Portfolio across all 4 viewports
  for (const vp of VIEWPORTS) {
    console.log(`Capturing portfolio at ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(PORTFOLIO_URL, { waitUntil: "networkidle0" });
    await new Promise(r => setTimeout(r, 1500));

    // Full page screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `portfolio_${vp.name}_full.png`),
      fullPage: true,
    });

    // Top hero screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `portfolio_${vp.name}_hero.png`),
      fullPage: false,
    });
  }

  await browser.close();
  console.log("Baseline capture complete!");
}

capture().catch(err => {
  console.error("Capture error:", err);
  process.exit(1);
});
