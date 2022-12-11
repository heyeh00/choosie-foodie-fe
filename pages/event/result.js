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
      console.log("PAGE event_id", page.data.event_id)
      // GET RESTAURANT
      wx.request({
        url: `${app.globalData.baseUrl}/api/v1/event_result/${page.data.event_id}`,
        header: app.getHeader(),
        success(res) {
            page.setData({ restaurant: res.data.restaurant})
            console.log("RESULT RESTAURANT", page.data.restaurant)
            // GET EVENT
            wx.request({
                url: `${app.globalData.baseUrl}/api/v1/events/${page.data.event_id}`,
                header: app.getHeader(),
                success(res) {
                    // SET DATE AND TIME
                    page.setData({ event: res.data.event})
                    console.log("RESULT EVENT", page.data.event)
                    const datetime = page.data.event.datetime
                    const date = datetime.substr(0, datetime.indexOf('T'))
                    page.setData({ date })
                    console.log("PAGE DATE", page.data.date)
                    const time = datetime.substr(datetime.indexOf('T') + 1 , 5)
                    page.setData({ time })
                    console.log("PAGE TIME", page.data.time)
                    // GET ATTENDEES
                    wx.request({
                        url: `${app.globalData.baseUrl}/api/v1/event_attendees/${page.data.event_id}`,
                        header: app.getHeader(),
                        success(res) {
                            const { attendees } = res.data
                            page.setData({ attendees })
                            console.log("ATTENDEES", page.data.attendees)
                        }
                    })
                }
            })
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