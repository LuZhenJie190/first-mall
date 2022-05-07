// 获取当前时间
export function getnowDate() {
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let mon = nowDate.getMonth() < 10 ? "0" + nowDate.getMonth() : nowDate.getMonth();
    let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    let h = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    let m = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    let s = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    let obj = `${year}-${mon}-${day} ${h}:${m}:${s}`;
    return obj;

}

// 手机号正则
export function phoneValidation(p) {
    return /^1[3-9][0-9]{9}$/.test(p);
}

// 邮箱正则
export function emailValidation(p) {
    return /^\w{5,12}@[a-z0-9A-Z]{1,3}\.com$/.test(p);
}