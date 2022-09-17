
import { cvs, ctx, bgImg, walls } from "variables.js"


let main = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    
    ctx.globalAlpha = 0.3
    ctx.drawImage(bgImg, 0, 0, cvs.width, cvs.height)
    ctx.globalAlpha = 1.0

    for(let el of walls){
        ctx.beginPath()
        ctx.rect(el.position.x-2, el.position.y-2, el.size.x+4, el.size.y+4)
        ctx.fillStyle = el.color
        ctx.fill()
        ctx.drawImage(el.img, el.drawFrom.x, el.drawFrom.y, el.partSize, el.partSize, el.position.x, el.position.y, el.size.x, el.size.y)
        ctx.closePath()
    }
}

setInterval(main, 10)