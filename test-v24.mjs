import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    // Screenshot Hero
    await page.screenshot({ path: '/home/rayhan/.gemini/antigravity-ide/brain/55c75a43-790b-40ca-a70b-da07a22b99af/scratch/hero-before.png' });
    
    // Scroll to contact and screenshot Contact
    await page.evaluate(() => {
      document.getElementById('contact').scrollIntoView();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/rayhan/.gemini/antigravity-ide/brain/55c75a43-790b-40ca-a70b-da07a22b99af/scratch/contact-before.png' });
    
    // Print DOM geometry for Hero
    const geometry = await page.evaluate(() => {
      const hero = document.getElementById('hero')?.getBoundingClientRect();
      const heroVideo = document.querySelector('.hero-global-video')?.getBoundingClientRect();
      const docHeight = document.documentElement.scrollHeight;
      return { hero, heroVideo, docHeight, winHeight: window.innerHeight };
    });
    
    console.log(JSON.stringify(geometry, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
