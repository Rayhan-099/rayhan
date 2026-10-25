import fs from "fs";
import path from "path";

const HERO_ORIG = "/home/rayhan/Videos/hero-frames";
const HERO_WEBP = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/hero-frames";
const ABOUT_ORIG = "/home/rayhan/Videos/frames";
const ABOUT_WEBP = "/mnt/d/Vyuk Projects/Rayhan-Portfolio/public/frames";

function getDirStats(dir, ext) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith(ext));
  let totalBytes = 0;
  for (const f of files) {
    totalBytes += fs.statSync(path.join(dir, f)).size;
  }
  return {
    count: files.length,
    totalBytes,
    totalMB: (totalBytes / (1024 * 1024)).toFixed(2)
  };
}

function compareSampleFrames(dirOrig, dirWebp, samples) {
  const rows = [];
  for (const num of samples) {
    const padNum = String(num).padStart(3, "0");
    const origFile = path.join(dirOrig, `ezgif-frame-${padNum}.jpg`);
    const webpFile = path.join(dirWebp, `ezgif-frame-${padNum}.webp`);

    if (fs.existsSync(origFile) && fs.existsSync(webpFile)) {
      const origSize = fs.statSync(origFile).size;
      const webpSize = fs.statSync(webpFile).size;
      const savingsPercent = (((origSize - webpSize) / origSize) * 100).toFixed(2);
      rows.push({
        frame: `ezgif-frame-${padNum}`,
        jpegBytes: origSize,
        webpBytes: webpSize,
        savingsBytes: origSize - webpSize,
        savingsPercent: `${savingsPercent}%`
      });
    }
  }
  return rows;
}

const heroOrigStats = getDirStats(HERO_ORIG, ".jpg");
const heroWebpStats = getDirStats(HERO_WEBP, ".webp");
const aboutOrigStats = getDirStats(ABOUT_ORIG, ".jpg");
const aboutWebpStats = getDirStats(ABOUT_WEBP, ".webp");

const heroSamples = compareSampleFrames(HERO_ORIG, HERO_WEBP, [1, 150, 300]);
const aboutSamples = compareSampleFrames(ABOUT_ORIG, ABOUT_WEBP, [1, 120, 241]);

const totalOrigBytes = heroOrigStats.totalBytes + aboutOrigStats.totalBytes;
const totalWebpBytes = heroWebpStats.totalBytes + aboutWebpStats.totalBytes;
const totalSavingsBytes = totalOrigBytes - totalWebpBytes;
const overallSavingsPercent = (((totalOrigBytes - totalWebpBytes) / totalOrigBytes) * 100).toFixed(2);

const auditReport = {
  summary: {
    totalFramesEvaluated: heroWebpStats.count + aboutWebpStats.count,
    originalJpegMB: (totalOrigBytes / (1024 * 1024)).toFixed(2),
    optimizedWebpMB: (totalWebpBytes / (1024 * 1024)).toFixed(2),
    totalSavedMB: (totalSavingsBytes / (1024 * 1024)).toFixed(2),
    overallSavingsPercent: `${overallSavingsPercent}%`
  },
  heroSequence: {
    frameCount: heroWebpStats.count,
    originalJpegMB: heroOrigStats.totalMB,
    optimizedWebpMB: heroWebpStats.totalMB,
    savingsPercent: `${(((heroOrigStats.totalBytes - heroWebpStats.totalBytes) / heroOrigStats.totalBytes) * 100).toFixed(2)}%`,
    sampleFrames: heroSamples
  },
  aboutSequence: {
    frameCount: aboutWebpStats.count,
    originalJpegMB: aboutOrigStats.totalMB,
    optimizedWebpMB: aboutWebpStats.totalMB,
    savingsPercent: `${(((aboutOrigStats.totalBytes - aboutWebpStats.totalBytes) / aboutOrigStats.totalBytes) * 100).toFixed(2)}%`,
    sampleFrames: aboutSamples
  }
};

console.log("=== WEBP ASSET QUALITY & PERFORMANCE AUDIT ===");
console.log(JSON.stringify(auditReport, null, 2));

fs.writeFileSync(
  "/mnt/d/Vyuk Projects/Rayhan-Portfolio/screenshots_mission8/webp-audit-results.json",
  JSON.stringify(auditReport, null, 2)
);
