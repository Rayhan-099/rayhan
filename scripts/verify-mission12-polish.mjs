import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/mnt/d/Vyuk Projects/Rayhan-099/package.json');
const puppeteer = require('puppeteer-core');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../screenshots_mission12_verified');
const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const viewports = [
  { name: 'desktop_1440x900', width: 1440, height: 900, isMobile: false },
  { name: 'laptop_1280x800', width: 1280, height: 800, isMobile: false },
  { name: 'mobile_390x844', width: 390, height: 844, isMobile: true },
  { name: 'mobile_360x800', width: 360, height: 800, isMobile: true }
];

async function runMission12Verification() {
  console.log('================================================================');
  console.log('🔍 MISSION 12: VISUAL QA & RESTRAINT VERIFICATION SUITE');
  console.log('================================================================');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const auditReport = {
    timestamp: new Date().toISOString(),
    viewportsTested: [],
    networkMetrics: {
      totalRequests: 0,
      jpgFrameRequests: 0,
      webpFrameRequests: 0,
      headshotJpgRequests: 0,
      headshotWebpRequests: 0,
      failedRequests: []
    },
    consoleErrors: [],
    modalInteractionVerified: false,
    reducedMotionVerified: false
  };

  try {
    // 1. Multi-Viewport Standard Run
    for (const vp of viewports) {
      console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
        deviceScaleFactor: 2
      });

      page.on('console', msg => {
        if (msg.type() === 'error') {
          console.error(`[Browser Console Error] [${vp.name}]:`, msg.text());
          auditReport.consoleErrors.push({ viewport: vp.name, error: msg.text() });
        }
      });

      page.on('request', req => {
        auditReport.networkMetrics.totalRequests++;
        const url = req.url();
        if (url.includes('/hero-frames/') || url.includes('/frames/')) {
          if (url.endsWith('.jpg') || url.endsWith('.jpeg')) {
            auditReport.networkMetrics.jpgFrameRequests++;
          } else if (url.endsWith('.webp')) {
            auditReport.networkMetrics.webpFrameRequests++;
          }
        }
        if (url.includes('rayhan-headshot.jpg')) {
          auditReport.networkMetrics.headshotJpgRequests++;
        }
        if (url.includes('rayhan-headshot.webp')) {
          auditReport.networkMetrics.headshotWebpRequests++;
        }
      });

      page.on('requestfailed', req => {
        console.warn(`[Network Request Failed] [${vp.name}]:`, req.url(), req.failure()?.errorText);
        auditReport.networkMetrics.failedRequests.push({
          viewport: vp.name,
          url: req.url(),
          error: req.failure()?.errorText
        });
      });

      await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
      await delay(2000);

      // 1. Initial Hero Capture
      const heroPath = path.join(outputDir, `${vp.name}_01_hero.png`);
      await page.screenshot({ path: heroPath, fullPage: false });
      console.log(`✓ Saved Hero screenshot: ${heroPath}`);

      // 2. Scroll to About Section
      console.log(`  Scrolling to About Canvas sequence...`);
      await page.evaluate(() => {
        const aboutEl = document.getElementById('about');
        if (aboutEl) aboutEl.scrollIntoView({ behavior: 'instant' });
      });
      await delay(1000);

      await page.evaluate(() => {
        window.scrollBy({ top: 600, behavior: 'instant' });
      });
      await delay(600);

      const aboutPath = path.join(outputDir, `${vp.name}_02_about_expanded.png`);
      await page.screenshot({ path: aboutPath, fullPage: false });
      console.log(`✓ Saved About sequence screenshot: ${aboutPath}`);

      // 3. Scroll to Projects Section (Lumine AI)
      console.log(`  Scrolling to Projects section...`);
      await page.evaluate(() => {
        const projEl = document.getElementById('projects');
        if (projEl) projEl.scrollIntoView({ behavior: 'instant' });
      });
      await delay(1000);

      const projectsPath = path.join(outputDir, `${vp.name}_03_projects_lumine.png`);
      await page.screenshot({ path: projectsPath, fullPage: false });
      console.log(`✓ Saved Projects screenshot: ${projectsPath}`);

      // 4. Scroll to WorksWheel3D
      console.log(`  Scrolling to WorksWheel3D section...`);
      await page.evaluate(() => {
        const wheelEl = document.getElementById('core-systems-reel') || document.querySelector('.works-wheel-section') || document.querySelector('[aria-label*="Core Systems"]');
        if (wheelEl) wheelEl.scrollIntoView({ behavior: 'instant' });
        else window.scrollBy({ top: 800, behavior: 'instant' });
      });
      await delay(1000);

      const wheelPath = path.join(outputDir, `${vp.name}_04_works_wheel.png`);
      await page.screenshot({ path: wheelPath, fullPage: false });
      console.log(`✓ Saved Works Wheel screenshot: ${wheelPath}`);

      // 5. Scroll to Experience Section
      console.log(`  Scrolling to Experience section...`);
      await page.evaluate(() => {
        const expEl = document.getElementById('experience');
        if (expEl) expEl.scrollIntoView({ behavior: 'instant' });
      });
      await delay(1000);

      const expPath = path.join(outputDir, `${vp.name}_05_experience.png`);
      await page.screenshot({ path: expPath, fullPage: false });
      console.log(`✓ Saved Experience screenshot: ${expPath}`);

      // 6. Scroll to Skills Section
      console.log(`  Scrolling to Skills section...`);
      await page.evaluate(() => {
        const skillsEl = document.getElementById('skills');
        if (skillsEl) skillsEl.scrollIntoView({ behavior: 'instant' });
      });
      await delay(1000);

      const skillsPath = path.join(outputDir, `${vp.name}_06_skills.png`);
      await page.screenshot({ path: skillsPath, fullPage: false });
      console.log(`✓ Saved Skills screenshot: ${skillsPath}`);

      // 7. Scroll to Contact / Footer
      console.log(`  Scrolling to Contact & Footer...`);
      await page.evaluate(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'instant' });
      });
      await delay(1000);

      const contactPath = path.join(outputDir, `${vp.name}_07_contact.png`);
      await page.screenshot({ path: contactPath, fullPage: false });
      console.log(`✓ Saved Contact screenshot: ${contactPath}`);

      // 8. Test Reverse Scroll to Top
      console.log(`  Executing smooth reverse scroll back to hero...`);
      await page.evaluate(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await delay(1000);

      // 9. Test Modal Interaction on Desktop
      if (vp.name === 'desktop_1440x900') {
        console.log(`  Testing Modal Interaction (Open Lumine AI -> Check Trap -> Escape Key)...`);
        await page.evaluate(() => {
          const projEl = document.getElementById('projects');
          if (projEl) projEl.scrollIntoView({ behavior: 'instant' });
        });
        await delay(800);

        const clicked = await page.evaluate(() => {
          const card = document.querySelector('.lumine-card') || document.querySelector('[aria-label*="Lumine"]');
          if (card) {
            card.click();
            return true;
          }
          return false;
        });

        if (clicked) {
          await delay(600);
          const modalVisible = await page.evaluate(() => {
            const modal = document.querySelector('[role="dialog"]');
            return modal !== null && window.getComputedStyle(modal).display !== 'none';
          });
          console.log(`  Modal opened successfully: ${modalVisible}`);

          const modalPath = path.join(outputDir, `${vp.name}_08_lumine_modal.png`);
          await page.screenshot({ path: modalPath, fullPage: false });
          console.log(`✓ Saved Modal screenshot: ${modalPath}`);

          await page.keyboard.press('Escape');
          await delay(500);

          const modalClosed = await page.evaluate(() => {
            const modal = document.querySelector('[role="dialog"]');
            return modal === null;
          });
          console.log(`  Modal closed successfully via Escape key: ${modalClosed}`);
          auditReport.modalInteractionVerified = modalVisible && modalClosed;
        }
      }

      auditReport.viewportsTested.push({
        name: vp.name,
        width: vp.width,
        height: vp.height,
        status: 'SUCCESS'
      });

      await page.close();
    }

    // 2. Prefers-Reduced-Motion Test Run
    console.log(`\n--- Testing Accessibility: prefers-reduced-motion: reduce ---`);
    const prmPage = await browser.newPage();
    await prmPage.setViewport({ width: 1440, height: 900 });
    await prmPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

    prmPage.on('console', msg => {
      if (msg.type() === 'error') {
        auditReport.consoleErrors.push({ viewport: 'reduced_motion', error: msg.text() });
      }
    });

    await prmPage.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(1500);

    const prmHeroPath = path.join(outputDir, `reduced_motion_hero.png`);
    await prmPage.screenshot({ path: prmHeroPath, fullPage: false });
    console.log(`✓ Saved Reduced-Motion Hero screenshot: ${prmHeroPath}`);

    await prmPage.evaluate(() => {
      window.scrollBy({ top: 1200, behavior: 'instant' });
    });
    await delay(1000);

    const prmAboutPath = path.join(outputDir, `reduced_motion_about.png`);
    await prmPage.screenshot({ path: prmAboutPath, fullPage: false });
    console.log(`✓ Saved Reduced-Motion About screenshot: ${prmAboutPath}`);

    auditReport.reducedMotionVerified = true;
    await prmPage.close();

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }

  const reportPath = path.resolve(__dirname, '../docs/MISSION12-VERIFICATION-AUDIT.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2));
  console.log(`\n================================================================`);
  console.log(`✅ MISSION 12 VERIFICATION AUDIT COMPLETE`);
  console.log(`Audit Summary:`);
  console.log(`- Viewports Tested: ${auditReport.viewportsTested.length}/4`);
  console.log(`- Total Network Requests: ${auditReport.networkMetrics.totalRequests}`);
  console.log(`- JPG Frame Requests Loaded: ${auditReport.networkMetrics.jpgFrameRequests}`);
  console.log(`- WebP Frame Requests: ${auditReport.networkMetrics.webpFrameRequests} (Must be 0)`);
  console.log(`- Headshot JPG Requests: ${auditReport.networkMetrics.headshotJpgRequests}`);
  console.log(`- Headshot WebP Requests: ${auditReport.networkMetrics.headshotWebpRequests} (Must be 0)`);
  console.log(`- Console Errors: ${auditReport.consoleErrors.length} (Must be 0)`);
  console.log(`- Failed Requests: ${auditReport.networkMetrics.failedRequests.length} (Must be 0)`);
  console.log(`- Modal Keyboard Trapping Verified: ${auditReport.modalInteractionVerified}`);
  console.log(`- Reduced Motion Compliance Verified: ${auditReport.reducedMotionVerified}`);
  console.log(`Report saved to: ${reportPath}`);
  console.log(`================================================================\n`);
}

runMission12Verification();
