let QQMapWX = require('../qqmap/qqmap-wx-jssdk.js');
let mapSdk

function sdk() {
  if (!mapSdk) {
    mapSdk = new QQMapWX({
      key: 'SQ2BZ-XMWCR-GZWWC-WTEGL-HAVMS-N2BUK'
    });
  }
  return mapSdk;
}

function search(options) {
  sdk().search({
    keyword: options.keyword,
    location: options.location,
    address_format: options.address_format,
    page_size: options.page_size,
    page_index: options.page_index,
    success: function (res) {
      let data = [];
      res.data.map(function(poi){
        data.push({
          id: poi.id,
          title: poi.title,
          address: poi.address,
          location: {
            lat: poi.location.lat,
            lng: poi.location.lng
          },
          _distance: poi._distance
        });
      });
      options.success({
        status: 0,
        message: 'success',
        count: res.count,
        data: data
      });
    },
    fail: function (res) {
      if (typeof options.fail == 'function'){
        options.fail({
          status: -1,
          message: res.message
        })
      }
    },
    complete: function (res) {
      if (typeof options.complete == 'function') {
        options.complete(res.status === 0);
      }
    }
  });

}


module.exports = {
  search
}