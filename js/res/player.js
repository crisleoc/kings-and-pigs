const player = new Player({
    imageSrc: './assets/img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: './assets/img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: './assets/img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './assets/img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './assets/img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './assets/img/king/enterDoor.png',
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