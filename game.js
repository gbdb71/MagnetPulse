var game = new Phaser.Game(768, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    // Image loading
    game.load.image("floor", "img/Floor.png");
    // game.load.image("wall", "img/Wall.png");
    game.load.spritesheet("wall", "img/WallSpritesheet.png", 48, 48, 2);
    // game.load.image("hole", "img/Hole.png");
    game.load.spritesheet("hole", "img/HoleSpritesheet.png", 48, 48, 2);

    game.load.image("switch", "img/Plate.png");
    game.load.spritesheet("switch_0", "img/PlateXSpritesheet.png", 144, 144, 2);
    game.load.spritesheet("switch_1", "img/PlateYSpritesheet.png", 144, 144, 2);
    game.load.spritesheet("switch_2", "img/PlateZSpritesheet.png", 144, 144, 2);

    game.load.image("stone", "img/Block.png");
    game.load.image("push", "img/North.png");
    game.load.image("pull", "img/South.png");

    game.load.image("beam", "img/Beam.png");

    game.load.spritesheet("player", "img/CharacterSpritesheet.png", 48, 48, 5);

    game.load.spritesheet("question", "img/QuestionSpritesheet.png", 48, 48, 4);

    game.load.image("player_top_left_piece", "img/CharacterShatter1.png");
    game.load.image("player_top_right_piece", "img/CharacterShatter2.png");
    game.load.image("player_bottom_left_piece", "img/CharacterShatter3.png");
    game.load.image("player_bottom_right_piece", "img/CharacterShatter4.png");

    game.load.image("stone_top_left_piece", "img/BlockShatter1.png");
    game.load.image("stone_top_right_piece", "img/BlockShatter2.png");
    game.load.image("stone_bottom_left_piece", "img/BlockShatter3.png");
    game.load.image("stone_bottom_right_piece", "img/BlockShatter4.png");

    game.load.image("push_top_left_piece", "img/NorthShatter1.png");
    game.load.image("push_top_right_piece", "img/NorthShatter2.png");
    game.load.image("push_bottom_left_piece", "img/NorthShatter3.png");
    game.load.image("push_bottom_right_piece", "img/NorthShatter4.png");

    game.load.image("pull_top_left_piece", "img/SouthShatter1.png");
    game.load.image("pull_top_right_piece", "img/SouthShatter2.png");
    game.load.image("pull_bottom_left_piece", "img/SouthShatter3.png");
    game.load.image("pull_bottom_right_piece", "img/SouthShatter4.png");

    game.load.spritesheet("door_0", "img/ForcefieldSpritesheetX.png", 48, 48, 6);
    game.load.spritesheet("door_1", "img/ForcefieldSpritesheetY.png", 48, 48, 6);
    game.load.spritesheet("door_2", "img/ForcefieldSpritesheetZ.png", 48, 48, 6);


    // Sound loading
    game.load.audio("beam_sfx", "sound/Beam.wav");
    game.load.audio("switch_sfx", "sound/Plate.wav");
    game.load.audio("death_sfx", "sound/Death.wav");
    game.load.audio("fall_sfx", "sound/Fall.wav");
    game.load.audio("npc_sfx", "sound/NPC.wav");

    game.load.audio("bgm", "sound/MagnetGameOverworld.ogg");

    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    pulseKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    resetKey = game.input.keyboard.addKey(Phaser.Keyboard.R);

}

// Globals

var PX_SIZE = 48;
var GRID_X = 16;
var GRID_Y = 16;

var STANDARD_MOVE_DUR = 150;
var PULSE_MOVE_DUR = 1;

// Entity Types 
var NOTHING = -1;
var FLOOR = 0;
var SWITCH = 1;
var HOLE = 2;
var DOOR = 3;
var TYPE_PLAYER = 4;
var WALL = 5;
var STONE_BLOCK = 6;
var PUSH_BLOCK = 7;
var PULL_BLOCK = 8;
var NPC = 9;

// Effect Types
var BEAM = 1;
var BEAM_VERT = 2;
var FALL_FADE = 3;
var EXPLODE_TOP_LEFT = 4;
var EXPLODE_TOP_RIGHT = 5;
var EXPLODE_BOTTOM_LEFT = 6;
var EXPLODE_BOTTOM_RIGHT = 7;

// Entity Type Dictionary
var entityDic = {};
entityDic[HOLE] = {image: "hole"};
entityDic[SWITCH] = {image: ["switch_0", "switch_1", "switch_2"]};
entityDic[TYPE_PLAYER] = {image: "player", explode: ["player_top_left_piece", "player_top_right_piece", "player_bottom_left_piece", "player_bottom_right_piece"]};
entityDic[WALL] = {image: "wall"};
entityDic[DOOR] = {image: ["door_0", "door_1", "door_2"]};
entityDic[STONE_BLOCK] = {image: "stone", explode: ["stone_top_left_piece", "stone_top_right_piece", "stone_bottom_left_piece", "stone_bottom_right_piece"]};
entityDic[PUSH_BLOCK] = {image: "push", explode: ["push_top_left_piece", "push_top_right_piece", "push_bottom_left_piece", "push_bottom_right_piece"]};
entityDic[PULL_BLOCK] = {image: "pull", explode: ["pull_top_left_piece", "pull_top_right_piece", "pull_bottom_left_piece", "pull_bottom_right_piece"]};
entityDic[NPC] = {image: "question"};

var SOLID_TYPES_BLOCK = [WALL, STONE_BLOCK, PULL_BLOCK, PUSH_BLOCK, DOOR, NPC];
var SOLID_TYPES_PLAYER = [WALL, STONE_BLOCK, PULL_BLOCK, PUSH_BLOCK, DOOR, NPC, HOLE];
var PUSH_TYPES_PLAYER = [STONE_BLOCK, PULL_BLOCK, PUSH_BLOCK];
var REACTS_TO_PULSE = [PULL_BLOCK, PUSH_BLOCK];
var INTERACT_WITH_GROUND = [STONE_BLOCK, PULL_BLOCK, PUSH_BLOCK, TYPE_PLAYER];

var entityList = [];

var effectList = [];

var tileArray = [];

for (var i = 0; i < GRID_X; i++) {
    tileArray[i] = [];
    for (var j = 0; j < GRID_Y; j++) {
        tileArray[i][j] = new Tile();
    }
}

var pulseState = false;

var levelLoaded = false;

var numCharges = 0;

var playerStartX = 7;
var playerStartY = 7;

var upKey;
var downKey;
var leftKey;
var rightKey;

var pulseKey;
var resetKey;

var upKeyPressed = false;
var downKeyPressed = false;
var leftKeyPressed = false;
var rightKeyPressed = false;
var pulseKeyPressed = false;
var resetKeyPressed = false;

var keyPressArray = [];

var beamSound;
var switchSound;
var deathSound;
var fallSound;
var npcSound;

var bgmSound;

var playerDeathReset;

var NPCSpoken = false;

function Tile () {
    this.entities = [];

    this.removeEntity = function (entity) {
        var entityIndex;
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].id === entity.id) {
                entityIndex = i;
            }
        }
        if (entityIndex !== undefined) {
            this.entities.splice(entityIndex, 1);
        }
        this.handleSwitch();

    }

    this.hasEntityInTypeArray = function (typeArray) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].inTypeArray(typeArray)) {
                return true;
            }
        }
        return false;
    }

    this.handleSwitch = function () {
        if (this.hasEntityInTypeArray([SWITCH])) {
            var hasSwitchPresser = false;
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].inTypeArray(INTERACT_WITH_GROUND)) {
                    hasSwitchPresser = true;
                    for (var j = 0; j < this.entities.length; j++) {
                        if (this.entities[j].type === SWITCH) {
                            adjustChannel(this.entities[j].data.channel, true);
                        }
                    }
                }
            }
            if (!hasSwitchPresser) {
                for (var i = 0; i < this.entities.length; i++) {
                    if (this.entities[i].type === SWITCH) {
                        adjustChannel(this.entities[i].data.channel, false);
                    }
                }
            }
        }
    }

    this.update = function () {
        if (pulseState) {
            if (this.hasEntityInTypeArray([TYPE_PLAYER])) {
                if (this.hasEntityInTypeArray(REACTS_TO_PULSE)) {
                    player.die();
                }
            }
            // return;
        }
        if (!pulseState && this.hasEntityInTypeArray([HOLE])) {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].inTypeArray(INTERACT_WITH_GROUND)) {
                    this.entities[i].fall();
                }
            }
        }
        this.handleSwitch();
        if (this.hasEntityInTypeArray([DOOR])) {
            var doorOn = false;
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].type === DOOR && !this.entities[i].channelState) {
                    doorOn = true;
                }
            }
            if (doorOn) {
                for (var i = 0; i < this.entities.length; i++) {
                    if (this.entities[i].inTypeArray(INTERACT_WITH_GROUND)) {
                        this.entities[i].die();
                    }
                }
            }
        }
    }
}

var entityIDCounter = 0;

function Entity (x, y, type, data) {
    this.id = entityIDCounter;
    entityIDCounter++;

    this.x = x;
    this.y = y;
    this.screenX = x * PX_SIZE;
    this.screenY = y * PX_SIZE;
    this.type = type;
    this.data = data;

    this.isMoving = false;
    this.moveT = 1;
    this.moveDur = STANDARD_MOVE_DUR;
    this.moveElapsed = 0;
    // this.moveStartTime = 0;
    this.moveStartScreenX = this.screenX;
    this.moveStartScreenY = this.screenY;
    this.moveTargetScreenX = this.screenX;
    this.moveTargetScreenY = this.screenY;

    this.pulse = false;
    this.pulseMoved = false;

    this.fallen = false;

    this.channelOn = false;

    this.markedForDeletion = false;

    if (this.type === SWITCH) {
        this.sprite = game.add.sprite(screenX + (PX_SIZE / 2), screenY + (PX_SIZE / 2), entityDic[this.type].image[this.data.channel], 0);
    } else if (this.type === DOOR) {
        this.sprite = game.add.sprite(screenX + (PX_SIZE / 2), screenY + (PX_SIZE / 2), entityDic[this.type].image[this.data.channel]);
        this.sprite.animations.add("pulse");
        this.sprite.animations.play("pulse", 20, true);
    } else if (this.type === NPC) {
        this.sprite = game.add.sprite(screenX + (PX_SIZE / 2), screenY + (PX_SIZE / 2), entityDic[this.type].image);
        this.sprite.animations.add("hover");
        this.sprite.animations.play("hover", 10, true);
    } else if (this.type === TYPE_PLAYER) {
        this.sprite = game.add.sprite(screenX + (PX_SIZE / 2), screenY + (PX_SIZE / 2), entityDic[this.type].image, 0);
    } else if (this.type === HOLE) {
        this.sprite = game.add.sprite(screenX + (PX_SIZE / 2), screenY + (PX_SIZE / 2), entityDic[this.type].image, 0);
    } else {
        this.sprite = game.add.sprite(screenX + (PX_SIZE / 2), screenY + (PX_SIZE / 2), entityDic[this.type].image);
    }
    this.sprite.anchor.setTo(0.5, 0.5);
    spriteLayer.add(this.sprite);

    this.inTypeArray = function (typeArray) {
        return inTypeArray(this, typeArray);
    }

    this.update = function () {
        // update screen position
        if (this.isMoving) {
            this.moveElapsed += game.time.elapsedMS;
            this.moveT = this.moveElapsed / this.moveDur;
            if (this.moveT >= 1) {
                this.moveT = 1;
                this.isMoving = false;
                if (this.pulse) {
                    nextPulseStep = true;
                }
                tileArray[this.x][this.y].update();
            }
            this.screenX = this.moveStartScreenX + (this.moveTargetScreenX - this.moveStartScreenX) * this.moveT;
            this.screenY = this.moveStartScreenY + (this.moveTargetScreenY - this.moveStartScreenY) * this.moveT;
        }

        // if (this.fallen) {
        // 	this.sprite.alpha = 0;
        // } else {

        // }

    }

    this.render = function () {
        this.sprite.x = Math.round(this.screenX + (PX_SIZE / 2));
        this.sprite.y = Math.round(this.screenY + (PX_SIZE / 2));
    }

    this.move = function (xDiff, yDiff, pushing) {
        var xPos = this.x + xDiff;
        var yPos = this.y + yDiff;
        if ((xPos < 0 || xPos >= GRID_X) || (yPos < 0 || yPos >= GRID_Y)) {
            if (this.type === TYPE_PLAYER) {
                if (xPos < 0) {
                    playerStartX = GRID_X - 1;
                    playerStartY = this.y;
                    transitionType = "left";
                    if (levelInfo[curLevelIndex].advance === "left") {
                        loadLevel(curLevelIndex + 1);
                    } else {
                        loadLevel(curLevelIndex - 1);
                    }
                }
                if (xPos >= GRID_X) {
                    playerStartX = 0;
                    playerStartY = this.y;
                    transitionType = "right";
                    if (levelInfo[curLevelIndex].advance === "right") {
                        loadLevel(curLevelIndex + 1);
                    } else {
                        loadLevel(curLevelIndex - 1);
                    }
                }
                if (yPos < 0) {
                    playerStartX = this.x;
                    playerStartY = GRID_Y - 1;
                    transitionType = "up";
                    if (levelInfo[curLevelIndex].advance === "up") {
                        loadLevel(curLevelIndex + 1);
                    } else {
                        loadLevel(curLevelIndex - 1);
                    }
                }
                if (yPos >= GRID_Y) {
                    playerStartX = this.x;
                    playerStartY = 0;
                    transitionType = "down";
                    if (levelInfo[curLevelIndex].advance === "down") {
                        loadLevel(curLevelIndex + 1);
                    } else {
                        loadLevel(curLevelIndex - 1);
                    }
                }
            }
            xDiff = 0;
            yDiff = 0;
        } else {
            var entitiesAtCoord = findEntitiesAtCoord(xPos, yPos);
            for (var i = 0; i < entitiesAtCoord.length; i++) {
                var curEntity = entitiesAtCoord[i];
                var collisionCheckArray = SOLID_TYPES_BLOCK;
                if (this.type === TYPE_PLAYER) {
                	collisionCheckArray = SOLID_TYPES_PLAYER;
                }
                if (curEntity.inTypeArray(collisionCheckArray)) {
                    if (curEntity.type === DOOR && channels[curEntity.data.channel].on) {
                        // Do nothing, allow entity to move through
                    } else {
                        if (this.type === TYPE_PLAYER) {
                            if (curEntity.inTypeArray(PUSH_TYPES_PLAYER)) {
                                if (!pushing) {
                                    curEntity.move(xDiff, yDiff);
                                    this.move(xDiff, yDiff, true);
                                    return;
                                }
                            }
                            else if (curEntity.type === NPC && !NPCSpoken)
                            {
                                // Show this level's NPC message
                                var mainText = document.getElementById("MainText")
                                mainText.innerText = levelInfo[curLevelIndex].text;
                                npcSound.play();
                                NPCSpoken = true;
                            }
                        }
                        xDiff = 0;
                        yDiff = 0;
                    }
                }
            }
        }

        if (xDiff !== 0 || yDiff !== 0) {
            // do move
            // remove from previous tile entity array
            tileArray[this.x][this.y].removeEntity(this);
            this.moveStartScreenX = this.screenX;
            this.moveStartScreenY = this.screenY;

            this.moveT = 0;
            this.moveElapsed = 0;

            this.x = this.x + xDiff;
            this.y = this.y + yDiff;
            this.moveTargetScreenX = this.x * PX_SIZE;
            this.moveTargetScreenY = this.y * PX_SIZE;

            tileArray[this.x][this.y].entities.push(this);
            this.isMoving = true;
            return true;
        } else {
            return false;
        }
    }

    this.updateChargeSprite = function () {
        this.sprite.frame = numCharges;
    }

    this.makeOpenHole = function () {
        this.sprite.frame = 1;
    }
    
    this.makeFullWall = function () {
        this.sprite.frame = 1;
    }


    this.updateChannel = function (channelState) {
        this.channelState = channelState;
        if (channelState) {
            if (this.type === DOOR) {
                this.sprite.width = PX_SIZE / 3;
                this.sprite.height = PX_SIZE / 3;
                this.sprite.alpha = 0.7;
            }
            if (this.type === SWITCH) {
                this.sprite.frame = 1;
            }
        } else {
            if (this.type === DOOR) {
                this.sprite.width = PX_SIZE;
                this.sprite.height = PX_SIZE;
                this.sprite.alpha = 1;
            }
            if (this.type === SWITCH) {
                this.sprite.frame = 0;
            }
        }
    }

    this.fall = function () {
        if (!this.fallen) {
            this.fallen = true;
            fallSound.play();
            this.sprite.alpha = 0;
            this.markedForDeletion = true;
            new Effect(this.x, this.y, FALL_FADE, entityDic[this.type].image, 300);
        }
    }

    this.die = function () {
        if (!this.fallen) {
            this.fallen = true;
            deathSound.play();
            this.sprite.alpha = 0;
            this.markedForDeletion = true;
            new Effect(this.x, this.y, EXPLODE_TOP_LEFT, entityDic[this.type].explode[0], 300);
            new Effect(this.x, this.y, EXPLODE_TOP_RIGHT, entityDic[this.type].explode[1], 300);
            new Effect(this.x, this.y, EXPLODE_BOTTOM_LEFT, entityDic[this.type].explode[2], 300);
            new Effect(this.x, this.y, EXPLODE_BOTTOM_RIGHT, entityDic[this.type].explode[3], 300);
        }

    }

    this.reset = function () {
        this.fallen = false;
        this.sprite.alpha = 1;
    }

    this.destroy = function () {
        if (this.type === TYPE_PLAYER) {
            // this.markedForDeletion = false;
            if (this.fallen) {
                playerDeathReset = setTimeout(function(){
                    reset();
                }, 1000);
            }
            // return;
        }

        var entityIndex;
        for (var i = 0; i < entityList.length; i++) {
            if (entityList[i].id === this.id) {
                entityIndex = i;
            }
        }
        if (entityIndex !== undefined) {
            entityList.splice(entityIndex, 1);
        }

        tileArray[this.x][this.y].removeEntity(this);

        this.sprite.destroy();

    }

    tileArray[x][y].entities.push(this);
    entityList.push(this);
};

var effectIDCounter = 0;

function Effect (x, y, type, graphics, lifespan) {
    this.id = effectIDCounter;
    effectIDCounter++;

    this.x = x;
    this.y = y;
    this.type = type;
    this.screenX = this.x * PX_SIZE;
    this.screenY = this.y * PX_SIZE;
    this.lifespan = lifespan;

    this.markedForDeletion = false;

    this.sprite = game.add.sprite(this.screenX + (PX_SIZE / 2), this.screenY + (PX_SIZE / 2), graphics);
    this.sprite.anchor.setTo(0.5, 0.5);
    spriteLayer.add(this.sprite);

    if (this.type === BEAM_VERT) {
        this.sprite.rotation = Math.PI/2;
    }

    // this.startLife = game.time.now;
    this.lifetime = 0;

    this.update = function () {
        if (this.lifespan) {
            this.lifetime += game.time.elapsedMS;
            this.sprite.alpha = Math.max(0, (this.lifespan - this.lifetime) / this.lifespan);
            if (this.type === FALL_FADE) {
                this.sprite.width = PX_SIZE * Math.max(0, (this.lifespan - this.lifetime) / this.lifespan);
                this.sprite.height = PX_SIZE * Math.max(0, (this.lifespan - this.lifetime) / this.lifespan);
            }
            if (this.type === EXPLODE_TOP_LEFT) {
                this.screenX = (this.x * PX_SIZE) - (PX_SIZE * (1 - Math.max(0, (this.lifespan - this.lifetime) / this.lifespan)));
                this.screenY = (this.y * PX_SIZE) - (PX_SIZE * (1 - Math.max(0, (this.lifespan - this.lifetime) / this.lifespan)));
            }
            if (this.type === EXPLODE_TOP_RIGHT) {
                this.screenX = (this.x * PX_SIZE) + (PX_SIZE * (1 - Math.max(0, (this.lifespan - this.lifetime) / this.lifespan)));
                this.screenY = (this.y * PX_SIZE) - (PX_SIZE * (1 - Math.max(0, (this.lifespan - this.lifetime) / this.lifespan)));
            }
            if (this.type === EXPLODE_BOTTOM_LEFT) {
                this.screenX = (this.x * PX_SIZE) - (PX_SIZE * (1 - Math.max(0, (this.lifespan - this.lifetime) / this.lifespan)));
                this.screenY = (this.y * PX_SIZE) + (PX_SIZE * (1 - Math.max(0, (this.lifespan - this.lifetime) / this.lifespan)));
            }
            if (this.type === EXPLODE_BOTTOM_RIGHT) {
                this.screenX = (this.x * PX_SIZE) + (PX_SIZE * (1 - Math.max(0, (this.lifespan - this.lifetime) / this.lifespan)));
                this.screenY = (this.y * PX_SIZE) + (PX_SIZE * (1 - Math.max(0, (this.lifespan - this.lifetime) / this.lifespan)));
            }
            if (this.lifetime >= this.lifespan) {
                this.markedForDeletion = true;
            }
        }

    }

    this.render = function () {
        this.sprite.x = Math.round(this.screenX + (PX_SIZE / 2));
        this.sprite.y = Math.round(this.screenY + (PX_SIZE / 2));
    }

    this.destroy = function () {
        var effectIndex;
        for (var i = 0; i < effectList.length; i++) {
            if (effectList[i].id === this.id) {
                effectIndex = i;
            }
        }
        if (effectIndex !== undefined) {
            effectList.splice(effectIndex, 1);
        }

        this.sprite.destroy();

    }

    effectList.push(this);
}

var channels = {
    0: {on: false},
    1: {on: false},
    2: {on: false},
}

function adjustChannel (channelNum, isOn) {
    if (isOn) {
        if (!channels[channelNum].on) {
            channels[channelNum].on = true;
            switchSound.play();
            for (var i = 0; i < entityList.length; i++) {
                if (entityList[i].data && entityList[i].data.channel !== undefined && entityList[i].data.channel === channelNum) {
                    entityList[i].updateChannel(isOn);
                    tileArray[entityList[i].x][entityList[i].y].update();
                }
            }
        }
    } else {
        if (channels[channelNum].on) {
            channels[channelNum].on = false;
            for (var i = 0; i < entityList.length; i++) {
                if (entityList[i].data && entityList[i].data.channel !== undefined && entityList[i].data.channel === channelNum) {
                    entityList[i].updateChannel(isOn);
                    tileArray[entityList[i].x][entityList[i].y].update();
                }
            }
        }
    }
}

function findEntitiesAtCoord (x, y) {
    return tileArray[x][y].entities;
}

function inTypeArray (entity, typeArray) {
    return typeArray.indexOf(entity.type) >= 0;
}

var blackSquare;
var transitionSprite;
// var blueSquare;
// var graySquare;

var spriteLayer;
var HUDLayer;

var player;

function create() {

    // game.add.image(0, 0, 'sky');

    var tempGraphics = game.add.graphics(0, 0);
    tempGraphics.beginFill(0x000000);
    tempGraphics.drawRect(0, 0, PX_SIZE * GRID_X, PX_SIZE * GRID_Y);
    tempGraphics.endFill();
    blackSquare = tempGraphics.generateTexture();

    for (var i = 0; i < GRID_X; i++) {
        for (var j = 0; j < GRID_Y; j++) {
            game.add.sprite(PX_SIZE * i, PX_SIZE * j, "floor");
        }
    }

    spriteLayer = game.add.group();
    HUDLayer = game.add.group();

    transitionSprite = game.add.sprite(0, 0, blackSquare);
    HUDLayer.add(transitionSprite);
    transitionSprite.x = -PX_SIZE * GRID_X;

    loadLevel(0);

    beamSound = game.add.audio("beam_sfx");
    switchSound = game.add.audio("switch_sfx");
    deathSound = game.add.audio("death_sfx");
    fallSound = game.add.audio("fall_sfx");
    npcSound = game.add.audio("npc_sfx", 0.5);

    bgmSound = game.add.audio("bgm", 0.7, true);
    bgmSound.play();

    game.onPause.add(onGamePause, this);
    game.onResume.add(onGameResume, this);

    tempGraphics.destroy();

}

var tempKeyIndex;
var nextPulseStep = false;

function update() {

    if (rightKey.isDown) {
        tempKeyIndex = keyPressArray.indexOf(rightKey);
        if (tempKeyIndex === -1) {
            keyPressArray.push(rightKey);
        }
    } else {
        tempKeyIndex = keyPressArray.indexOf(rightKey);
        if (tempKeyIndex >= 0) {
            keyPressArray.splice(tempKeyIndex, 1);
        }
    }

    if (leftKey.isDown) {
        tempKeyIndex = keyPressArray.indexOf(leftKey);
        if (tempKeyIndex === -1) {
            keyPressArray.push(leftKey);
        }
    } else {
        tempKeyIndex = keyPressArray.indexOf(leftKey);
        if (tempKeyIndex >= 0) {
            keyPressArray.splice(tempKeyIndex, 1);
        }
    }

    if (upKey.isDown) {
        tempKeyIndex = keyPressArray.indexOf(upKey);
        if (tempKeyIndex === -1) {
            keyPressArray.push(upKey);
        }
    } else {
        tempKeyIndex = keyPressArray.indexOf(upKey);
        if (tempKeyIndex >= 0) {
            keyPressArray.splice(tempKeyIndex, 1);
        }
    }

    if (downKey.isDown) {
        tempKeyIndex = keyPressArray.indexOf(downKey);
        if (tempKeyIndex === -1) {
            keyPressArray.push(downKey);
        }
    } else {
        tempKeyIndex = keyPressArray.indexOf(downKey);
        if (tempKeyIndex >= 0) {
            keyPressArray.splice(tempKeyIndex, 1);
        }
    }

    if (pulseKey.isDown) {
        if (!pulseKeyPressed) {
            pulseKeyPressed = true;
            if (!player.isMoving && !pulseState && !player.fallen && levelLoaded && numCharges > 0) {
                pulseState = true;
                nextPulseStep = true;
                initPulse();
            }
        }
    } else {
        pulseKeyPressed = false;
    }

    if (resetKey.isDown) {
        if (!resetKeyPressed) {
            resetKeyPressed = true;
            clearTimeout(playerDeathReset);
            reset();
        }
    } else {
        resetKeyPressed = false;
    }

    if (player && !player.isMoving && !pulseState && !player.fallen && levelLoaded) {
        if (keyPressArray.length > 0) {
            switch (keyPressArray[keyPressArray.length-1]) {
                case rightKey:
                    player.move(1, 0);
                    break;
                case leftKey:
                    player.move(-1, 0);
                    break;
                case downKey:
                    player.move(0, 1);
                    break;
                case upKey:
                    player.move(0, -1);
                    break;
                                                         }
        }
    }

    if (pulseState) {
        if (nextPulseStep) {
            pulseStep();
            nextPulseStep = false;
        }
    }

    for (var i = 0; i < entityList.length; i++) {
        entityList[i].update();
        entityList[i].render();
    }
    for (var i = entityList.length - 1; i >= 0; i--) {
        if (entityList[i].markedForDeletion) {
            entityList[i].destroy();
        }
    }

    for (var i = 0; i < effectList.length; i++) {
        effectList[i].update();
        effectList[i].render();
    }
    for (var i = effectList.length - 1; i >= 0; i--) {
        if (effectList[i].markedForDeletion) {
            effectList[i].destroy();
        }
    }

}

var pulseEntities = [];

function initPulse () {
    pulseEntities = [];

    numCharges -= 1;
    player.updateChargeSprite();

    for (var i = 0; i < entityList.length; i++) {
        entityList[i].pulse = false;
    }
    for (var i = 0; i < player.x; i++) {
        var entitiesAtCoord = findEntitiesAtCoord(i, player.y);
        new Effect(i, player.y, BEAM, "beam", 200);
        for (var j = 0; j < entitiesAtCoord.length; j++) {
            entitiesAtCoord[j].pulse = "left";
            pulseEntities.push(entitiesAtCoord[j]);
        }
    }
    for (var i = player.x + 1; i < GRID_X; i++) {
        var entitiesAtCoord = findEntitiesAtCoord(i, player.y);
        new Effect(i, player.y, BEAM, "beam", 200);
        for (var j = 0; j < entitiesAtCoord.length; j++) {
            entitiesAtCoord[j].pulse = "right";
            pulseEntities.push(entitiesAtCoord[j]);
        }
    }
    for (var i = 0; i < player.y; i++) {
        var entitiesAtCoord = findEntitiesAtCoord(player.x, i);
        new Effect(player.x, i, BEAM_VERT, "beam", 200);
        for (var j = 0; j < entitiesAtCoord.length; j++) {
            entitiesAtCoord[j].pulse = "up";
            pulseEntities.push(entitiesAtCoord[j]);
        }
    }
    for (var i = player.y + 1; i < GRID_Y; i++) {
        var entitiesAtCoord = findEntitiesAtCoord(player.x, i);
        new Effect(player.x, i, BEAM_VERT, "beam", 200);
        for (var j = 0; j < entitiesAtCoord.length; j++) {
            entitiesAtCoord[j].pulse = "down";
            pulseEntities.push(entitiesAtCoord[j]);
        }
    }

    pulseEntities = pulseEntities.filter(function(entity){
        // return (entity.type === PULL_BLOCK || entity.type === PUSH_BLOCK);
        return (entity.inTypeArray(REACTS_TO_PULSE));
    })

    pulseEntities.sort(function (a, b) {
        if (a.type === PULL_BLOCK) {
            if (b.type === PULL_BLOCK) {
                return 0;
            } else {
                return -1;
            }
        } else {
            if (b.type === PULL_BLOCK) {
                return 1;
            } else {
                return 0;
            }
        }
    })

    for (var i = 0; i < pulseEntities.length; i++) {
        pulseEntities[i].moveDur = PULSE_MOVE_DUR;
    }

    beamSound.play();
}

function pulseStep (recursing) {
    if (!recursing) {
        for (var i = 0; i < pulseEntities.length; i++) {
            pulseEntities[i].pulseMoved = false;
        }
    }

    var successfulMoves = 0;
    for (var i = 0; i < pulseEntities.length; i++) {
        if (!pulseEntities[i].pulseMoved) {
            var xDiff = 0;
            var yDiff = 0;
            if (pulseEntities[i].type === PULL_BLOCK) {
                switch (pulseEntities[i].pulse) {
                    case "left":
                        xDiff = 1;
                        break;
                    case "right":
                        xDiff = -1;
                        break;
                    case "up":
                        yDiff = 1;
                        break;
                    case "down":
                        yDiff = -1;
                        break;
                                              }
            }
            if (pulseEntities[i].type === PUSH_BLOCK) {
                switch (pulseEntities[i].pulse) {
                    case "left":
                        xDiff = -1;
                        break;
                    case "right":
                        xDiff = 1;
                        break;
                    case "up":
                        yDiff = -1;
                        break;
                    case "down":
                        yDiff = 1;
                        break;
                                              }
            }
            if (pulseEntities[i].move(xDiff, yDiff)) {
                successfulMoves += 1;
                pulseEntities[i].pulseMoved = true;
            }
        }
    }

    if (successfulMoves > 0) {
        pulseStep(true);
    } else {
        if (!recursing) {
            pulseEnd();
        }
    }
}

function pulseEnd () {
    pulseState = false;
    for (var i = 0; i < pulseEntities.length; i++) {
        pulseEntities[i].moveDur = STANDARD_MOVE_DUR;
        tileArray[pulseEntities[i].x][pulseEntities[i].y].update();
    }
}

var transitionType = "fade";
function transition (out) {
    var xStart = -PX_SIZE * GRID_X;
    var yStart = -PX_SIZE * GRID_Y;
    var xEnd = PX_SIZE * GRID_X;
    var yEnd = PX_SIZE * GRID_Y;
    var alphaStart = 1;
    var alphaEnd = 1;

    if (transitionType === "up") {
        if (out) {
            yStart = 0;
            yEnd = -PX_SIZE * GRID_Y;
        } else {
            yStart = PX_SIZE * GRID_Y;
            yEnd = 0;
        }
        xStart = 0;
        xEnd = 0;
    }
    if (transitionType === "down") {
        if (out) {
            yStart = 0;
            yEnd = PX_SIZE * GRID_Y;
        } else {
            yStart = -PX_SIZE * GRID_Y;
            yEnd = 0;
        }
        xStart = 0;
        xEnd = 0;
    }
    if (transitionType === "left") {
        if (out) {
            xStart = 0;
            xEnd = -PX_SIZE * GRID_X;
        } else {
            xStart = PX_SIZE * GRID_X;
            xEnd = 0;
        }
        yStart = 0;
        yEnd = 0;
    }
    if (transitionType === "right") {
        if (out) {
            xStart = 0;
            xEnd = PX_SIZE * GRID_X;
        } else {
            xStart = -PX_SIZE * GRID_X;
            xEnd = 0;
        }
        yStart = 0;
        yEnd = 0;
    }
    if (transitionType === "fade") {
        if (out) {
            alphaStart = 1;
            alphaEnd = 0;
        } else {
            alphaStart = 0;
            alphaEnd = 1;
        }
        xStart = 0;
        xEnd = 0;
        yStart = 0;
        yEnd = 0;
    }

    transitionSprite.x = xStart;
    transitionSprite.y = yStart;
    transitionSprite.alpha = alphaStart;
    var transitionTween = game.add.tween(transitionSprite).to({x: xEnd, y: yEnd, alpha: alphaEnd}, 250);
    transitionTween.start();
}

function unloadLevel () {
    for (var i = 0; i < entityList.length; i++) {
        entityList[i].markedForDeletion = true;
    }
    for (var i = 0; i < effectList.length; i++) {
        effectList[i].markedForDeletion = true;
    }
    levelLoaded = false;
}

function loadLevel (levelIndex) {
    if (curLevelIndex !== undefined) {
        levelLoaded = false;
        transition();
        setTimeout(function(){
            unloadLevel();
            setTimeout(function(){
                loadLevelActual(levelIndex);
                transition(true);
            }, 50);
        }, 250);
    } else {
        loadLevelActual(levelIndex);
    }
    // Reset main text
    var mainText = document.getElementById("MainText")
    mainText.innerText = " ";
    NPCSpoken = false;
}

var curLevelIndex;
function loadLevelActual (levelIndex) {
    curLevelIndex = levelIndex;
    var levelArray = levels[levelIndex];
    var entitiesToAdd = [];
    for (var i = 0; i < levelArray.length; i++) {
        for (var j = 0; j < levelArray[i].length; j++) {
            var newType;
            var newChannel = undefined;
            switch (levelArray[i][j]) {
                default:
                case ".":
                    newType = undefined;
                    break;
                case "W":
                    newType = WALL;
                    break;
                case "H":
                    newType = HOLE;
                    break;
                case "b":
                    newType = STONE_BLOCK;
                    break;
                case "n":
                    newType = PUSH_BLOCK;
                    break;
                case "s":
                    newType = PULL_BLOCK;
                    break;
                case "X":
                    newType = DOOR;
                    newChannel = 0;
                    break;
                case "Y":
                    newType = DOOR;
                    newChannel = 1;
                    break;
                case "Z":
                    newType = DOOR;
                    newChannel = 2;
                    break;
                case "x":
                    newType = SWITCH;
                    newChannel = 0;
                    break;
                case "y":
                    newType = SWITCH;
                    newChannel = 1;
                    break;
                case "z":
                    newType = SWITCH;
                    newChannel = 2;
                    break;
                case "Q":
                    newType = NPC;
                    break;
            }

            if (newType !== undefined) {
                entitiesToAdd.push({x: j, y: i, type: newType, channel: newChannel});
            }
        }
    }

    entitiesToAdd.push({x: playerStartX, y: playerStartY, type: TYPE_PLAYER, channel: undefined});

    entitiesToAdd.sort(function(a, b) {
        return a.type - b.type;
    });

    for (var i = 0; i < entitiesToAdd.length; i++) {
        if (entitiesToAdd[i].type === TYPE_PLAYER) {
            player = new Entity(entitiesToAdd[i].x, entitiesToAdd[i].y, entitiesToAdd[i].type);
        } else if (entitiesToAdd[i].channel !== undefined) {
            new Entity(entitiesToAdd[i].x, entitiesToAdd[i].y, entitiesToAdd[i].type, {channel: entitiesToAdd[i].channel});
        } else {
            new Entity(entitiesToAdd[i].x, entitiesToAdd[i].y, entitiesToAdd[i].type);
        }
    }

    for (var i = 0; i < entityList.length; i++) {
        if (entityList[i].type === HOLE) {
            var checkY = entityList[i].y - 1;
            if (checkY >= 0 && tileArray[entityList[i].x][checkY].hasEntityInTypeArray([HOLE])) {
                entityList[i].makeOpenHole();
            }
        } else if (entityList[i].type === WALL) {
            var checkY = entityList[i].y + 1;
            if (checkY < GRID_Y && tileArray[entityList[i].x][checkY].hasEntityInTypeArray([WALL])) {
                entityList[i].makeFullWall();
            }
        }
    }

    numCharges = levelInfo[levelIndex].charges;
    player.updateChargeSprite();

    levelLoaded = true;
}

function onGamePause () {
    // p1GainNode.disconnect(audioCtx.destination);
}

function onGameResume () {
    // p1GainNode.connect(audioCtx.destination);
}

function reset () {
    // unloadLevel();
    transitionType = "fade";
    loadLevel(curLevelIndex);
    pulseState = false;
    // setTimeout(function(){
    // }, 50);
}