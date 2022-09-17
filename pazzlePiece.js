
import {kx, ky, box} from "/variables.js"


export default class Wall {
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