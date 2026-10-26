import puppeteer from "puppeteer-core";

const CHROME_PATH = "/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome";
const BASE_URL = "http://localhost:3000";

async function verifyAnalytics() {
  console.log("=== VERCEL WEB ANALYTICS COMPREHENSIVE VERIFICATION ===");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Enable request interception so we can simulate Vercel Edge script serving for /_vercel/insights/script.js
  await page.setRequestInterception(true);

  const interceptedRequests = [];
  const consoleErrors = [];

  page.on("request", (req) => {
    const url = req.url();
    if (url.includes("/_vercel/insights/script.js")) {
      interceptedRequests.push(url);
      console.log(`[Vercel Edge Simulation] Responding 200 to ${url}`);
      // Return a lightweight stub or valid analytics stub matching va script
      req.respond({
        status: 200,
        contentType: "application/javascript",
        body: `
          window.vaLoaded = true;
          if (window.vaq) {
            window.vaProcessed = [...window.vaq];
          }
        `,
      });
    } else {
      req.continue();
    }
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
      console.error("[Console Error]", msg.text());
    }
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1200));

  const homepageAudit = await page.evaluate(() => {
    const scriptEl = document.querySelector('script[src*="insights"], script[src*="va.vercel-scripts.com"]');
    return {
      hasWindowVa: typeof window.va === "function",
      vaQueueLength: window.vaq?.length || 0,
      vaQueue: window.vaq,
      scriptFound: !!scriptEl,
      scriptSrc: scriptEl?.getAttribute("src") || null,
      dataset: scriptEl ? { ...scriptEl.dataset } : null,
      vaLoaded: window.vaLoaded === true,
      vaProcessed: window.vaProcessed || null,
    };
  });

  console.log("\nHomepage Analytics Audit Result:");
  console.log(JSON.stringify(homepageAudit, null, 2));

  // Navigate to /privacy
  console.log("\nNavigating to /privacy to verify route tracking...");
  await page.goto(`${BASE_URL}/privacy`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1000));

  const privacyAudit = await page.evaluate(() => {
    return {
      hasWindowVa: typeof window.va === "function",
      vaQueueLength: window.vaq?.length || 0,
      vaQueue: window.vaq,
    };
  });

  console.log("Privacy Page Analytics Audit Result:");
  console.log(JSON.stringify(privacyAudit, null, 2));

  console.log(`\nConsole Errors Count: ${consoleErrors.length}`);
  console.log(`Intercepted /_vercel/insights/script.js requests: ${interceptedRequests.length}`);

  const passed =
    consoleErrors.length === 0 &&
    homepageAudit.hasWindowVa &&
    homepageAudit.scriptFound &&
    homepageAudit.scriptSrc === "/_vercel/insights/script.js" &&
    homepageAudit.dataset?.sdkn === "@vercel/analytics/next" &&
    homepageAudit.dataset?.sdkv === "2.0.1" &&
    homepageAudit.vaLoaded === true &&
    interceptedRequests.length >= 1;

  console.log(`\nOverall Verification Result: ${passed ? "SUCCESS (ALL CRITERIA PASSED)" : "FAILED"}`);

  await browser.close();

  if (!passed) {
    process.exit(1);
  }
}

verifyAnalytics().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
