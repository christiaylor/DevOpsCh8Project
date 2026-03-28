#!/bin/bash
set -eux

systemctl daemon-reload
systemctl restart nodeapp
systemctl enable nodeapp
