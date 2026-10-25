import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('/mnt/d/Vyuk Projects/Rayhan-099/package.json');
const puppeteer = require('puppeteer-core');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../screenshots_hero_variants');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const viewports = [
  { name: 'desktop_1440x900', width: 1440, height: 900, isMobile: false },
  { name: 'desktop_1280x800', width: 1280, height: 800, isMobile: false },
  { name: 'mobile_390x844', width: 390, height: 844, isMobile: true }
];

const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";

async function captureHeroVariants() {
  console.log('=== CAPTURING HERO COMPOSITION VARIANTS (A vs B) ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const variants = ['A', 'B'];

  for (const vp of viewports) {
    for (const v of variants) {
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile
      });

      const url = `http://localhost:3000?hero=${v}`;
      console.log(`Capturing ${vp.name} with Variant ${v}...`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
      // Allow initial entrance animations to settle
      await new Promise(r => setTimeout(r, 1800));

      const screenshotPath = path.join(outputDir, `hero_variant_${v}_${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Saved: ${screenshotPath}`);
      await page.close();
    }
  }

  await browser.close();
  console.log('=== HERO VARIANTS CAPTURE COMPLETE ===');
}

captureHeroVariants().catch(err => {
  console.error('Error capturing hero variants:', err);
  process.exit(1);
});
