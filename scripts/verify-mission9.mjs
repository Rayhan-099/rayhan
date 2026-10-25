import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const puppeteer = require("/mnt/d/Vyuk Projects/Rayhan-099/node_modules/puppeteer-core");

const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const PORTFOLIO_URL = "http://localhost:3000";
const OUTPUT_DIR = path.resolve("./screenshots_mission9_verification");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "desktop_1440x900", width: 1440, height: 900 },
  { name: "desktop_1280x800", width: 1280, height: 800 },
  { name: "mobile_390x844", width: 390, height: 844 },
  { name: "mobile_360x800", width: 360, height: 800 },
];

async function verify() {
  console.log("=== EXECUTING MISSION 9 MULTI-VIEWPORT VERIFICATION ===");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const results = {
    viewportsTested: [],
    consoleErrors: [],
    failedRequests: [],
    privacyPassed: true,
    flexCarouselMounted: false,
    worksWheelMounted: false,
    modalInteractive: false,
  };

  const page = await browser.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("[Console Error]:", msg.text());
      results.consoleErrors.push(msg.text());
    }
  });

  page.on("requestfailed", (req) => {
    console.error("[Request Failed]:", req.url(), req.failure()?.errorText);
    results.failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
  });

  // Verify across all viewports
  for (const vp of VIEWPORTS) {
    console.log(`\nTesting viewport: ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(PORTFOLIO_URL, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1200));

    // Capture Hero
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_01_hero.png`),
      fullPage: false,
    });

    // Check Privacy on 1440
    if (vp.name === "desktop_1440x900") {
      const pageText = await page.evaluate(() => document.body.innerText);
      if (pageText.includes("28.5355") || pageText.includes("9315945414")) {
        results.privacyPassed = false;
        console.error("FAIL: Stale coordinates or phone number detected!");
      } else {
        console.log("PASS: Privacy scrub confirmed. Exact coordinates & phone absent.");
      }

      // Check FlexCarousel WebGL Canvas
      const hasFlexCarousel = await page.evaluate(() => {
        const carousel = document.querySelector(".flex-carousel");
        const canvas = carousel ? carousel.querySelector("canvas") : null;
        return !!carousel && !!canvas;
      });
      results.flexCarouselMounted = hasFlexCarousel;
      console.log(`FlexCarousel mounted with WebGL canvas: ${hasFlexCarousel}`);

      // Check WorksWheel
      const hasWorksWheel = await page.evaluate(() => {
        const wheel = document.querySelector('[role="listbox"][aria-label="3D Cylindrical Projects Wheel"]') ||
                      document.querySelector('[id^="works-card-"]');
        return !!wheel;
      });
      results.worksWheelMounted = hasWorksWheel;
      console.log(`WorksWheel3D mounted: ${hasWorksWheel}`);

      // Test Project Modal interaction
      const modalTest = await page.evaluate(async () => {
        const btn = Array.from(document.querySelectorAll("button")).find((b) =>
          b.innerText.toLowerCase().includes("inspect full dossier")
        );
        if (!btn) return false;
        btn.click();
        await new Promise((r) => setTimeout(r, 600));
        const modal = document.querySelector('[role="dialog"]');
        const modalVisible = !!modal;
        // Close with escape
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        await new Promise((r) => setTimeout(r, 400));
        return modalVisible;
      });
      results.modalInteractive = modalTest;
      console.log(`Project modal interactive: ${modalTest}`);
    }

    // Scroll to About section and capture
    await page.evaluate(() => {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_02_about.png`),
      fullPage: false,
    });

    // Scroll to Projects section (FlexCarousel) and capture
    await page.evaluate(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_03_projects_flexcarousel.png`),
      fullPage: false,
    });

    // Scroll to Experience section and capture
    await page.evaluate(() => {
      const el = document.getElementById("experience");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_04_experience.png`),
      fullPage: false,
    });

    // Scroll to Skills section and capture
    await page.evaluate(() => {
      const el = document.getElementById("skills");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_05_skills.png`),
      fullPage: false,
    });

    // Scroll to Contact section and capture
    await page.evaluate(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${vp.name}_06_contact.png`),
      fullPage: false,
    });

    results.viewportsTested.push(vp.name);
  }

  await browser.close();

  console.log("\n=== MISSION 9 VERIFICATION SUMMARY ===");
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "verification-summary.json"),
    JSON.stringify(results, null, 2)
  );

  if (results.consoleErrors.length > 0) {
    console.warn(`WARNING: Encountered ${results.consoleErrors.length} console errors.`);
  }
  if (!results.privacyPassed) {
    throw new Error("Privacy verification failed!");
  }
}

verify().catch((err) => {
  console.error("Verification script failed:", err);
  process.exit(1);
});
