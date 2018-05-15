var fetch =  require('whatwg-fetch')
import config from '../config/index'

let Request = new Object();

Request.get = function(url,param){
    url = config.DOMAIN + url;
    if(param){
        let paramsArray = [];
        //拼接参数
        Object.keys(param).forEach(key => paramsArray.push(key + '=' + param[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return fetch(url,{
        method:'GET',
    })
    .then((res)=>{return res.json()})
    .catch(error=>{console.log(error)})
}

Request.post = function(url,param){
    url = config.DOMAIN + url;
    //json to formdata
    var formData = new FormData();
    for(let i in param){
        //判断是否是json对象，如果是则转换成string
        if(typeof(param[i]) == "object" && Object.prototype.toString.call(param[i]).toLowerCase() == "[object object]" && !param[i].length){
            param[i] = JSON.stringify(param[i]);
        }
        formData.append(i,param[i])
    }
    return fetch(url,{
        method:'POST',
        headers: {},
        body: formData,
        credentials: "include",
    })
    .then((res)=>{return res.json()})
    .catch(error=>{console.log(error)})

}
                      
export default Request