// pages/api/screenshot.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' }); // Wait for all network requests to finish
    const screenshot = await page.screenshot({ path: 'public/screenshot.png', fullPage: true });
    console.log(screenshot);
    await browser.close();

    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Error taking screenshot:', error);
    res.status(500).json({ error: 'Failed to take screenshot' });
  }
}