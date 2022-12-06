// pages/home/home.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {
      cuisines: []
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const page = this
        event.on('tokenReady', this, this.getData);
        requestData(`/cuisines`, {}, "GET").then((res) => {
            page.setData({ cuisines: res.data.cuisines })
        })
    },

    getData() {
        this.setData({ user: app.globalData.user })
        console.log("HOME USER INFO", this.data.user)
    },

    bindDateChange(e) {
      this.setData({ date: e.detail.value })
    },

    bindTimeChange(e) {
      this.setData({ time: e.detail.value })
    },

    editCuisines(e) {
      this.setData({ cuisines_choice: e.detail })
    },

    submitEvent(e) {
      const event_info = {
          cuisines: this.data.cuisines_choice,
          date: this.data.date,
          time: this.data.time, 
      }
      app.globalData = ({ event_info })
      console.log("SENDING EVENT INFO", event_info)
      wx.switchTab({
        url: '/pages/event/event'
      })
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