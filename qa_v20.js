const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log("Navigating to http://localhost:3000 ...");
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  
  if (!fs.existsSync('screenshots_v20')) fs.mkdirSync('screenshots_v20');
  
  const viewports = [
    { width: 1440, height: 900, name: '1440' },
    { width: 1024, height: 768, name: '1024' },
    { width: 768, height: 1024, name: '768' },
    { width: 390, height: 844, name: '390' }
  ];
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(1000); // let layout settle, including Three.js
    await page.screenshot({ path: path.join('screenshots_v20', `v20_${vp.name}.png`), fullPage: true });
    console.log(`Saved screenshot for ${vp.name}`);
  }
  
  // Try to find the view archive button and click it
  const viewAllBtn = await page.$('text="View Archive"');
  if (viewAllBtn) {
    console.log("Found View Archive button, clicking...");
    await viewAllBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join('screenshots_v20', `v20_view_all_open.png`) });
    console.log("Saved screenshot after clicking View Archive");
  } else {
    console.log("View Archive button not found");
  }
  
  await browser.close();
}

run().catch(console.error);
