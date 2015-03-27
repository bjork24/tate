# tate

[![Code Climate](https://codeclimate.com/github/bjork24/tate/badges/gpa.svg)](https://codeclimate.com/github/bjork24/tate) [![Dependency Status](https://david-dm.org/bjork24/tate.svg)](https://david-dm.org/bjork24/tate)

Tate generates useful annotations (or tates) in your stylesheets, repo, or terminal! With tate, you can easily see where your styles are being imported, fully compiled file sizes, and css stats.

## Installation

Install globally with NPM:

`npm install tate --global`  or  `npm i tate -g`

## CLI reference

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
    -t, --terminal  Output is displayed in terminal
    -e, --erase     Erase generated annotation from files
```

## Examples

**Search the `test` directory for less and sass files, then output tates to the terminal**

`$ tate -slt test/`

Which results in output similar to this (only a small portion is shown):

![Tate output](http://i.imgur.com/xi0bKzH.png)

**Search the `test` directory for sass files, then append the tate to each file**

`$ tate -sa test/`

Which results in these states being appended to each `.sass` or `.scss` file:

```
// TATE INFO START 
//
// nested      : 1.19 kB
// minified    : 946 B
// gzipped     : 512 B
// rules       : 13
// selectors   : 36
//
// imported by :
// - test/sass/_base.scss
// - test/sass/styles.scss
//
// TATE INFO END 
```

If you'd like to delete tates from your files, simply use the `-e` option. This will delete
tates from all `.less` files:

`$ tate -le test/`

**Search the `test` directory for all style file types and output the tates in a single `tate.md`**

`$ tate -cslym test/`

You can see the output [here](tate.md)

## Stylus caveat

The Stylus render doesn't provide imported files, so `.styl` tates will only include file sizes
and css stats.
