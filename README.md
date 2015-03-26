# tate

[![Code Climate](https://codeclimate.com/github/bjork24/tate/badges/gpa.svg)](https://codeclimate.com/github/bjork24/tate) [![Dependency Status](https://david-dm.org/bjork24/tate.svg)](https://david-dm.org/bjork24/tate)

Add annotations ('tates) to your stylesheets, repo, or terminal!

# Installation

Install globally with NPM:

`npm install tate --global` or `npm i tate -g`

# CLI reference

```
$ tate --help

  Usage: cli [options] <file ...>

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -s, --sass      Annotate .sass and .scss files
    -l, --less      Annotate .less files
    -y, --styl      Annotate .styl files
    -c, --css       Annotate .css files
    -a, --append    Output is appended to each matching file
    -m, --manifest  Output is saved to a manifest file
    -t, --terminal  Output is displayed in terminal only
```