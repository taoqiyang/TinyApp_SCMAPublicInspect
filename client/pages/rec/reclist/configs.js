var baseConfig = require('../../../configs')
var RecStates = require('../RecState.js')

var configs = {
  RecStates: RecStates,
  getRecListUrl: `${baseConfig.host}/httpE.htm?action=piGetRecList`,
  recPicUrl: `${baseConfig.host}/downE.htm?action=mediaDown&ownerType=PIRec&mediaPath=`,
  needHideCitizenName: baseConfig.needHideCitizenName,
  mediaShowVideo: baseConfig.mediaShowVideo,
};

module.exports = configs;