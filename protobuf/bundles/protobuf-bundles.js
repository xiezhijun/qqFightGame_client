var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pbgo = (function() {

    /**
     * Namespace pbgo.
     * @exports pbgo
     * @namespace
     */
    var pbgo = {};

    pbgo.Login = (function() {

        /**
         * Properties of a Login.
         * @memberof pbgo
         * @interface ILogin
         * @property {number|null} [sex] Login sex
         * @property {string|null} [nickName] Login nickName
         * @property {string|null} [userName] Login userName
         * @property {string|null} [pwd] Login pwd
         * @property {boolean|null} [isRegis] Login isRegis
         */

        /**
         * Constructs a new Login.
         * @memberof pbgo
         * @classdesc Represents a Login.
         * @implements ILogin
         * @constructor
         * @param {pbgo.ILogin=} [properties] Properties to set
         */
        function Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login sex.
         * @member {number} sex
         * @memberof pbgo.Login
         * @instance
         */
        Login.prototype.sex = 0;

        /**
         * Login nickName.
         * @member {string} nickName
         * @memberof pbgo.Login
         * @instance
         */
        Login.prototype.nickName = "";

        /**
         * Login userName.
         * @member {string} userName
         * @memberof pbgo.Login
         * @instance
         */
        Login.prototype.userName = "";

        /**
         * Login pwd.
         * @member {string} pwd
         * @memberof pbgo.Login
         * @instance
         */
        Login.prototype.pwd = "";

        /**
         * Login isRegis.
         * @member {boolean} isRegis
         * @memberof pbgo.Login
         * @instance
         */
        Login.prototype.isRegis = false;

        /**
         * Creates a new Login instance using the specified properties.
         * @function create
         * @memberof pbgo.Login
         * @static
         * @param {pbgo.ILogin=} [properties] Properties to set
         * @returns {pbgo.Login} Login instance
         */
        Login.create = function create(properties) {
            return new Login(properties);
        };

        /**
         * Encodes the specified Login message. Does not implicitly {@link pbgo.Login.verify|verify} messages.
         * @function encode
         * @memberof pbgo.Login
         * @static
         * @param {pbgo.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sex != null && message.hasOwnProperty("sex"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sex);
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickName);
            if (message.userName != null && message.hasOwnProperty("userName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.userName);
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.pwd);
            if (message.isRegis != null && message.hasOwnProperty("isRegis"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isRegis);
            return writer;
        };

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link pbgo.Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pbgo.Login
         * @static
         * @param {pbgo.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @function decode
         * @memberof pbgo.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pbgo.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pbgo.Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sex = reader.int32();
                    break;
                case 2:
                    message.nickName = reader.string();
                    break;
                case 3:
                    message.userName = reader.string();
                    break;
                case 4:
                    message.pwd = reader.string();
                    break;
                case 5:
                    message.isRegis = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pbgo.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pbgo.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login message.
         * @function verify
         * @memberof pbgo.Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sex != null && message.hasOwnProperty("sex"))
                if (!$util.isInteger(message.sex))
                    return "sex: integer expected";
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                if (!$util.isString(message.nickName))
                    return "nickName: string expected";
            if (message.userName != null && message.hasOwnProperty("userName"))
                if (!$util.isString(message.userName))
                    return "userName: string expected";
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                if (!$util.isString(message.pwd))
                    return "pwd: string expected";
            if (message.isRegis != null && message.hasOwnProperty("isRegis"))
                if (typeof message.isRegis !== "boolean")
                    return "isRegis: boolean expected";
            return null;
        };

        return Login;
    })();

    pbgo.LoginAck = (function() {

        /**
         * Properties of a LoginAck.
         * @memberof pbgo
         * @interface ILoginAck
         * @property {number|null} [code] LoginAck code
         * @property {pbgo.IPlayer|null} [player] LoginAck player
         */

        /**
         * Constructs a new LoginAck.
         * @memberof pbgo
         * @classdesc Represents a LoginAck.
         * @implements ILoginAck
         * @constructor
         * @param {pbgo.ILoginAck=} [properties] Properties to set
         */
        function LoginAck(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginAck code.
         * @member {number} code
         * @memberof pbgo.LoginAck
         * @instance
         */
        LoginAck.prototype.code = 0;

        /**
         * LoginAck player.
         * @member {pbgo.IPlayer|null|undefined} player
         * @memberof pbgo.LoginAck
         * @instance
         */
        LoginAck.prototype.player = null;

        /**
         * Creates a new LoginAck instance using the specified properties.
         * @function create
         * @memberof pbgo.LoginAck
         * @static
         * @param {pbgo.ILoginAck=} [properties] Properties to set
         * @returns {pbgo.LoginAck} LoginAck instance
         */
        LoginAck.create = function create(properties) {
            return new LoginAck(properties);
        };

        /**
         * Encodes the specified LoginAck message. Does not implicitly {@link pbgo.LoginAck.verify|verify} messages.
         * @function encode
         * @memberof pbgo.LoginAck
         * @static
         * @param {pbgo.ILoginAck} message LoginAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginAck.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.player != null && message.hasOwnProperty("player"))
                $root.pbgo.Player.encode(message.player, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified LoginAck message, length delimited. Does not implicitly {@link pbgo.LoginAck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pbgo.LoginAck
         * @static
         * @param {pbgo.ILoginAck} message LoginAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginAck.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginAck message from the specified reader or buffer.
         * @function decode
         * @memberof pbgo.LoginAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pbgo.LoginAck} LoginAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginAck.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pbgo.LoginAck();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.player = $root.pbgo.Player.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginAck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pbgo.LoginAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pbgo.LoginAck} LoginAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginAck.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginAck message.
         * @function verify
         * @memberof pbgo.LoginAck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginAck.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.player != null && message.hasOwnProperty("player")) {
                var error = $root.pbgo.Player.verify(message.player);
                if (error)
                    return "player." + error;
            }
            return null;
        };

        return LoginAck;
    })();

    pbgo.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof pbgo
         * @interface IPlayer
         * @property {number|null} [playerID] Player playerID
         * @property {string|null} [playerName] Player playerName
         * @property {number|null} [centerX] Player centerX
         * @property {number|null} [centerY] Player centerY
         * @property {number|null} [r] Player r
         * @property {number|null} [speed] Player speed
         */

        /**
         * Constructs a new Player.
         * @memberof pbgo
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {pbgo.IPlayer=} [properties] Properties to set
         */
        function Player(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Player playerID.
         * @member {number} playerID
         * @memberof pbgo.Player
         * @instance
         */
        Player.prototype.playerID = 0;

        /**
         * Player playerName.
         * @member {string} playerName
         * @memberof pbgo.Player
         * @instance
         */
        Player.prototype.playerName = "";

        /**
         * Player centerX.
         * @member {number} centerX
         * @memberof pbgo.Player
         * @instance
         */
        Player.prototype.centerX = 0;

        /**
         * Player centerY.
         * @member {number} centerY
         * @memberof pbgo.Player
         * @instance
         */
        Player.prototype.centerY = 0;

        /**
         * Player r.
         * @member {number} r
         * @memberof pbgo.Player
         * @instance
         */
        Player.prototype.r = 0;

        /**
         * Player speed.
         * @member {number} speed
         * @memberof pbgo.Player
         * @instance
         */
        Player.prototype.speed = 0;

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof pbgo.Player
         * @static
         * @param {pbgo.IPlayer=} [properties] Properties to set
         * @returns {pbgo.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link pbgo.Player.verify|verify} messages.
         * @function encode
         * @memberof pbgo.Player
         * @static
         * @param {pbgo.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerID != null && message.hasOwnProperty("playerID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.playerID);
            if (message.playerName != null && message.hasOwnProperty("playerName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.playerName);
            if (message.centerX != null && message.hasOwnProperty("centerX"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.centerX);
            if (message.centerY != null && message.hasOwnProperty("centerY"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.centerY);
            if (message.r != null && message.hasOwnProperty("r"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.r);
            if (message.speed != null && message.hasOwnProperty("speed"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.speed);
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link pbgo.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pbgo.Player
         * @static
         * @param {pbgo.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof pbgo.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pbgo.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pbgo.Player();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerID = reader.int32();
                    break;
                case 2:
                    message.playerName = reader.string();
                    break;
                case 3:
                    message.centerX = reader.int32();
                    break;
                case 4:
                    message.centerY = reader.int32();
                    break;
                case 5:
                    message.r = reader.int32();
                    break;
                case 6:
                    message.speed = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pbgo.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pbgo.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof pbgo.Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerID != null && message.hasOwnProperty("playerID"))
                if (!$util.isInteger(message.playerID))
                    return "playerID: integer expected";
            if (message.playerName != null && message.hasOwnProperty("playerName"))
                if (!$util.isString(message.playerName))
                    return "playerName: string expected";
            if (message.centerX != null && message.hasOwnProperty("centerX"))
                if (!$util.isInteger(message.centerX))
                    return "centerX: integer expected";
            if (message.centerY != null && message.hasOwnProperty("centerY"))
                if (!$util.isInteger(message.centerY))
                    return "centerY: integer expected";
            if (message.r != null && message.hasOwnProperty("r"))
                if (!$util.isInteger(message.r))
                    return "r: integer expected";
            if (message.speed != null && message.hasOwnProperty("speed"))
                if (!$util.isInteger(message.speed))
                    return "speed: integer expected";
            return null;
        };

        return Player;
    })();

    pbgo.Food = (function() {

        /**
         * Properties of a Food.
         * @memberof pbgo
         * @interface IFood
         * @property {number|null} [id] Food id
         * @property {number|null} [centerX] Food centerX
         * @property {number|null} [centerY] Food centerY
         * @property {number|null} [r] Food r
         */

        /**
         * Constructs a new Food.
         * @memberof pbgo
         * @classdesc Represents a Food.
         * @implements IFood
         * @constructor
         * @param {pbgo.IFood=} [properties] Properties to set
         */
        function Food(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Food id.
         * @member {number} id
         * @memberof pbgo.Food
         * @instance
         */
        Food.prototype.id = 0;

        /**
         * Food centerX.
         * @member {number} centerX
         * @memberof pbgo.Food
         * @instance
         */
        Food.prototype.centerX = 0;

        /**
         * Food centerY.
         * @member {number} centerY
         * @memberof pbgo.Food
         * @instance
         */
        Food.prototype.centerY = 0;

        /**
         * Food r.
         * @member {number} r
         * @memberof pbgo.Food
         * @instance
         */
        Food.prototype.r = 0;

        /**
         * Creates a new Food instance using the specified properties.
         * @function create
         * @memberof pbgo.Food
         * @static
         * @param {pbgo.IFood=} [properties] Properties to set
         * @returns {pbgo.Food} Food instance
         */
        Food.create = function create(properties) {
            return new Food(properties);
        };

        /**
         * Encodes the specified Food message. Does not implicitly {@link pbgo.Food.verify|verify} messages.
         * @function encode
         * @memberof pbgo.Food
         * @static
         * @param {pbgo.IFood} message Food message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Food.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.centerX != null && message.hasOwnProperty("centerX"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.centerX);
            if (message.centerY != null && message.hasOwnProperty("centerY"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.centerY);
            if (message.r != null && message.hasOwnProperty("r"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.r);
            return writer;
        };

        /**
         * Encodes the specified Food message, length delimited. Does not implicitly {@link pbgo.Food.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pbgo.Food
         * @static
         * @param {pbgo.IFood} message Food message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Food.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Food message from the specified reader or buffer.
         * @function decode
         * @memberof pbgo.Food
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pbgo.Food} Food
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Food.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pbgo.Food();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.centerX = reader.int32();
                    break;
                case 3:
                    message.centerY = reader.int32();
                    break;
                case 4:
                    message.r = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Food message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pbgo.Food
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pbgo.Food} Food
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Food.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Food message.
         * @function verify
         * @memberof pbgo.Food
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Food.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.centerX != null && message.hasOwnProperty("centerX"))
                if (!$util.isInteger(message.centerX))
                    return "centerX: integer expected";
            if (message.centerY != null && message.hasOwnProperty("centerY"))
                if (!$util.isInteger(message.centerY))
                    return "centerY: integer expected";
            if (message.r != null && message.hasOwnProperty("r"))
                if (!$util.isInteger(message.r))
                    return "r: integer expected";
            return null;
        };

        return Food;
    })();

    pbgo.EnterGame = (function() {

        /**
         * Properties of an EnterGame.
         * @memberof pbgo
         * @interface IEnterGame
         * @property {number|null} [playerID] EnterGame playerID
         */

        /**
         * Constructs a new EnterGame.
         * @memberof pbgo
         * @classdesc Represents an EnterGame.
         * @implements IEnterGame
         * @constructor
         * @param {pbgo.IEnterGame=} [properties] Properties to set
         */
        function EnterGame(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterGame playerID.
         * @member {number} playerID
         * @memberof pbgo.EnterGame
         * @instance
         */
        EnterGame.prototype.playerID = 0;

        /**
         * Creates a new EnterGame instance using the specified properties.
         * @function create
         * @memberof pbgo.EnterGame
         * @static
         * @param {pbgo.IEnterGame=} [properties] Properties to set
         * @returns {pbgo.EnterGame} EnterGame instance
         */
        EnterGame.create = function create(properties) {
            return new EnterGame(properties);
        };

        /**
         * Encodes the specified EnterGame message. Does not implicitly {@link pbgo.EnterGame.verify|verify} messages.
         * @function encode
         * @memberof pbgo.EnterGame
         * @static
         * @param {pbgo.IEnterGame} message EnterGame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterGame.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerID != null && message.hasOwnProperty("playerID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.playerID);
            return writer;
        };

        /**
         * Encodes the specified EnterGame message, length delimited. Does not implicitly {@link pbgo.EnterGame.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pbgo.EnterGame
         * @static
         * @param {pbgo.IEnterGame} message EnterGame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterGame.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterGame message from the specified reader or buffer.
         * @function decode
         * @memberof pbgo.EnterGame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pbgo.EnterGame} EnterGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterGame.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pbgo.EnterGame();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterGame message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pbgo.EnterGame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pbgo.EnterGame} EnterGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterGame.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterGame message.
         * @function verify
         * @memberof pbgo.EnterGame
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterGame.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerID != null && message.hasOwnProperty("playerID"))
                if (!$util.isInteger(message.playerID))
                    return "playerID: integer expected";
            return null;
        };

        return EnterGame;
    })();

    pbgo.EnterGameAck = (function() {

        /**
         * Properties of an EnterGameAck.
         * @memberof pbgo
         * @interface IEnterGameAck
         * @property {pbgo.IPlayer|null} [self] EnterGameAck self
         * @property {Array.<pbgo.IPlayer>|null} [players] EnterGameAck players
         * @property {Array.<pbgo.IFood>|null} [foods] EnterGameAck foods
         */

        /**
         * Constructs a new EnterGameAck.
         * @memberof pbgo
         * @classdesc Represents an EnterGameAck.
         * @implements IEnterGameAck
         * @constructor
         * @param {pbgo.IEnterGameAck=} [properties] Properties to set
         */
        function EnterGameAck(properties) {
            this.players = [];
            this.foods = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterGameAck self.
         * @member {pbgo.IPlayer|null|undefined} self
         * @memberof pbgo.EnterGameAck
         * @instance
         */
        EnterGameAck.prototype.self = null;

        /**
         * EnterGameAck players.
         * @member {Array.<pbgo.IPlayer>} players
         * @memberof pbgo.EnterGameAck
         * @instance
         */
        EnterGameAck.prototype.players = $util.emptyArray;

        /**
         * EnterGameAck foods.
         * @member {Array.<pbgo.IFood>} foods
         * @memberof pbgo.EnterGameAck
         * @instance
         */
        EnterGameAck.prototype.foods = $util.emptyArray;

        /**
         * Creates a new EnterGameAck instance using the specified properties.
         * @function create
         * @memberof pbgo.EnterGameAck
         * @static
         * @param {pbgo.IEnterGameAck=} [properties] Properties to set
         * @returns {pbgo.EnterGameAck} EnterGameAck instance
         */
        EnterGameAck.create = function create(properties) {
            return new EnterGameAck(properties);
        };

        /**
         * Encodes the specified EnterGameAck message. Does not implicitly {@link pbgo.EnterGameAck.verify|verify} messages.
         * @function encode
         * @memberof pbgo.EnterGameAck
         * @static
         * @param {pbgo.IEnterGameAck} message EnterGameAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterGameAck.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.self != null && message.hasOwnProperty("self"))
                $root.pbgo.Player.encode(message.self, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.players != null && message.players.length)
                for (var i = 0; i < message.players.length; ++i)
                    $root.pbgo.Player.encode(message.players[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.foods != null && message.foods.length)
                for (var i = 0; i < message.foods.length; ++i)
                    $root.pbgo.Food.encode(message.foods[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EnterGameAck message, length delimited. Does not implicitly {@link pbgo.EnterGameAck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pbgo.EnterGameAck
         * @static
         * @param {pbgo.IEnterGameAck} message EnterGameAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterGameAck.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterGameAck message from the specified reader or buffer.
         * @function decode
         * @memberof pbgo.EnterGameAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pbgo.EnterGameAck} EnterGameAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterGameAck.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pbgo.EnterGameAck();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.self = $root.pbgo.Player.decode(reader, reader.uint32());
                    break;
                case 2:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.pbgo.Player.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.foods && message.foods.length))
                        message.foods = [];
                    message.foods.push($root.pbgo.Food.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterGameAck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pbgo.EnterGameAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pbgo.EnterGameAck} EnterGameAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterGameAck.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterGameAck message.
         * @function verify
         * @memberof pbgo.EnterGameAck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterGameAck.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.self != null && message.hasOwnProperty("self")) {
                var error = $root.pbgo.Player.verify(message.self);
                if (error)
                    return "self." + error;
            }
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (var i = 0; i < message.players.length; ++i) {
                    var error = $root.pbgo.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.foods != null && message.hasOwnProperty("foods")) {
                if (!Array.isArray(message.foods))
                    return "foods: array expected";
                for (var i = 0; i < message.foods.length; ++i) {
                    var error = $root.pbgo.Food.verify(message.foods[i]);
                    if (error)
                        return "foods." + error;
                }
            }
            return null;
        };

        return EnterGameAck;
    })();

    pbgo.Refresh = (function() {

        /**
         * Properties of a Refresh.
         * @memberof pbgo
         * @interface IRefresh
         * @property {Array.<pbgo.IPlayer>|null} [players] Refresh players
         * @property {Array.<pbgo.IFood>|null} [foods] Refresh foods
         * @property {number|null} [selfMod] Refresh selfMod
         */

        /**
         * Constructs a new Refresh.
         * @memberof pbgo
         * @classdesc Represents a Refresh.
         * @implements IRefresh
         * @constructor
         * @param {pbgo.IRefresh=} [properties] Properties to set
         */
        function Refresh(properties) {
            this.players = [];
            this.foods = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Refresh players.
         * @member {Array.<pbgo.IPlayer>} players
         * @memberof pbgo.Refresh
         * @instance
         */
        Refresh.prototype.players = $util.emptyArray;

        /**
         * Refresh foods.
         * @member {Array.<pbgo.IFood>} foods
         * @memberof pbgo.Refresh
         * @instance
         */
        Refresh.prototype.foods = $util.emptyArray;

        /**
         * Refresh selfMod.
         * @member {number} selfMod
         * @memberof pbgo.Refresh
         * @instance
         */
        Refresh.prototype.selfMod = 0;

        /**
         * Creates a new Refresh instance using the specified properties.
         * @function create
         * @memberof pbgo.Refresh
         * @static
         * @param {pbgo.IRefresh=} [properties] Properties to set
         * @returns {pbgo.Refresh} Refresh instance
         */
        Refresh.create = function create(properties) {
            return new Refresh(properties);
        };

        /**
         * Encodes the specified Refresh message. Does not implicitly {@link pbgo.Refresh.verify|verify} messages.
         * @function encode
         * @memberof pbgo.Refresh
         * @static
         * @param {pbgo.IRefresh} message Refresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Refresh.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length)
                for (var i = 0; i < message.players.length; ++i)
                    $root.pbgo.Player.encode(message.players[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.foods != null && message.foods.length)
                for (var i = 0; i < message.foods.length; ++i)
                    $root.pbgo.Food.encode(message.foods[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.selfMod != null && message.hasOwnProperty("selfMod"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.selfMod);
            return writer;
        };

        /**
         * Encodes the specified Refresh message, length delimited. Does not implicitly {@link pbgo.Refresh.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pbgo.Refresh
         * @static
         * @param {pbgo.IRefresh} message Refresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Refresh.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Refresh message from the specified reader or buffer.
         * @function decode
         * @memberof pbgo.Refresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pbgo.Refresh} Refresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Refresh.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pbgo.Refresh();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.pbgo.Player.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.foods && message.foods.length))
                        message.foods = [];
                    message.foods.push($root.pbgo.Food.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.selfMod = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Refresh message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pbgo.Refresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pbgo.Refresh} Refresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Refresh.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Refresh message.
         * @function verify
         * @memberof pbgo.Refresh
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Refresh.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (var i = 0; i < message.players.length; ++i) {
                    var error = $root.pbgo.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.foods != null && message.hasOwnProperty("foods")) {
                if (!Array.isArray(message.foods))
                    return "foods: array expected";
                for (var i = 0; i < message.foods.length; ++i) {
                    var error = $root.pbgo.Food.verify(message.foods[i]);
                    if (error)
                        return "foods." + error;
                }
            }
            if (message.selfMod != null && message.hasOwnProperty("selfMod"))
                if (!$util.isInteger(message.selfMod))
                    return "selfMod: integer expected";
            return null;
        };

        return Refresh;
    })();

    pbgo.OperateMsg = (function() {

        /**
         * Properties of an OperateMsg.
         * @memberof pbgo
         * @interface IOperateMsg
         * @property {number|null} [opCode] OperateMsg opCode
         * @property {number|null} [maxWidth] OperateMsg maxWidth
         * @property {number|null} [maxHeight] OperateMsg maxHeight
         * @property {number|null} [mod] OperateMsg mod
         */

        /**
         * Constructs a new OperateMsg.
         * @memberof pbgo
         * @classdesc Represents an OperateMsg.
         * @implements IOperateMsg
         * @constructor
         * @param {pbgo.IOperateMsg=} [properties] Properties to set
         */
        function OperateMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OperateMsg opCode.
         * @member {number} opCode
         * @memberof pbgo.OperateMsg
         * @instance
         */
        OperateMsg.prototype.opCode = 0;

        /**
         * OperateMsg maxWidth.
         * @member {number} maxWidth
         * @memberof pbgo.OperateMsg
         * @instance
         */
        OperateMsg.prototype.maxWidth = 0;

        /**
         * OperateMsg maxHeight.
         * @member {number} maxHeight
         * @memberof pbgo.OperateMsg
         * @instance
         */
        OperateMsg.prototype.maxHeight = 0;

        /**
         * OperateMsg mod.
         * @member {number} mod
         * @memberof pbgo.OperateMsg
         * @instance
         */
        OperateMsg.prototype.mod = 0;

        /**
         * Creates a new OperateMsg instance using the specified properties.
         * @function create
         * @memberof pbgo.OperateMsg
         * @static
         * @param {pbgo.IOperateMsg=} [properties] Properties to set
         * @returns {pbgo.OperateMsg} OperateMsg instance
         */
        OperateMsg.create = function create(properties) {
            return new OperateMsg(properties);
        };

        /**
         * Encodes the specified OperateMsg message. Does not implicitly {@link pbgo.OperateMsg.verify|verify} messages.
         * @function encode
         * @memberof pbgo.OperateMsg
         * @static
         * @param {pbgo.IOperateMsg} message OperateMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperateMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opCode != null && message.hasOwnProperty("opCode"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.opCode);
            if (message.maxWidth != null && message.hasOwnProperty("maxWidth"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.maxWidth);
            if (message.maxHeight != null && message.hasOwnProperty("maxHeight"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.maxHeight);
            if (message.mod != null && message.hasOwnProperty("mod"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.mod);
            return writer;
        };

        /**
         * Encodes the specified OperateMsg message, length delimited. Does not implicitly {@link pbgo.OperateMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pbgo.OperateMsg
         * @static
         * @param {pbgo.IOperateMsg} message OperateMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OperateMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OperateMsg message from the specified reader or buffer.
         * @function decode
         * @memberof pbgo.OperateMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pbgo.OperateMsg} OperateMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperateMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pbgo.OperateMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.opCode = reader.int32();
                    break;
                case 2:
                    message.maxWidth = reader.int32();
                    break;
                case 3:
                    message.maxHeight = reader.int32();
                    break;
                case 4:
                    message.mod = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OperateMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pbgo.OperateMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pbgo.OperateMsg} OperateMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OperateMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OperateMsg message.
         * @function verify
         * @memberof pbgo.OperateMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OperateMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opCode != null && message.hasOwnProperty("opCode"))
                if (!$util.isInteger(message.opCode))
                    return "opCode: integer expected";
            if (message.maxWidth != null && message.hasOwnProperty("maxWidth"))
                if (!$util.isInteger(message.maxWidth))
                    return "maxWidth: integer expected";
            if (message.maxHeight != null && message.hasOwnProperty("maxHeight"))
                if (!$util.isInteger(message.maxHeight))
                    return "maxHeight: integer expected";
            if (message.mod != null && message.hasOwnProperty("mod"))
                if (!$util.isInteger(message.mod))
                    return "mod: integer expected";
            return null;
        };

        return OperateMsg;
    })();

    return pbgo;
})();