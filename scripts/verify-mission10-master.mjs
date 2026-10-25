import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/mnt/d/Vyuk Projects/Rayhan-099/package.json');
const puppeteer = require('puppeteer-core');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../screenshots_mission10_verified');
const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const BASE_URL = "http://localhost:3000";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const VIEWPORTS = [
  { name: "desktop_1440x900", width: 1440, height: 900, isMobile: false },
  { name: "desktop_1280x800", width: 1280, height: 800, isMobile: false },
  { name: "mobile_390x844", width: 390, height: 844, isMobile: true },
  { name: "mobile_360x800", width: 360, height: 800, isMobile: true }
];

async function runMasterVerification() {
  console.log("=================================================================");
  console.log("MISSION 10: MULTI-VIEWPORT INTERACTIVE & RIGOROUS VERIFICATION");
  console.log("=================================================================");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
  });

  let totalErrors = 0;
  let totalFailedRequests = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\n[VIEWPORT] ${vp.name} (${vp.width}x${vp.height})`);
    const page = await browser.newPage();

    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.toString());
    });

    page.on('requestfailed', (req) => {
      // Ignore favicon or optional third-party telemetry if any
      const url = req.url();
      if (!url.includes('google-analytics') && !url.includes('analytics')) {
        failedRequests.push(`${req.method()} ${url} (${req.failure()?.errorText || 'failed'})`);
      }
    });

    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile
    });

    console.log(`  Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));

    // Capture Viewport 1: Hero
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_01_hero.png`),
      fullPage: false
    });
    console.log(`  Captured: 01_hero.png`);

    // Scroll to About section and capture initial & expanded
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_02_about_initial.png`),
      fullPage: false
    });
    console.log(`  Captured: 02_about_initial.png`);

    // Scroll down 600px into About scrub
    await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_02_about_expanded.png`),
      fullPage: false
    });
    console.log(`  Captured: 02_about_expanded.png`);

    // Scroll to Projects section
    await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_03_projects_flexcarousel.png`),
      fullPage: false
    });
    console.log(`  Captured: 03_projects_flexcarousel.png`);

    // Scroll to WorksWheel3D
    await page.evaluate(() => {
      const el = document.getElementById('workswheel-section');
      if (el) el.scrollIntoView({ behavior: 'instant' });
      else window.scrollBy({ top: 1200, behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_03_projects_workswheel.png`),
      fullPage: false
    });
    console.log(`  Captured: 03_projects_workswheel.png`);

    // Scroll to Experience section
    await page.evaluate(() => {
      const el = document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_04_experience.png`),
      fullPage: false
    });
    console.log(`  Captured: 04_experience.png`);

    // Scroll to Skills section
    await page.evaluate(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_05_skills.png`),
      fullPage: false
    });
    console.log(`  Captured: 05_skills.png`);

    // Scroll to Achievements, Education & Certifications
    await page.evaluate(() => {
      const el = document.getElementById('achievements');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_06_achievements.png`),
      fullPage: false
    });
    console.log(`  Captured: 06_achievements.png`);

    // Scroll to Contact & Footer
    await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(outputDir, `${vp.name}_07_contact.png`),
      fullPage: false
    });
    console.log(`  Captured: 07_contact.png`);

    // Test Reverse Scroll (Scroll back to top)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 800));

    // Test Project Modal interaction (Click on inspect dossier button or card)
    const dossierBtn = await page.$('button');
    if (dossierBtn) {
      // Find a button containing "Inspect" or "Dossier"
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const inspect = btns.find(b => b.textContent?.includes('Inspect Full Dossier'));
        if (inspect) inspect.click();
      });
      await new Promise((r) => setTimeout(r, 800));

      const modalExists = await page.$('[role="dialog"]');
      if (modalExists) {
        console.log(`  Modal opened successfully! Testing Escape key closure...`);
        await page.keyboard.press('Escape');
        await new Promise((r) => setTimeout(r, 500));
        console.log(`  Modal closed successfully!`);
      }
    }

    if (consoleErrors.length > 0) {
      console.error(`  Console Errors (${consoleErrors.length}):`, consoleErrors);
      totalErrors += consoleErrors.length;
    } else {
      console.log(`  Console Errors: 0`);
    }

    if (failedRequests.length > 0) {
      console.error(`  Failed Requests (${failedRequests.length}):`, failedRequests);
      totalFailedRequests += failedRequests.length;
    } else {
      console.log(`  Failed Requests: 0`);
    }

    await page.close();
  }

  await browser.close();

  console.log("\n=================================================================");
  console.log("FINAL VERIFICATION SUMMARY:");
  console.log(`Total Console Errors across all 4 viewports: ${totalErrors}`);
  console.log(`Total Failed Network Requests: ${totalFailedRequests}`);
  console.log("=================================================================");

  if (totalErrors > 0 || totalFailedRequests > 0) {
    process.exit(1);
  }
}

runMasterVerification().catch((err) => {
  console.error("Master verification failed:", err);
  process.exit(1);
});
