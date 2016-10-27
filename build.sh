#!/bin/bash

pandoc -t html5 --template=template.html --standalone --highlight-style zenburn --section-divs --variable theme="simple" --variable transition=slide -o slides.html slides.md
