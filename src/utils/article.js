const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Path to the JSON file that stores the list of IDs of posted articles
const POSTED_ARTICLES_PATH = path.join(__dirname, 'postedArticles.json');

async function checkForNewArticles() {
    const browser = await puppeteer.launch({
        headless: "new", // or 'new' as the warning suggests to opt in early for the new headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    const page = await browser.newPage();

    try {
        await page.goto('https://hub.composablelabs.io/');

        // Wait for the articles to load (you may need to adjust the selector)
        await page.waitForSelector('.feeds_contentItem__YcSGj');

        const postedArticleIds = readPostedArticleIds();
        let newArticle = null;

        // Get the first article element
        const firstArticleElement = await page.$('.feeds_contentItem__YcSGj');

        if (firstArticleElement) {
            const id = await firstArticleElement.evaluate(el => el.id);
            if (!postedArticleIds.includes(id)) {
                const title = await firstArticleElement.$eval('.feeds_title__RXTga', el => el.textContent.trim());
                const link = await firstArticleElement.$eval('a', el => el.href);
                newArticle = { id, title, link };
            
                // Add the new ID to the list and save it
                if (newArticle) {
                    postedArticleIds.push(id); // Add the new ID to the array
                    writePostedArticleIds(postedArticleIds); // Save the updated array
                } else {
                    console.log('No new article to add.');
                }
            }
        } else {
            console.log('No valid article element found on the page.');
        }
    
        return newArticle;
    } catch (error) {
        console.error('An error occurred while fetching the article:', error);
        return null;
    } finally {
        await browser.close();
    }
}

function readPostedArticleIds() {
    if (!fs.existsSync(POSTED_ARTICLES_PATH)) {
        fs.writeFileSync(POSTED_ARTICLES_PATH, JSON.stringify([]));
    }
    const postedArticleIdsData = fs.readFileSync(POSTED_ARTICLES_PATH);
    try {
        return JSON.parse(postedArticleIdsData);
    } catch {
        // If there is an error reading the file, assume no articles have been posted
        return [];
    }
}

function writePostedArticleIds(postedArticleIds) {
    try {
        fs.writeFileSync(POSTED_ARTICLES_PATH, JSON.stringify(postedArticleIds, null, 2));
        console.log('Posted article IDs updated successfully:', postedArticleIds);
    } catch (error) {
        console.error('Error writing to postedArticles.json:', error);
    }
}

module.exports = {
    checkForNewArticles
};
