import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const puppeteer = require("/mnt/d/Vyuk Projects/Rayhan-099/node_modules/puppeteer-core");

const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const PORTFOLIO_URL = "http://localhost:3000";
const OUTPUT_DIR = path.resolve("./screenshots_mission10_baseline");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "desktop_1440x900", width: 1440, height: 900 },
  { name: "desktop_1280x800", width: 1280, height: 800 },
  { name: "mobile_390x844", width: 390, height: 844 },
  { name: "mobile_360x800", width: 360, height: 800 },
];

async function captureBaseline() {
  console.log("=== CAPTURING MISSION 10 BASELINE SCREENSHOTS ===");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const page = await browser.newPage();

  for (const vp of VIEWPORTS) {
    console.log(`Capturing viewport: ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(PORTFOLIO_URL, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1500));

    // 1. Initial Hero Viewport (Still Composition)
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_01_hero.png`),
      fullPage: false,
    });

    // 2. About section
    await page.evaluate(() => {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_02_about_initial.png`),
      fullPage: false,
    });

    // Scroll further into About (expanding stage)
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.8);
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_02_about_expanded.png`),
      fullPage: false,
    });

    // 3. Projects section (FlexCarousel)
    await page.evaluate(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_03_projects_flexcarousel.png`),
      fullPage: false,
    });

    // Scroll to WorksWheel3D
    await page.evaluate(() => {
      const el = document.querySelector('[role="listbox"][aria-label="3D Cylindrical Projects Wheel"]');
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_03_projects_workswheel.png`),
      fullPage: false,
    });

    // 4. Experience Section
    await page.evaluate(() => {
      const el = document.getElementById("experience");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_04_experience.png`),
      fullPage: false,
    });

    // 5. Skills Section
    await page.evaluate(() => {
      const el = document.getElementById("skills");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_05_skills.png`),
      fullPage: false,
    });

    // 6. Achievements / Education / Certifications
    await page.evaluate(() => {
      const el = document.getElementById("achievements");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_06_achievements.png`),
      fullPage: false,
    });

    // 7. Contact / Footer
    await page.evaluate(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_07_contact.png`),
      fullPage: false,
    });
  }

  await browser.close();
  console.log("=== MISSION 10 BASELINE CAPTURE COMPLETE ===");
}

captureBaseline().catch((err) => {
  console.error("Baseline capture error:", err);
  process.exit(1);
});
