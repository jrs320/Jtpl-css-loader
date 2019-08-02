/**
 * 该loader使jtpl模块内css互不影响
 * 在元素上加一个唯一属性，再把模块内的css放入该属性下
 * @@author jrs
 */

const queryParam = (resourceQuery, name) => {
  var reg = new RegExp('[\?|&]' + name + '=([^&]*)(&|$)')
  var m = resourceQuery.match(reg)
  return m && m[1]
}

module.exports = function(source) {
  const scope = queryParam(this.resourceQuery, 'scope')
  if (scope) {
    let reg = /([^\}]+?)(\s*\{)/g
    source = source.replace(reg, ($0, $1, $2) => {
      let cls = $1.replace(/\/\*.*\*\//g, '')
      if (/@media|@keyframes/.test(cls) 
        || /from|to|:before|:after\d+%\s*\{$/.test($0)) {
        return $0
      }
      return $1 + `[${scope}]` + $2
    })
  }
  return source
}