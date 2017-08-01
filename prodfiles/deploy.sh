cnpm install
unzip -q -o deploy.zip
pm2 stop xiuba-ui
pm2 start pm2.json
