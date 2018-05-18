import request from './index'


export default {
    login:(param)=>{
        return(
            request.post(`http://${param.ip}:${param.port}/sae/public/rs/app/login`,{
                username:param.username,
                password:param.password,
            })
        )
    },
    loginOut:(param)=>{
        return(
            request.post(`http://${param.ip}:${param.port}/sae/public/rs/app/logout`,{
                loginId:param.token
            })
        )
    },
}