#!/bin/bash

cd booking
yarn refresh-db
cd ../authentication
yarn initdb
