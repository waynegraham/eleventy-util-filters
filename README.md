# Eleventy Utility Filters

A set of [Eleventy](https://www.11ty.dev/) filters that are useful so you don't have to find them.

## Setup

To install this plugin, run the following command at the root of your Eleventy project:

    npm install --save-dev eleventy-plugin-util-filters

Next, add the following to the body of the `module.exports` in your [Eleventy config file](https://www.11ty.dev/docs/config/):

    eleventyConfig.addPlugin( require("eleventy-plugin-util-filters") );

## Usage

    {{ string | filter_name }}

## Filters

