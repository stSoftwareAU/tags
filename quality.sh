#!/bin/bash
set -e

deno fmt src test ./*.ts
deno lint src test ./*.ts

deno test --allow-all --trace-ops --v8-flags=--max-old-space-size=8192 --parallel test/*