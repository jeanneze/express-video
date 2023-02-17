# express-video 接口文档
## 接口说明

- 基于 RESTful API 接口规范
- 基于 JWT 身份认证
- 使用 CORS 跨域
- 接口基础请求地址：http://127.0.0.1:3005/api/v1
- 使用JSON 格式进行数据通信

## 用户注册
path: `/user/registers`
method: post
是否认证: 否

| 字段名      | 字段类型 | 是否必须 |
| ----------- | ----------- | ----------- |
| username      | string       | true       |
| email   | string        | true       |
| phone   | string        | true       |
| password   | string        | true       |

请求示例:
```
{
    "username": "尤可萌",
    "email": "889900@qq.com",
    "phone": 18800900980,
    "password": "12345678"
}
```

响应示例:
```
// success
{
    "user": {
        "username": "尤可萌",
        "email": "889900@qq.com",
        "phone": "18800900980",
        "image": null,
        "createAt": "2023-02-17T06:18:03.049Z",
        "updateAt": "2023-02-17T06:18:03.049Z",
        "_id": "63ef1ce6f955afb26dce5291",
        "__v": 0
    }
}
```

```
// error
{
    "error": [
        {
            "value": 18800900980,
            "msg": "手机号已被注册",
            "param": "phone",
            "location": "body"
        }
    ]
}
```