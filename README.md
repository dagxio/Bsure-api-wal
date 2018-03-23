# Bsure-api-wal
server api of wallet for bixin chain
# Rpc规范参考 [http://www.jsonrpc.org/](http://www.jsonrpc.org/)
1.1. **钱包rpc功能接口**

钱包rpc功能接口地址全部为https://fcuk.io/wallet

可以以post方式发送json串，参数如下：
```json
{"jsonrpc":"2.0","id":1,"method":"getinfo","params":[]}
```
## 1.1获取当前状态信息getinfo

**请求参数**

| 接口相关 | 说明 |
| --- | --- |
| 调用方式 | RPC |
| 请求参数 | null |
| 返回格式 | JSON |
| method | **getinfo** |

**示例**
```json
{"jsonrpc":"2.0","id":1,"method":"getinfo","params":[]}}
```
**返回结果**
```json
{

"jsonrpc": "2.0",

"result": {

"last_mci": 82822,

"last_stable_mci": 82815,

"count_unhandled": 0

},

"error": {

      "code": -32700,

      "message": "Invalid Request"

},

"id": 1

}
```
## 1.2验证地址 validatesaddress/verifyaddress

**请求参数**

| 接口相关 | 说明 |
| --- | --- |
| 调用方式 | RPC |
| 请求参数 | ["IWGB4M5F3MRRKAF3U5YMGJV7PENZQX5G"] |
| 返回格式 | JSON |
| method | validateaddress/verifyaddress** |

**示例**
```json
{"jsonrpc":"2.0","id":1,"method":"validateaddress","params":["IWGB4M5F3MRRKAF3U5YMGJV7PENZQX5G"]}
```
**返回结果**
```json
{

    "jsonrpc": "2.0",

    "result": true,

    "id": 0

}
```
## 1.3获取新钱包地址 getnewaddress

**请求参数**

| 接口相关 | 说明 |
| --- | --- |
| 调用方式 | RPC |
| 请求参数 | null |
| 返回格式 | JSON |
| method | getnewaddress |

**示例**
```json
{"jsonrpc":"2.0","id":1,"method":"getnewaddress","params":[]}
```
**返回结果**
```json
{

    "jsonrpc": "2.0",

    "result": "",

    "id": 0

}
```
## 1.4获取余额 getbalance/getmainbalance

**请求参数**

| 接口相关 | 说明 |
| --- | --- |
| 调用方式 | RPC |
| 请求参数 | ["IWGB4M5F3MRRKAF3U5YMGJV7PENZQX5G"] |
| 返回格式 | JSON |
| method | getbalance/getmainbalance |

**示例**
```json
{"jsonrpc":"2.0","id":1,"method":"getbalance","params":["IWGB4M5F3MRRKAF3U5YMGJV7PENZQX5G"]}
```
**返回结果**
```json
{

    "jsonrpc": "2.0",

    "result": {

        "base": {

            "stable": 0,

            "pending": 0

        }

    },

    "id": 0

}
```
## 1.5 返回交易订单listtransactions

**请求参数**

| 接口相关 | 说明 |
| --- | --- |
| 调用方式 | RPC |
| 请求参数 | ["MNTER5HW4VPFEKEEXKWIWSC344YFROSI"] |
| 返回格式 | JSON |
| method | listtransactions|

**示例**
```json
{"jsonrpc":"2.0","id":1,"method":"getbalance","params":["MNTER5HW4VPFEKEEXKWIWSC344YFROSI"]}
```
**返回结果**

"action":{'invalid','received','sent','moved'}
```json
{

    "jsonrpc": "2.0",

    "result": [

        {

            "action": "sent",

            "amount": 1000000,

            "addressTo": "Q6U5J3QHXOVJKFZKHTCJK246LNUWNJCP",

            "original_address": null,

            "textAddress": "",

            "claimed": false,

            "mnemonic": null,

            "confirmations": 1,

            "unit": "5BqMFjw15AVqqLpoGqHl3trn69bPMQDUK0AkIjsBNh4=",

            "fee": 546,

            "time": "1521609233",

            "level": 69782,

            "mci": 69629,

            "isTextcoin": false

        },

                {

            "action": "received",

            "amount": 10000000,

            "my_address": "THAZCYPUWR37P37SRA2Y6GAP4K4BUPKT",

            "arrPayerAddresses": [

                "LDGCQJ2FRHEL75AXI7XQC2SG6ZOLDEEA"

            ],

            "confirmations": 1,

            "unit": "MZnRUb1uhk3E9VumY9buVEYzXVkqfpoMbgHECOeSE00=",

            "fee": 546,

            "time": "1521784102",

            "level": 88913,

            "mci": 88760

        }

],

    "id": 0

}
```
## 1.6 转账 sendtoaddress

**请求参数**

| 接口相关 | 说明 |
| --- | --- |
| 调用方式 | RPC |
| 请求参数 | ["MNTER5HW4VPFEKEEXKWIWSC344YFROSI",1000] |
| 返回格式 | JSON |
| method | sendtoaddress |

**示例**
```json
{"jsonrpc":"2.0","id":1,"method":"sendtoaddress","params":["MNTER5HW4VPFEKEEXKWIWSC344YFROSI"]}
```
**返回结果**
```json
{

    "jsonrpc": "2.0",

    "result": [

        {

            "action": "sent",

            "amount": 1000000,

            "addressTo": "Q6U5J3QHXOVJKFZKHTCJK246LNUWNJCP",

            "original_address": null,

            "textAddress": "",

            "claimed": false,

            "mnemonic": null,

            "confirmations": 1,

            "unit": "5BqMFjw15AVqqLpoGqHl3trn69bPMQDUK0AkIjsBNh4=",

            "fee": 546,

            "time": "1521609233",

            "level": 69782,

            "mci": 69629,

            "isTextcoin": false

        }

],

    "id": 0

}
```

