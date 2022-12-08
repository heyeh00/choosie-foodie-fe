// pages/event/choose.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
const app = getApp()

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
        const page = this
        const event = wx.getStorageSync('event')
        page.setData({ event })
        console.log("CHOOSE PAGE EVENT INFO", page.data.event)
        wx.request({
          url: `http://localhost:3000/api/v1/events/${page.data.event.id}/event_restaurants`,
          header: app.getHeader(),
          success(res) {
            console.log("EVENT RESTAURANTS LIST", res.data.event_restaurants)
            page.setData({ event_restaurants: res.data.event_restaurants })
          }
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