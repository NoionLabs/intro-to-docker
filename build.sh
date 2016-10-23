#!/bin/bash

pandoc -t html5 -s --template=template.html --standalone --section-divs --variable theme="simple" --variable transition=slide -o slides.html slides.md
