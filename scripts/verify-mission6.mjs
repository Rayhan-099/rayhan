import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/mnt/d/Vyuk Projects/Rayhan-099/package.json");
const puppeteer = require("puppeteer");

const chromePath = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUTPUT_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/screenshots/mission6_verification";

const VIEWPORTS = [
  { name: "desktop_1440", width: 1440, height: 900 },
  { name: "laptop_1280", width: 1280, height: 800 },
  { name: "mobile_390", width: 390, height: 844 },
  { name: "narrow_360", width: 360, height: 800 },
];

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Launching Chromium for Mission 6 Comprehensive Verification...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  // --- PART 1: Desktop 1440 Full Scroll Traversal ---
  console.log("Verifying Desktop 1440 Scroll Traversal & Transitions...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Initial Hero
  await page.screenshot({ path: path.join(OUTPUT_DIR, "01_hero_initial_1440.png") });

  // 2. Hero Mid-Scroll (Testing hero-frames & flowing text)
  await page.evaluate(() => window.scrollTo(0, 500));
  await new Promise((r) => setTimeout(r, 350));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "02_hero_scroll_500_1440.png") });

  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise((r) => setTimeout(r, 350));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "03_hero_scroll_900_1440.png") });

  // Verify Hero Canvas and Tickers
  const heroState = await page.evaluate(() => {
    const canvas = document.querySelector("#hero canvas");
    const topTicker = document.querySelector("#hero .whitespace-nowrap");
    return {
      hasCanvas: !!canvas,
      canvasW: canvas ? canvas.width : 0,
      canvasH: canvas ? canvas.height : 0,
      tickerTransform: topTicker ? topTicker.style.transform : "",
    };
  });
  console.log("Hero Canvas & Ticker State:", heroState);

  // 3. About Section (Verify existing 241-frame sequence intact)
  await page.evaluate(() => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "04_about_start_1440.png") });

  await page.evaluate(() => window.scrollBy(0, 700));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "05_about_mid_expanded_1440.png") });

  await page.evaluate(() => window.scrollBy(0, 700));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "06_about_fully_expanded_1440.png") });

  // 4. Projects Section: Featured Lumine AI & 3D Drum Reel
  await page.evaluate(() => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "07_projects_featured_lumine_1440.png") });

  // Test interactive tab switcher on featured project
  console.log("Testing featured project feature tabs...");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const edgeBtn = btns.find((b) => b.innerText.includes("Edge Inference"));
    if (edgeBtn) edgeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "08_projects_lumine_tab_latency_1440.png") });

  // Test 3D Drum Reel next button
  console.log("Testing 3D Drum Reel next navigation...");
  await page.evaluate(() => {
    const nextBtn = document.querySelector('button[aria-label="Next System in 3D Wheel"]');
    if (nextBtn) nextBtn.click();
  });
  await new Promise((r) => setTimeout(r, 350));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "09_projects_wheel_step1_1440.png") });

  // Test Project Modal Inspection
  console.log("Testing Project Modal Dossier...");
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const inspectBtn = btns.find((b) => b.innerText.includes("Inspect Full Dossier"));
    if (inspectBtn) inspectBtn.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "10_project_modal_dossier_1440.png") });

  // Close modal via Escape
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 300));

  // 5. Experience Section: Horizontal Spatial Canvas
  console.log("Testing Experience Horizontal Spatial Canvas...");
  await page.evaluate(() => {
    const el = document.getElementById("experience");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "11_experience_intro_1440.png") });

  await page.evaluate(() => window.scrollBy(0, 700));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "12_experience_chapter1_synk_1440.png") });

  await page.evaluate(() => window.scrollBy(0, 900));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "13_experience_chapter2_bcg_1440.png") });

  // 6. Multi-Viewport Checks
  for (const vp of VIEWPORTS.slice(1)) {
    console.log(`Testing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(OUTPUT_DIR, `vp_${vp.name}_hero.png`),
    });

    await page.evaluate(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `vp_${vp.name}_projects.png`),
    });
  }

  await browser.close();

  console.log("Console errors recorded:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.warn("Errors:", consoleErrors);
  }

  console.log("Mission 6 Verification complete! All screenshots saved in:", OUTPUT_DIR);
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
