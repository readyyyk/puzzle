let cvs = document.querySelector("#cvs"),
        ctx = cvs.getContext("2d")

const box = 32
let walls = [],
    nel = 0,
    target,
    bgImg = new Image()
bgImg.src="sky.jpg"

let kx=prompt("kx"),
    ky=prompt("ky")

    class wall {
        constructor(props) {
            this.position = {
                x: props.posX * box,
                y: props.posY * box
            }
            this.size = {
                x: props.szX * box,
                y: props.szY * box
            }
            this.img = new Image()
            this.img.src = `${props.img}`
            this.img.onload = () => {
                this.partSize = this.img.width / kx
                this.drawFrom = {
                    x: props.dx * this.partSize,
                    y: props.dy * this.partSize
                }
            }
            
            this.color = props.color
        }
    }

    for(let i=0;i<kx;i++){
        for(let j=0;j<ky;j++){
            let tempProps = {
                posX:Math.floor(Math.random()*kx*3),
                posY:Math.floor(Math.random()*ky*3),
                szX: 3,
                szY: 3,
                dx:i,
                dy:j,
                img: "sky.jpg",
                color: `#${Math.floor(Math.random()*16777215).toString(16)}`
            }
            walls.push(new wall(tempProps))
        }
    }    


let main = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    
    ctx.globalAlpha = 0.3
    ctx.drawImage(bgImg, 0, 0, 384, 384)
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
            //console.log(e, el.position.x )    
            if( e.offsetX >= el.position.x && e.offsetX <= el.position.x+el.size.x &&
                e.offsetY >= el.position.y && e.offsetY <= el.position.y+el.size.y){
                    target = el
                    target.ox = el.position.x - e.offsetX
                    target.oy = el.position.y - e.offsetY

                    walls.splice(i,1)
                    walls.push(target)

                    document.addEventListener("mousemove", mouseMoveListener)
                    document.addEventListener("touchmove", mouseMoveListener)
                    //console.log(target)
                    return
                }
        }
    }

    function mouseMoveListener (e) {
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

    document.addEventListener("touchstart", checkClick)
    document.addEventListener("mousedown", checkClick)
    
    document.addEventListener("mouseup", () => { target = null; document.removeEventListener("mousemove", mouseMoveListener)})
    document.addEventListener("touchend", () => { target = null; document.removeEventListener("touchmove", mouseMoveListener)})