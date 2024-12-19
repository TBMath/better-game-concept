#!/bin/bash
# Ensure that any previous server instances are stopped.

pm2 stop "my-backend" || true
