
docker tag automatic-bot-web-crawler dfanso/automatic-bot-web-crawler:latest
docker push dfanso/automatic-bot-web-crawler:latest
docker pull dfanso/automatic-bot-web-crawler:latest
docker build -t automatic-bot-web-crawler .
docker run automatic-bot-web-crawler