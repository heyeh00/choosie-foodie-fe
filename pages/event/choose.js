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
        restaurants: [
            {
                name: "毛头老爹饭店",
                price: 113,
                rating: 4.9,
                rating_int: 5,
                cuisine: "上海本帮菜",
                location: "静安寺",
                time: "December 22,2022 8pm"
            },
            {
                name: "Azabuya 麻布屋",
                price: 49,
                rating: 4.2,
                rating_int: 4,
                cuisine: "日本料理",
                location: "南京西路",
                time: "December 22,2022 8pm"
            },
            {
                name: "螺老爹螺狮煲火锅",
                price: 94,
                rating: 3.6,
                rating_int: 4,
                cuisine: "火锅",
                location: "人民广场",
                time: "December 22,2022 8pm"
            },
            {
                name: "Piment",
                price: 181,
                rating: 4.4,
                rating_int: 4,
                cuisine: "西餐",
                location: "衡山路",
                time: "December 22,2022 8pm"
            }
        ]
       
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
      console.log(e.currentTarget)
      console.log(e.currentTarget.dataset)
      let restaurants = this.data.events
      console.log("EVENT RESTAURANTS", restaurants)
      let restaurants_choice = this.data.restaurants_choice
      console.log(restaurants_choice)
      let restaurant = e.currentTarget.dataset.restaurantid
      console.log(restaurant)

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
          console.log("CREATE RES EVENT ID", res.data.restaurant_pick.event_id)
          wx.navigateTo({
            url: `/pages/event/result?id=${res.data.restaurant_pick.event_id}`,
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
    countStar(rating){
        parseInt(rating.toFixed())
    }
})