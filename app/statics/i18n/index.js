import zh_CN from './zh_CN.json';
import en_US from './en_US.json';

let i18n = {
    zh_CN,
    en_US,
}
export default (param) => {
    return i18n[param]
}