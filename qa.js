const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  }).then(ctx => ctx.newPage());
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait a moment for animations
  await page.waitForTimeout(3000);
  
  const dest = path.join('/home/rayhan/.gemini/antigravity-ide/brain/f4b41f57-608b-4ed3-8f69-8e9811565544', 'qa_v11_2.png');
  await page.screenshot({ path: dest, fullPage: true });
  
  await browser.close();
  console.log(`Screenshot saved to ${dest}`);
})();
