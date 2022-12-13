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
            icon: "/icons/Food-Icons/any.png",
            selected: true
        },
        {
            name: "Korean",
            icon: "/icons/Food-Icons/korean.png",
            selected: false
        },
        {
            name: 'Indian',
            icon: "/icons/Food-Icons/indian.png",
            selected: false
        },
        {
            name: 'Italian',
            icon: "/icons/Food-Icons/italian.png",
            selected: false
        },   
        {
            name: 'Japanese',
            icon: "/icons/Food-Icons/japanese.png",
            selected: false
        },     
        {
            name: 'Spanish',
            icon: "/icons/Food-Icons/spanish.png",
            selected: false
        },   
        {
            name: 'Mexican',
            icon: "/icons/Food-Icons/mexican.png",
            selected: false
        },   
        {
            name: 'Thai',
            icon: "/icons/Food-Icons/thai.png",
            selected: false
        },
        {
            name: 'Veggies',
            icon: "/icons/Food-Icons/veggies.png",
            selected: false
        },
        {
            name: 'Hotpot',
            icon: "/icons/Food-Icons/hotpot.png",
            selected: false
        }

        ],
    },
    goToEvent(e) {
      wx.switchTab({
        url: '/pages/event/event',
      })
  },

    onLoad(options) {
        const page = this
        event.on('tokenReady', page, page.getData);
        page.setData(
          {
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
          }
        )
        event.on('tokenReady', page, page.checkAvatar);
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