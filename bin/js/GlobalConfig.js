export default class GlobalConfig extends Laya.Script {

    constructor() { 
        super(); 
    }
    
    onEnable() {
    }

    onDisable() {
    }
}

// 发布时修改为true
GlobalConfig.isTest = false;

GlobalConfig.wsHost = "129.28.190.44";
GlobalConfig.wsPort = 1212;

if(GlobalConfig.isTest) {
    GlobalConfig.wsHost = "127.0.0.1";
}