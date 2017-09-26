var _ = require('lodash')

module.exports = (content) => {
  // export default function extractMetaData(content) {
  var lines = _.split(content, '\n')
  var metaData = {}
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (_.startsWith(line, '#+')) {
      if (/^#\+TITLE: *(.*)$/.exec(line)) {
        metaData['title'] = RegExp.$1
      } else if (/^#\+DATE: *(.*)/.exec(line)) {
        metaData['date'] = new Date(RegExp.$1)
      } else if (/^#\+KEYWORDS: *(.*)/.exec(line)) {
        metaData['tags'] = RegExp.$1
      }
    } else if (_.startsWith(line, '*')) {
      break
    } else if (line == '') {
      continue
    } else {
      metaData['summary'] = line
      break
    }
    // if (_.startsWith(line, '#+TITLE:')) {
    //   metaData['title'] = line
    // } else if (_.startsWith(line, '#+DATE:')) {
    //   metaData['date'] = line
    // }
  }
  return metaData
}