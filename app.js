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
  setUsersType: function (usersType) {
    var that = this;
    that.globalData.usersType = usersType;
  },
  getUsersType: function (cb) {
    var that = this
    if (this.globalData.usersType) {
      typeof cb == "function" && cb(this.globalData.usersType)
    } else {
      wx.showToast({
        title: '获取ISY用户类型失败'
      });
    }
  },
  globalData: {
    oauthInfo: null,
    // 学生,教职工,系统
    usersType: null
  }
})
