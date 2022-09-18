
//import { cvs, ctx, box, walls } from "./variables.js"
//let { cvs, ctx, box, walls } = require("./variables.js")


let target,
    nel = 0

document.addEventListener("keydown", (e) => {
    e.preventDefault() 
    if(e.key >= 0 && e.key <= 9){
        nel = Number(e.key)
    if(walls[nel]){
        target = walls[nel]
        walls.splice(nel,1)
        walls.push(target)
        nel = walls.length-1
    } else
        target = null
}

let el = walls[nel]
if(e.key == 'ArrowUp'){
    el.position.y-=box;
} else if(e.key == 'ArrowDown'){
    el.position.y+=box
} else if(e.key == 'ArrowLeft'){
    el.position.x-=box
} else if(e.key == 'ArrowRight'){
    el.position.x+=box
}
})

function checkClick (e) {

    if(e.changedTouches){
        if(e.changedTouches.length > 1){
            alert("only 1 touch!!!")
        } else {
            e.offsetY = e.changedTouches[0].clientY - cvs.getBoundingClientRect().y
            e.offsetX = e.changedTouches[0].clientX - cvs.getBoundingClientRect().x
        }
    }

    for(let i=walls.length-1;i>=0;i--){
        let el = walls[i]
        if( e.offsetX >= el.position.x && e.offsetX <= el.position.x+el.size.x &&
            e.offsetY >= el.position.y && e.offsetY <= el.position.y+el.size.y){
                target = el
                if(!target.dynamic){
                    walls.splice(i,1)
                    walls.push(target)
                    target.opacity = 0.4
                } else {
                    target.ox = el.position.x - e.offsetX
                    target.oy = el.position.y - e.offsetY

                    walls.splice(i,1)
                    walls.push(target)

                    document.addEventListener("mousemove", mouseMoveListener)
                    document.addEventListener("touchmove", mouseMoveListener)
                    return
                }            
            }
    }
}

function mouseMoveListener (e) {
    if(target){
        if(e.changedTouches){
            e.offsetX = e.changedTouches[0].clientX - cvs.getBoundingClientRect().x
            e.offsetY = e.changedTouches[0].clientY - cvs.getBoundingClientRect().y
        }

        let mvX = target.position.x - e.offsetX - target.ox,
            mvY = target.position.y - e.offsetY - target.oy
        if(target.position.x - mvX + (mvX % 32) >= 0 && target.position.x - mvX + (mvX % 32) + target.size.x <= cvs.getBoundingClientRect().width)
            target.position.x -= mvX - (mvX % 32)
        if(target.position.y - mvY + (mvY % 32) >= 0 && target.position.y - mvY + (mvY % 32) + target.size.y <= cvs.getBoundingClientRect().height)
            target.position.y -= mvY - (mvY % 32)
    }
}

document.addEventListener("touchstart", checkClick)
document.addEventListener("mousedown", checkClick)

document.addEventListener("mouseup", () => { if(target) { if(target.position.x == target.reqPosition.x && target.position.y == target.reqPosition.y ){ target.borderSize = 0; target.dynamic = false; target.color = "#309414";} target.opacity = 1;  target = null; document.removeEventListener("mousemove", mouseMoveListener)}})
document.addEventListener("touchend", () => { if(target) { if(target.position.x == target.reqPosition.x && target.position.y == target.reqPosition.y ){ target.borderSize = 0; target.dynamic = false; target.color = "#309414"; } target.opacity = 1; target = null; document.removeEventListener("touchmove", mouseMoveListener)}})