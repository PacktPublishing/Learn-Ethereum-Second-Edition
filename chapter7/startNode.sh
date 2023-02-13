#!/bin/bash

ROOT=$(readlink -f $ROOT)

nohup geth --nousb \
        --datadir=$pwd \
        --syncmode 'full' \
        --port 30310 \
        --networkid 1515 \
        --miner.gasprice 0 \
        --miner.gastarget 470000000000 \
        --http \
        --http.addr 0.0.0.0 \
        --http.corsdomain '*' \
        --http.port 8545 \
        --http.vhosts '*' \
        --http.api admin,eth,miner,db,net,txpool,personal,web3,debug \
        --verbosity 3 \
        --mine \
        --allow-insecure-unlock \
        --unlock '0,1' \
        --password password.txt  < /dev/null > $ROOT/geth.log 2>&1 &

  NODE_PID=$!

  stdbuf -o0 tail -F $ROOT/geth.log 2>/dev/null &
  TAIL_PID=$!