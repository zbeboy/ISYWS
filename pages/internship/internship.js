// pages/internship/internship.js
var app = getApp()
Page({
  data: {
    internshipReleases: []
  },
  onLoad: function (options) {
    var that = this;
    // 获取accessToken
    app.getGlobalOauthInfo(function (oauthInfo) {
      var accessToken = oauthInfo.access_token;
      // 获取用户类型
      app.getUsersType(function (usersType) {
        var usersTypeName = usersType.usersTypeName;
        var url = '';
        // 学生类型
        if (usersTypeName === '学生') {
          url = '/rest/internship/release/student/data';
        } else if (usersTypeName === '教职工') {
          // 教职工类型
          url = '/rest/internship/release/staff/data';
        } else {
          // 其它
          url = '/rest/internship/release/new/data';
        }

        // 调用ISY 实习数据接口
        wx.request({
          url: 'https://www.zbeboy.top' + url,
          data: {
            pageNum: 0,
            pageSize: 2
          },
          header: {
            "Authorization": "bearer " + accessToken
          },
          success: function (res) {
            that.setData({
              internshipReleases: res.data.listResult
            });
          }
        });

      });
    });
  }
})