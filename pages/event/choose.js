// pages/event/choose.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {
        restaurants_choice: [],
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const page = this
        page.setData({ cuisine: app.globalData.cuisines })        
        page.setData({ event_id: parseInt(options.id) })
        wx.request({
          url: `${app.globalData.baseUrl}/api/v1/events/${options.id}/event_restaurants`,
          header: app.getHeader(),
          success(res) {
            page.setData({ events: res.data.events })
          },
        })
        event.on('tokenReady', page, page.checkAvatar)
        console.log("I'm in ONLOAD")
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

    onChooseAvatar(e) {
        const page = this
        const { avatarUrl } = e.detail
        page.setData({avatarUrl})
        const user_id = page.data.user.id
        wx.uploadFile({
          filePath: avatarUrl,
          name: 'avatar',
          url: `${app.globalData.baseUrl}/api/v1/users/${user_id}/attach_avatar`,
          headers: app.getHeader(),
          success(res) {
              const data = (JSON.parse(res.data))
              page.setData({ avatar: data.avatar })
              app.globalData['avatar'] = page.data.avatar
              page.setData({ user: data.user})
              console.log("CHECK SET DATA", page.data)
              page.submitEvent()
          },
          fail(errors) {
              console.log("UPLOAD FILE ERROR", errors)
          }
        })
    },



    selected(e) {
        console.log(e)
    },

    restaurantAny(){
        let restaurants = this.data.events
  
        restaurants.map(item => item.selected = false)
        restaurants[0]['selected'] = true
      
        this.setData({restaurants_choice: []})
        this.setData({restaurants})
        
    },

    chosenRestaurant(e) {
      let restaurants = this.data.events
      let restaurants_choice = this.data.restaurants_choice
      let restaurant = e.currentTarget.dataset.restaurantid

      // if you click on a restaurant add that array and any is deleted
      if (restaurant !== "Any" || restaurants_choice.length !== 0) {
        // remove "any" from the array

        let item = restaurants.find(item => item.restaurant.id === restaurant)
        // if the restaurant is in the array, remove it
        if (restaurants_choice.includes(restaurant)) {
            restaurants_choice = restaurants_choice.filter( item =>  item != restaurant ) 
            item.selected = false
            if (restaurants_choice.length === 0) this.restaurantAny()
        }
        else {
            item.selected = true
            restaurants_choice.push(restaurant)
        }
        // else add it
        this.setData({restaurants_choice})
        console.log("CHOSEN RESTAURANTS", this.data.restaurants_choice)
        // REVIEW THIS FIX
        this.setData({restaurants, events: restaurants})
      }
    },

    submitChoices(e) {
      const submitEvents = []
      const choices = this.data.restaurants_choice
      console.log("CHOICES", choices)
      const events = this.data.events
      console.log("EVENTS", events)
      
      events.forEach(event => {
        if (event.selected === true) {
          submitEvents.push(event.id)
        }
      })

      const user = app.globalData.user
      const data = {
        user_id: user.id,
        event_id: this.data.event_id,
        restaurants: submitEvents
      }
      console.log("REQUEST DATA", data)
      wx.request({
        url: `${app.globalData.baseUrl}/api/v1/restaurant_picks`,
        header: app.getHeader(),
        data,
        method: "POST",
        success(res) {
          console.log("CREATE RES EVENT ID", res.data.restaurant_pick.event_id)
          wx.navigateTo({
            url: `/pages/event/result?id=${res.data.restaurant_pick.event_id}`,
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
        console.log("I'm in ONSHOW")
        if (app.globalData.user) {
            page.setData({ user: app.globalData.user })
        } else {
            event.on('tokenReady', this, this.setUser)
        }
        const page = this
        page.setData({ cuisine: app.globalData.cuisines })        
        page.setData({ event_id: parseInt(options.id) })
        wx.request({
          url: `${app.globalData.baseUrl}/api/v1/events/${options.id}/event_restaurants`,
          header: app.getHeader(),
          success(res) {
            page.setData({ events: res.data.events })
          },
        })
        event.on('tokenReady', page, page.checkAvatar)
        console.log("I'm in ONLOAD")
    },

    setUser() {
        this.setData({user: app.globalData.user})
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

    },
    countStar(rating){
        parseInt(rating.toFixed())
    }
})