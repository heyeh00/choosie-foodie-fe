// pages/profile/profile.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import event from '@codesmiths/event';
import { requestData } from '../../utils/requestdata';
import { login } from '../../utils/login';

const app = getApp();

Page({
    data: {
        avatarUrl: defaultAvatarUrl,
    },

    onLoad(options) {
        if (getApp().globalData.header) {
            this.getData();
        } else {
            event.on('tokenReady', this, this.getData);
        }
    },

    eventCard(e) {
        console.log("EVENT CARD", e.currentTarget.dataset.event_id)
        const event_id = e.currentTarget.dataset.event_id
        // wx.navigateTo({
        //   url: `/pages/event/result`,
        //   success(res) {
        //       console.log("EVENT CARD RESULT", res)
        //       res.eventChannel.emit('acceptDataFromOpenerPage', { data: event_id })
        //   }
        // })
    },

    onChooseAvatar(e){
        const page = this
        console.log('CHOOSING AVATAR', e)
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
          },
          fail(errors) {
              console.log("UPLOAD FILE ERROR", errors)
          }
        })
    },

    setNickname(e) {
        const page = this
        console.log('CHOOSING NICKNAME', e)
        const nickname = e.detail.value.input
        page.setData({nickname})
        const user_id = page.data.user.id
        const user = {
            name: page.data.nickname
        }
        wx.request({
            url: `${app.globalData.baseUrl}/api/v1/users/${user_id}`,
            headers: app.getHeader(),
            method: "PUT",
            data: { user },
            success(res) {
                console.log("NICKNAME RES", res)
                app.globalData.user = res.data.user
                page.setData({user: res.data.user})
            }
        })
    },
    // goToEventDetail(e) {
    //     console.log('RES', e)
    // },
    
    getData() {
        this.setData({ user: app.globalData.user })
        console.log("PROFILE JS PAGE DATA", this.data)
        this.setData({ avatar: app.globalData.avatar })
        const page = this
        wx.request({
            url: `${app.globalData.baseUrl}/api/v1/events/users/${page.data.user.id}`,
            headers: app.getHeader(),
            success(res) {
                console.log("PROFILE RESQUEST RES", res)
                const { user_events } = res.data
                page.setData({ user_events })
                console.log("USERS EVENTS", user_events)
            
            },
            fail(errors) {
                console.log("ERROR", errors)
            }
        })
    },

    onReady() {

    },

    onShow() {

    },
  
    onHide() {

    },

    onUnload() {

    },

    onPullDownRefresh() {

    },

    onReachBottom() {

    },

    onShareAppMessage() {

    }
})