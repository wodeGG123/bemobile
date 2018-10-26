import request from './index'
import CommonJs from '../lib/common'
let DEVICE = CommonJs.getDevice()

export default {
    list: (param) => {
        param.device = DEVICE
        return (
            request.get(`https://${param.ip}:${param.port}/sae/public/rs/app/report/reportList`, param)
        )
    },
    //最近使用
    recentReport: (param) => {
        param.device = DEVICE
        return (
            request.post(`https://${param.ip}:${param.port}/sae/public/rs/app/report/searchGlance`, param)
        )
    },
    //分组
    reportGroup: (param) => {
        return (
            request.post(`https://${param.ip}:${param.port}/sae/public/rs/app/report/getReportGroupList`, param)
        )
    },
    addReportHistory: (param) => {
        return (
            request.get(`https://${param.ip}:${param.port}/sae/public/rs/app/addGlance`, param)
        )
    }
}