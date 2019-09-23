const CMD_LOGIN = 1000;
const CMD_LOGIN_ACK = 1001;


const CMD_ENTER_GAME = 10001;
const CMD_ENTER_GAME_ACK = 10002;

const CMD_OPERATE = 20001;
const CMD_UPLOAD_POS = 20002;

const CMD_REFRESH = 66666;

/**
 * message created and send to server
 */
class NetMessage{
    constructor() {
        this.msgCmd = 0
        this.proto = protobuf.Message
    }
}

/**
 * message from server
 * @field protoBytes Uint8Array
 */
class RespMessage {
    constructor() {
        this.msgCmd = 0
        this.protoBytes = null
    }
}

