// rectype.js

var title

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rectypes: [
      {
        id:1,
        name: '园林绿化'
      },
      {
        id: 2,
        name: '市容环境'
      },
      {
        id: 3,
        name: '道路交通设施'
      },
      {
        id: 4,
        name: '公用设施'
      },
      {
        id: 5,
        name: '房屋建筑'
      },
      {
        id: 6,
        name: '其它'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    title = options.title ? options.title : "上报案件"
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: title
    })
  },
  
  go2Report: function (e){
    var index = e.currentTarget.dataset.index;
    var rectype = this.data.rectypes[index]
    wx.redirectTo({
      url: '../report?title=' + title + "&rectypeID=" + rectype.id + "&rectypeName=" + rectype.name
    })
  }
})