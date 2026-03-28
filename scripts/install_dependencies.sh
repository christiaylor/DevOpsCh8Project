#!/bin/bash
set -eux

cd /var/www/app
npm ci --omit=dev
