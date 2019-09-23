export default class Game extends Laya.Script {

    constructor() { 
        super();

        // 食物列表
        this.foodMap = new(Map);

        /** @prop {name:preFood, tips:"食物预设", type:Prefab, default:null}*/
        this.preFood = null;

        /** @prop {name:prePlayer, tips:"玩家预设", type:Prefab, default:null}*/
        this.prePlayer = null;

        /** @prop {name:prePlayerSelf, tips:"玩家自己预设", type:Prefab, default:null}*/
        this.prePlayerSelf = null;

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

        this.controller = null;

        this.sendEnterGameMsg = false;
    }

    // 重新计算
    recalPlayerNode(player) {
        let pNode = this.owner.getChildByName("player" + player.playerID);
        if(pNode == null) {
            console.log("recal player" +player.playerID+ " node is null");
            return
        }
        pNode.x = player.centerX - player.r;
        pNode.y = player.centerY - player.r;
        pNode.width = player.r * 2;
        pNode.height = pNode.width;
        pNode.name = "player" + player.playerID;

        let nameTxtNode = pNode.getChildByName("PlayerName");
        nameTxtNode.width = pNode.width;
        nameTxtNode.height = pNode.height;
    }
    
    onEnable() {
        game = this;
    }

    onDisable() {
        console.log("disable");
    }

    onUpdate() {
        // 发送进入游戏的消息
        if(!this.sendEnterGameMsg && socketConnected) {
            console.log("send");
            this.sendEnterGameMsg = true;
            let enterGameMsg = pbgo.EnterGame.create();
            enterGameMsg.playerID = -1;
            sendMsg(CMD_ENTER_GAME, enterGameMsg);
        }

        this.frameRefresh();
    }

    frameRefresh() {
        let num = this.refreshMsgArray.length;
        if(num > 0) {
            // 每帧处理的消息设定最大值，防止帧数太低
            if(num > 1) {
                num = 1;
            }
            for (let index = 0; index < num; index++) {
                let msg = this.refreshMsgArray.shift();
                for (const idx in msg.players) {
                    let player = msg.players[idx];

                    // 处理自己节点的逻辑
                    if(player.playerID == this.selfPlayer.playerID) {
                        // 死亡了
                        if(this.selfPlayer.isDead) {
                            console.log("玩家自己死亡后复活。。。。重新创建");
                            this.selfPlayer.centerX = player.centerX;
                            this.selfPlayer.centerY = player.centerY;
                            this.selfPlayer.r = player.r;
                            this.selfPlayer.speed = player.speed;
                            this.selfPlayer.mod = player.mod;
                            this.selfPlayer.isDead = false;
                            this.playerMap.set(this.selfPlayer.playerID, this.selfPlayer);
                            this.createPlayerNode(this.selfPlayer);
                            continue;
                        }
                        if(this.selfPlayer.r < player.r) {
                            this.selfPlayer.r = player.r;
                            this.selfPlayer.centerX = player.centerX;
                            this.selfPlayer.centerY = player.centerY;
                            this.recalPlayerNode(this.selfPlayer);
                        }
                        if(msg.selfMod < this.mod) {
                            continue;
                        }
                        if(this.selfPlayer.centerX != player.centerX
                            || this.selfPlayer.centerY != player.centerY) {
                            this.selfPlayer.r = player.r;
                            this.selfPlayer.centerX = player.centerX;
                            this.selfPlayer.centerY = player.centerY;
                            this.recalPlayerNode(this.selfPlayer);
                        }
                        continue;
                    }

                    // 处理其他节点
                    let p = this.playerMap.get(player.playerID);
                    // 没有该节点，需要加入
                    if(p == null) {
                        p = new(Player);
                        p.centerX = player.centerX;
                        p.centerY = player.centerY;
                        p.r = player.r;
                        p.speed = player.speed
                        p.playerID = player.playerID;
                        p.playerName = player.playerName;
                        this.playerMap.set(player.playerID, p);

                        this.createPlayerNode(p);
                    }

                    // 移动数据帧
                    for(let i=0; i<player.moveFrames.length; i++) {
                        p.moveFrames.push(player.moveFrames[i]);
                    }
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

                            if(value.playerID == this.selfPlayer.playerID) {
                                this.selfPlayer.isDead = true;
                            }
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
                            // console.log("delete food " + value.id);
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
        // 玩家自己进行区分
        let pNode = null;
        if(player.playerID == this.selfPlayer.playerID) {
            console.log("玩家自己，加载区分的图片....");
            pNode = this.prePlayerSelf.create();
        } else {
            pNode = this.prePlayer.create();
        }
        
        pNode.x = player.centerX - player.r;
        pNode.y = player.centerY - player.r;
        pNode.width = player.r * 2;
        pNode.height = pNode.width;
        pNode.name = "player" + player.playerID;


        let nameTxtNode = pNode.getChildByName("PlayerName");
        nameTxtNode.text = player.playerName;
        nameTxtNode.x = pNode.x;
        nameTxtNode.y = pNode.y;
        nameTxtNode.width = pNode.width;
        nameTxtNode.height = pNode.height;

        this.owner.addChild(pNode);
        console.log("创建玩家 ::" + player.playerName)
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
        console.log('enter game');

        
        let player = new(Player);
        player.centerX = enterGameAck.self.centerX;
        player.centerY = enterGameAck.self.centerY;
        player.r = enterGameAck.self.r;
        player.speed = enterGameAck.self.speed;
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

        this.controller = new(Control);
    }

    // 服务器通知刷新同步
    refresh(refreshMsg) {
        // console.log("refresh");

        // 放队列里，在update里更新
        this.refreshMsgArray.push(refreshMsg);
    }
}