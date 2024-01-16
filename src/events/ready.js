// const { checkForNewArticles } = require('../utils/article');
// const { channelId } = require('../config.json');


module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
      console.log(`${client.user.tag} is online!`);
    // Set an interval to check for new articles every 30 minutes
  //   setInterval(async () => {
  //     console.log('Checking for new articles...');
  //     const newArticles = await checkForNewArticles(
  //       'https://hub.composablelabs.io/', // Replace with the actual website URL
  //       '.article-selector', // Replace with the actual article container CSS selector
  //       '.title-selector', // Replace with the actual article title CSS selector
  //       '.link-selector' // Replace with the actual article link CSS selector
  //     );

  //     // Post new articles to the Discord channel
  //     const channel = await client.channels.fetch(channelId);
  //     if (channel) {
  //         newArticles.forEach(article => {
  //             channel.send(`New article published: ${article.title}\nRead more: ${article.link}`);
  //         });
  //     } else {
  //         console.error('Channel not found. Please check if the bot has permissions and the right channel ID.');
  //     }
  // }, 1800000); // 1800000 milliseconds = 30 minutes
},
};