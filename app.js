// app.js
import event from '@codesmiths/event';
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
            success(res) {
                page.globalData.user = res.data.user;
                page.globalData.header = res.header['Authorization']
                event.emit('tokenReady')
            },
            failure(errors) {
                console.log("===LOGIN ERROR===", errors);
            }
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
