controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 4 4 2 2 2 2 2 2 4 . . 
        . . . . 4 2 1 1 1 1 1 1 1 2 2 2 
        . . . . 4 2 1 1 1 1 1 1 1 2 2 2 
        . . . . . 4 4 2 2 2 2 2 2 4 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
})
info.onLifeZero(function () {
    blockSettings.writeNumber("Highest score", info.highScore())
    textSprite = textsprite.create(blockSettings.readString("Highest score"))
    game.over(false)
})
sprites.onCreated(SpriteKind.Projectile, function (sprite) {
    sprite.ay = 0
    sprite.x = spaceplane.x
    sprite.y = spaceplane.y
    sprite.vx = 200
    sprite.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    Pending_points += 10
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let bogey: Sprite = null
let Pending_points = 0
let textSprite: TextSprite = null
let projectile: Sprite = null
let spaceplane: Sprite = null
let Score_till_next_life = 250
spaceplane = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ....4...................
    ....444.................
    .....444.bbbbbbbb.......
    ......444ffffffffbbb....
    .....4444bbfbbfbb2222...
    ...444.44ffffffffbbb....
    ......44.bbbbbbbb.......
    .....44...f....f........
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
spaceplane.setStayInScreen(true)
info.setLife(3)
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        spaceplane.vx += -20
    }
    if (controller.right.isPressed()) {
        spaceplane.vx += 20
    }
    if (controller.up.isPressed()) {
        spaceplane.vy += -20
    }
    if (controller.down.isPressed()) {
        spaceplane.vy += 20
    }
    spaceplane.vx = spaceplane.vx * 0.9
    spaceplane.vy = spaceplane.vy * 0.9
})
game.onUpdateInterval(360, function () {
    bogey = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 2 . . . 
        . . . . 1 1 9 9 2 2 2 2 2 . . . 
        . . . . 9 9 9 9 2 2 2 2 2 . . . 
        . . . . 2 2 2 2 2 2 2 2 2 . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . 2 . . . 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.setPosition(160, randint(5, 115))
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function () {
    pause(50)
    if (Pending_points > 0) {
        Pending_points += -1
        info.changeScoreBy(1)
    }
})
forever(function () {
    if (info.score() > Score_till_next_life) {
        info.changeLifeBy(1)
        Score_till_next_life += 250
    }
})
forever(function () {
    if (controller.B.isPressed()) {
        projectile = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 1 1 1 1 1 1 . . . 
            . . . . . . 1 1 1 1 1 1 1 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
    }
})
