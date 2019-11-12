const code={
    // 策略编码
    strategyCode:[
        {label:'FIXED',value:'FIXED'},
        {label:'RANDOM',value:'RANDOM'},
        {label:'ROUND',value:'ROUND'},
        {label:'WEIGHT',value:'WEIGHT'},
    ],
    // 策略渠道
    strategyChannel:[
        {label:'阿里云通信',value:0,key:''},
        {label:'大汉三通',value:1,key:''},
        {label:'线上线下',value:2,key:''},
    ],
    // 消息类型
    templateBusiType:[
        {label:'短信',value:0},
        {label:'微信',value:1},
    ],
    // 模板类型
    templateType:[
        {label:'行业短信',value:0},
        {label:'营销短信',value:1},
    ],
    // 发送状态
    sendStatus:[
        {label:'发送成功',value:0},
        {label:'发送失败',value:1},
        {label:'发送超时',value:2},
    ],
    delStatus:[
        {label:'启用',value:0},
        {label:'停用',value:1},
    ]
}
export default code