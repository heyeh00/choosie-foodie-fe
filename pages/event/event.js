// pages/event/event.js
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
        const page = this
        const user = app.globalData.user
        const event = app.globalData.event_info
        page.setData({ user })
        page.setData({ event })
        console.log("EVENT USER", page.data.user)
        console.log("EVENT EVENT", page.data.event)
    },
    
    bindDateChange(e) {
        this.setData({ date: e.detail.value })
      },
  
    bindTimeChange(e) {
        this.setData({ time: e.detail.value })
    },

    setDateTime() {
        const date = this.data.date
        const time = this.data.time
        if (time === null) {
            const datetime = date
            this.setData({ datetime })
        } else {
            const datetime = `${date} ${time}`
            this.setData({ datetime })
        }
        console.log(this.data.datetime)
    },

    editCuisines(e) {
        this.setData({ cuisines_choice: e.detail })
        console.log("Test")
        }, 

    submitEvent(e) {
        this.setDateTime()
        console.log("ALL PAGE DATA", this.data)
        const event_info = {
            cuisines: this.data.cuisines_choice,
            date: this.data.date,
            time: this.data.time, 
        }
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

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