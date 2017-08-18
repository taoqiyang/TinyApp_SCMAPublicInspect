var host = require('../../configs').host

var configs = {
  loginUrl: `${host}/httpE.htm?action=piLogin`,
  sendVerifyCodeUrl: `${host}/httpE.htm?action=pimIdentifyCode&requestSource=tinyapp`,
  verifyVerifyCodeUrl: `${host}/httpE.htm?action=pimIdentify`,
  checkUserRegistUrl: `${host}/httpE.htm?action=piCheckUserRegist`,
  pimUserUrl: `${host}/httpE.htm?action=pimUser`

};

module.exports = configs;