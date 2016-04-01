#!/bin/bash
set -ev
cp spec/integration/config/database.js.travis spec/integration/config/database.js
psql -c 'create database dummy_app_test;' -U postgres
cd spec/integration && npm install && npm install ../../ && npm run migrate
