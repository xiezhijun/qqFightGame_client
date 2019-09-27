class Control{

    constructor()
    {
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.mouseDown);
		Laya.stage.on(Laya.Event.MOUSE_UP,this,this.mouseUp);
		
	
		this.speed = 0;
		this.angle = 0;
		this.centerX = -1;
		this.centerY = -1;

        this.round = new Laya.Sprite;     // 方向摇盘
        this.direction = new Laya.Sprite; // 方向
        
        this.hero = game.selfPlayerNode;

        game.owner.addChild(this.round);
        game.owner.addChild(this.direction);

        Laya.timer.frameLoop(1,this,this.tick);

        this.tmp = 0;
    }

    // 点击的时候，出现方向盘控制
    mouseDown(){
        this.direction.pos(Laya.stage.mouseX,Laya.stage.mouseY);
        this.direction.graphics.drawCircle(0, 0, 5, "#0000ff");
        this.round.graphics.drawCircle(Laya.stage.mouseX, Laya.stage.mouseY, 25, "#00ffff");
        this.round.graphics.drawCircle(Laya.stage.mouseX, Laya.stage.mouseY, 3, "#ffffff");
        this.centerX = Laya.stage.mouseX;
        this.centerY = Laya.stage.mouseY;
        // 点下后并滑动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.mouseMove);
    }

    mouseUp(){
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.mouseMove);
        this.speed = 0;
        this.round.graphics.clear();
        this.direction.graphics.clear();
    }


    mouseMove(e){
        if(this.centerX>=0&&this.centerY>=0){
            //计算两点距离 如果超过一定距离 就停留在距离最大值处
            let dis = this.dis(this.centerX,this.centerY,Laya.stage.mouseX,Laya.stage.mouseY);

            if(dis>20){
                this.direction.pos(this.centerX + Math.cos(this.angle)*20,this.centerY + Math.sin(this.angle)*20);
            }else{
                this.direction.pos(Laya.stage.mouseX,Laya.stage.mouseY);
            }

            //如果距离太小 就代表没动 
            if(dis>3){
                this.speed = game.selfPlayer.speed;
            }else{
                this.speed = 0;
            }
            
        }
    }

    tick(){
        if(this.speed>0){
            let dx = Laya.stage.mouseX - this.centerX;
            let dy = Laya.stage.mouseY - this.centerY;
            this.angle = Math.atan2(dy,dx);


            let player = game.selfPlayer
            player.centerX += Math.cos(this.angle)*this.speed;
            player.centerY += Math.sin(this.angle)*this.speed;
            
            // 判断是否出界
            if(player.centerX - player.r < 0) {
                player.centerX = player.r;
            }
            if(player.centerX + player.r > Laya.stage.width) {
                player.centerX = Laya.stage.width - player.r;
            }
            if(player.centerY - player.r < 0) {
                player.centerY = player.r;
            }
            if(player.centerY + player.r > Laya.stage.height) {
                player.centerY = Laya.stage.height - player.r;
            }
            game.recalPlayerNode(player);

            // send to server
            // 只发送操作，服务器同步计算
            let proto = pbgo.OperateMsg.create();
            proto.angle = this.angle;
            // 前面发送后，后面不发送，节省空间
            if(game.mod < 5) {
                proto.maxWidth  = Laya.stage.width;
                proto.maxHeight = Laya.stage.height;
            } 
            proto.mod = game.mod;
            game.mod++;
            sendMsg(CMD_OPERATE, proto);
        }

        this.tickFrame();
    }

    // 将服务器同步的其他玩家的移动数据帧，进行平滑展示
    tickFrame() {
        for(let player of game.playerMap.values()) {
            if(player.moveFrames.length <= 0) {
                continue;
            }
            let frame = player.moveFrames.shift();
            player.centerX = frame.centerX;
            player.centerY = frame.centerY;
            player.r = frame.r;
            game.recalPlayerNode(player);
        }
    }

    dis(centerX,centerY,mouseX,mouseY){
        let dx = centerX - mouseX;
        let dy = centerY - mouseY;
        let distance = Math.sqrt(dx*dx+dy*dy);
        return distance;
    }
}