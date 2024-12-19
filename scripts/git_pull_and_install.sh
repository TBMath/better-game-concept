#!/bin/bash
cd better-game-concept
echo "Pulling the latest changes from Git repository"
git pull
cd backend
echo "Installing npm dependencies"
npm install
