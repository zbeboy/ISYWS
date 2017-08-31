// pages/main/main.js
var app = getApp()
Page({
  onLoad: function (options) {
    // 获取accessToken
    app.getGlobalOauthInfo(function (oauthInfo) {
      var accessToken = oauthInfo.access_token;
      // 调用ISY接口
      wx.request({
        url: 'https://www.zbeboy.top/rest/user/type',
        header: {
          "Authorization": "bearer " + accessToken
        },
        success: function (res) {
          var data = res.data;
          if (data.state) {
            app.setUsersType(data.objectResult);
          } else {
            wx.showToast({
              title: data.msg
            });
          }
        }
      });
    });
  },
  // 实习查询 
  internshipViewTap: function () {
    wx.navigateTo({
      url: '../internship/internship'
    })
  }
})  