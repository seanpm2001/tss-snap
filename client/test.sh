#!/usr/bin/env bash

set -e;

NUM=100

for i in $(seq $NUM); do
	npm test || exit 1;
  sleep 1;
done

echo "$NUM test runs completed!"
