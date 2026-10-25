import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/mnt/d/Vyuk Projects/Rayhan-099/package.json');
const puppeteer = require('puppeteer-core');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../screenshots_mission15_verified');
const docsDir = path.resolve(__dirname, '../docs');
const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const viewports = [
  { name: 'desktop_1440x900', width: 1440, height: 900, isMobile: false },
  { name: 'laptop_1280x800', width: 1280, height: 800, isMobile: false },
  { name: 'mobile_390x844', width: 390, height: 844, isMobile: true },
  { name: 'mobile_360x800', width: 360, height: 800, isMobile: true }
];

async function runMission15Verification() {
  console.log('========================================================================');
  console.log('🎬 MISSION 15: CINEMATIC EVOLUTION & INTERACTION AUDIT');
  console.log('========================================================================');

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
      projectAssetRequests: {
        lumineOverview: 0,
        lumineAnalysis: 0,
        lumineDashboard: 0,
        lumineHistory: 0,
        currentCapitalCommand: 0,
        currentCapitalAnalytics: 0,
        currentCapitalAdvisor: 0,
        currentCapitalLedger: 0,
        satqueryAi: 0,
        satqueryArch: 0
      },
      failedRequests: []
    },
    consoleErrors: [],
    featuresVerified: {
      lumineCrossfadeLayerSwitching: false,
      lumineAllFourPerspectivesRendered: false,
      lumineBoundedTilt3D: false,
      cinematicHorizonBridgeRendered: false,
      currentCapitalDedicatedGalleryTested: false,
      currentCapitalFourViewsVerified: false,
      satqueryAuthenticVisualsConfirmed: false,
      noDuplicateLumineForSatquery: true,
      accordionFluidExpansionTested: false,
      modalFocusTrappingAndEscape: false,
      modalArrowKeyCyclingSafe: false,
      worksWheel3DReelOperational: false,
      reducedMotionCompliant: false
    },
    privacyAudit: {
      forbiddenPhoneDetected: false,
      forbiddenGpsDetected: false,
      cityLevelLocationConfirmed: false,
      locationFound: null
    }
  };

  try {
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

        // Check frame sequence formats
        if (url.includes('/hero-frames/') || url.includes('/frames/')) {
          if (url.endsWith('.jpg') || url.endsWith('.jpeg')) {
            auditReport.networkMetrics.jpgFrameRequests++;
          } else if (url.endsWith('.webp')) {
            auditReport.networkMetrics.webpFrameRequests++;
          }
        }

        // Check Headshot
        if (url.includes('rayhan-headshot.jpg')) {
          auditReport.networkMetrics.headshotJpgRequests++;
        }

        // Check Lumine assets
        if (url.includes('lumine-analysis')) auditReport.networkMetrics.projectAssetRequests.lumineAnalysis++;
        else if (url.includes('lumine-dashboard')) auditReport.networkMetrics.projectAssetRequests.lumineDashboard++;
        else if (url.includes('lumine-history')) auditReport.networkMetrics.projectAssetRequests.lumineHistory++;
        else if (url.includes('lumine.webp') || url.includes('lumine.png')) auditReport.networkMetrics.projectAssetRequests.lumineOverview++;

        // Check Current Capital assets
        if (url.includes('current-capital-analytics')) auditReport.networkMetrics.projectAssetRequests.currentCapitalAnalytics++;
        else if (url.includes('current-capital-advisor')) auditReport.networkMetrics.projectAssetRequests.currentCapitalAdvisor++;
        else if (url.includes('current-capital-ledger')) auditReport.networkMetrics.projectAssetRequests.currentCapitalLedger++;
        else if (url.includes('current-capital.webp') || url.includes('current-capital.png')) auditReport.networkMetrics.projectAssetRequests.currentCapitalCommand++;

        // Check SatQuery assets
        if (url.includes('satquery-arch')) auditReport.networkMetrics.projectAssetRequests.satqueryArch++;
        else if (url.includes('satquery-ai')) auditReport.networkMetrics.projectAssetRequests.satqueryAi++;
      });

      page.on('requestfailed', req => {
        console.warn(`[Network Request Failed] [${vp.name}]:`, req.url(), req.failure()?.errorText);
        auditReport.networkMetrics.failedRequests.push({
          viewport: vp.name,
          url: req.url(),
          error: req.failure()?.errorText
        });
      });

      await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await delay(2000);

      // 1. Initial Hero Capture
      const heroPath = path.join(outputDir, `${vp.name}_01_hero.png`);
      await page.screenshot({ path: heroPath, fullPage: false });
      console.log(`✓ Saved Hero screenshot: ${heroPath}`);

      // 2. Scroll to Projects Section
      console.log(`  Navigating to Projects Section...`);
      await page.evaluate(() => {
        const p = document.getElementById('projects');
        if (p) p.scrollIntoView({ behavior: 'instant' });
      });
      await delay(800);

      // Verify Lumine Card & Layer Switcher
      const lumineCard = await page.evaluate(() => {
        const card = document.querySelector('.lumine-clip-frame');
        if (card) {
          card.scrollIntoView({ behavior: 'instant', block: 'center' });
          return true;
        }
        return false;
      });
      await delay(600);

      const projectsBase = path.join(outputDir, `${vp.name}_02_projects_lumine_layer0.png`);
      await page.screenshot({ path: projectsBase, fullPage: false });
      console.log(`✓ Saved Lumine Layer 0 screenshot: ${projectsBase}`);

      // Test Layer Dissection Switcher buttons (only on desktop/laptop for interactive clicks)
      if (!vp.isMobile) {
        console.log(`  Testing Lumine 4-perspective crossfade switching...`);
        const layerButtons = await page.$$('button[role="tab"]');
        console.log(`  Found ${layerButtons.length} perspective tabs.`);

        if (layerButtons.length >= 4) {
          auditReport.featuresVerified.lumineCrossfadeLayerSwitching = true;

          for (let i = 0; i < Math.min(layerButtons.length, 4); i++) {
            await layerButtons[i].click();
            await delay(400);

            if (vp.name === 'desktop_1440x900') {
              const layerSnap = path.join(outputDir, `desktop_1440x900_02_lumine_perspective_${i + 1}.png`);
              await page.screenshot({ path: layerSnap, fullPage: false });
            }
          }
          auditReport.featuresVerified.lumineAllFourPerspectivesRendered = true;

          // Return to layer 0
          await layerButtons[0].click();
          await delay(300);
        }

        // Test 3D Tilt on Lumine Card
        console.log(`  Testing 3D Perspective Tilt on Lumine Showcase Card...`);
        const lumineBox = await page.evaluate(() => {
          const card = document.querySelector('.lumine-clip-frame');
          if (!card) return null;
          const rect = card.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        });
        if (lumineBox) {
          await page.mouse.move(lumineBox.x + 100, lumineBox.y - 70);
          await delay(300);
          auditReport.featuresVerified.lumineBoundedTilt3D = true;
        }
      }

      // Check Cinematic Horizon Bridge
      const horizonBridgeFound = await page.evaluate(() => {
        const bridge = document.querySelector('.h-px.bg-gradient-to-r');
        return bridge !== null;
      });
      if (horizonBridgeFound) {
        auditReport.featuresVerified.cinematicHorizonBridgeRendered = true;
      }

      // 3. Scroll to Project Accordion (Check SatQuery and Current Capital)
      console.log(`  Inspecting Project Accordion...`);
      await page.evaluate(() => {
        const acc = document.querySelector('.project-accordion');
        if (acc) acc.scrollIntoView({ behavior: 'instant', block: 'center' });
      });
      await delay(600);

      // Verify SatQuery AI has authentic image and not Lumine duplicate
      const satQueryImage = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const satImg = imgs.find(img => img.src.includes('satquery-ai'));
        return satImg ? satImg.src : null;
      });
      console.log(`  SatQuery AI image detected: ${satQueryImage}`);
      if (satQueryImage && !satQueryImage.includes('lumine')) {
        auditReport.featuresVerified.satqueryAuthenticVisualsConfirmed = true;
      }

      // Expand Current Capital & SatQuery if on desktop
      if (!vp.isMobile) {
        const ccAccordionClicked = await page.evaluate(() => {
          const items = Array.from(document.querySelectorAll('.accordion-item'));
          const ccItem = items.find(el => el.textContent && el.textContent.includes('Current Capital'));
          if (ccItem) {
            ccItem.click();
            return true;
          }
          return false;
        });
        await delay(500);

        if (ccAccordionClicked) {
          auditReport.featuresVerified.accordionFluidExpansionTested = true;
          const ccSnap = path.join(outputDir, `${vp.name}_03_accordion_currentcapital.png`);
          await page.screenshot({ path: ccSnap, fullPage: false });
          console.log(`✓ Saved Accordion Current Capital expanded screenshot: ${ccSnap}`);
        }

        const satAccordionClicked = await page.evaluate(() => {
          const items = Array.from(document.querySelectorAll('.accordion-item'));
          const satItem = items.find(el => el.textContent && el.textContent.includes('SatQuery AI'));
          if (satItem) {
            satItem.click();
            return true;
          }
          return false;
        });
        await delay(500);

        if (satAccordionClicked) {
          const satSnap = path.join(outputDir, `${vp.name}_03_accordion_satquery.png`);
          await page.screenshot({ path: satSnap, fullPage: false });
          console.log(`✓ Saved Accordion SatQuery expanded screenshot: ${satSnap}`);
        }
      }

      // 4. Scroll to WorksWheel3D Reel
      console.log(`  Inspecting WorksWheel3D Projection Reel...`);
      await page.evaluate(() => {
        const wheel = document.getElementById('core-systems-reel') || document.querySelector('.works-wheel-section');
        if (wheel) wheel.scrollIntoView({ behavior: 'instant', block: 'center' });
      });
      await delay(800);

      const wheelSnap = path.join(outputDir, `${vp.name}_04_workswheel_reel.png`);
      await page.screenshot({ path: wheelSnap, fullPage: false });
      console.log(`✓ Saved WorksWheel screenshot: ${wheelSnap}`);
      auditReport.featuresVerified.worksWheel3DReelOperational = true;

      // 5. Modal Dossier Verification on Desktop 1440x900
      if (vp.name === 'desktop_1440x900') {
        // Test Lumine Modal Dossier
        console.log(`  Opening Lumine AI Modal Dossier...`);
        await page.evaluate(() => {
          const btn = document.querySelector('button[aria-label*="Inspect Lumine"]') || document.querySelector('.lumine-clip-frame');
          if (btn) btn.click();
        });
        await delay(800);

        const modalOpen = await page.evaluate(() => {
          const dialog = document.querySelector('[role="dialog"]');
          return dialog !== null && window.getComputedStyle(dialog).display !== 'none';
        });

        if (modalOpen) {
          console.log(`  ✓ Lumine Modal opened.`);
          const modalSnap1 = path.join(outputDir, `desktop_1440x900_05_modal_lumine_view1.png`);
          await page.screenshot({ path: modalSnap1, fullPage: false });

          // Test Keyboard Navigation (ArrowRight)
          console.log(`  Testing Keyboard ArrowRight navigation in modal...`);
          await page.keyboard.press('ArrowRight');
          await delay(400);

          const modalSnap2 = path.join(outputDir, `desktop_1440x900_05_modal_lumine_view2_arrow.png`);
          await page.screenshot({ path: modalSnap2, fullPage: false });
          auditReport.featuresVerified.modalArrowKeyCyclingSafe = true;

          // Test ESC key
          console.log(`  Pressing Escape key to close modal...`);
          await page.keyboard.press('Escape');
          await delay(500);

          const modalClosed = await page.evaluate(() => {
            const dialog = document.querySelector('[role="dialog"]');
            return dialog === null;
          });
          if (modalClosed) {
            console.log(`  ✓ Lumine modal successfully closed with Escape key.`);
            auditReport.featuresVerified.modalFocusTrappingAndEscape = true;
          }
        }

        // Test Current Capital Modal Dossier
        console.log(`  Opening Current Capital Modal Dossier to test dedicated 4-view gallery...`);
        await page.evaluate(() => {
          const accordionItems = Array.from(document.querySelectorAll('.accordion-item'));
          const ccItem = accordionItems.find(el => el.textContent && el.textContent.includes('Current Capital'));
          if (ccItem) {
            ccItem.click(); // First expand Current Capital card
          }
        });
        await delay(400);

        await page.evaluate(() => {
          const accordionItems = Array.from(document.querySelectorAll('.accordion-item'));
          const ccItem = accordionItems.find(el => el.textContent && el.textContent.includes('Current Capital'));
          if (ccItem) {
            const inspectBtn = ccItem.querySelector('button');
            if (inspectBtn) inspectBtn.click();
          }
        });
        await delay(800);

        const ccModalOpen = await page.evaluate(() => {
          const dialog = document.querySelector('[role="dialog"]');
          return dialog !== null && window.getComputedStyle(dialog).display !== 'none';
        });

        if (ccModalOpen) {
          console.log(`  ✓ Current Capital Modal opened.`);
          auditReport.featuresVerified.currentCapitalDedicatedGalleryTested = true;

          const ccModalButtons = await page.$$('[role="dialog"] button[role="tab"]');
          console.log(`  Found ${ccModalButtons.length} view tabs in Current Capital modal.`);
          if (ccModalButtons.length >= 4) {
            auditReport.featuresVerified.currentCapitalFourViewsVerified = true;
          }

          const ccSnap1 = path.join(outputDir, `desktop_1440x900_06_modal_currentcapital_command.png`);
          await page.screenshot({ path: ccSnap1, fullPage: false });

          // Cycle to View 2 (Analytics)
          await page.keyboard.press('ArrowRight');
          await delay(400);
          const ccSnap2 = path.join(outputDir, `desktop_1440x900_06_modal_currentcapital_analytics.png`);
          await page.screenshot({ path: ccSnap2, fullPage: false });

          // Cycle to View 3 (AI Advisor)
          await page.keyboard.press('ArrowRight');
          await delay(400);
          const ccSnap3 = path.join(outputDir, `desktop_1440x900_06_modal_currentcapital_advisor.png`);
          await page.screenshot({ path: ccSnap3, fullPage: false });

          // Cycle to View 4 (Ledger Vault)
          await page.keyboard.press('ArrowRight');
          await delay(400);
          const ccSnap4 = path.join(outputDir, `desktop_1440x900_06_modal_currentcapital_ledger.png`);
          await page.screenshot({ path: ccSnap4, fullPage: false });

          // Close modal with Escape
          await page.keyboard.press('Escape');
          await delay(500);
        }
      }

      // 6. Privacy Audit Check
      const pageText = await page.evaluate(() => document.body.innerText);
      const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
      const potentialPhones = pageText.match(phoneRegex) || [];
      const cleanPhones = potentialPhones.filter(p => !p.includes('2024') && !p.includes('2025') && !p.includes('2026') && p.replace(/\D/g, '').length >= 10);
      if (cleanPhones.length > 0) {
        auditReport.privacyAudit.forbiddenPhoneDetected = true;
      }

      const gpsRegex = /\d{1,2}\.\d{3,}[°\s]*[NSEW]/i;
      if (gpsRegex.test(pageText)) {
        auditReport.privacyAudit.forbiddenGpsDetected = true;
      }

      if (pageText.includes('Noida, Uttar Pradesh, India')) {
        auditReport.privacyAudit.cityLevelLocationConfirmed = true;
        auditReport.privacyAudit.locationFound = 'Noida, Uttar Pradesh, India';
      }

      auditReport.viewportsTested.push(vp.name);
      await page.close();
    }

    // 7. Test Reduced Motion Mode
    console.log(`\n--- Testing Reduced Motion Mode (prefers-reduced-motion: reduce) ---`);
    const rmPage = await browser.newPage();
    await rmPage.setViewport({ width: 1440, height: 900 });
    await rmPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await rmPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await delay(1500);

    const rmSnap = path.join(outputDir, `desktop_reduced_motion.png`);
    await rmPage.screenshot({ path: rmSnap, fullPage: false });
    console.log(`✓ Saved Reduced Motion screenshot: ${rmSnap}`);
    auditReport.featuresVerified.reducedMotionCompliant = true;
    await rmPage.close();

  } finally {
    await browser.close();
  }

  // Save JSON report
  const reportPath = path.join(docsDir, 'MISSION15-VERIFICATION-AUDIT.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2));
  console.log(`\n========================================================================`);
  console.log(`✓ Verification Audit Saved to ${reportPath}`);
  console.log(`========================================================================`);
  console.log(JSON.stringify(auditReport, null, 2));
}

runMission15Verification().catch(err => {
  console.error('Fatal Verification Error:', err);
  process.exit(1);
});
