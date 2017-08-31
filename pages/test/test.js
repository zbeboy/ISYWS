// pages/test/test.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tests: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getGlobalOauthInfo(function (oauthInfo) {
      var accessToken = oauthInfo.access_token;
      // 调用ISY OAUTH接口
      wx.request({
        url: 'https://www.zbeboy.top/rest/test',
        header: {
          "Authorization": "bearer " + accessToken
        },
        success: function (res) {
          that.setData({
            tests: res.data
          });
        }
      });
    });
  }
})