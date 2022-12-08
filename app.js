// app.js
import event, { emit } from '@codesmiths/event';
import { requestData } from './utils/requestdata';

App({
  onLaunch() {
    const page = this;

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        page.globalData.code = res.code;
        wx.request({
            url: `${page.getUrl()}/login`,
            method: "POST",
            data: { code: res.code },
            success(loginRes) {
                console.log("LOGIN RES", loginRes)
                
                page.globalData.user = loginRes.data.user;
                if (wx.getStorageSync('user').length === 0) wx.setStorageSync('user', loginRes.data.user)
                console.log("SET USER TO GLOBALDATA", page.globalData.user)
                page.globalData.header = loginRes.header['Authorization']
                event.emit('tokenReady')
            },
        })
      }
    })
  },
  getUrl() {
    return this.globalData.baseUrl;
  },

  getHeader() {
    return this.globalData.header;
  },

  getUserId() {
    return this.globalData.user.id;
  },

  globalData: {
    baseUrl: 'http://localhost:3000/api/v1'
  }
})
