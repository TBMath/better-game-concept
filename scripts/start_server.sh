#!/bin/bash
# Navigate to your project directory and then to the backendcd /home/ec2-user/better-game-concept/backend

# Restart the app using pm2
pm2 restart "my-backend" || pm2 start server.js --name "my-backend" --watch
