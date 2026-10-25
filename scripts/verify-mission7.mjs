import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire("/mnt/d/Vyuk Projects/Rayhan-099/package.json");
const puppeteer = require("puppeteer");

const chromePath = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const OUTPUT_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/screenshots/mission7_verification";

async function verify() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Launching Headless Chromium for Mission 7 Full-Site Verification...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const viewports = [
    { name: "desktop_1440", width: 1440, height: 900 },
    { name: "desktop_1280", width: 1280, height: 800 },
    { name: "mobile_390", width: 390, height: 844 },
    { name: "mobile_360", width: 360, height: 800 }
  ];

  let totalErrors = 0;

  for (const vp of viewports) {
    console.log(`\n========================================`);
    console.log(`Auditing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const page = await browser.newPage();
    const consoleErrors = [];
    const failedRequests = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("requestfailed", (req) => {
      failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText}`);
    });

    try {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 1200));

      // 1. Hero Check
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_01_hero.png`) });

      // 2. Hero Scrolled
      await page.evaluate(() => window.scrollTo(0, 400));
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_02_hero_scrolled.png`) });

      // 3. About Sequence (Start, Expanded, and Identity Showcase)
      await page.evaluate(() => {
        const el = document.getElementById("about");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_03_about_start.png`) });

      // Expand card
      await page.evaluate(() => window.scrollBy(0, 1000));
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_04_about_expanded.png`) });

      // Unpin into Editorial Identity Showcase
      await page.evaluate(() => {
        const el = document.querySelector(".identity-showcase");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_05_about_identity_showcase.png`) });

      // Verify headshot image loaded in the DOM
      const headshotStats = await page.evaluate(() => {
        const img = document.querySelector(".identity-showcase img");
        if (!img) return { found: false };
        return {
          found: true,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          alt: img.getAttribute("alt"),
          currentSrc: img.currentSrc
        };
      });
      console.log(`[${vp.name}] Personal Headshot Status:`, headshotStats);

      // 4. Projects Check
      await page.evaluate(() => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_06_projects.png`) });

      // 5. Experience Check (Confirm AKTU and zero Amity references)
      await page.evaluate(() => {
        const el = document.getElementById("experience");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_07_experience.png`) });

      const textCheck = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        return {
          hasAKTU: bodyText.includes("Dr. A.P.J. Abdul Kalam Technical University (AKTU)") || bodyText.includes("AKTU"),
          hasAmity: bodyText.includes("Amity University")
        };
      });
      console.log(`[${vp.name}] Factual Verification:`, textCheck);

      // 6. Skills Check (Redesigned Section)
      await page.evaluate(() => {
        const el = document.getElementById("skills");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_08_skills_redesign.png`) });

      // Test filter interaction
      if (vp.width >= 768) {
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll("#skills button"));
          const langBtn = btns.find((b) => b.innerText.includes("Languages"));
          if (langBtn) langBtn.click();
        });
        await new Promise((r) => setTimeout(r, 400));
        await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_08b_skills_filtered.png`) });
      }

      // 7. Achievements & Education
      await page.evaluate(() => {
        const el = document.getElementById("achievements");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_09_achievements.png`) });

      await page.evaluate(() => {
        const el = document.getElementById("education");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_10_education.png`) });

      // 8. Certifications Check (Interactive Filter)
      await page.evaluate(() => {
        const el = document.getElementById("certifications");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_11_certifications_featured.png`) });

      // Click "All Archive (30)"
      const certCountBefore = await page.evaluate(() => document.querySelectorAll(".cert-item").length);
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll("#certifications button"));
        const allBtn = btns.find((b) => b.innerText.toLowerCase().includes("all archive"));
        if (allBtn) allBtn.click();
      });
      await new Promise((r) => setTimeout(r, 600));
      const certCountAfter = await page.evaluate(() => document.querySelectorAll(".cert-item").length);
      console.log(`[${vp.name}] Certifications Count: Featured=${certCountBefore}, AllArchive=${certCountAfter}`);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_11b_certifications_all.png`) });

      // 9. Contact & Footer
      await page.evaluate(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_12_contact_footer.png`) });

      // 10. Bidirectional Scrubbing Check (Reverse scroll back to top)
      console.log(`[${vp.name}] Testing smooth reverse scrub to top...`);
      await page.evaluate(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}_13_top_after_reverse_scrub.png`) });

      console.log(`[${vp.name}] Console Errors:`, consoleErrors);
      console.log(`[${vp.name}] Failed Requests:`, failedRequests);

      totalErrors += consoleErrors.length + failedRequests.length;
    } catch (e) {
      console.error(`Error during ${vp.name} audit:`, e);
      totalErrors++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`\n========================================`);
  console.log(`VERIFICATION COMPLETE.`);
  console.log(`Total Errors / Network Failures: ${totalErrors}`);
  console.log(`Screenshots stored in: ${OUTPUT_DIR}`);
  console.log(`========================================`);
  
  if (totalErrors > 0) process.exit(1);
}

verify();
