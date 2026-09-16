import { chromium } from 'playwright';

const viewports = [
  { width: 1440, height: 900, name: 'desktop-1440' },
  { width: 1280, height: 800, name: 'desktop-1280' },
  { width: 1024, height: 768, name: 'tablet-1024' },
  { width: 768, height: 1024, name: 'tablet-768' },
  { width: 390, height: 844, name: 'mobile-390' },
  { width: 375, height: 812, name: 'mobile-375' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for entrance animations
    await page.screenshot({ path: `/home/rayhan/.gemini/antigravity-ide/brain/55c75a43-790b-40ca-a70b-da07a22b99af/scratch/${vp.name}-hero.png` });
    
    // Scroll to skills section
    await page.evaluate(() => {
      document.getElementById('skills').scrollIntoView();
    });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `/home/rayhan/.gemini/antigravity-ide/brain/55c75a43-790b-40ca-a70b-da07a22b99af/scratch/${vp.name}-skills.png` });
  }
  
  await browser.close();
})();
