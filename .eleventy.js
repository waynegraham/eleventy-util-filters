const { DateTime } = require('luxon')
const markdownIt = require('markdown-it')

module.exports = (eleventyConfig) => {
  // @see https://11ty.rocks/eleventyjs/data-arrays/#limit-filter
  eleventyConfig.addFilter('randomItem', (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random()
    })
    return arr.slice(0, 1)
  })

  // @see https://11ty.rocks/eleventyjs/data-arrays/#limit
  eleventyConfig.addFilter('limit', function (arr, limit) {
    return arr.slice(0, limit)
  })

  // @see https://11ty.rocks/eleventyjs/data-arrays/#randomlimit-filter
  eleventyConfig.addFilter('randomLimit', (arr, limit, currPage) => {
    // Filters out current page
    const pageArr = arr.filter((page) => page.url !== currPage)

    // Randomizes remaining items
    pageArr.sort(() => {
      return 0.5 - Math.random()
    })

    // Returns array items up to limit
    return pageArr.slice(0, limit)
  })

  // @see https://11ty.rocks/eleventyjs/data-arrays/#pluck-filter
  eleventyConfig.addFilter('pluck', function (arr, selections, attr) {
    // Assumes this is receiving a collection, hence the `data`
    // If custom array such as from _data, update accordingly
    return arr.filter((item) => selections.includes(item.data[attr]))
  })

  // @see https://11ty.rocks/eleventyjs/data-arrays/#pluck-filter
  eleventyConfig.addFilter('pluckAttribute', function (arr, value, attr) {
    return arr.filter((item) => item.data[attr] === value)
  })

  const md = new markdownIt({
    html: true
  })
  // @see https://11ty.rocks/eleventyjs/content/#markdown-filter
  eleventyConfig.addFilter('markdownify', (content) => {
    return md.render(content)
  })

  // @see https://11ty.rocks/eleventyjs/content/#addnbsp-filter
  eleventyConfig.addFilter('addNbsp', (str) => {
    if (!str) {
      return
    }
    let title = str.replace(/((.*)\s(.*))$/g, '$2&nbsp;$3')
    title = title.replace(/"(.*)"/g, '\\"$1\\"')
    return title
  })

  // @see https://11ty.rocks/eleventyjs/content/#stripfilename-filter
  eleventyConfig.addFilter('stripFilename', (file) => {
    return file.replace(/\.[^/.]+$/, '')
  })

  // @see https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js#L42-L45
  eleventyConfig.addFilter('readableDate', (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
      format || 'dd LLLL yyyy'
    )
  })

  //   @see https://11ty.rocks/eleventyjs/content/#excerpt-filter
  eleventyConfig.addFilter('excerpt', (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, '')
    return content.substr(0, content.lastIndexOf(' ', 200)) + '...'
  })

  // @see https://11ty.rocks/eleventyjs/dates/#postdate-filter
  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  })

  // @see https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js#L47-L50
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  // Get the first `n` elements of a collection.
  //   @see https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js#L53-L62
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  //  @see  https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js#L65-L67
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  // Return all the tags used in a collection
  //   @see https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js#L70-L76
  eleventyConfig.addFilter('getAllTags', (collection) => {
    let tagSet = new Set()
    for (let item of collection) {
      ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
    }
    return Array.from(tagSet)
  })

  //   @see https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js#L78-L80
  eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
    )
  })
}
