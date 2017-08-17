// pages/main/index.js
const phoneNumber = require('../../configs').phoneReportNumber
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pList: [
      //市民参与
      {
        id: 'citizen',
        name: '市民参与',
        pages: [
          {
            id: 'citizen_report',
            name: '案件上报',
            page: '../rec/report/rectype/rectype?1=1'
          },
          {
            id: 'citizen_consult',
            name: '咨询投诉',
            page: ''
          },
          {
            id: 'citizen_phone_report',
            name: '电话上报',
            isMethod: true,
            page: 'phoneReport'
          },
          {
            id: 'citizen_report_notice',
            name: '报案须知',
            page: '../rec/doc/report_notice?1=1'
          },
          {
            id: 'citizen_disclaimer',
            name: '免责声明',
            page: '../rec/doc/disclaimer?1=1'
          }
        ]
      },
      //便民服务
      {
        id: 'service',
        name: '便民服务',
        pages: [
          {
            id: 'service_parkinglot',
            name: '找车位',
            page: ''
          },
          {
            id: 'service_toilet',
            name: '找厕所',
            page: ''
          },
          {
            id: 'service_laws',
            name: '政策法规',
            page: 'notice/notice?newsTypeId=-1'
          },
          {
            id: 'service_handbooks',
            name: '办事指南',
            page: 'notice/notice?newsTypeId=-1'
          }
        ]
      },
      //新闻动态
      {
        id: 'dynamic',
        name: '新闻动态',
        pages: [
          {
            id: 'dynamic_latest',
            name: '最近动态',
            page: 'news/news?newsTypeId=1&detailTitle=新闻详情'
          },
          {
            id: 'dynamic_activity',
            name: '活动动态',
            page: 'news/news?newsTypeId=2&detailTitle=活动详情'
          }
        ]
      }
    ]
  },

  phoneReport: function() {
    wx.makePhoneCall({
      phoneNumber: phoneNumber //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  }
})