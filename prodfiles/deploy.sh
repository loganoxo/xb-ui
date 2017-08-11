#!/bin/bash --login
unzip -q -o deploy.zip
cnpm install
pm2 restart pm2.json
