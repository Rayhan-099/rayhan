import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/mnt/d/Vyuk Projects/Rayhan-099/package.json");
const puppeteer = require("puppeteer");

const chromePath = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUTPUT_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/screenshots/mission6_baseline";

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Launching Chromium for Mission 6 Baseline Audit...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 1. Rayhan-Portfolio Desktop (1440x900)
  console.log("Auditing Rayhan-Portfolio Desktop...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));

  // Hero Initial Viewport
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_01_hero_initial_1440.png") });

  // Hero Scrolled Y=250, Y=500
  await page.evaluate(() => window.scrollTo(0, 250));
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_02_hero_scroll_250_1440.png") });

  await page.evaluate(() => window.scrollTo(0, 500));
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_03_hero_scroll_500_1440.png") });

  // About Section: Before pin (Y=900), mid-pin (Y=1600), end-pin (Y=2200), after-pin (Y=2600)
  await page.evaluate(() => window.scrollTo(0, 950));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_04_about_start_pin_1440.png") });

  await page.evaluate(() => window.scrollTo(0, 1600));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_05_about_mid_pin_1440.png") });

  await page.evaluate(() => window.scrollTo(0, 2200));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_06_about_end_pin_1440.png") });

  await page.evaluate(() => window.scrollTo(0, 2600));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_07_about_unpinned_into_projects_1440.png") });

  // Projects Section
  await page.evaluate(() => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_08_projects_1440.png") });

  // Experience Section
  await page.evaluate(() => {
    const el = document.getElementById("experience");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_09_experience_1440.png") });

  // Skills & Remaining Sections & Footer
  await page.evaluate(() => {
    const el = document.getElementById("skills");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_10_skills_1440.png") });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_11_contact_footer_1440.png") });

  // 2. Rayhan-Portfolio Mobile (390x844)
  console.log("Auditing Rayhan-Portfolio Mobile...");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_12_hero_mobile_390.png") });

  await page.evaluate(() => window.scrollTo(0, 1200));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "rp_13_about_mobile_390.png") });

  // 3. ECHO-WEBSITE Desktop (localhost:8085)
  console.log("Auditing ECHO-WEBSITE Reference...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:8085", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));

  // ECHO Hero
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_01_hero_initial_1440.png") });

  // ECHO Hero Scroll
  await page.evaluate(() => window.scrollTo(0, 300));
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_02_hero_scroll_300_1440.png") });

  // ECHO About Section
  await page.evaluate(() => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_03_about_start_1440.png") });

  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_04_about_mid_expanded_1440.png") });

  // ECHO Experience Section (Horizontal Spatial Canvas)
  await page.evaluate(() => {
    const el = document.getElementById("experience");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_05_experience_panel1_1440.png") });

  await page.evaluate(() => window.scrollBy(0, 1200));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_06_experience_panel2_1440.png") });

  await page.evaluate(() => window.scrollBy(0, 1500));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_07_experience_panel3_1440.png") });

  // ECHO Projects Section (WorksWheel 3D Drum Reel)
  await page.evaluate(() => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_08_projects_wheel_1440.png") });

  // ECHO Landing Pages (FlexCarousel Liquid Lens)
  await page.evaluate(() => {
    const el = document.getElementById("landing-pages");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "echo_09_landing_pages_carousel_1440.png") });

  await browser.close();
  console.log("Mission 6 Baseline audit capture complete! Saved in:", OUTPUT_DIR);
}

run().catch((err) => {
  console.error("Baseline capture failed:", err);
  process.exit(1);
});
