// app.js
import event, { emit } from '@codesmiths/event';
import { requestData } from './utils/requestdata';

App({
  onLaunch() {
    const page = this;

    wx.login({
      success: res => {
        page.globalData.code = res.code;
        wx.request({
            url: `${this.globalData.baseUrl}/api/v1/login`,
            method: "POST",
            data: { code: res.code },
            success(loginRes) {
                console.log("LOGIN RES", loginRes)
                
                page.globalData.user = loginRes.data.user;
                page.globalData.avatar = loginRes.data.avatar;
                console.log("APP JS AVATAR", page.globalData.avatar)

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
    baseUrl: 'http://localhost:3000',
    // baseUrl: 'https://choosie-foodie.shanghaiwogeng.com',
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
  }
})
