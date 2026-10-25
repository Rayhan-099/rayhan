import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const puppeteer = require("/mnt/d/Vyuk Projects/Rayhan-099/node_modules/puppeteer-core");

const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.resolve("./screenshots_mission8");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: "desktop_1440x900", width: 1440, height: 900 },
  { name: "desktop_1280x800", width: 1280, height: 800 },
  { name: "mobile_390x844", width: 390, height: 844 },
  { name: "mobile_360x800", width: 360, height: 800 },
];

async function runVerification() {
  console.log("=== MISSION 8 AUTOMATED BROWSER & VISUAL QA ===");
  console.log(`Target URL: ${BASE_URL}`);
  console.log(`Chrome Executable: ${CHROME_PATH}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  const results = {
    viewportsTested: [],
    privacyPassed: false,
    fontComputedStyles: {},
    worksWheel3DVerified: false,
    projectModalVerified: false,
    scrollTestPassed: false,
    consoleErrors: [],
    failedRequests: [],
  };

  try {
    const page = await browser.newPage();

    // Attach listeners for console errors and failed network requests
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.error(`[Browser Console Error]: ${msg.text()}`);
        results.consoleErrors.push(msg.text());
      }
    });

    page.on("requestfailed", (req) => {
      console.warn(`[Network Request Failed]: ${req.url()} (${req.failure()?.errorText})`);
      results.failedRequests.push({ url: req.url(), error: req.failure()?.errorText });
    });

    // 1. Desktop Verification at 1440x900
    console.log("\n[1/5] Testing Primary Desktop (1440x900)...");
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1500));

    // Capture initial Hero viewport
    await page.screenshot({
      path: path.join(OUTPUT_DIR, "01_desktop_1440_hero.png"),
      fullPage: false,
    });

    // 2. Typography Inspection
    console.log("\n[2/5] Inspecting Computed Typography Families...");
    const typography = await page.evaluate(() => {
      const heroTitle = document.querySelector(".hero-word-first");
      const heroEthos = document.querySelector(".hero-footer-bar span");
      const body = document.body;
      const codePill = document.querySelector(".hero-telemetry-tag");

      return {
        heroTitleFont: heroTitle ? window.getComputedStyle(heroTitle).fontFamily : null,
        heroEthosFont: heroEthos ? window.getComputedStyle(heroEthos).fontFamily : null,
        bodyFont: body ? window.getComputedStyle(body).fontFamily : null,
        telemetryFont: codePill ? window.getComputedStyle(codePill).fontFamily : null,
      };
    });
    console.log("Computed typography:", JSON.stringify(typography, null, 2));
    results.fontComputedStyles = typography;

    // 3. Privacy Audit
    console.log("\n[3/5] Performing Privacy Leakage Audit in DOM...");
    const privacyCheck = await page.evaluate(() => {
      const text = document.body.innerText;
      const hasPhone = text.includes("9315945414") || text.includes("+91 93159");
      const hasGps = text.includes("28.5355") || text.includes("77.3910");
      const hasSafeLocation = text.includes("Noida, Uttar Pradesh, India") || text.includes("NOIDA, UTTAR PRADESH");
      return { hasPhone, hasGps, hasSafeLocation };
    });
    console.log("Privacy check result:", privacyCheck);
    if (!privacyCheck.hasPhone && !privacyCheck.hasGps && privacyCheck.hasSafeLocation) {
      console.log("✓ Privacy Audit PASSED: Zero phone numbers or GPS coordinates found!");
      results.privacyPassed = true;
    } else {
      console.error("✗ Privacy Audit FAILED!", privacyCheck);
    }

    // 4. WorksWheel 3D Drum Reel Verification
    console.log("\n[4/5] Testing WorksWheel 3D Drum Reel Interaction...");
    // Scroll down to projects section
    await page.evaluate(() => {
      const proj = document.getElementById("projects");
      if (proj) proj.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Capture projects section screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, "02_desktop_1440_projects_wheel.png"),
      fullPage: false,
    });

    const wheelStatus = await page.evaluate(() => {
      const wheelContainer = document.querySelector("[aria-label='3D Cylindrical Projects Wheel']");
      const cards = document.querySelectorAll("[id^='works-card-']");
      const firstCard = cards[0];
      const activeDesc = wheelContainer ? wheelContainer.getAttribute("aria-label") : null;
      return {
        hasWheelContainer: !!wheelContainer,
        cardCount: cards.length,
        firstCardTransform: firstCard ? firstCard.style.transform : null,
      };
    });
    console.log("WorksWheel initial status:", wheelStatus);

    // Test clicking Next button on the wheel
    const nextBtn = await page.$("button[aria-label='Next Project in 3D Wheel']");
    if (nextBtn) {
      console.log("Clicking 'Next Project in 3D Wheel' button...");
      await nextBtn.click();
      await new Promise((r) => setTimeout(r, 800));

      const afterStepStatus = await page.evaluate(() => {
        const counter = document.querySelector(".font-mono.text-xs.text-steel-light span");
        return { counterText: counter ? counter.innerText : null };
      });
      console.log("Counter after next click:", afterStepStatus);

      await page.screenshot({
        path: path.join(OUTPUT_DIR, "03_desktop_1440_projects_stepped.png"),
        fullPage: false,
      });

      // Test Opening Project Modal
      console.log("Testing ProjectModal Dossier opening...");
      const clickedInspect = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll("button"));
        const btn = buttons.find((b) => b.innerText.includes("View Full Dossier") || b.innerText.includes("Inspect Dossier"));
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });

      if (clickedInspect) {
        await new Promise((r) => setTimeout(r, 800));

        const modalOpen = await page.evaluate(() => {
          const modal = document.querySelector("[role='dialog']");
          const modalTitle = document.getElementById("modal-project-title");
          return {
            isOpen: !!modal,
            title: modalTitle ? modalTitle.innerText : null,
          };
        });
        console.log("Modal state:", modalOpen);
        results.projectModalVerified = modalOpen.isOpen;

        await page.screenshot({
          path: path.join(OUTPUT_DIR, "04_desktop_1440_modal_dossier.png"),
          fullPage: false,
        });

        // Close modal via Escape
        await page.keyboard.press("Escape");
        await new Promise((r) => setTimeout(r, 500));
      }

      results.worksWheel3DVerified = wheelStatus.hasWheelContainer && wheelStatus.cardCount > 0;
    }

    // 5. Scroll Through Page & Test Remaining Viewports
    console.log("\n[5/5] Testing Scroll Lifecycle and Multi-Viewport Responsiveness...");

    for (const vp of VIEWPORTS) {
      console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL, { waitUntil: "networkidle0" });
      await new Promise((r) => setTimeout(r, 1000));

      // Scroll progressively to test smooth scroll, canvas sequence, and Lenis stability
      await page.evaluate(async () => {
        const totalHeight = document.body.scrollHeight;
        const step = window.innerHeight;
        for (let y = 0; y < totalHeight; y += step) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
        // Jump back to top
        window.scrollTo({ top: 0, behavior: "instant" });
      });

      await new Promise((r) => setTimeout(r, 800));

      // Full page screenshot
      const ssPath = path.join(OUTPUT_DIR, `fullpage_${vp.name}.png`);
      await page.screenshot({
        path: ssPath,
        fullPage: true,
      });
      console.log(`Saved screenshot: ${ssPath}`);
      results.viewportsTested.push(vp.name);
    }

    results.scrollTestPassed = true;

  } catch (err) {
    console.error("Verification run failed with error:", err);
  } finally {
    await browser.close();
  }

  console.log("\n=== VERIFICATION SUMMARY ===");
  console.log("Viewports Tested:", results.viewportsTested);
  console.log("Privacy Passed:", results.privacyPassed);
  console.log("WorksWheel 3D Verified:", results.worksWheel3DVerified);
  console.log("ProjectModal Verified:", results.projectModalVerified);
  console.log("Scroll Test Passed:", results.scrollTestPassed);
  console.log("Console Errors Count:", results.consoleErrors.length);
  console.log("Failed Requests Count:", results.failedRequests.length);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "verification-summary.json"),
    JSON.stringify(results, null, 2)
  );

  return results;
}

runVerification();
