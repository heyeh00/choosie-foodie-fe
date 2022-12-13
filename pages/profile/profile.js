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

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        console.log("any")
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
        const page = this
        wx.getUserProfile({
            desc: 'need avatar',
            success(res) {
                console.log('user', res)
                const user_id = page.data.user.id
                const user = {
                    name: res.userInfo.nickName,
                    image_url: res.userInfo.avatarUrl
                }
                wx.request({
                    url: `${app.globalData.baseUrl}/api/v1/users/${user_id}`,
                    headers: app.getHeader(),
                    method: "PUT",
                    data: { user },
                    success(res) {
                        console.log(res)
                        app.globalData.user = res.data.user
                        page.setData({user: res.data.user})
                    }
                })
            }
        })
    },

    getData() {
        this.setData({ user: app.globalData.user })
        console.log("PROFILE JS PAGE DATA", this.data)
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