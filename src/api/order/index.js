import requests from "../request";
// 全部订单
export const OrderGetAll = (params) => requests({
    url: (`order/getAll`),
    method: 'GET',
    params
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