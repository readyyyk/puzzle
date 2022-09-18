
//import { cvs, ctx, bgImg, walls } from "./variables.js"
//let { cvs, ctx, bgImg, walls } = require("./variables.js")


let main = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    
    ctx.globalAlpha = 0.3
    ctx.drawImage(bgImg, 0, 0, cvs.width, cvs.height)
    ctx.globalAlpha = 1.0

    for(let el of walls){
        ctx.beginPath()
        ctx.rect(el.position.x-el.borderSize/2, el.position.y-el.borderSize/2, el.size.x+el.borderSize, el.size.y+el.borderSize)
        ctx.fillStyle = el.color
        ctx.fill()

        ctx.globalAlpha = Number(el.opacity)
        ctx.drawImage(el.img, el.drawFrom.x, el.drawFrom.y, el.partSize, el.partSize, el.position.x, el.position.y, el.size.x, el.size.y)
        ctx.globalAlpha = 1.0

        ctx.closePath()
    }
}

setInterval(main, 10)