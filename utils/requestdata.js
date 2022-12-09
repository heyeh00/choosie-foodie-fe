export function requestData(path, data = {}, method = "GET") {
    const app = getApp();
    const test_url = app.getUrl()

    const url = `${app.getUrl()}${path}`;
    const header = { Authorization: app.getHeader() }
    console.log("REQUEST HEADER", header)

    return new Promise((resolve) => {
        wx.request({
            url, 
            header, 
            data,
            method,
            success(reqRes) {
                resolve(reqRes)
            },
            fail(errors) {
                console.log(errors)
            }
        })
    })
}

// module.exports = {
//     requestData,
// }