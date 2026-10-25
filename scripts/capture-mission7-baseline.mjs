import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/mnt/d/Vyuk Projects/Rayhan-099/package.json");
const puppeteer = require("puppeteer");

const chromePath = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUTPUT_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/screenshots/mission7_baseline";

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Launching Chromium for Mission 7 Baseline Inspection...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const urls = [
    { name: "local", url: "http://localhost:3000" },
    { name: "live", url: "https://rayhan.runs-on.dev" }
  ];

  for (const target of urls) {
    console.log(`\n=== Auditing ${target.name} (${target.url}) ===`);
    const page = await browser.newPage();
    const consoleLogs = [];
    page.on("console", (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
    page.on("pageerror", (err) => consoleLogs.push(`[PAGE_ERROR] ${err.message}`));

    try {
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(target.url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 1500));

      // 1. Initial Hero
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_01_hero_1440.png`) });

      // 2. Hero Flowing Text Scrolled
      await page.evaluate(() => window.scrollTo(0, 400));
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_02_hero_scrolled_1440.png`) });

      // 3. About Initial Pinned
      await page.evaluate(() => {
        const el = document.getElementById("about");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_03_about_start_1440.png`) });

      // 4. About Mid / Fully Expanded
      await page.evaluate(() => window.scrollBy(0, 1000));
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_04_about_expanded_1440.png`) });

      // 5. Featured Lumine AI (Projects)
      await page.evaluate(() => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_05_projects_lumine_1440.png`) });

      // 6. Projects Wheel
      await page.evaluate(() => window.scrollBy(0, 700));
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_06_projects_wheel_1440.png`) });

      // 7. Experience Horizontal Canvas
      await page.evaluate(() => {
        const el = document.getElementById("experience");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_07_experience_1440.png`) });

      // 8. Skills Section
      await page.evaluate(() => {
        const el = document.getElementById("skills");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_08_skills_1440.png`) });

      // 9. Achievements & Education
      await page.evaluate(() => {
        const el = document.getElementById("achievements") || document.getElementById("education");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_09_achievements_education_1440.png`) });

      // 10. Certifications
      await page.evaluate(() => {
        const el = document.getElementById("certifications");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_10_certifications_1440.png`) });

      // 11. Contact & Footer
      await page.evaluate(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_11_contact_footer_1440.png`) });

      // Mobile Audit (390x844)
      await page.setViewport({ width: 390, height: 844 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_mobile_01_hero.png`) });

      await page.evaluate(() => {
        const el = document.getElementById("skills");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${target.name}_mobile_08_skills.png`) });

      console.log(`${target.name} Console output:`, consoleLogs);
    } catch (e) {
      console.error(`Error auditing ${target.name}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`\nAudit complete. All baseline screenshots stored in: ${OUTPUT_DIR}`);
}

run();
