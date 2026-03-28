#!/bin/bash
set -eux

export PATH=/usr/local/bin:$PATH

cd /var/www/app
npm ci --omit=dev
