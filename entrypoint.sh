#!/bin/sh

node ace migration:run

# 1st process
npm run dev --node-args="--inspect=0.0.0.0" &

sleep 3 &
 
# 2nd process
node ace queue:listen &

wait -n

exit $?
