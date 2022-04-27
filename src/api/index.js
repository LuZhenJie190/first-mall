import requests from "./request";

// 用户登录
export const UserLogin = (params) => requests({
  url: "user/login",
  method: "POST",
  data: params
})

// 获取全部用户
export const UsergetAll = (pageNum, pageSize) => requests({
  url: (`user/getAllUser?pageNum=${pageNum}&pageSize=${pageSize}`),
  method: 'GET'
});

// 用户ID查询
export const UsergetById = (uId) => requests({
  url: (`user/getAllUser?uId=${uId}`),
  method: 'GET'
});

// 用户名查询
export const UsergetByName = (userName) => requests({
  url: (`user/getAllUser?userName=${userName}`),
  method: 'GET'
});

// 注册/添加用户
export const UserRegsiter = (params) => requests({
  method: 'POST',
  url: 'user/register',
  data: params
});

// 修改用户
export const UserUpdate = (params) => requests({
  method: 'PUT',
  url: 'user/updateUser',
  data: params
});

// 删除用户
export const UserRemove = (uId) => requests({
  url: (`user/deleteUser?uId=${uId}`),
  method: 'DELETE'
});

// 批量删除
export const UserDatchDelete = (uId) => requests({
  method: 'DELETE',
  url: 'user/batchDelete',
  data: {
    "uIds[]": uId,
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
  url: (`product/getAllProduct?pageNum=${pageNum}&pageSize=${pageSize}`),
  method: 'GET'
});

// ID查商品
export const ProductGetInfoById = (pid) => requests({
  url: (`product/getAllProduct?pid=${pid}`),
  method: 'GET'
});

// 商品详情
export const ProductDetail = (pid) => requests({
  url: `product/getDetailById?pid=${pid}`,
  method: "GET"
})

// 添加商品
export const ProductAdd = (params) => requests({
  url: (`product/insertProduct`),
  method: 'POST',
  data: params,
});
// 批量添加展示图片
export const ProductImageAdd = (params) => requests({
  url: (`productImage/insertBatch`),
  method: 'POST',
  data: params,
})

// 批量添加商品参数
export const ProductParamsAdd = (params) => requests({
  url: (`productParams/insertBatch`),
  method: 'POST',
  data: params,
});
// 删除商品参数
export const ProductParamsDelete = (pmId) => requests({
  url: (`productParams/delete?pmId=${pmId}`),
  method: 'DELETE',
})
// 修改商品参数
export const ProductParamsUpdate = (params) => requests({
  url: (`productParams/update`),
  method: 'PUT',
  data: params
})

// 商品删除
export const ProductRemove = (pid) => requests({
  url: (`product/deleteProduct?pid=${pid}`),
  method: 'DELETE'
});

// 商品修改
export const ProductUpdate = (params) => requests({
  url: (`product/updateProduct`),
  method: 'PUT',
  data: params,
});

// 商品批量删除
export const ProductDatchDelete = (pids) => requests({
  method: 'DELETE',
  url: 'product/batchDelete',
  data: {
    "pid[]": pids,
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

// 全部分类
export const ProductCategory = () => requests({
  url: (`cate/getAll`),
  method: 'GET'
});

//查品牌
export const ProductBrand = () => requests({
  url: (`brand/getAll`),
  method: 'GET'
});

// 分类查品牌
export const ProductBrandGetByCate = (categoryId) => requests({
  url: (`cate/getAll?categoryId=${categoryId}`),
  method: 'GET'
});

//品牌查商品
export const ProductGetByBrand = (brandId) => requests({
  url: (`brand/getAboutProduct?brandId=${brandId}`),
  method: 'GET'
});

export const ProductGetTitle = (title) => requests({
  url: (`http://localhost:8083/product/getByTitle?title=${title}`),
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
export const OrderAdd = (oSn, oPcore, oPname, oPnumber, oPrice, oPaytime, oUname, oPhone, oAddress, oPaytype, oStatus) => requests({
  url: (`http://localhost:8082/orderInfo/addOrder?oSn=${oSn}&oPcore=${oPcore}&oPname=${oPname}&oPnumber=${oPnumber}&oPrice=${oPrice}&oPaytime=${oPaytime}&oUname=${oUname}&oPhone=${oPhone}&oAddress=${oAddress}&oPaytype=${oPaytype}&oStatus=${oStatus}`),
  method: 'get'
});
export const OrderUpdate = (oId, oSn, oPcore, oPname, oPnumber, oPrice, oTime, oUname, oPhone, oAddress, oPaytype, oStatus) => requests({
  url: (`http://localhost:8082/orderInfo/update?oId=${oId}&oSn=${oSn}&oPcore=${oPcore}&oPname=${oPname}&oPnumber=${oPnumber}&oPrice=${oPrice}&oTime=${oTime}&oUname=${oUname}&oPhone=${oPhone}&oAddress=${oAddress}&oPaytype=${oPaytype}&oStatus=${oStatus}`),
  method: 'get'
});
export const OrderRemove = (oId) => requests({
  url: (`http://localhost:8082/orderInfo/deleteById?oId=${oId}`),
  method: 'get'
});