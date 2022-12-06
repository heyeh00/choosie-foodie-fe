// pages/profile/profile.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
import { login } from '../../utils/login';

const app = getApp();

Page({
    /**
     * Page initial data
     */
    data: {
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        if (getApp().globalData.header) {
            this.getData();
        } else {
            event.on('tokenReady', this, this.getData);
        }
    },

    login(e) {
        const page = this
        wx.getUserProfile({
          desc: 'get users pic and name',
          success(res) {
              console.log("SUCCESS RES", res.userInfo)
              const user = {
                name: res.userInfo.nickName,
                image_url: res.userInfo.avatarUrl,
              }
              console.log("PRE PUT {DATA}", user)

              requestData(`/users/${app.getUserId()}`, { user }, "PUT").then((res) => {
                console.log("POST PUT {DATA}", res)  
                page.setData({ user: res.data.user })
                app.globalData.user = res.data.user
                console.log("PAGE DATA", page.data)
              })
          },
          fail(errors) {
              console.log("LOGIN ERROR", errors)
          }
        })
    },

    getData() {
        this.setData({ user: app.globalData.user })
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    }
})