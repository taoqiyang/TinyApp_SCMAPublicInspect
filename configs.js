// var host = "http://scwechat.iok.la/SCWeChat"
// var host = "http://192.168.11.8/SCWeChat"
// var host = "http://wx.yzsz.gov.cn/SCPI"
// var host = "http://192.168.11.8:8080/SCPI"
var host = "http://172.192.100.6:999/SCPI/"
var configs = {
  host,
  newsList: `${host}/httpE.htm?action=piGetNewsList`,
  noticeList: `${host}/httpE.htm?action=piGetNoticeList`,

  newsPicUrl: `${host}/downE.htm?action=mediaDown&ownerType=PINews&mediaPath=`,


  phoneReportNumber: '02363837110',

  loadingText: "拼命加载中...",
  networkErrorText: "啊哦..连接失败了~~!",
  pullRefreshNoNetworkText: "别扯了, 找个wifi先!",
  warnToastImage: "/images/icon_my_HL.png",
  errorToastImage: "/images/icon_my_HL.png"

};

module.exports = configs;