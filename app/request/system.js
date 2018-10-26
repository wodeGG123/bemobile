import request from './index'


export default {
    getInfo: (param) => {
        return (
            request.post(`https://${param.ip}:${param.port}/sae/public/rs/app/property/getSystemConfig.json`, param)
        )
    },
}