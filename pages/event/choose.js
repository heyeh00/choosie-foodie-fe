// pages/event/choose.js
Page({

    /**
     * Page initial data
     */
    data: {
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