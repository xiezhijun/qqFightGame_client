class Player{

    constructor() { 
        // 玩家ID 
        this.playerID = 0;
        // 昵称
        this.playerName = "";
        // 圆点x
        this.centerX = 0; 
        // 圆点y
        this.centerY = 0; 
        // 半径
        this.r = 0;
        // 速度
        this.speed = 0;

        this.isDead = false;

        // 移动的数据帧
        this.moveFrames = [];
    }
    
}

class Food{

    constructor() {
        // 唯一标识
        this.id = 0; 
        // 圆点x
        this.centerX = 0; 
        // 圆点y
        this.centerY = 0; 
        // 半径
        this.r = 0;
    }
    
}