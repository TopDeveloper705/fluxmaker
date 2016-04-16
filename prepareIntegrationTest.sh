#!/bin/bash
set -ev
cp test/integration/config/database.js.travis test/integration/config/database.js
psql -c 'create database dummy_app_test;' -U postgres
cd test/integration && npm install && npm install ../../ && npm run migrate
