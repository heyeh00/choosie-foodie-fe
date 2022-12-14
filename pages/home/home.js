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
            icon: "/images/food-icons/any.png",
            selected: true
        },
        {
            name: "Korean",
            icon: "/images/food-icons/korean.png",
            selected: false
        },
        {
            name: 'Indian',
            icon: "/images/food-icons/indian.png",
            selected: false
        },
        {
            name: 'Italian',
            icon: "/images/food-icons/italian.png",
            selected: false
        },   
        {
            name: 'Japanese',
            icon: "/images/food-icons/japanese.png",
            selected: false
        },     
        {
            name: 'Spanish',
            icon: "/images/food-icons/spanish.png",
            selected: false
        },   
        {
            name: 'Mexican',
            icon: "/images/food-icons/mexican.png",
            selected: false
        },   
        {
            name: 'Thai',
            icon: "/images/food-icons/thai.png",
            selected: false
        },
        {
            name: 'Veggies',
            icon: "/images/food-icons/veggies.png",
            selected: false
        },
        {
            name: 'Hotpot',
            icon: "/images/food-icons/hotpot.png",
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
        // const page = this
        // event.on('tokenReady', page, page.getData);
        // page.setData(
        //   {
        //     date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
        //   }
        // )
        // event.on('tokenReady', page, page.checkAvatar);
        // console.log("I am in unload")
    },

    checkAvatar() {
        const page = this
        if (app.globalData.user?.image_url) {
            page.setData({ avatar: app.globalData.user.image_url })
            console.log("GLOBAL AVATAR DATA", page.data.avatar)
        } else {
            console.log("NO GLOBAL AVATAR")
        }
    },

    getData() {
      this.setData({ user: app.globalData.user })
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
              console.log("CHOOSE AVATAR RES", data.user)
            //   page.setData({ avatar: data.avatar })
              page.setData({ user: data.user})
              app.globalData['user'] = page.data.user
              page.submitEvent()
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
      const page = this
      if (app.globalData.user) {
        page.getData()
      } else {
        event.on('tokenReady', page, page.getData);
      }
      page.setData(
        {
          date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
        }
      )
      event.on('tokenReady', page, page.checkAvatar);
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