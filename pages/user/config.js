var host = require('../../configs').host

var configs = {
  loginUrl: `${host}/httpE.htm?action=piLogin`,
  uploadMediaUrl: `${host}/upE.htm?action=mediaUp`,
  uploadImageCountMin: 1,//上传图片个数限制最少
  uploadImageCountMax: 9,//上传图片个数限制最多
  uploadImageOnlyCamera: false, //上传图片只能新拍的
  uploadVideoEnalbe: true,//是否可以上传视频
  // uploadVideoCountMax: 9,//上传视频个数限制最多
  uploadVideoOnlyCamera: false, //上传视频只能新拍的
  consultUploadMediaEnable: true,//咨询投诉是否可以上传多媒体
  videoMaxDuration: 30  //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒


};

module.exports = configs;