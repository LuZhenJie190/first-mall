import requests from "../request";
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

// 购物车查询全部
export const CartGetALL = () => requests({
    url: (`shoppingCart/CartById`),
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