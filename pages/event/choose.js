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
    goToResult(e) {
      const { id }= e.currentTarget.dataset;
      console.log("ID",id)
      wx.navigateTo({
        url: `/pages/event/result?id=${id}`,
        success(res) {
            console.log("EVENT CARD RESULT", res)
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
        }
      })
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const page = this
        // cosnt eventStatus =  this.data.event.closed
        // page.setData({ eventStatus: app.globalData.event.closed })
        page.setData({ cuisine: app.globalData.cuisines })        
        page.setData({ event_id: parseInt(options.id) })
        wx.request({
          url: `${app.globalData.baseUrl}/api/v1/events/${options.id}/event_restaurants`,
          header: app.getHeader(),
          success(res) {
            page.setData({ events: res.data.events});
          },
        })
        event.on('tokenReady', page, page.checkAvatar)
        console.log("I'm in ONLOAD")
    },

    checkAvatar() {
        const page = this
        if (app.globalData.user.image_url) {
            page.setData({ avatar: app.globalData.user.image_url })
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
              page.submitChoices()
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
      // if (restaurant !== "Any" || restaurants_choice.length !== 0) {
        // remove "any" from the array

        let item = restaurants.find(item => item.restaurant.id === restaurant)
        // if the restaurant is in the array, remove it
        if (restaurants_choice.includes(restaurant)) {
            restaurants_choice = restaurants_choice.filter( item =>  item != restaurant ) 
            item.selected = false
            // if (restaurants_choice.length === 0) this.restaurantAny()
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
      // }
    },

    submitChoices(e) {
      const submitEvents = []
      const choices = this.data.restaurants_choice
      // Ask user to choose restaurant before submit
      if (choices.length === 0) return  wx.showModal({
      // wx.showToast({
      //     title: 'Please select restaurant',
      //     icon: 'none'
      //   })
       
          title: 'Tips',
          content: 'Please choose at least one restaurant',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('User clicks confirm')
            }
          }
        })
        
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
        const page = this

        console.log("I'm in ONSHOW")
        if (app.globalData.user) {
            page.setData({ user: app.globalData.user })
            console.log("BUG REPORT", page.data.user)
        } else {
            event.on('tokenReady', this, this.setUser)
        }
        // Added Dec 15th
        wx.request({
            url: `${app.globalData.baseUrl}/api/v1/events/${this.options.id}`,
            header: app.getHeader(),
            success(res) {
              page.setData({ event: res.data.event })
            },
        })
        // copied from onLoad
        page.setData({ cuisine: app.globalData.cuisines })        
        page.setData({ event_id: parseInt(this.options.id) })
        wx.request({
          url: `${app.globalData.baseUrl}/api/v1/events/${this.options.id}/event_restaurants`,
          header: app.getHeader(),
          success(res) {
            let { events } = res.data;
            events.forEach((event, index) => {
              let { cuisine } = event.restaurant;
              cuisine = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
              events[index].restaurant.cuisine = cuisine;
            })
            page.setData({ events })
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