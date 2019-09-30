import GlobalConfig from "../GlobalConfig";

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

        /** @prop {name:preChilun, tips:"齿轮预设", type:Prefab, default:null}*/
        this.preChilun = null;

        this.chiluns = [];

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

        this.gameArea = null;
        this.tipLabel = null; // 顶部提示文字Label
        this.playerList = null; // 显示控件，玩家list

        // 游戏地图的宽高
        this.mapWidth = GlobalConfig.mapWidth;
        this.mapHeight = GlobalConfig.mapHeight;
    }

    // 重新计算
    recalPlayerNode(player) {
        let pNode = this.gameArea.getChildByName("player" + player.playerID);
        if(pNode == null) {
            // console.log("recal player" +player.playerID+ " node is null");
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
        this.owner.width = this.mapWidth;
        this.owner.height = this.mapHeight;

        this.owner.getChildByName("GamePanel").width = this.mapWidth;
        this.owner.getChildByName("GamePanel").height = this.mapHeight;

        this.owner.getChildByName("GamePanel").getChildByName("GameArea").width = this.mapWidth;
        this.owner.getChildByName("GamePanel").getChildByName("GameArea").height = this.mapHeight;

        this.gameArea = this.owner.getChildByName("GamePanel").getChildByName("GameArea");
        this.tipLabel = this.owner.getChildByName("GamePanel").getChildByName("Tip");
        this.playerList = this.owner.getChildByName("GamePanel").getChildByName("PlayersInfo").getChildByName("PlayerList");
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

        for (let index = 0; index < this.chiluns.length; index++) {
            let element = this.chiluns[index];
            element.rotation++;
        }
    }

    frameRefresh() {
        if(this.selfPlayer == null){
            return;
        }
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
                            this.selfPlayerNode = this.createPlayerNode(this.selfPlayer);
                            this.tipLabel.visible = false;
                            continue;
                        }
                        // 速度更新
                        this.selfPlayer.speed = player.speed;
                        // 
                        if(this.selfPlayer.r != player.r) {
                            this.selfPlayer.r = player.r;
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
                
                for (const idx in msg.newFoods) {
                    let food = msg.newFoods[idx];
                    let foodNode = this.gameArea.getChildByName("food" + food.id);
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
                            this.gameArea.getChildByName("player"+value.playerID).destroy();
                            this.removePlayerInfoNode(value.playerID);

                            if(value.playerID == this.selfPlayer.playerID) {
                                this.selfPlayer.isDead = true;
                                this.tipLabel.visible = true;
                            }
                        }
                    }

                    // food
                    for (const idx in msg.deadFoods) {
                        let foodId = msg.deadFoods[idx];
                        // console.log("delete food " + foodId);
                        this.foodMap.delete(foodId);
                        this.gameArea.getChildByName("food"+foodId).destroy();
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
        nameTxtNode.text = player.playerID;
        nameTxtNode.x = pNode.x;
        nameTxtNode.y = pNode.y;
        nameTxtNode.width = pNode.width;
        nameTxtNode.height = pNode.height;

        this.gameArea.addChild(pNode);
        console.log("创建玩家 ::" + player.playerName)
        this.createPlayerInfoNode(player);

        return pNode;
    }

    // 添加到左侧玩家信息列表
    createPlayerInfoNode(player) {
        let pLabel = new(Laya.Label);
        pLabel.text = player.playerName;
        pLabel.color = "#000000";
        pLabel.fontSize = 15;
        pLabel.align = "center";
        pLabel.valign = "middle";
        let container = this.owner.getChildByName("GamePanel").getChildByName("PlayersInfo");
        pLabel.y = container.numChildren * 50;
        pLabel.height = 50;
        pLabel.width = 100;
        pLabel.name = "pInfoNode" + player.playerID;
        container.addChild(pLabel);

        let height = container.height;
        if(height < container.numChildren * 50) {
            container.height = container.numChildren * 50;
        }
    }

    // 从左侧玩家信息列表删除
    removePlayerInfoNode(playerID) {
        let container = this.owner.getChildByName("GamePanel").getChildByName("PlayersInfo");
        let node = container.getChildByName("pInfoNode"+playerID);
        if(node.y < container.height - 50) {
            for (let index = 0; index < container.numChildren; index++) {
                const element = container.getChildAt(index);
                if(element.y > node.y) {
                    element.y -= 50;
                }
            }
        }
        node.destroy();
    }

    // 根据food对象创建节点对象
    createFoodNode(food) {
        let fNode = this.preFood.create();
        fNode.x = food.centerX - food.r;
        fNode.y = food.centerY - food.r;
        fNode.width = food.r * 2;
        fNode.height = fNode.width;
        fNode.name = "food" + food.id;
        // console.log("create food :" + food.id);

        let value = food.id % 3;
        if(value == 1) {
            fNode.texture = "img/cir_red.png";
        } else if(value == 2) {
            fNode.texture = "img/cir_pink.png";
        }

        this.gameArea.addChild(fNode);
        return fNode;
    }

    // 进入游戏
    enterGame(enterGameAck) {
        console.log('enter game');
        this.controller = new(Control);
        
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

        for (let index = 0; index < enterGameAck.foods.length; index++) {
            let element = enterGameAck.foods[index];
            let food = new(Food);
            food.centerX = element.centerX;
            food.centerY = element.centerY;
            food.r = element.r;
            food.id = element.id;
            this.foodMap.set(food.id, food);

            this.createFoodNode(food);
        }

        // 创建刺穿齿轮
        for (let index = 0; index < enterGameAck.chiluns.length; index++) {
            let element = enterGameAck.chiluns[index];
            let chilun = this.preChilun.create();
            chilun.x = element.centerX;
            chilun.y = element.centerY;
            chilun.width = element.r * 2;
            chilun.height = element.r * 2;
            
            this.gameArea.addChild(chilun);
            this.chiluns.push(chilun);
        }

    }

    // 服务器通知刷新同步
    refresh(refreshMsg) {
        // console.log("refresh");

        // 放队列里，在update里更新
        this.refreshMsgArray.push(refreshMsg);
    }
}