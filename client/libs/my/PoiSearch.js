//引用哪个sdk，则用哪个sdk的接口进行请求
let impl = require('PoiSearch_QQMap.js');

/**
 * options支持的参数
 *  keyword: 关键字 string 必填 ,
    location: 位置 object 默认当前位置,
      {
         latitude: 纬度,
         longitude: 经度
      }
    address_format: 地址格式（long, short) string
    page_size: 每页条目数 number 默认10,
    page_index: 第x页 number 默认1,
    success: res obj
    fail: res obj
    complete:success bool


    res返回结果格式：
     status: 0成功 -1失败 number
     message: 'success' or error message
     count: 搜索个数 number
     data: 搜索结果poi array
      [{
        id,
        title,
        address
        location:
          {
            lat,
            lng
          }
        _distance:
      }]
 */
function search(options) {
  if (!options || !options.keyword || typeof options.success != 'function'){
    return;
  }

  impl.search(options);
}


module.exports = {
  poiSearch: search
}