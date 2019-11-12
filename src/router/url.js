import Vue from 'vue';
// 请求接口列表
// 接口地址
Vue.prototype.URL={
    // 登录
    login:'/sms/user/login',

    // 策略
    strategy_query:'/sms/background/strategy/query',
    strategy_save:'/sms/background/strategy/save',
    strategy_remove:'/sms/background/strategy/remove',
    strategy_modify:'/sms/background/strategy/modify',

    // 模板
    template_list:'/sms/background/template/list',
    template_remove:'/sms/background/template/remove',
    template_detail:'/sms/background/template/detail',
    template_save:'/sms/background/template/save',
    template_modify:'/sms/background/template/modify',

    // 日志统计
    log_count:'/sms/background/log/count',
    log_query:'/sms/background/log/query',
}
