const HEADER="www.xlyzane.cn",HEADER_DATA=4,MSG_CMD_LEN=4,PROTO_NAME_LEN=1,PROTO_NAME=4;var protoMap;function initProto(){protoMap=new Map([["pbgo.Login",pbgo.Login],["pbgo.LoginAck",pbgo.LoginAck],["pbgo.EnterGame",pbgo.EnterGame],["pbgo.EnterGameAck",pbgo.EnterGameAck],["pbgo.Refresh",pbgo.Refresh],["pbgo.OperateMsg",pbgo.OperateMsg],["pbgo.UploadPos",pbgo.UploadPos]])}function encode(netMsg){if("object"!=typeof netMsg)return;let proto=netMsg.proto,protoInfo=getProtoInfo(proto);if(null==protoInfo)return;let protoName=protoInfo[0],protoNameLen=protoName.length,protoBytes=protoInfo[1].encode(proto).finish(),allDataLength=MSG_CMD_LEN+8+PROTO_NAME_LEN+protoNameLen+protoBytes.byteLength,byte=new Laya.Byte;return byte.endian=Laya.Byte.BIG_ENDIAN,byte.writeUTFBytes(HEADER),byte.writeInt32(allDataLength),byte.writeInt32(netMsg.msgCmd),byte.writeFloat64(0),byte.writeByte(protoNameLen),byte.writeUTFBytes(protoName),byte.writeArrayBuffer(protoBytes),byte.buffer}function getProtoInfo(proto){for(let key of protoMap.keys()){let value=protoMap.get(key);if(proto instanceof value)return[key,value]}return console.error("Get proto error "+proto),null}function decode(bytes){let message=new RespMessage,byte=new Laya.Byte(bytes);if(byte.endian=Laya.Byte.BIG_ENDIAN,byte.readUTFBytes(HEADER.length)==HEADER){let allDataLen=byte.getInt32(),msgCmd=byte.getInt32(),protoNameLen=(byte.getFloat64(),byte.getByte()),protoBytes=(byte.readUTFBytes(protoNameLen),new Uint8Array(byte.readArrayBuffer(allDataLen-MSG_CMD_LEN-8-PROTO_NAME_LEN-PROTO_NAME)));message.msgCmd=msgCmd,message.protoBytes=protoBytes}return message}