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
        page.setData({ event })
        wx.request({
          url: `http://localhost:3000/api/v1/events/${options.id}/event_restaurants`,
          header: app.getHeader(),
          success(res) {
            page.setData({ events: res.data.events })
            console.log("GET EVENTS", page.data.events)
          },
        })
    },

    chosenRestaurant(e) {
      console.log(e.currentTarget.dataset)
      let restaurants = this.data.events
      console.log("RESTAURANTS", restaurants)

      let restaurants_choice = this.data.restaurants_choice
      console.log("RESTAURANTS CHOICE", restaurants_choice)

      let restaurant = e.currentTarget.dataset.restaurantid
      console.log("RESTAURANT", restaurant)

      // if you click on a restaurant add that array and any is deleted
      if (restaurant !== "Any" || restaurants_choice.length !== 0) {
        // remove "any" from the array
        restaurants[0]['selected'] = false
        // events = events.filter( item =>  item != "Any" )
        let item = restaurants.find(item => item.restaurant.id === restaurant)  
        console.log("ITEM", item)
        // if the restaurant is in the array, remove it
        if (restaurants_choice.includes(restaurant)) {
            restaurants_choice = restaurants_choice.filter( item =>  item != restaurant ) 
            item.selected = false
            console.log("IF RESTAURANTS CHOICE", restaurants_choice)
        }
        else {
            item.selected = true
            restaurants_choice.push(restaurant)
            console.log("ELSE RESTAURANTS CHOICE", restaurants_choice)
        }
        // else add it
        this.setData({restaurants_choice})
        console.log("FINAL RESTAURANTS CHOICE", this.data.restaurants_choice)
        this.setData({restaurants})
        console.log("FINAL RESTAURANTS", this.data.restaurants)
      } else {
        console.log("IS ZERO")
      }
    },

    submitChoices(e) {
      
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