const puppeteer = require('puppeteer');
const path = require('path');

async function capture() {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  const viewports = [
    { width: 1440, height: 900, name: 'desktop' },
    { width: 390, height: 844, name: 'mobile' }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    console.log(`Navigating to http://localhost:3000 at ${vp.name}...`);
    try {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
      // Scroll down slowly to trigger animations
      for (let i = 0; i < 15; i++) {
        await page.mouse.wheel({ deltaY: 800 });
        await new Promise(r => setTimeout(r, 800));
      }
      
      const screenshotPath = path.join('/home/rayhan/.gemini/antigravity-ide/brain/f4b41f57-608b-4ed3-8f69-8e9811565544', `qa_v14_${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Saved screenshot to ${screenshotPath}`);
    } catch (e) {
      console.error(`Error taking screenshot for ${vp.name}:`, e);
    }
  }

  await browser.close();
}

capture();
