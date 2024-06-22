# Eleventy Utility Filters

A collection of [Eleventy](https://www.11ty.dev/) filters that are useful so you don't have to find them. These are collected from all over the web.

## Setup

To install this plugin, run the following command at the root of your Eleventy project:

    npm install --save-dev eleventy-plugin-util-filters

Next, add the following to the body of the `module.exports` in your [Eleventy config file](https://www.11ty.dev/docs/config/):

    eleventyConfig.addPlugin( require("eleventy-plugin-util-filters") );

## Usage

    {{ string | filter_name }}

# Data Filters

## randomItem

Return a random item from a given array.

    {{ for item in collection.all | randomItem }}

## limit

Return a subset of an array limited to the passed number

    {{ for item in collections.all | item }}

## randomLimit

Given a collection and a limit in addition to the current page.url, returns the requested number of items excluding the current one. This is useful for showing additional posts without the current one being repeated in the list.

    {{ for item in collections.all | randomLimit(3, page.url)}}

## pluck

The `pluck` filter is useful if you want to return a subset of an array based on some known attribute values, such as given an array of titles.

    {%- set pickedPosts %}
    ["Title A", "Title B"]
    {%- endset -%}
    {% for post in collections.all | pluck(pickedPosts, 'title') %}

## pluckAttribute

Same as `pluck`, but for a single attribute 

    // Useful for getting a subset based on a secondary data list
    {% for category in categories %}
    // Then pluck just items in that "category"
    {% for post in collections.all | pluck(category, 'category') %}

# Content Filters

## markdownify

Sometimes you need to convert a specific bit of content into Markdown. For example, if you have created content as JSON formatted custom data within _data. In that case, you maybe don't want to use pagination to create pages but instead to loop through it somewhere.

    {{ data.content | markdown | safe }}

## excerpt

This filter expects the full post content - post-processing - which it will strip HTML tags from and then limit to approximately the first 200 characters. The function backtracks to the space prior to the 200th character to prevent splitting words.

    <p>{{ post.templateContent | excerpt }}</p>

## addNbsp

This filter intakes a string, such as for a page title, and inserts a non-breaking space - nbsp; - between the last two words to prevent a single word dangling on the last line (called an "orphan" by typographers).

    {{ title | addNbsp }}

## stripFilename

Useful if using a value such as layout - which returns the full filename - in an alternate scenario, such as for part of a class name as shown.

    <body class="layout--{{ layout | stripFilename }}">

# Date Filters

## postDate

    Formats date in the formath `Jun 22 2024`

    {{ page.date | postDate }}


* readableDate

* htmlDateString
* head
* min
* getAllTags
* filterTagList

