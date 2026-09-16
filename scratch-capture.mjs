import { chromium } from 'playwright';

const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rayhan-iota.vercel.app/', { waitUntil: 'networkidle' });
  
  for (const vp of viewports) {
    await page.setViewportSize(vp);
    await page.waitForTimeout(3000); // Wait for atmospheric animations to settle
    await page.screenshot({ path: `/home/rayhan/.gemini/antigravity-ide/brain/55c75a43-790b-40ca-a70b-da07a22b99af/scratch/live_${vp.width}x${vp.height}.png`, fullPage: true });
  }
  await browser.close();
})();
