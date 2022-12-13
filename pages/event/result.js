// pages/event/result.js
import event from '@codesmiths/event';
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
      const user = app.globalData.user
      page.setData({ user })
      page.setData({ event_id: options.id })
      // GET ATTENDEES, EVENT DATE & TIME, AND WINNING RESTAURANT
      page.fetchResult()
      event.on('tokenReady', page, page.checkAvatar)
    },

    checkAvatar() {
        const page = this
        if (app.globalData.avatar) {
            page.setData({ avatar: app.globalData.avatar })
            console.log("GLOBAL AVATAR DATA", page.data.avatar)
        } else {
            console.log("NO GLOBAL AVATAR")
        }
    },

    fetchResult() {
        const page = this
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

    endVoting() {
        const page = this
        // const event = { closed: true }
        wx.request({
          url: `${app.globalData.baseUrl}/api/v1/events/${page.data.event_id}`,
          method: "PUT",
          data: event,
          header: app.getHeader(),
          success(res) {
            console.log("END VOTING", res)
            page.setData({ event: res.data.event })
            // page.setData({ eventClosed: true})
            page.fetchResult()
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
        // page.setData({ eventClosed: false})
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