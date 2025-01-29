#!/bin/bash

bun run svgo
bun run svgfont
python3 svgtofont.py