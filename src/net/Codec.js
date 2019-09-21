const HEADER = "www.xlyzane.cn";	// 包头
const HEADER_DATA = 4;				// 数据长度4个字节
const MSG_CMD_LEN = 4;				// 消息cmd4个字节
const PROTO_NAME_LEN = 1;			// protoName长度1个字节
const PROTO_NAME = 4;               // protoName 4个字节
var protoMap;

function initProto() {
    protoMap = new Map([
        ["pbgo.Login", pbgo.Login],
        ["pbgo.LoginAck", pbgo.LoginAck],
        ["pbgo.EnterGame", pbgo.EnterGame],
        ["pbgo.EnterGameAck", pbgo.EnterGameAck],
        ["pbgo.Refresh", pbgo.Refresh],
        ["pbgo.OperateMsg", pbgo.OperateMsg],
        ["pbgo.UploadPos", pbgo.UploadPos]
    ]);
}

/**
 * encode NetMessage to byte[] / ArrayBuffer
 */
function encode(netMsg) {
    if( (typeof netMsg) != "object") {
        return;
    }

    let proto = netMsg.proto;
    let protoInfo = getProtoInfo(proto);
    if(protoInfo == null) {
        return;
    }
    let protoName = protoInfo[0];
    let protoNameLen = protoName.length;
    let protoBytes = protoInfo[1].encode(proto).finish();

    let allDataLength = MSG_CMD_LEN + 8 + PROTO_NAME_LEN + protoNameLen + protoBytes.byteLength;
    
    let byte = new Laya.Byte();
    byte.endian = Laya.Byte.BIG_ENDIAN;

    // header
    byte.writeUTFBytes(HEADER);
    byte.writeInt32(allDataLength);

    // data
    byte.writeInt32(netMsg.msgCmd);
    byte.writeFloat64(0);
    byte.writeByte(protoNameLen);
    byte.writeUTFBytes(protoName);
    byte.writeArrayBuffer(protoBytes);

    return byte.buffer;
}

/**
 * Get protoName from proto factory by protobuf.Message
 * @param {*} proto protobuf.Message
 */
function getProtoInfo(proto) {
    for(let key of protoMap.keys()) {
        let value = protoMap.get(key);
        if (proto instanceof value) {
            return [key, value];
        }
    }
    console.error("Get proto error " + proto);
    return null;
}


/**
 * decode byte[] to NetMessage
 */
function decode(bytes) {
    // let message = new NetMessage();
    let message = new RespMessage();
    let byte = new Laya.Byte(bytes);
    byte.endian = Laya.Byte.BIG_ENDIAN;

    let header = byte.readUTFBytes(HEADER.length);
    if(header == HEADER) {
        let allDataLen = byte.getInt32();

        // data
        let msgCmd = byte.getInt32();
        let sessionID = byte.getFloat64();
        let protoNameLen = byte.getByte();
        let protoName = byte.readUTFBytes(protoNameLen);
        
        let protoBytes = new Uint8Array(byte.readArrayBuffer(allDataLen - MSG_CMD_LEN - 8 - PROTO_NAME_LEN - PROTO_NAME));

        // also could decode by reflect
        // let protoType = protoMap.get(protoName);
        // let proto = protoType.decode(protoBytes);
        
        message.msgCmd = msgCmd;
        message.protoBytes = protoBytes;
    }

    return message;
}