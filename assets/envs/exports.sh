#!/bin/bash

# This command must be run on root directory of repogitory
export KRAKEN_DEBUG=3
export KRAKEN_GRPC_HOST=0.0.0.0
export KRAKEN_GRPC_PORT=50055
export KRAKEN_ADAPTOR_CONFIG_PATH="${PWD}/assets/config/broker.yaml"
