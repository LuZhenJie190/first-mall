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

// 商品
export const ProductInfoFindAll = (pageNum, pageSize) => requests({
    url: (`http://localhost:8082/productInfo/findAll?pageNum=${pageNum}&pageSize=${pageSize}`),
    method: 'get'
});
export const ProductAdd = (pPhoto,pCore, pName, pPrice, pColor, pVersion, pWeight, pWidth, pHeight, pSupplier, pType, pSort) => requests({
    url: (`http://localhost:8082/productInfo/addProduct?pPhoto=${pPhoto}&pCore=${pCore}&pName=${pName}&pPrice=${pPrice}&pColor=${pColor}&pVersion=${pVersion}&pWeight=${pWeight}&pWidth=${pWidth}&pHeight=${pHeight}&pSupplier=${pSupplier}&pType=${pType}&pSort=${pSort}`),
    method: 'get'
});
export const ProductRemove = (pId) => requests({
    url: (`http://localhost:8082/productInfo/deleteById?pId=${pId}`),
    method: 'get'
});
export const ProductFindById = (pId) => requests({
    url: (`http://localhost:8082/productInfo/findById?pId=${pId}`),
    method: 'get'
});
export const ProductUpdateById = (pId,pPhoto,pCore, pName, pPrice, pColor, pVersion, pWeight, pWidth, pHeight, pSupplier, pType, pSort) => requests({
    url: (`http://localhost:8082/productInfo/updateById?pId=${pId}&pPhoto=${pPhoto}&pCore=${pCore}&pName=${pName}&pPrice=${pPrice}&pColor=${pColor}&pVersion=${pVersion}&pWeight=${pWeight}&pWidth=${pWidth}&pHeight=${pHeight}&pSupplier=${pSupplier}&pType=${pType}&pSort=${pSort}`),
    method: 'get'
});
export const ProductFindByCore = (pCore) => requests({
    url: (`http://localhost:8082/productInfo/findByCore?pCore=${pCore}`),
    method: 'get'
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
