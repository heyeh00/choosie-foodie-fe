// pages/home/home.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {
    cuisines: [
        {
            name: 'Any',
            icon: "/icons/Food-Icons/Any.png",
            selected: true
        },
        {
            name: "Korean",
            icon: "/icons/Food-Icons/Korean.png",
            selected: false
        },
        {
            name: 'Indian',
            icon: "/icons/Food-Icons/Indian.png",
            selected: false

        },
        {
            name: 'Italian',
            icon: "/icons/Food-Icons/Italian.png",
            selected: false
        },   
        {
            name: 'Japanese',
            icon: "/icons/Food-Icons/Japanese.png",
            selected: false
        },     
        {
            name: 'Spanish',
            icon: "/icons/Food-Icons/Spanish.png",
            selected: false
        },   
        {
            name: 'Mexican',
            icon: "/icons/Food-Icons/Mexican.png",
            selected: false
        },   
        {
            name: 'Thai',
            icon: "/icons/Food-Icons/Thai.png",
            selected: false
        },
        {
            name: 'Vegetarian',
            icon: "/icons/Food-Icons/Vegetarian.png",
            selected: false
        },
        {
            name: 'Hotpot',
            icon: "/icons/Food-Icons/Hotpot.png",
            selected: false
        }

        ],
    },
    goToEvent(e) {
      wx.switchTab({
        url: '/pages/event/event',
      })
  },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const page = this
        event.on('tokenReady', page, page.getData);
        // requestData(`/cuisines`, {}, "GET").then((res) => {
        //     console.log('res from cuisines GET', res.data)
        // let cuisines = this.data.cuisines
        // cuisines = [,...res.data.cuisines]
        //     page.setData({ cuisines: res.data.cuisines })
        // })
        page.setData(
          {
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`
          }
        )

    },

    getData() {
        this.setData({ user: app.globalData.user })
        // console.log("HOME USER INFO", this.data.user)
    },

    bindDateChange(e) {
      this.setData({ date: e.detail.value })
    },

    bindTimeChange(e) {
      this.setData({ time: e.detail.value })
    },

    cuisineAny(){
      let { cuisines } = this.data

      cuisines.map(item => item.selected = false)
      cuisines[0]['selected'] = true
    
      this.setData({cuisines_choice: []})
      this.setData({cuisines})
      
    },

    editCuisines(e) {
      let { cuisines } = this.data
      let cuisines_choice = this.data.cuisines_choice
      let cuisine = e.currentTarget.dataset.cuisine


      // if you click on a cuisine add that array and any is deleted
      if (cuisine !== "Any" || cuisines_choice.length !== 0) {
        // remove "any" from the array
        cuisines[0]['selected'] = false
        cuisines_choice = cuisines_choice.filter( item =>  item != "Any" )
        let item = cuisines.find(item => item.name === cuisine)  
        console.log("ITEM", item)
        // if the cuisine is in the array, remove it
        if (cuisines_choice.includes(cuisine)) {
          cuisines_choice = cuisines_choice.filter( item =>  item != cuisine ) 
          item.selected = false
          if (cuisines_choice.length === 0) this.cuisineAny()
        }
        else {
          item.selected = true
          cuisines_choice.push(cuisine)
        }
        // else add it
        this.setData({cuisines_choice})
        this.setData({cuisines})
      }
      
      if (cuisine === "Any") this.cuisineAny()
      
      


      // else we create a cuisines array and push that cusines

      
    },

    submitEvent(e) {
    //   console.log(this.data.cuisines_choice.value)
      const event_info = {
          cuisines: this.data.cuisines_choice,
          date: this.data.date,
          time: this.data.time, 
      }
      app.globalData['event_info'] = event_info
      console.log("SENDING EVENT INFO", event_info)
      wx.switchTab({
        url: '/pages/event/event'
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
      this.cuisineAny()
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