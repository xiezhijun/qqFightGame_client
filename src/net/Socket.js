var socket;


 /**
 * start websocket
 * @param {*} host server host
 * @param {*} port server port
 */
function startWS(host, port) {
    socket = new Laya.Socket();
    socket.endian = Laya.Byte.BIG_ENDIAN;
    let url = "ws://" + host + ":" + port;
    socket.connectByUrl(url);
    socket.on(Laya.Event.OPEN, socket, openHandler);
    socket.on(Laya.Event.MESSAGE, socket, receiveHandler);
    socket.on(Laya.Event.CLOSE, socket, closeHandler);
    socket.on(Laya.Event.ERROR, socket, errorHandler);
}

//建立链接
function openHandler(event){
    console.log("Open websocket")
    let enterGameMsg = pbgo.EnterGame.create();
    enterGameMsg.playerID = -1;
    sendMsg(CMD_ENTER_GAME, enterGameMsg);
}

//收到消息
function receiveHandler(msg){
    let message = decode(msg);
    processMessage(message);
}

//关闭事件
function closeHandler(e){
    console.log("Close link");
}

//连接出错
function errorHandler(e){
    console.log("Link to server error" + e);
}


// 发送消息
function sendMsg(cmd, proto) {
    let netMessage = new NetMessage();
    netMessage.msgCmd = cmd;
    netMessage.proto = proto;
    let bytes = encode(netMessage);
    socket.send(bytes);
}