//app.js
App({
  setGlobalOauthInfo: function (oauthInfo) {
    var that = this
    that.globalData.oauthInfo = oauthInfo;
  },
  getGlobalOauthInfo: function (cb) {
    var that = this
    if (this.globalData.oauthInfo) {
      typeof cb == "function" && cb(this.globalData.oauthInfo)
    } else {
      wx.showToast({
        title: '获取ISY用户信息失败'
      });
    }
  },
  globalData: {
    oauthInfo: null
  }
})
