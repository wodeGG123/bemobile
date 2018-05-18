import request from './index'


export default {
    list:(param)=>{
        return(
            request.post(`http://10.0.4.190:8088/sae/public/rs/app/report/reportList`,param)
        )
    },
    //最近使用
    recentReport:(param)=>{
        return(
            request.post(`http://10.0.4.190:8088/sae/public/rs/app/report/searchGlance`,param)
        )
    },
    //分组
    reportGroup:(param)=>{
        return(
            request.post(`http://10.0.4.190:8088/sae/public/rs/app/report/getReportGroupList`,param)
        )
    }
}