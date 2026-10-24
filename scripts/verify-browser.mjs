import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/mnt/d/Vyuk Projects/Rayhan-099/package.json");
const puppeteer = require("puppeteer");

const VIEWPORTS = [
  { name: "desktop_1440", width: 1440, height: 900 },
  { name: "laptop_1280", width: 1280, height: 800 },
  { name: "tablet_768", width: 768, height: 1024 },
  { name: "mobile_390", width: 390, height: 844 },
  { name: "narrow_320", width: 320, height: 640 },
];

const OUTPUT_DIR = path.resolve("./screenshots");

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const chromePath = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
  console.log("Launching Chromium from:", chromePath);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Test home page across viewports
  for (const vp of VIEWPORTS) {
    console.log(`Testing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

    // Wait for fonts and entrance animation
    await new Promise((r) => setTimeout(r, 1200));

    // Full page screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `home_${vp.name}.png`),
      fullPage: true,
    });

    // Hero screenshot (above the fold)
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `hero_${vp.name}.png`),
      fullPage: false,
    });
  }

  // Section specific captures on desktop 1440
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 800));

  // Scroll to About section
  console.log("Capturing About section...");
  await page.evaluate(() => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "about_desktop_1440.png"),
    fullPage: false,
  });

  // Scroll to Projects section
  console.log("Capturing Projects section...");
  await page.evaluate(() => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "projects_desktop_1440.png"),
    fullPage: false,
  });

  // Click Inspect Architecture button on Lumine AI to test modal
  console.log("Testing Project Architecture Modal...");
  const inspectButtons = await page.$$("button");
  let clicked = false;
  for (const btn of inspectButtons) {
    const text = await page.evaluate((el) => el.innerText, btn);
    if (text.includes("Inspect Architecture")) {
      await btn.click();
      clicked = true;
      break;
    }
  }

  if (clicked) {
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, "modal_inspection.png"),
      fullPage: false,
    });
  }

  // Test terms page
  console.log("Testing Terms page...");
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("http://localhost:3000/terms", { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "terms_1280.png"),
    fullPage: true,
  });

  // Test privacy page
  console.log("Testing Privacy page...");
  await page.goto("http://localhost:3000/privacy", { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "privacy_1280.png"),
    fullPage: true,
  });

  // Test 404 page
  console.log("Testing 404 page...");
  await page.goto("http://localhost:3000/non-existent-route", { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "404_1280.png"),
    fullPage: true,
  });

  await browser.close();
  console.log("Browser inspection complete! All screenshots captured in:", OUTPUT_DIR);
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
