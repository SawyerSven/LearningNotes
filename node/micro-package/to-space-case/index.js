const clean = require('../to-no-case/index');

function toSpaceCase(string){
  return clean(string).replace(/[\W_]+(.|$)/g,(matches,match) => {
    return match?' ' + match : ''
  }).trim()
}

module.exports = toSpaceCase