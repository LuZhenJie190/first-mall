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

// 地址查询
export const AddressById = (userId) => requests({
  url: (`userAddress/getById?userId=${userId}`),
  method: 'GET',
});

// 地址添加
export const AddressInsert = (params) => requests({
  url: (`userAddress/insertAddress`),
  method: 'POST',
  data: params
});

// 地址修改
export const AddressUpdate = (params) => requests({
  url: (`userAddress/update`),
  method: 'PUT',
  data: params
});

// 地址删除
export const AddressDelete = (uaId) => requests({
  url: (`userAddress/deleteById?uaId=${uaId}`),
  method: 'DELETE',
});

// -------------------------------------------------------------------------------------------------------------
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


// ID查商品
export const ProductGetInfoByTitle = (title) => requests({
  url: (`product/getAllProduct?title=${title}`),
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

// 分类查商品
export const ProductGetByCate = (categoryId) => requests({
  url: (`cate/getByProduct?categoryId=${categoryId}`),
  method: 'GET'
});

// 查价格
export const ProductGetPrice = (params) => requests({
  url: (`productParams/getPrice`),
  method: 'POST',
  data: params
});

// 颜色或版本查询
export const ProductGetCV = (params) => requests({
  url: (`productParams/getParams`),
  method: 'POST',
  data: params
});

// 购物车添加
export const CartInsert = (params) => requests({
  url: (`shoppingCart/insert`),
  method: 'POST',
  data: params
});

// 购物车查询
export const CartById = (userId) => requests({
  url: (`shoppingCart/CartById?userId=${userId}`),
  method: 'GET',
});

// 购物车删除
export const CartDelete = (cid) => requests({
  url: (`shoppingCart/deleteById?cid=${cid}`),
  method: 'DELETE',
});

// 购物车批量删除
export const CartDatchDelete = (params) => requests({
  method: 'DELETE',
  url: `shoppingCart/batchDelete/${params}`,
});

// -------------------------------------------------------------------------------------------------------------
// 订单
// 全部订单

export const OrderGetAll = (pageNum, pageSize) => requests({
  url: (`order/getAll?pageNum=${pageNum}&&pageSize=${pageSize}`),
  method: 'GET',
});

// 查询参数/查询订单
export const OrderGetParams = (userId) => requests({
  url: (`order/getParams?userId=${userId}`),
  method: 'GET',
});

// 手机号查询订单
export const OrderGetParamsByPhone = (userPhone) => requests({
  url: (`order/getParams?userPhone=${userPhone}`),
  method: 'GET',
});

// 用户名查询订单
export const OrderGetParamsByName = (userName) => requests({
  url: (`order/getParams?userName=${userName}`),
  method: 'GET',
});

// 添加
export const OrderInsert = (params) => requests({
  url: (`order/insert`),
  method: 'POST',
  data: params
});

// 修改
export const OrderUpdate = (params) => requests({
  url: (`order/update`),
  method: 'PUT',
  data: params
});

// 删除
export const OrderDelete = (oid) => requests({
  url: (`order/deleteById?oid = ${oid}`),
  method: 'DELETE',
});

//订单批量删除
export const OrderBatchDelete = (params) => requests({
  method: 'DELETE',
  url: `order/batchDelete/${params}`,
});

// 参数批量添加
export const OrderParamsInsertBatch = (params) => requests({
  url: (`orderParams/insertBatch`),
  method: 'POST',
  data: params
});

// 参数删除
export const OrderParamsDelete = (orderId) => requests({
  url: (`orderParams/delete?orderId = ${orderId}`),
  method: 'DELETE',
});