export function login(e) {
    const page = this
    wx.getUserProfile({
      desc: 'get users pic and name',
      success(res) {
          console.log("SUCCESS RES", res.userInfo)
          const user = {
            // id: app.getUserId(),
            name: res.userInfo.nickName,
            image_url: res.userInfo.avatarUrl,
          }
          console.log("PRE PUT {DATA}", user)

          requestData(`/users/${app.getUserId()}`, { user }, "PUT").then((res) => {
            console.log("POST PUT {DATA}", res)  
            page.setData({ user: res.data.user })
            console.log("PAGE DATA", page.data)
          })
      },
      fail(errors) {
          console.log("LOGIN ERROR", errors)
      }
    })
}