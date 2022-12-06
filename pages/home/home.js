// pages/home/home.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
import { login } from '../../utils/login';
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {
      time: null
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const page = this
        event.on('tokenReady', this, this.getData);
        requestData(`/cuisines`, {}, "GET").then((res) => {
            console.log(res.data)
            page.setData({ cuisines: res.data.cuisines })
            console.log(page.data.cuisines)
        })
    },

    getData() {
        this.setData({ user: app.globalData.user })
    },

    bindDateChange(e) {
      this.setData({ date: e.detail.value })
      console.log("DATE", this.data.date)
    },

    bindTimeChange(e) {
      this.setData({ time: e.detail.value })
      console.log("TIME", this.data.time)
    },

    submitEvent(e) {
      console.log("SUBMIT FORM", e.currentTarget)
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