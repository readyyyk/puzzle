
import Wall from "pazzlePiece.js"


export const cvs = document.querySelector("#cvs"),
        ctx = cvs.getContext("2d"),
        box = 32

export let walls = [],
    kx=prompt("kx"),
    ky=prompt("ky"),
    bgImg = new Image()
bgImg.src="sky.jpg"

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
                img: "sky.jpg",
                color: `#${Math.floor(Math.random()*16777215).toString(16)}`
            }
            walls.push(new Wall(tempProps))
        }
    }