//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    oauthInfo: {},
    usernameColor: '',
    passwordColor: ''
  },
  // OAuth登录
  formSubmit: function (e) {

    this.debugNav();
  return;

    var that = this;
    // 账号与密码
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    // 账号，密码检测
    var email_regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var password_regex = /^[a-zA-Z0-9]\w{5,17}$/;

    if (username === '') {
      that.setData(
        { popErrorMsg: "请填写邮箱账号", usernameColor: '' }
      );
      that.ohShitfadeOut();
      return;
    } else {
      if (!email_regex.test(username)) {
        that.setData(
          { popErrorMsg: "邮箱格式错误", usernameColor: 'red' }
        );
        that.ohShitfadeOut();
        return;
      } else {
        that.setData(
          { usernameColor: '' }
        );
      }
    }

    if (password === '') {
      that.setData(
        { popErrorMsg: "请填写密码", passwordColor: '' }
      );
      that.ohShitfadeOut();
      return;
    } else {
      if (!password_regex.test(password)) {
        that.setData(
          { popErrorMsg: "密码错误", passwordColor: 'red' }
        );
        that.ohShitfadeOut();
        return;
      } else {
        that.setData(
          { passwordColor: '' }
        );
      }
    }

    // 调用ISY OAUTH接口
    wx.request({
      url: 'https://www.zbeboy.top/oauth/token',
      data: {
        client_id: 'isy-base-client',
        client_secret: '9afcd2264ace49a09053eae4790fc812',
        grant_type: 'password',
        scope: 'read',
        username: username,
        password: password
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        var oauthInfo = res.data;
        if (oauthInfo.error) {
          that.setData(
            { popErrorMsg: oauthInfo.error_description }
          );
          that.ohShitfadeOut();
        } else {
          app.setGlobalOauthInfo(res.data);
          wx.navigateTo({
            url: '../main/main'
          });
        }
      }
    });
  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },
  debugNav(){
    wx.navigateTo({
      url: '../main/main'
    });
  }
})
