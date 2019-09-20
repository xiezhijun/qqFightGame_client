export default class Game extends Laya.Script {

    constructor() { 
        super();

        // 食物列表
        this.foodMap = new(Map);

        /** @prop {name:preFood, tips:"食物预设", type:Prefab, default:null}*/
        this.preFood = null;

        /** @prop {name:prePlayer, tips:"玩家预设", type:Prefab, default:null}*/
        this.prePlayer = null;

        // 玩家自己
        this.selfPlayer = null;

        // 玩家自己的节点
        this.selfPlayerNode = null;

        // 所有玩家
        this.playerMap = new(Map);

        // 服务器推送的刷新数据包
        this.refreshMsgArray = [];

        // 玩家自己操作的次数，用来校验服务器推送的位置信息与本地的位置不一致的问题
        // 如果服务器推送的mod < this.mode，那么说明服务器还有没推送完的 mod，直接以本地位置为主
        this.mod = 0;
    }

    /**键盘按下处理*/
	onKeyDown(e) {
        // 使用按键池监听多个按键同时按下的操作，如左上，右下等方向控制
        // 延迟一定时间，再进行处理

        // 操作后，客户端直接先计算移动
        let code = e["keyCode"];
        switch(code) {
            case LEFT:{
                if(this.selfPlayer.centerX - this.selfPlayer.r > 0) {
                    let value = this.selfPlayer.centerX - this.selfPlayer.r - DELT;
                    if(value >= 0) {
                        this.selfPlayer.centerX -= DELT;
                    } else {
                        this.selfPlayer.centerX += value;
                    }
                }

                this.recalSelf();
                this.sendOperateToServer(code);
                break;
            }
            case RIGHT:{
                let value = this.selfPlayer.centerX + this.selfPlayer.r + DELT;
                if(value >= Laya.stage.width) {
                    this.selfPlayer.centerX += Laya.stage.width - this.selfPlayer.centerX - this.selfPlayer.r;
                } else {
                    this.selfPlayer.centerX += DELT;
                }

                this.recalSelf();
                this.sendOperateToServer(code);
                break;
            }
            case UP:{
                if(this.selfPlayer.centerY - this.selfPlayer.r > 0) {
                    let value = this.selfPlayer.centerY - this.selfPlayer.r - DELT;
                    if(value >= 0) {
                        this.selfPlayer.centerY -= DELT;
                    } else {
                        this.selfPlayer.centerY += value;
                    }
                }

                this.recalSelf();
                this.sendOperateToServer(code);
                break;
            }
            case DOWN:{
                let value = this.selfPlayer.centerY + this.selfPlayer.r + DELT;
                if(value > Laya.stage.height) {
                    this.selfPlayer.centerY += Laya.stage.height - this.selfPlayer.centerY - this.selfPlayer.r;
                } else {
                    this.selfPlayer.centerY += DELT;
                }

                this.recalSelf();
                this.sendOperateToServer(code);
                break;
            }
            default:
                break;
        }
    }

    recalSelf() {
        this.selfPlayerNode.x = this.selfPlayer.centerX - this.selfPlayer.r;
        this.selfPlayerNode.y = this.selfPlayer.centerY - this.selfPlayer.r;
        this.selfPlayerNode.width = this.selfPlayer.r * 2;
        this.selfPlayerNode.height = this.selfPlayerNode.width;
    }
    
    sendOperateToServer(code) {
        this.mod++;
        let proto = pbgo.OperateMsg.create();
        proto.opCode = code;
        proto.maxWidth = Laya.stage.width;
        proto.maxHeight = Laya.stage.height;
        proto.mod = this.mod;
        sendMsg(CMD_OPERATE, proto);
    }

	/**键盘抬起处理*/
	onKeyUp(e) {
	}
    
    onEnable() {
        //添加键盘按下事件,一直按着某按键则会不断触发
		Laya.stage.on(Event.KEY_DOWN, this, this.onKeyDown);
		//添加键盘抬起事件
        Laya.stage.on(Event.KEY_UP, this, this.onKeyUp);

        game = this;
    }

    onDisable() {
    }

    onUpdate() {
        let num = this.refreshMsgArray.length;
        if(num > 0) {
            // 每帧处理的消息设定最大值，防止帧数太低
            if(num > 10) {
                num = 10;
            }
            for (let index = 0; index < num; index++) {
                let msg = this.refreshMsgArray.shift();
                for (const idx in msg.players) {
                    let player = msg.players[idx];

                    if(player.playerID == this.selfPlayer.playerID) {
                        if(this.selfPlayer.r != player.r) {
                            this.selfPlayer.r = player.r;
                            this.recalSelf();
                        }
                        if(msg.selfMod < this.mod) {
                            continue;
                        }
                    }

                    let playerNode = this.owner.getChildByName("player" +player.playerID);
                    // 没有该节点，需要加入
                    if(playerNode == null) {
                        playerNode = this.createPlayerNode(player);
                    }

                    playerNode.x = player.centerX - player.r;
                    playerNode.y = player.centerY - player.r;
                    playerNode.width = player.r*2;
                    playerNode.height = playerNode.width;

                    this.playerMap.set(player.playerID, player);
                }
                
                for (const idx in msg.foods) {
                    let food = msg.foods[idx];
                    let foodNode = this.owner.getChildByName("food" + food.id);
                    if(foodNode == null) {
                        foodNode = this.createFoodNode(food);
                    }

                    foodNode.x = food.centerX - food.r;
                    foodNode.y = food.centerY - food.r;

                    this.foodMap.set(food.id, food);
                }
                

                // 最后一个包，处理删除
                if(index == num - 1) {
                    // player
                    for(let value of this.playerMap.values()) {
                        let found = false;
                        for (const idx in msg.players) {
                            let player = msg.players[idx];
                            if(player.playerID == value.playerID) {
                                found = true;
                                break;
                            }
                        }
                        if(!found) {
                            console.log("delete player " + value.playerID);
                            this.playerMap.delete(value.playerID);
                            this.owner.getChildByName("player"+value.playerID).destroy();
                        }
                    }

                    // food
                    for(let value of this.foodMap.values()) {
                        let found = false;
                        for (const idx in msg.foods) {
                            let food = msg.foods[idx];
                            if(food.id == value.id) {
                                found = true;
                                break;
                            }
                        }
                        if(!found) {
                            console.log("delete food " + value.id);
                            this.foodMap.delete(value.id);
                            this.owner.getChildByName("food"+value.id).destroy();
                        }
                    }
                }
            }
        }
    }

    // 根据player对象创建节点对象
    createPlayerNode(player) {
        let pNode = this.prePlayer.create();
        pNode.x = player.centerX - player.r;
        pNode.y = player.centerY - player.r;
        pNode.width = player.r * 2;
        pNode.height = pNode.width;
        pNode.name = "player" + player.playerID;
        this.owner.addChild(pNode);
        return pNode;
    }

    // 根据food对象创建节点对象
    createFoodNode(food) {
        let fNode = this.preFood.create();
        fNode.x = food.centerX - food.r;
        fNode.y = food.centerY - food.r;
        fNode.width = food.r * 2;
        fNode.height = fNode.width;
        fNode.name = "food" + food.id;
        this.owner.addChild(fNode);
        return fNode;
    }

    // 进入游戏
    enterGame(enterGameAck) {
        console.log('enter');

        
        let player = new(Player);
        player.centerX = enterGameAck.self.centerX;
        player.centerY = enterGameAck.self.centerY;
        player.r = enterGameAck.self.r;
        player.playerID = enterGameAck.self.playerID;
        player.playerName = enterGameAck.self.playerName;
        this.playerMap.set(player.playerID, player);
        this.selfPlayer = player;

        this.selfPlayerNode = this.createPlayerNode(player);

        for (let index = 0; index < enterGameAck.players.length; index++) {
            let element = enterGameAck.players[index];
            let player = new(Player);
            player.centerX = element.centerX;
            player.centerY = element.centerY;
            player.r = element.r;
            player.playerID = element.playerID;
            player.playerName = element.playerName;
            this.playerMap.set(player.playerID, player);

            this.createPlayerNode(player);
        }

        for (let index = 0; index < enterGameAck.players.length; index++) {
            let element = enterGameAck.foods[index];
            let food = new(Food);
            food.centerX = element.centerX;
            food.centerY = element.centerY;
            food.r = element.r;
            food.id = element.id;
            this.foodMap.set(food.id, food);

            this.createFoodNode(food);
        }
    }

    // 服务器通知刷新同步
    refresh(refreshMsg) {
        // console.log("refresh");

        // 放队列里，在update里更新
        this.refreshMsgArray.push(refreshMsg);
    }
}