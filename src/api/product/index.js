import requests from "../request";
// 商品
export const ProductgetAll = (params) => requests({
    url: (`product/getAllProduct`),
    method: 'GET',
    params
});

// ID查商品
export const ProductGetInfoById = (pid) => requests({
    url: (`product/getAllProduct?pid=${pid}`),
    method: 'GET'
});


// 名称查商品
export const ProductGetInfoByTitle = (title) => requests({
    url: (`product/searchProduct?title=${title}`),
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

// 全部查询
export const ProductCategory = () => requests({
    url: (`cate/getAll`),
    method: 'GET'
});

// 查询分类
export const ProductGetCate = () => requests({
    url: (`cate/getCate`),
    method: 'GET'
});

// 查询分类、品牌
export const CateGetBrand = (categoryId) => requests({
    url: (`cate/getCate?categoryId = ${categoryId}`),
    method: 'GET'
});

//查品牌
export const ProductBrand = () => requests({
    url: (`brand/getAll`),
    method: 'GET'
});

// 分类查品牌带商品
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