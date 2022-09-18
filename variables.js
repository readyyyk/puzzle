
//import Wall from "./pazzlePiece.js"
//Wall = require("./pazzlePiece.js")

class Wall {
    constructor(props) {
        this.position = {
            x: props.posX * box,
            y: props.posY * box
        }
        this.reqPosition = {
            x: props.dx * box * 3,
            y: props.dy * box * 3
        }
        this.borderSize = 4
        this.dynamic = true
        this.opacity = 1
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


const cvs = document.querySelector("#cvs"),
        ctx = cvs.getContext("2d"),
        box = 32

let walls = [],
    kx=4,
    ky=4,
    bgImg = new Image()
bgImg.src="sky.jpg"
//bgImg.src="pudge.jpeg"

//creating walls array
for(let i=0;i<kx;i++){
    for(let j=0;j<ky;j++){
        let tempProps = {
            posX:Math.floor(Math.random()*kx*3),
            posY:Math.floor(Math.random()*ky*3),
            szX: 3,
            szY: 3,
            dx:i,
            dy:j,
            img: bgImg.src,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        }
        walls.push(new Wall(tempProps))
    }
}

