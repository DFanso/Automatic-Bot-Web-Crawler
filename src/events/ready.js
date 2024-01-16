const { checkForNewArticles } = require('../utils/article');
const { channelId } = require('../config.json');


module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
      console.log(`${client.user.tag} is online!`);

      setInterval(async () => {
        const newArticle = await checkForNewArticles();
        if (newArticle) {
          const channel = await client.channels.fetch(channelId);
          if (channel) {
            channel.send(`New article published: ${newArticle.title}\nRead more: ${newArticle.link}`);
          } else {
            console.error('Channel not found. Please check if the bot has permissions and the right channel ID.');
          }
        } else {
          console.log('No new articles found at this time.');
        }
      }, 1800);
},
};