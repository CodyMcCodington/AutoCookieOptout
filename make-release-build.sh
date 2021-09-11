#!/bin/bash
set -ueo pipefail

# Tested with yarn 1.22.5 and node 14.15.5
yarn
yarn build
cd dist/webext-prod
web-ext build