type Long = protobuf.Long;

/** Namespace pbgo. */
declare namespace pbgo {

    /** Properties of a Login. */
    interface ILogin {

        /** Login sex */
        sex?: (number|null);

        /** Login nickName */
        nickName?: (string|null);

        /** Login userName */
        userName?: (string|null);

        /** Login pwd */
        pwd?: (string|null);

        /** Login isRegis */
        isRegis?: (boolean|null);
    }

    /** Represents a Login. */
    class Login implements ILogin {

        /**
         * Constructs a new Login.
         * @param [properties] Properties to set
         */
        constructor(properties?: pbgo.ILogin);

        /** Login sex. */
        public sex: number;

        /** Login nickName. */
        public nickName: string;

        /** Login userName. */
        public userName: string;

        /** Login pwd. */
        public pwd: string;

        /** Login isRegis. */
        public isRegis: boolean;

        /**
         * Creates a new Login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Login instance
         */
        public static create(properties?: pbgo.ILogin): pbgo.Login;

        /**
         * Encodes the specified Login message. Does not implicitly {@link pbgo.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pbgo.ILogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link pbgo.Login.verify|verify} messages.
         * @param message Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pbgo.ILogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): pbgo.Login;

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): pbgo.Login;

        /**
         * Verifies a Login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a LoginAck. */
    interface ILoginAck {

        /** LoginAck code */
        code?: (number|null);

        /** LoginAck player */
        player?: (pbgo.IPlayer|null);
    }

    /** Represents a LoginAck. */
    class LoginAck implements ILoginAck {

        /**
         * Constructs a new LoginAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: pbgo.ILoginAck);

        /** LoginAck code. */
        public code: number;

        /** LoginAck player. */
        public player?: (pbgo.IPlayer|null);

        /**
         * Creates a new LoginAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginAck instance
         */
        public static create(properties?: pbgo.ILoginAck): pbgo.LoginAck;

        /**
         * Encodes the specified LoginAck message. Does not implicitly {@link pbgo.LoginAck.verify|verify} messages.
         * @param message LoginAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pbgo.ILoginAck, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified LoginAck message, length delimited. Does not implicitly {@link pbgo.LoginAck.verify|verify} messages.
         * @param message LoginAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pbgo.ILoginAck, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LoginAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): pbgo.LoginAck;

        /**
         * Decodes a LoginAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): pbgo.LoginAck;

        /**
         * Verifies a LoginAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Player. */
    interface IPlayer {

        /** Player playerID */
        playerID?: (number|null);

        /** Player playerName */
        playerName?: (string|null);

        /** Player centerX */
        centerX?: (number|null);

        /** Player centerY */
        centerY?: (number|null);

        /** Player r */
        r?: (number|null);

        /** Player speed */
        speed?: (number|null);
    }

    /** Represents a Player. */
    class Player implements IPlayer {

        /**
         * Constructs a new Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: pbgo.IPlayer);

        /** Player playerID. */
        public playerID: number;

        /** Player playerName. */
        public playerName: string;

        /** Player centerX. */
        public centerX: number;

        /** Player centerY. */
        public centerY: number;

        /** Player r. */
        public r: number;

        /** Player speed. */
        public speed: number;

        /**
         * Creates a new Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Player instance
         */
        public static create(properties?: pbgo.IPlayer): pbgo.Player;

        /**
         * Encodes the specified Player message. Does not implicitly {@link pbgo.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pbgo.IPlayer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link pbgo.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pbgo.IPlayer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): pbgo.Player;

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): pbgo.Player;

        /**
         * Verifies a Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Food. */
    interface IFood {

        /** Food id */
        id?: (number|null);

        /** Food centerX */
        centerX?: (number|null);

        /** Food centerY */
        centerY?: (number|null);

        /** Food r */
        r?: (number|null);
    }

    /** Represents a Food. */
    class Food implements IFood {

        /**
         * Constructs a new Food.
         * @param [properties] Properties to set
         */
        constructor(properties?: pbgo.IFood);

        /** Food id. */
        public id: number;

        /** Food centerX. */
        public centerX: number;

        /** Food centerY. */
        public centerY: number;

        /** Food r. */
        public r: number;

        /**
         * Creates a new Food instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Food instance
         */
        public static create(properties?: pbgo.IFood): pbgo.Food;

        /**
         * Encodes the specified Food message. Does not implicitly {@link pbgo.Food.verify|verify} messages.
         * @param message Food message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pbgo.IFood, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Food message, length delimited. Does not implicitly {@link pbgo.Food.verify|verify} messages.
         * @param message Food message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pbgo.IFood, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Food message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Food
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): pbgo.Food;

        /**
         * Decodes a Food message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Food
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): pbgo.Food;

        /**
         * Verifies a Food message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of an EnterGame. */
    interface IEnterGame {

        /** EnterGame playerID */
        playerID?: (number|null);
    }

    /** Represents an EnterGame. */
    class EnterGame implements IEnterGame {

        /**
         * Constructs a new EnterGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: pbgo.IEnterGame);

        /** EnterGame playerID. */
        public playerID: number;

        /**
         * Creates a new EnterGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterGame instance
         */
        public static create(properties?: pbgo.IEnterGame): pbgo.EnterGame;

        /**
         * Encodes the specified EnterGame message. Does not implicitly {@link pbgo.EnterGame.verify|verify} messages.
         * @param message EnterGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pbgo.IEnterGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified EnterGame message, length delimited. Does not implicitly {@link pbgo.EnterGame.verify|verify} messages.
         * @param message EnterGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pbgo.IEnterGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an EnterGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): pbgo.EnterGame;

        /**
         * Decodes an EnterGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): pbgo.EnterGame;

        /**
         * Verifies an EnterGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of an EnterGameAck. */
    interface IEnterGameAck {

        /** EnterGameAck self */
        self?: (pbgo.IPlayer|null);

        /** EnterGameAck players */
        players?: (pbgo.IPlayer[]|null);

        /** EnterGameAck foods */
        foods?: (pbgo.IFood[]|null);
    }

    /** Represents an EnterGameAck. */
    class EnterGameAck implements IEnterGameAck {

        /**
         * Constructs a new EnterGameAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: pbgo.IEnterGameAck);

        /** EnterGameAck self. */
        public self?: (pbgo.IPlayer|null);

        /** EnterGameAck players. */
        public players: pbgo.IPlayer[];

        /** EnterGameAck foods. */
        public foods: pbgo.IFood[];

        /**
         * Creates a new EnterGameAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterGameAck instance
         */
        public static create(properties?: pbgo.IEnterGameAck): pbgo.EnterGameAck;

        /**
         * Encodes the specified EnterGameAck message. Does not implicitly {@link pbgo.EnterGameAck.verify|verify} messages.
         * @param message EnterGameAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pbgo.IEnterGameAck, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified EnterGameAck message, length delimited. Does not implicitly {@link pbgo.EnterGameAck.verify|verify} messages.
         * @param message EnterGameAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pbgo.IEnterGameAck, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an EnterGameAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterGameAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): pbgo.EnterGameAck;

        /**
         * Decodes an EnterGameAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterGameAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): pbgo.EnterGameAck;

        /**
         * Verifies an EnterGameAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Refresh. */
    interface IRefresh {

        /** Refresh players */
        players?: (pbgo.IPlayer[]|null);

        /** Refresh foods */
        foods?: (pbgo.IFood[]|null);

        /** Refresh selfMod */
        selfMod?: (number|null);
    }

    /** Represents a Refresh. */
    class Refresh implements IRefresh {

        /**
         * Constructs a new Refresh.
         * @param [properties] Properties to set
         */
        constructor(properties?: pbgo.IRefresh);

        /** Refresh players. */
        public players: pbgo.IPlayer[];

        /** Refresh foods. */
        public foods: pbgo.IFood[];

        /** Refresh selfMod. */
        public selfMod: number;

        /**
         * Creates a new Refresh instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Refresh instance
         */
        public static create(properties?: pbgo.IRefresh): pbgo.Refresh;

        /**
         * Encodes the specified Refresh message. Does not implicitly {@link pbgo.Refresh.verify|verify} messages.
         * @param message Refresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pbgo.IRefresh, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Refresh message, length delimited. Does not implicitly {@link pbgo.Refresh.verify|verify} messages.
         * @param message Refresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pbgo.IRefresh, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Refresh message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Refresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): pbgo.Refresh;

        /**
         * Decodes a Refresh message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Refresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): pbgo.Refresh;

        /**
         * Verifies a Refresh message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of an OperateMsg. */
    interface IOperateMsg {

        /** OperateMsg opCode */
        opCode?: (number|null);

        /** OperateMsg maxWidth */
        maxWidth?: (number|null);

        /** OperateMsg maxHeight */
        maxHeight?: (number|null);

        /** OperateMsg mod */
        mod?: (number|null);
    }

    /** Represents an OperateMsg. */
    class OperateMsg implements IOperateMsg {

        /**
         * Constructs a new OperateMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: pbgo.IOperateMsg);

        /** OperateMsg opCode. */
        public opCode: number;

        /** OperateMsg maxWidth. */
        public maxWidth: number;

        /** OperateMsg maxHeight. */
        public maxHeight: number;

        /** OperateMsg mod. */
        public mod: number;

        /**
         * Creates a new OperateMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OperateMsg instance
         */
        public static create(properties?: pbgo.IOperateMsg): pbgo.OperateMsg;

        /**
         * Encodes the specified OperateMsg message. Does not implicitly {@link pbgo.OperateMsg.verify|verify} messages.
         * @param message OperateMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pbgo.IOperateMsg, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified OperateMsg message, length delimited. Does not implicitly {@link pbgo.OperateMsg.verify|verify} messages.
         * @param message OperateMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pbgo.IOperateMsg, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an OperateMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OperateMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): pbgo.OperateMsg;

        /**
         * Decodes an OperateMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OperateMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): pbgo.OperateMsg;

        /**
         * Verifies an OperateMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }
}
