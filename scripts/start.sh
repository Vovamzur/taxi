#!/bin/bash

crearedb $DB_NAME
cd booking
yarn refresh-db
cd ../authentication
yarn initdb
