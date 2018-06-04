// var host = "http://scwechat.iok.la/SCWeChat"
// var host = "http://192.168.11.8/SCWeChat"
// var host = "http://wx.yzsz.gov.cn/SCPI"
// var host = "http://192.168.11.4:8080/SCPI"
// var host = "http://172.192.100.6:999/SCPI/"
// var host = "http://www.czqmcg.com"
// var host = "http://221.176.193.220:8980/SCPI/"
// var host = 'http://mobile.chengguanyun.com.cn/SCPI/'
//var host = 'https://krb0cltj.qcloud.la/SCPI'
// var host = 'https://410977094.taoqiyang.xyz/SCPI/'
var host = 'http://192.168.100.8:8080/FSQuestionnaire/'
var configs = {
  host,
  httpUrl: `${host}/httpE.htm?action=`,
  newsList: `${host}/httpE.htm?action=piGetNewsList`,
  noticeList: `${host}/httpE.htm?action=piGetNoticeList`,

  newsPicUrl: `${host}/downE.htm?action=mediaDown&ownerType=PINews&mediaPath=`,


  phoneReportNumber: '02363837110',

  loadingText: "拼命加载中...",
  networkErrorText: "啊哦..连接失败了~~!",
  pullRefreshNoNetworkText: "别扯了, 找个wifi先!",
  warnToastImage: "/images/icon_warn.png",
  errorToastImage: "/images/icon_fail.png",

  checkEnable: false,  //核查功能


  needHideCitizenName: true,  //市民参与中是否需要隐藏用户名
  mediaDisplayMode: 'swiper', //grid/swiper
  mediaShowVideo: false,  //是否需要展示上报视频，不支持flv，暂不展示

};

module.exports = configs;