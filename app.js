// app.js
import event, { emit } from '@codesmiths/event';
import { requestData } from './utils/requestdata';

App({
  onLaunch() {
    const page = this;

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        page.globalData.code = res.code;
        wx.request({
            url: `${this.globalData.baseUrl}/api/v1/login`,
            method: "POST",
            data: { code: res.code },
            success(loginRes) {
                console.log("LOGIN RES", loginRes)
                
                page.globalData.user = loginRes.data.user;
                // if (wx.getStorageSync('user').length === 0) wx.setStorageSync('user', loginRes.data.user)
                console.log("SET USER TO GLOBALDATA", page.globalData.user)
                page.globalData.header = loginRes.header['Authorization']
                event.emit('tokenReady')
            },
        })
      }
    })
  },
  getUrl() {
    return this.globalData.baseUrl;
  },

  getHeader() {
    return this.globalData.header;
  },

  getUserId() {
    return this.globalData.user.id;
  },

  globalData: {
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://choosie-foodie.wogengapp.cn',
    cuisines: [
        {
          name: 'Any',
          icon: "/icons/Food-Icons/tteok.png",
          selected: true
        },
        {
          name: "Korean",
          icon: "/icons/Food-Icons/bibimbap.png",
          selected: false
        },
        {
          name: 'Indian',
          icon: "/icons/Food-Icons/masala-dosa.png",
          selected: false

        },
        {
          name: 'Italian',
          icon: "/icons/Food-Icons/pasta.png",
          selected: false
        },   
        {
          name: 'Japanese',
          icon: "/icons/Food-Icons/ramen.png",
          selected: false
        },     
        {
          name: 'Spanish',
          icon: "/icons/Food-Icons/seafood.png",
          selected: false
        },   
        {
          name: 'Mexican',
          icon: "/icons/Food-Icons/tacos.png",
          selected: false
        },   
        {
          name: 'Thai',
          icon: "/icons/Food-Icons/thai-food.png",
          selected: false
        },
        {
          name: 'Vegetarian',
          icon: "/icons/Food-Icons/vegetable.png",
          selected: false
        },
        {
          name: 'Hotpot',
          icon: "/icons/Food-Icons/hot-pot.png",
          selected: false
        }

      ],
  }
})
