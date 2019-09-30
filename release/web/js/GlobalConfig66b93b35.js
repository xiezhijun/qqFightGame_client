export default class GlobalConfig {

    constructor() {
    }
}

// 发布时修改为true
GlobalConfig.isTest = false;

GlobalConfig.wsHost = "129.28.190.44";
GlobalConfig.wsPort = 1212;

if(GlobalConfig.isTest) {
    GlobalConfig.wsHost = "127.0.0.1";
}

GlobalConfig.mapWidth = 2500;
GlobalConfig.mapHeight = 2500;