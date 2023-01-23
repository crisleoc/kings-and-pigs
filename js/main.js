const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const mapWidth = 64 * 16
const mapHeight = 64 * 9

if (window.innerWidth < mapWidth) {
    canvas.width = window.innerWidth
} else canvas.width = mapWidth
if (window.innerHeight < mapHeight) {
    canvas.height = window.innerHeight
} else canvas.height = mapHeight

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

