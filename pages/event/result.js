// pages/event/result.js
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
      page.setData({ event_id: options.id })
      // GET ATTENDEES, EVENT DATE & TIME, AND WINNING RESTAURANT
      wx.request({
        url: `${app.globalData.baseUrl}/api/v1/event_result/${page.data.event_id}`,
        header: app.getHeader(),
        success(res) {
            console.log("EVENT RESULT RESPONSE", res)
            const { attendees, event, restaurant } = res.data
            page.setData({ attendees, event, restaurant })
            console.log("PAGE DATA", page.data)
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