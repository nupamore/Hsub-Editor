
/**
 * seconds to h:mm:ss:ms
 * @param  {Number} seconds
 * @return {String}
 */
export function seconds2format(seconds) {
  return new Date(seconds * 1000).toISOString().slice(12, -2)
}


/**
 * seconds to h:mm:ss:ms
 * @param  {String} format
 * @return {Number}
 */
export function format2seconds(format) {
  return format
}
