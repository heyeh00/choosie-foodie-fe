export function requestData(path, data = {}, method = "GET") {
    const app = getApp();
    const url = `${app.getUrl()}${path}`;
    const header = { Authorization: app.getHeader() }

    return new Promise((resolve) => {
        wx.request({
            url, 
            header, 
            data,
            method,
            success(reqRes) {
                resolve(reqRes)
            }
        })
    })
}

// module.exports = {
//     requestData,
// }