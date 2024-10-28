#!/bin/sh
sed -i 's~http://localhost:3000~https://datascience.kuchta.dev/maps~' static/styles.js

sed -i 's~http://localhost:8080~https://datascience.kuchta.dev~' static/index.js

sed -i 's~http://localhost:8069~https://datascience.kuchta.dev~' static/index.js
