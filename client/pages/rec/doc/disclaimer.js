// disclaimer.js
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
          class: 'disclaimerBox'
        },
        children: [{
          name: "h1",
          attrs: {
            class: 'disclaimerBox_h1'
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
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '您必须同意以下所有条款内容才能使用此微信小程序应用。如果您不同意以下任一条款，请不要用此微信小程序应用进行报案。使用此微信小程序应用进行报案即表明您已经同意以下所有条款内容。'
          }
          ]
        }, {
          name: "h5",
          attrs: {
            class: 'disclaimerBox_h5'
          },
          children: [{
            type: 'text',
            text: '第一条'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '用户关注、使用全民城管微信公众号的过程中，不得以任何方式利用全民城管微信公众号直接或间接从事违反中华人民共和国法律以及社会公德的行为，且用户应当恪守下述承诺：'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '1. 发布或提供的内容符合中国法律法规及相关政策性规定、社会公德。'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '2. 对提供举报的图片、文字、地址等信息真实性、有效性负责。'
          }
          ]
        }, {
          name: "h5",
          attrs: {
            class: 'disclaimerBox_h5'
          },
          children: [{
            type: 'text',
            text: '第二条'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '用户举报案件应符合全民城管微信公众号举报要求，用户举报是否采纳和受理，全民城管微信公众号有最终解释权。'
          }
          ]
        }, {
          name: "h5",
          attrs: {
            class: 'disclaimerBox_h5'
          },
          children: [{
            type: 'text',
            text: '第三条'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '用户关注、使用全民城管公众微信号的过程中有几率获得奖励，奖励的形式和金额由全民城管微信公众号制定和实施。'
          }
          ]
        }, {
          name: "h5",
          attrs: {
            class: 'disclaimerBox_h5'
          },
          children: [{
            type: 'text',
            text: '第四条'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '全民城管微信公众号基于腾讯微信公众平台的服务，使用全民城管微信公众号必须阅读并遵守腾讯制定的各项规则等。'
          }
          ]
        }, {
          name: "h5",
          attrs: {
            class: 'disclaimerBox_h5'
          },
          children: [{
            type: 'text',
            text: '第五条'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '用户举报案件应符合全民城管微信公众号举报要求，用户举报是否采纳和受理，全民城管微信公众号有最终解释权。声明未涉及的问题参见国家有关法律法规及相关政策性规定，当本声明与国家法律法规冲突时，以国家法律法规及相关政策性规定为准。'
          }
          ]
        }, {
          name: "h5",
          attrs: {
            class: 'disclaimerBox_h5'
          },
          children: [{
            type: 'text',
            text: '第六条'
          }
          ]
        }, {
          name: "p",
          attrs: {
            class: 'disclaimerBox_p'
          },
          children: [{
            type: 'text',
            text: '对声明的解释、修改及更新权均属于全民城管微信公众号所有。'
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