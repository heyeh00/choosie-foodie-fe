// pages/event/choose.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {
      restaurants_choice: []
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const page = this
        page.setData({ event_id: parseInt(options.id) })
        wx.request({
          url: `http://localhost:3000/api/v1/events/${options.id}/event_restaurants`,
          header: app.getHeader(),
          success(res) {
            page.setData({ events: res.data.events })
            console.log("GET EVENTS", page.data.events)
          },
        })
    },

    restaurantAny(){
        let restaurants = this.data.events
  
        restaurants.map(item => item.selected = false)
        restaurants[0]['selected'] = true
      
        this.setData({restaurants_choice: []})
        this.setData({restaurants})
        
    },

    chosenRestaurant(e) {
      console.log(e.currentTarget.dataset)
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
        console.log("FINAL RESTAURANTS CHOICE", this.data.restaurants_choice)
        this.setData({restaurants})
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

      const user = wx.getStorageSync('user')
      const data = {
        user_id: user.id,
        event_id: this.data.event_id,
        restaurants: submitEvents
      }
      console.log("REQUEST DATA", data)
      wx.request({
        url: `http://localhost:3000/api/v1/restaurant_picks`,
        header: app.getHeader(),
        data,
        method: "POST",
        success(res) {
          console.log("CREATE RES", res)
          wx.navigateTo({
            url: '/pages/event/result',
          })
        },
        fail(errors) {
          console.log("ERRORS", errors)
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

    },

    // chosenRestaurant(e) {
    //     const restaurantid = e.currentTarget.dataset.restaurantid
    //     let events = this.data.events
  
    //     events.push(restaurantid)
    //     this.setData({events})
    //     console.log("CUMULATIVE CHOICES", this.data.events)
    // },
    
    // submitChoices(e) {
    //     const events = this.data.events
    //     console.log("CHOICE ARRAY", events)
    //     const count = {};
    //     for (const element of events) {
    //       if (count[element]) {
    //         count[element] += 1;
    //       } else {
    //         count[element] = 1;
    //       }
    //     }
    //     console.log("Final Counts", count)
    //     const submitRestaurants = []
    //     Object.keys(count).forEach(key => {
    //       if (count[key] % 2) {
    //         console.log("ODD", key)
    //         submitRestaurants.push(key)
    //       } else {
    //         console.log("EVEN", key)
    //       }  
    //     })
    //     this.setData({ submitRestaurants })
    //     console.log("SUBMIT RESTAURANTS", this.data.submitRestaurants)
    //   }
})