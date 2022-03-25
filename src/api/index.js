import requests from "./request";

// 用户
export const UsergetAll = (pageNum, pageSize) => requests({
    url: (`http://localhost:8083/user/getAllUser?pageNum=${pageNum}&pageSize=${pageSize}`),
    method: 'get'
});

export const UsergetById = (uId) => requests({
    url: (`http://localhost:8083/user/getUserById?uId=${uId}`),
    method: 'get'
});

export const UsergetByName = (userName) => requests({
    url: (`http://localhost:8083/user/getUserByName?userName=${userName}`),
    method: 'get'
});

export const UserRegsiter = (userName, userPwd, userSex, userPhone, userEmail,userIdentity, uCreateTime) => requests({
    method: 'post',
    url: 'http://localhost:8083/user/register',
    data: {
        userName : userName,
        userPwd : userPwd,
        userSex : userSex,
        userPhone : userPhone,
        userEmail : userEmail,
        userIdentity : userIdentity,
        uCreateTime : uCreateTime
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export const UserUpdate = (uId, userName, userPwd, userSex, userPhone, userEmail,userIdentity, uCreateTime) => requests({
    method: 'post',
    url: 'http://localhost:8083/user/updateUser',
    data: {
        uId : uId,
        userName : userName,
        userPwd : userPwd,
        userSex : userSex,
        userPhone : userPhone,
        userEmail : userEmail,
        userIdentity : userIdentity,
        uCreateTime : uCreateTime
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export const UserRemove = (uId) => requests({
  url: (`http://localhost:8083/user/deleteUser?uId=${uId}`),
  method: 'get'
});

export const UserDatchDelete = (uId) => requests({
    method: 'post',
    url: 'http://localhost:8083/user/batchDelete',
    data: {
         "uIds[]" : uId,
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});


// 商品
export const ProductgetAll = (pageNum, pageSize) => requests({
    url: (`http://localhost:8083/product/getAllProduct?pageNum=${pageNum}&pageSize=${pageSize}`),
    method: 'get'
});

export const ProductgetById = (pid) => requests({
    url: (`http://localhost:8083/product/getById?pid=${pid}`),
    method: 'get'
});

export const ProductAdd = (categoryId,brandId,title,subTitle,mainImg,price,count,createTime,updateTime,color,versions) => requests({
    url: (`http://localhost:8083/product/insertProduct`),
    method: 'post',
    data: {
        categoryId : categoryId,
        brandId : brandId,
        title : title,
        subTitle : subTitle,
        mainImg : mainImg,
        price : price,
        count : count,
        createTime : createTime,
        updateTime : updateTime,
        color : color,
        versions : versions
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export const ProductRemove = (pid) => requests({
    url: (`http://localhost:8083/product/deleteProduct?pid=${pid}`),
    method: 'get'
});

export const ProductUpdate = (pid,categoryId,brandId, title, subTitle, mainImg, price, count, createTime, updateTime, color, versions) => requests({
    url: (`http://localhost:8083/product/updateProduct`),
    method: 'post',
    data: {
        pid : pid,
        categoryId : categoryId,
        brandId : brandId,
        title : title,
        subTitle : subTitle,
        mainImg : mainImg,
        price : price,
        count : count,
        createTime : createTime,
        updateTime : updateTime,
        color : color,
        versions : versions,
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export const ProductDatchDelete = (pids) => requests({
    method: 'post',
    url: 'http://localhost:8083/product/batchDelete',
    data: {
         "pid[]" : pids,
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// 订单
export const OrderFindAll = (pageNum, pageSize) => requests({
    url: (`http://localhost:8082/orderInfo/findAll?pageNum=${pageNum}&pageSize=${pageSize}`),
    method: 'get'
});
export const OrderFindById = (oId) => requests({
    url: (`http://localhost:8082/orderInfo/findById?oId=${oId}`),
    method: 'get'
});
export const OrderFindByPhone = (oPhone) => requests({
    url: (`http://localhost:8082/orderInfo/findByPhone?oPhone=${oPhone}`),
    method: 'get'
});
export const OrderAdd = (oSn,oPcore,oPname,oPnumber,oPrice,oPaytime,oUname,oPhone,oAddress,oPaytype,oStatus) => requests({
    url: (`http://localhost:8082/orderInfo/addOrder?oSn=${oSn}&oPcore=${oPcore}&oPname=${oPname}&oPnumber=${oPnumber}&oPrice=${oPrice}&oPaytime=${oPaytime}&oUname=${oUname}&oPhone=${oPhone}&oAddress=${oAddress}&oPaytype=${oPaytype}&oStatus=${oStatus}`),
    method: 'get'
});
export const OrderUpdate = (oId,oSn,oPcore,oPname,oPnumber,oPrice,oTime,oUname,oPhone,oAddress,oPaytype,oStatus) => requests({
    url: (`http://localhost:8082/orderInfo/update?oId=${oId}&oSn=${oSn}&oPcore=${oPcore}&oPname=${oPname}&oPnumber=${oPnumber}&oPrice=${oPrice}&oTime=${oTime}&oUname=${oUname}&oPhone=${oPhone}&oAddress=${oAddress}&oPaytype=${oPaytype}&oStatus=${oStatus}`),
    method: 'get'
});
export const OrderRemove = (oId) => requests({
    url: (`http://localhost:8082/orderInfo/deleteById?oId=${oId}`),
    method: 'get'
});
