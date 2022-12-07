// pages/event/event.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {
        reveal: false
    },

    goToConfirmation(e) {
        wx.navigateTo({
            url: '/pages/event/confirmation'
        })
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const page = this

        const date = app.globalData.event_info.date
        page.setData({ date })

        const time = app.globalData.event_info.time
        page.setData({ time })

        const cuisine = app.globalData.event_info.cuisines
        page.setData({cuisine})

        const user = wx.getStorageSync('user')
        page.setData({ user })

        page.setData({ event_name: `${user.name}'s choosie foodie event` })
        console.log("DEFAULT EVENT NAME", page.data.event_name)
    },

    revealForm(e) {
        this.setData({ reveal: true })
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
    },

    submitEvent(e) {
        this.setDateTime()
        if (e.detail.value.event_name === undefined) {       
        } else {
            const event_name = e.detail.value.event_name
            this.setData({ event_name })     
        }
        console.log("FINAL EVENT CREATION INFO", this.data)
        const event = {
            cuisines: this.data.cuisine,
            user_id: this.data.user.id,
            datetime: this.data.datetime,
            event_name: this.data.event_name
        }
        // requestData(`/events`, { event }, "POST").then((res) => {
        //     console.log(res)
        // })
        wx.request({
          url: 'http://localhost:3000/api/v1/events',
          header: app.getHeader(),
          method: "POST",
          data: event
        })
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