class Scene_play extends Phaser.Scene {
    
    constructor() {
        super({key: "Scene_play"});
    }
    create() {
        var center_width = this.sys.game.config.width/2;
        var center_height = this.sys.game.config.height/2;

        // separator
        this.add.image(center_width, center_height, "separator");

        // left pallete
        this.left_p = this.physics.add.staticImage(30, center_height, "left_p");

        // right pallete
        this.right_p = this.physics.add.staticImage(this.sys.game.config.width-30, center_height, "right_p");

        // ball
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(center_width, center_height, "ball");
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocityX(-600);

        // physics

        this.physics.add.collider(this.ball, this.left_p, this.strikePallete, null, this);
        this.physics.add.collider(this.ball, this.right_p, this.strikePallete, null, this);

        // controls

        this.cursor = this.input.keyboard.createCursorKeys();

        // right pallete
        this.cursor_W = this.input.keyword.addKey(Phaser.Input.Keyboard,KeyCodes.W);
        this.cursor_S = this.input.keyword.addKey(Phaser.Input.Keyboard,KeyCodes.S);

    }
    update() {
        if(this.ball.x < 0 || this.sys.game.config.width) {
            this.ball.setPosition(320, 200);
        }
        // palletes controls
        // right pallete
        if (this.cursor.down.isDown) {
            this.right_p.body.setVelocityY(300);
        } else if(this.cursor.up.isUp); {
            this.right_p.body.setVelocityY(-300);
        } else {
            this.right_p.setVelocityY(0);
        }
    }

    strikePallete() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}