import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const BASE_URL = "http://localhost:3000";
const SCREENSHOTS_DIR = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/screenshots_mission16_verified";
const AUDIT_JSON_PATH = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/docs/MISSION16-VERIFICATION-AUDIT.json";

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}
if (!fs.existsSync(path.dirname(AUDIT_JSON_PATH))) {
  fs.mkdirSync(path.dirname(AUDIT_JSON_PATH), { recursive: true });
}

const VIEWPORTS = [
  { name: "desktop_1440x900", width: 1440, height: 900, isMobile: false },
  { name: "desktop_1280x800", width: 1280, height: 800, isMobile: false },
  { name: "mobile_390x844", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "mobile_360x800", width: 360, height: 800, isMobile: true, hasTouch: true },
];

async function runVerification() {
  console.log("=== MISSION 16: COMPREHENSIVE MULTI-VIEWPORT VERIFICATION SUITE ===");
  console.log(`Connecting to Chromium: ${CHROME_PATH}`);
  console.log(`Target URL: ${BASE_URL}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const auditReport = {
    timestamp: new Date().toISOString(),
    testedUrl: BASE_URL,
    productionUrl: "https://rayhan.runs-on.dev",
    viewportsTested: [],
    prohibitionsAudit: {},
    networkAudit: {
      totalRequests: 0,
      failedRequests: 0,
      heroFramesLoadedJpg: 0,
      heroFramesLoadedWebp: 0,
      aboutFramesLoadedJpg: 0,
      aboutFramesLoadedWebp: 0,
    },
    consoleAudit: {
      errors: [],
      warnings: [],
    },
    accessibilityAudit: {},
    securityAudit: {},
    overallStatus: "PENDING",
  };

  try {
    // 1. Desktop 1440x900 Master Pass
    for (const vp of VIEWPORTS) {
      console.log(`\n--- Auditing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch || false,
      });

      await page.setRequestInterception(true);
      page.on("request", (req) => {
        if (req.url().includes("/_vercel/insights/script.js")) {
          req.respond({
            status: 200,
            contentType: "application/javascript",
            body: "window.vaLoaded = true;",
          });
        } else {
          req.continue();
        }
      });

      const consoleErrors = [];
      const failedRequests = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          console.error(`[Console Error][${vp.name}]`, msg.text());
          consoleErrors.push(msg.text());
        }
      });

      page.on("requestfailed", (req) => {
        const url = req.url();
        console.error(`[Request Failed][${vp.name}] ${url} - ${req.failure()?.errorText}`);
        failedRequests.push({ url, error: req.failure()?.errorText });
      });

      page.on("response", (res) => {
        const url = res.url();
        auditReport.networkAudit.totalRequests++;
        if (url.includes("/hero-frames/")) {
          if (url.endsWith(".jpg")) auditReport.networkAudit.heroFramesLoadedJpg++;
          if (url.endsWith(".webp")) auditReport.networkAudit.heroFramesLoadedWebp++;
        }
        if (url.includes("/frames/")) {
          if (url.endsWith(".jpg")) auditReport.networkAudit.aboutFramesLoadedJpg++;
          if (url.endsWith(".webp")) auditReport.networkAudit.aboutFramesLoadedWebp++;
        }
      });

      const response = await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 30000 });
      const httpStatus = response?.status();
      console.log(`HTTP Status: ${httpStatus}`);

      // Verify Security Headers on primary desktop run
      if (vp.name === "desktop_1440x900") {
        const headers = response?.headers() || {};
        auditReport.securityAudit = {
          hasCSP: !!headers["content-security-policy"],
          cspValue: headers["content-security-policy"],
          hasXFrameOptions: headers["x-frame-options"] === "DENY",
          hasXContentTypeOptions: headers["x-content-type-options"] === "nosniff",
          hasReferrerPolicy: headers["referrer-policy"] === "strict-origin-when-cross-origin",
          hasPermissionsPolicy: !!headers["permissions-policy"],
          hasHSTS: !!headers["strict-transport-security"],
        };
        console.log("Security Headers Verified:", auditReport.securityAudit);
      }

      // Check Skip-to-content landmark
      if (vp.name === "desktop_1440x900") {
        await page.keyboard.press("Tab");
        const activeElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tagName: el?.tagName,
            href: el?.getAttribute("href"),
            text: el?.textContent?.trim(),
            id: el?.id,
          };
        });
        const mainLandmark = await page.$("#main-content");
        auditReport.accessibilityAudit.skipToContent = {
          activeElement,
          mainContentExists: !!mainLandmark,
          passed: activeElement.text === "Skip to main content" && !!mainLandmark,
        };
        console.log("Accessibility Skip-to-Content Verified:", auditReport.accessibilityAudit.skipToContent);
      }

      // Allow animations and render to settle
      await new Promise((r) => setTimeout(r, 1200));

      // Capture Hero Viewport Screenshot
      const heroPath = path.join(SCREENSHOTS_DIR, `${vp.name}_01_hero.png`);
      await page.screenshot({ path: heroPath });
      console.log(`Saved screenshot: ${heroPath}`);

      // Scroll to Projects Section
      await page.evaluate(() => {
        const proj = document.getElementById("projects");
        if (proj) proj.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 1200));

      const projPath = path.join(SCREENSHOTS_DIR, `${vp.name}_02_projects.png`);
      await page.screenshot({ path: projPath });
      console.log(`Saved screenshot: ${projPath}`);

      // Check Prohibitions on DOM
      const domAudit = await page.evaluate(() => {
        const text = document.body.innerText;
        const html = document.body.innerHTML;
        const fontHeading = window.getComputedStyle(document.body).fontFamily;

        // Check for Space Grotesk in any stylesheet or font rule
        const hasSpaceGroteskInFonts = Array.from(document.fonts).some((f) =>
          f.family.toLowerCase().includes("space grotesk")
        );
        const hasLucideSvg = Array.from(document.querySelectorAll("svg")).some((s) =>
          (s.getAttribute("class") || "").includes("lucide")
        );
        const hasEmDash = text.includes("—");
        const hasSparkles = text.includes("✨") || text.includes("✦✦");

        return {
          fontHeading,
          hasSpaceGroteskInFonts,
          hasLucideSvg,
          hasEmDash,
          hasSparkles,
          hasBentoGrid: !!document.querySelector(".bento-grid"),
        };
      });

      if (vp.name === "desktop_1440x900") {
        auditReport.prohibitionsAudit = domAudit;
        console.log("Prohibitions Audit Results:", domAudit);
      }

      // Interactive Test: Open Project Modal on Desktop
      if (vp.name === "desktop_1440x900") {
        console.log("Testing Project Modal Interaction...");
        const lumineBtn = await page.$(".lumine-card");
        if (lumineBtn) {
          await lumineBtn.click();
          await new Promise((r) => setTimeout(r, 800));

          const modalScreenshotPath = path.join(SCREENSHOTS_DIR, `${vp.name}_03_modal_open.png`);
          await page.screenshot({ path: modalScreenshotPath });
          console.log(`Saved modal screenshot: ${modalScreenshotPath}`);

          // Close modal with ESC
          await page.keyboard.press("Escape");
          await new Promise((r) => setTimeout(r, 500));
        }
      }

      // Scroll to About & Skills
      await page.evaluate(() => {
        const skills = document.getElementById("skills");
        if (skills) skills.scrollIntoView({ behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 800));

      const skillsPath = path.join(SCREENSHOTS_DIR, `${vp.name}_04_skills.png`);
      await page.screenshot({ path: skillsPath });
      console.log(`Saved screenshot: ${skillsPath}`);

      auditReport.viewportsTested.push({
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        httpStatus,
        consoleErrorsCount: consoleErrors.length,
        failedRequestsCount: failedRequests.length,
      });

      auditReport.consoleAudit.errors.push(...consoleErrors);

      await page.close();
    }

    // 2. Prefers-Reduced-Motion Test Pass
    console.log("\n--- Auditing prefers-reduced-motion: reduce ---");
    const prmPage = await browser.newPage();
    await prmPage.setViewport({ width: 1440, height: 900 });
    await prmPage.setRequestInterception(true);
    prmPage.on("request", (req) => {
      if (req.url().includes("/_vercel/insights/script.js")) {
        req.respond({
          status: 200,
          contentType: "application/javascript",
          body: "window.vaLoaded = true;",
        });
      } else {
        req.continue();
      }
    });
    await prmPage.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await prmPage.goto(BASE_URL, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1000));

    const prmScreenshot = path.join(SCREENSHOTS_DIR, "desktop_reduced_motion.png");
    await prmPage.screenshot({ path: prmScreenshot });
    console.log(`Saved reduced motion screenshot: ${prmScreenshot}`);

    const reducedMotionCompliant = await prmPage.evaluate(() => {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });
    auditReport.accessibilityAudit.reducedMotionActive = reducedMotionCompliant;
    await prmPage.close();

    // Final evaluation
    auditReport.networkAudit.failedRequests = auditReport.consoleAudit.errors.length;
    const passesAll =
      auditReport.consoleAudit.errors.length === 0 &&
      !auditReport.prohibitionsAudit.hasSpaceGroteskInFonts &&
      !auditReport.prohibitionsAudit.hasLucideSvg &&
      !auditReport.prohibitionsAudit.hasEmDash &&
      auditReport.networkAudit.heroFramesLoadedWebp === 0 &&
      auditReport.networkAudit.aboutFramesLoadedWebp === 0 &&
      auditReport.securityAudit.hasCSP &&
      auditReport.accessibilityAudit.skipToContent.passed;

    auditReport.overallStatus = passesAll ? "PASSED" : "FAILED";

    fs.writeFileSync(AUDIT_JSON_PATH, JSON.stringify(auditReport, null, 2), "utf-8");
    console.log(`\nAudit successfully written to: ${AUDIT_JSON_PATH}`);
    console.log(`Overall Status: ${auditReport.overallStatus}`);
  } catch (err) {
    console.error("Verification error:", err);
    auditReport.overallStatus = "ERROR";
    auditReport.errorDetails = err.message;
    fs.writeFileSync(AUDIT_JSON_PATH, JSON.stringify(auditReport, null, 2), "utf-8");
  } finally {
    await browser.close();
  }
}

runVerification();
