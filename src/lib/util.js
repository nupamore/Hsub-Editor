
/**
 * util functions
 */


/**
 * xss filter
 * @param  {String} str
 * @return {String}
 */
function xssFilter(str) {
  return str
  .replace(/</g, '&lt;')
  .replace(/&lt;(\/?)(b|i|u|font)/g, '<$1$2')
}


export default {
  xssFilter,
}
