// app.js
import event, { emit } from '@codesmiths/event';
import { requestData } from './utils/requestdata';

App({
  onLaunch() {
    const page = this;

    wx.login({
      success: res => {
        page.globalData.code = res.code;
        wx.request({
            url: `${this.globalData.baseUrl}/api/v1/login`,
            method: "POST",
            data: { code: res.code },
            success(loginRes) {
                console.log("LOGIN RES", loginRes)
                
                page.globalData.user = loginRes.data.user;
                page.globalData.avatar = loginRes.data.avatar;
                console.log("APP JS AVATAR", page.globalData.avatar)

                console.log("SET USER TO GLOBALDATA", page.globalData.user)
                page.globalData.header = loginRes.header['Authorization']
                event.emit('tokenReady')
            },
            fail(errors) {
                console.log("LOGIN ERROR", errors)
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
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://choosie-foodie.wogengapp.cn',
  }
})
