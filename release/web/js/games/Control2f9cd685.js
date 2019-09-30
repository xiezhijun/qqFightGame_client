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
        
        this.hero = game.selfPlayer;


        // game.zOrder =22;
        game.owner.addChild(this.round);
        game.owner.addChild(this.direction);

        Laya.timer.frameLoop(1,this,this.tick);

        this.width = Laya.stage.width ;
        this.height = Laya.stage.height;
    }

    // 点击的时候，出现方向盘控制
    mouseDown(){
        this.direction.pos(Laya.stage.mouseX,Laya.stage.mouseY);
        this.direction.graphics.drawCircle(0, 0, 5, "#ffffff");
        this.round.graphics.drawCircle(Laya.stage.mouseX, Laya.stage.mouseY, 25, "#000000");
        this.round.graphics.drawCircle(Laya.stage.mouseX, Laya.stage.mouseY, 3, "#ffffff");
        this.centerX = Laya.stage.mouseX;
        this.centerY = Laya.stage.mouseY;
        // 点下后并滑动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.mouseMove);


        // 点击缓动
        // let disx = targetPos.x - this.hero.x;
        // let disy = targetPos.y - this.hero.y;
        // let d = Math.sqrt(disx * disx + disy * disy);
        // let speed = 300;
        // let time = d / speed;
        // Laya.Tween.to(this.hero, { x: this.hero.x + disx, y: this.hero.y + disy }, time * 1000)
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

    dis(centerX,centerY,mouseX,mouseY){
        let dx = centerX - mouseX;
        let dy = centerY - mouseY;
        let distance = Math.sqrt(dx*dx+dy*dy);
        return distance;
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
            if(player.centerX + player.r > game.mapWidth) {
                player.centerX = game.mapWidth - player.r;
            }
            if(player.centerY - player.r < 0) {
                player.centerY = player.r;
            }
            if(player.centerY + player.r > game.mapHeight) {
                player.centerY = game.mapHeight - player.r;
            }
            game.recalPlayerNode(player);

            //
            game.gameArea.globalToLocal(Laya.Point.TEMP.setTo(player.centerX, player.centerY));

            // send to server
            // 只发送操作，服务器同步计算
            let proto = pbgo.OperateMsg.create();
            proto.angle = this.angle;
            proto.mod = game.mod;
            game.mod++;
            sendMsg(CMD_OPERATE, proto);
        }

        this.tickFrame();
        this.mapChange();
    }

    // 玩家移动，地图视角移动
    mapChange() {
        let x, y;
        if(this.hero == null)
        {
            this.hero = game.selfPlayer;
            return;
        }
        if(this.hero.isDead) {
            return;
        }
        if (this.hero.centerX > this.width / 2 && this.hero.centerX < game.mapWidth - this.width / 2) {
            x = this.width / 2 - this.hero.centerX
        } else {
            if (this.hero.centerX <= this.width / 2)
                x = 0;
            else
                x = this.width - game.mapWidth;
        }
        if (this.hero.centerY > this.height / 2 && this.hero.centerY < game.mapHeight- this.height / 2) {
            y = this.height / 2 - this.hero.centerY;
        } else {
            if (this.hero.centerY <= this.height / 2)
                y = 0;
            else
                y = this.height - game.mapHeight;
        }
        game.gameArea.pos(x, y);
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

}