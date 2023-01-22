const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

canvas.width = 64 * 16
canvas.height = 64 * 9

let parsedCollisions
let collisionBlocks
let background
let doors

const player = new Player({
    imageSrc: '../assets/img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: '../assets/img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: '../assets/img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: '../assets/img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: '../assets/img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: '../assets/img/king/enterDoor.png',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if (!levels[level]) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0,
                        })
                    }
                })
            }
        }
    }
})

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: '../assets/img/backgroundLevel1.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270,
                    },
                    imageSrc: '../assets/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: '../assets/img/backgroundLevel2.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336,
                    },
                    imageSrc: '../assets/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 230

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: '../assets/img/backgroundLevel3.png'
            })

            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 335,
                    },
                    imageSrc: '../assets/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
}

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const overlay = {
    opacity: 0
}

function animate() {
    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()

    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw()
    // })

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()

    ctx.save()
    ctx.globalAlpha = overlay.opacity
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
}

levels[level].init()
animate()

