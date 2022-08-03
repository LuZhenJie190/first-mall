import requests from "../request";
// 用户登录
export const UserLogin = (params) => requests({
    url: "user/login",
    method: "POST",
    data: params
})

// 获取全部用户
export const UsergetAll = (params) => requests({
    url: (`user/getAllUser`),
    method: 'GET',
    params
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