 /**
 * process message from server
*/
function processMessage(netMsg) {
    switch (netMsg.msgCmd) {
        case CMD_LOGIN_ACK:{
            let proto = pbgo.LoginAck.decode(netMsg.protoBytes);
            console.log(JSON.stringify(proto));
            break;
        }
            
        case CMD_ENTER_GAME_ACK:{
            let proto = pbgo.EnterGameAck.decode(netMsg.protoBytes);
            game.enterGame(proto);
            break;
        }
          
        case CMD_REFRESH:{
            let proto = pbgo.Refresh.decode(netMsg.protoBytes);
            game.refresh(proto);
            break;
        }
        default:
            break;
    }
}