const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = '/home/rayhan/.gemini/antigravity-ide/brain/b9def449-3a07-499a-a665-f6e2d16c7be1';

const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1728', width: 1728, height: 1117 },
  { name: '768', width: 768, height: 1024 },
  { name: '390', width: 390, height: 844 },
];

const themes = ['dusk', 'dawn'];

(async () => {
  const browser = await chromium.launch();
  
  for (const theme of themes) {
    for (const vp of viewports) {
      console.log(`Processing ${theme} at ${vp.width}x${vp.height}...`);
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      
      // Inject theme into localStorage before visiting so it loads correctly
      await context.addInitScript((t) => {
        localStorage.setItem('theme', t);
      }, theme);
      
      const page = await context.newPage();
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      
      // Additional wait for R3F Canvas to initialize and initial Framer Motion load
      await page.waitForTimeout(3000);
      
      const dest = path.join(ARTIFACT_DIR, `qa_v16_${theme}_${vp.name}.png`);
      await page.screenshot({ path: dest, fullPage: true });
      console.log(`Saved ${dest}`);
      
      await context.close();
    }
  }
  
  await browser.close();
  console.log('QA Matrix complete.');
})();
