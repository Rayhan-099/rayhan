import { chromium } from 'playwright';

const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 375, height: 812 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    
    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(1000); // Wait for atmospheric animations to settle
      
      // Scroll down slowly to trigger all IntersectionObservers and Framer Motion whileInView
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 50);
        });
      });
      
      // Scroll back up to the top before taking fullPage screenshot
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000); // Let it settle back
      
      await page.screenshot({ path: `/home/rayhan/.gemini/antigravity-ide/brain/55c75a43-790b-40ca-a70b-da07a22b99af/scratch/local_${vp.width}x${vp.height}.png`, fullPage: true });
    }
  } catch (error) {
    console.error("Error capturing screenshots:", error);
  } finally {
    await browser.close();
  }
})();
