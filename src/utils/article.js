// utils/articleChecker.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Path to the JSON file that stores the list of posted articles
const POSTED_ARTICLES_PATH = path.join(__dirname, 'postedArticles.json');

// Read the posted articles from the JSON file
function readPostedArticles() {
    if (!fs.existsSync(POSTED_ARTICLES_PATH)) {
        fs.writeFileSync(POSTED_ARTICLES_PATH, JSON.stringify([]));
    }
    const postedArticlesData = fs.readFileSync(POSTED_ARTICLES_PATH);
    return JSON.parse(postedArticlesData);
}

// Write the posted articles to the JSON file
function writePostedArticles(postedArticles) {
    fs.writeFileSync(POSTED_ARTICLES_PATH, JSON.stringify(postedArticles, null, 2));
}

// Check if the article is new by comparing it to the stored list of posted articles
function isNewArticle(article, postedArticles) {
    return !postedArticles.some(postedArticle => postedArticle.link === article.link);
}

// The main function to check for new articles
async function checkForNewArticles(url, articleSelector, titleSelector, linkSelector) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
       
        const postedArticles = readPostedArticles();
        const newArticles = [];
        // Use the selectors to find articles on the page
    $(articleSelector).each((i, element) => {
        const title = $(element).find(titleSelector).text().trim();
        const link = new URL($(element).find(linkSelector).attr('href'), url).href + '?from=discord';

        const article = { title, link };

        if (isNewArticle(article, postedArticles)) {
            newArticles.push(article);
        }
    });

    // If there are new articles, update the stored list and return the new articles
    if (newArticles.length > 0) {
        const updatedPostedArticles = [...postedArticles, ...newArticles.map(article => ({ link: article.link }))];
        writePostedArticles(updatedPostedArticles);
    }

    return newArticles;
} catch (error) {
    console.error('An error occurred while fetching new articles:', error);
    return []; // Return an empty array if there was an error
}
}

module.exports = {
checkForNewArticles
};