/**
 * Screenshot Capture Script for SNEEV
 * 
 * Captures three high-resolution screenshots from the running project:
 *   1. project-preview.png - Static preview state (boot sequence complete, default view)
 *   2. project-active.png    - Active state with terminal interaction, glitch if triggered
 *   3. project-detail.png    - Detailed view with a dossier open, sigil selected
 * 
 * Uses Puppeteer for browser automation.
 * 
 * Requirements:
 *   - Node.js ^22
 *   - Puppeteer installed: npm i puppeteer
 *   - Project running at http://localhost:5173 (or adjust URL below)
 * 
 * Output files written to: docs/images/
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outputDir = '/home/user/-_Sn33v/docs/images';
const BASE_URL = 'http://localhost:5173';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  console.log('Launching browser...\n');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Wait for the app to load
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  console.log('Page loaded. Waiting for boot sequence...\n');

  // Wait for boot to complete
  try {
    await page.waitForSelector('.booted', { timeout: 15000 });
    console.log('Boot sequence complete.\n');
  } catch (err) {
    console.warn('Boot sequence timeout or not found — proceeding anyway.', err.message);
  }

  // Wait a bit for everything to settle
  await page.waitForTimeout(2000);

  // ==========================================
  // Screenshot 1: Project Preview (default state)
  // ==========================================

  console.log('Capturing project-preview.png...');
  await page.screenshot({
    path: path.join(outputDir, 'project-preview.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // ==========================================
  // Screenshot 2: Project Active (with interaction)
  // ==========================================

  // Trigger glitch and open first dossier
  await page.evaluate(() => {
    const invokeBtn = document.querySelector('button[onClick*="triggerGlitch"]');
    if (invokeBtn) {
      const evt = new MouseEvent('click', { bubbles: true });
      invokeBtn.dispatchEvent(evt);
    }
    // Open first dossier
    const dossierBtn = document.querySelector('button[data-dsr-001]');
    if (dossierBtn) dossierBtn.click();
  });

  await page.waitForTimeout(1000);

  console.log('Capturing project-active.png...');
  await page.screenshot({
    path: path.join(outputDir, 'project-active.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // ==========================================
  // Screenshot 3: Project Detail (dossier + sigil)
  // ==========================================

  // Select sigil index 1 (SIGIL-β)
  await page.evaluate(() => {
    const sigilBtn = document.querySelector('button[onclick*="setActive(1)"]');
    if (sigilBtn) sigilBtn.click();
  });

  await page.waitForTimeout(500);

  // Open DSR-003 dossier for detail view
  await page.evaluate(() => {
    const dossierBtn = document.querySelector('button[data-dsr-003]');
    if (dossierBtn) dossierBtn.click();
  });

  await page.waitForTimeout(1000);

  console.log('Capturing project-detail.png...');
  await page.screenshot({
    path: path.join(outputDir, 'project-detail.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  await browser.close();
  console.log('\nAll screenshots captured successfully!');
  console.log('Output files:' );
  console.log('  - docs/images/project-preview.png' );
  console.log('  - docs/images/project-active.png' );
  console.log('  - docs/images/project-detail.png' );
})().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});