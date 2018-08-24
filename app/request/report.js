import request from './index'


export default {
    list: (param) => {
        return (
            request.get(`http://${param.ip}:${param.port}/sae/public/rs/app/report/reportList`, param)
        )
    },
    //最近使用
    recentReport: (param) => {
        console.log(`http://${param.ip}:${param.port}/sae/public/rs/app/report/searchGlance`, param)
        return (
            request.post(`http://${param.ip}:${param.port}/sae/public/rs/app/report/searchGlance`, param)
        )
    },
    //分组
    reportGroup: (param) => {
        return (
            request.post(`http://${param.ip}:${param.port}/sae/public/rs/app/report/getReportGroupList`, param)
        )
    },
    addReportHistory: (param) => {
        return (
            request.get(`http://${param.ip}:${param.port}/sae/public/rs/app/addGlance`, param)
        )
    }
}