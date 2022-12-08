// pages/profile/profile.js
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
import { login } from '../../utils/login';

const app = getApp();

Page({
    /**
     * Page initial data
     */
    data: {
        // user: app.globalData.user,
        restaurants: [
            {
                name: "毛头老爹饭店",
                price: 113,
                rating: 3.9,
                cuisine: "上海本帮菜",
                location: "静安寺",
                time: "December 22,2022 8pm"
            },
            {
                name: "Azabuya 麻布屋",
                price: 49,
                rating: 4.2,
                cuisine: "日本料理",
                location: "南京西路",
                time: "December 22,2022 8pm"
            },
            {
                name: "螺老爹螺狮煲火锅",
                price: 94,
                rating: 3.6,
                cuisine: "火锅",
                location: "人民广场",
                time: "December 22,2022 8pm"
            },
            {
                name: "Piment",
                price: 181,
                rating: 4.4,
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
        if (getApp().globalData.header) {
            this.getData();
        } else {
            event.on('tokenReady', this, this.getData);
        }
    },

    onChooseAvatar(e){
        console.log('TEST')
        const { avatarUrl } = e.detail
        this.setData({avatarUrl})
    },

    login(e) {
        const userId = wx.getStorageSync('user')
        const avatarUrl  = e.detail.avatarUrl
        this.setData({avatarUrl})
        const page = this
        const user = { image_url: e.detail.avatarUrl }
        wx.request({
          url: `http://localhost:3000/api/v1/users/${userId.id}`,
          headers: app.getHeader(),
          method: "PUT",
          data: { user },
          success(res) {
              this.setData({user: res.data.user})
          }
        })

        // requestData(`/users/${app.getUserId}`, { user }, "PUT").then((res) => {
        //     console.log("POST PUT {DATA}", res)  
        //     page.setData({ user: res.data.user })
        //     app.globalData.user = res.data.user
        //     console.log("PAGE DATA", page.data)
        // })
        //   },
        //   fail(errors) {
        //       console.log("LOGIN ERROR", errors)
        //   }
        // })
    },

    getData() {
        this.setData({ user: app.globalData.user })
        const page = this
        wx.request({
            url: 'http://localhost:3000/api/v1/restaurants',
            success(res) {
                console.log("get all restaurants", res)
                if (res.statusCode !== 200) return
                // 将获取到的数据保存在dataObject中
                page.setData({ restaurants: res.data.restaurants.reverse() })
                // 设置marker
                page.onSetMarkers(res.data.restaurants)
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
        // if (getApp().globalData.header) {
        //     this.getData();
        // } else {
        //     event.on('tokenReady', this, this.getData);
        // }
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