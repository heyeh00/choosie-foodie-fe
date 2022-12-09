// pages/event/event.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {
        reveal: false,
        eventCreated: false,
    },

    goToHome(e) {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
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

    setEventName(e){
        console.log(e.detail.value)
        let event_name = this.data.event_name
        if (e.detail.value.length === 0) {
            event_name =  "Choosie Foodie Event"
        } else {
            event_name = e.detail.value
        }
        this.setData({event_name})
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
<<<<<<< HEAD
        console.log(e)
        console.log(e.detail)
        console.log(e.detail.value)
        this.setDateTime()
        if (e.detail.value.event_name === undefined) {       
        } else {
            const event_name = e.detail.value.event_name
            this.setData({ event_name })     
        }
=======
        wx.showLoading({
          title: 'Creting Event',
        })
        const page = this
        page.setDateTime()
        // if (e.detail.value.event_name) {       
        // } else {
        //     const event_name = e.detail.value.event_name
        //     page.setData({ event_name })     
        // }
        console.log("FINAL EVENT CREATION INFO", page.data)
>>>>>>> xiaomei
        const event = {
            cuisine: page.data.cuisine,
            user_id: page.data.user.id,
            datetime: page.data.datetime,
            event_name: page.data.event_name
        }
        // requestData(`/events`, { event }, "POST").then((res) => {
        //     console.log(res)
        // })
        wx.request({
          url: 'http://localhost:3000/api/v1/events',
          header: app.getHeader(),
          method: "POST",
          data: event,
<<<<<<< HEAD
          success(eventCreateRes) {
            console.log(eventCreateRes)
            console.log(eventCreateRes.data.event.id)
            wx.navigateTo({
                url: `/pages/event/choose?id=${eventCreateRes.data.event.id}`,
            })
          }
=======
          success(res) {
            console.log('res from event CREATE: ',res)
            if (res.statusCode === 200) {
                wx.hideLoading()
                wx.showToast({
                  title: 'Created',
                  duration: 1000
                })
                page.setData({
                    eventCreated: true,
                    eventId: res.data.event.id
                })

            }
            
          }

>>>>>>> xiaomei
        })
        // wx.navigateTo({
        //   url: '/pages/event/choose',
        // })
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    onShow() {
        const page = this
        console.log(app.globalData)
        const myEvent = app.globalData.event_info;

        page.setData({myEvent})
        if (myEvent !== undefined) {

            const date = app.globalData.event_info.date
            page.setData({ date })
    
            const time = app.globalData.event_info.time
            page.setData({ time })
    
            const cuisine = app.globalData.event_info.cuisines
            page.setData({cuisine})
    
            const user = wx.getStorageSync('user')
            page.setData({ user })
    
            page.setData({ event_name: `${user.name}'s choosie foodie event` })
        }

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
        return {
            title: this.data.event_name,
            path: "pages/event/choose"
        }
    }
})