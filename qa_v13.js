const { chromium } = require('@playwright/test');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Wait a bit for animations
    await page.waitForTimeout(4000);
    
    await page.screenshot({ path: '/home/rayhan/.gemini/antigravity-ide/brain/f4b41f57-608b-4ed3-8f69-8e9811565544/qa_v13.png' });
    console.log("Screenshot taken: qa_v13.png");
  } catch (e) {
    console.error("Failed to take screenshot", e);
  } finally {
    await browser.close();
  }
}
run();
