const host = require("../../../configs").host
var title

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    title = options.title
    this.setData({
      nodes: [{
        name: 'div',
        attrs: {
          class: 'reportNoticeBox'
        },
        children: [{
          name: "h1",
          attrs: {
            class: 'reportNoticeBox_h1'
          },
          children: [{
            type: 'text',
            text: title
          }
          ]
        }, {
          name: 'hr',
          attrs: {
            class: 'line'
          }
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '尊敬的网友，非常感谢您对城市管理的关注和参与，如果你在日常生活中当你发现身边有暴露垃圾、卫生死角、占道经营、道路破损、井盖缺失、树木倒塌、下水道堵塞等城市管理问题时，真诚邀请你通过手中的微信向我们反映，我们会认真接待您的诉求，对经我们审核成功立案的，我们还为您准备了一份小礼品，希望我们共同努力，让城市更和谐宜居，更加美好。'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '在您举报时，为了方便我们大家工作的方便，还需要占用您一点点宝贵的时间，请您仔细阅读以下内容。'
          }
          ]
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '需要您举报的问题'
          }
          ]
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '(一)暴露垃圾'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '举报堆放面积达到5平米及以上的成片暴露垃圾问题'
          }
          ]
        },{
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/1.jpg"
          }
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/2.jpg"
          }
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '(二)立体垃圾'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '举报社区楼栋成片的雨棚垃圾或护坡垃圾，特别欢迎对社区内陈旧性立体垃圾的举报问题'
          }
          ]
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/3.jpg"
          }
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '(三)占道经营'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '欢迎您举报属于主干道范围内的，连续多个（一般只5个及以上）连续的占道经营或出店经营问题'
          }
          ]
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/4.jpg"
          }
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '(四)广告牌或灯箱'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '举报5个及以上连续的占道广告牌或占道灯箱'
          }
          ]
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/5.jpg"
          }
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/6.jpg"
          }
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '(五)道路破损'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '举报主干道、次干道、社区范围内10平方米及以上路面破损、地砖缺失问题'
          }
          ]
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/7.jpg"
          }
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '(六)涉及安全隐患的问题'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '举报干道或社区的灯杆（立杆、标志杆、交通设施杆具）、行道树倒塌，各类井盖和水篦缺失，自来水管爆裂，架空线缆、电线坠地。'
          }
          ]
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/8.jpg"
          }
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/9.jpg"
          }
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/10.jpg"
          }
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/11.jpg"
          }
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/12.jpg"
          }
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '(七)公共区域类下水道、化粪池堵塞'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '公共区域类下水道、化粪池堵塞'
          }
          ]
        }, {
          name: "img",
          attrs: {
            class: 'reportNoticeBox_img',
            src: host + "/view/static/images/13.jpg"
          }
        }, {
          name: "h5",
          attrs: {
            class: 'reportNoticeBox_h5'
          },
          children: [{
            type: 'text',
            text: '举报要求'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'reportNoticeBox_p'
          },
          children: [{
            type: 'text',
            text: '在您举报时，为方便处置单位及时找到问题地点，请您务必拍摄两张以上问题照片（一张反映问题的特写，另外的反映问题地点），照片需要有拍摄时间；照片清晰，反映问题准确。在问题描述时，请使用如“****（街道名称）****（门牌地址）****（问题类型）”的标准。再一次感谢您对城市管理问题的关注！'
          }
          ]
        }
        ]
      }]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: title
    })
  }
})