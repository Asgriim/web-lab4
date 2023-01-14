export function Point(x, y, r, hit, time, scriptTime){
    this.x = x
    this.y = y
    this.r = r;
    this.hit = hit
    this.time = time
    this.scriptTime = scriptTime
}
export function clearCanvas(context2d, width, height){
    context2d.clearRect(-width / 2,-height / 2,width,height)
}

export function drawCanvas(context2d, width, height){
    context2d.beginPath()
    context2d.fillStyle = "#ffffff"
    context2d.fillRect(-width / 2,-height / 2,width,height)
    context2d.closePath()
}

export function drawFigures(r, context2d, offset){
    context2d.beginPath()
    context2d.moveTo(0,0)

    context2d.fillStyle = "#3399ff"
    context2d.strokeStyle = "transparent"
    context2d.lineWidth = 1;
    //draw rect on right
    context2d.fillRect(0,0,offset * r, -offset * r)
    //draw triangle
    context2d.moveTo(offset * r/2,0)
    context2d.lineTo(0,offset * r)
    context2d.lineTo(0,0)
    context2d.fill()
    //draw arc
    context2d.moveTo(0,0)
    context2d.arc(0,0,(r / 2) * offset,Math.PI,Math.PI * (3/2),false)
    context2d.stroke()
    context2d.fill()
    context2d.closePath()
}

export function drawAxes(context2d, width,height, offset){
    // let context = canvas.getContext("2d")
    // context2d.beginPath()
    context2d.beginPath()
    context2d.moveTo(0,0)

    // console.log("offset " + offset)
    const lineLen = 2
    context2d.strokeStyle = "#000000"
    context2d.lineWidth = 2;
    context2d.moveTo(-width / 2,0)
    context2d.lineTo(width,0)
    context2d.stroke()
    let start = -width / 2 + 10
    for (let i = 0 ; i < (width - 10); i += offset){
        context2d.moveTo(start + i, lineLen)
        context2d.lineTo(start  + i, -lineLen)
        context2d.stroke()
    }
    context2d.moveTo(0,height / 2)
    context2d.lineTo(0, -height / 2)
    context2d.stroke()
    start = -height / 2 + 10
    for (let i = 0 ; i < (height - 10); i += offset){
        context2d.moveTo(lineLen,start + i)
        context2d.lineTo(-lineLen, start + i)
        context2d.stroke()
    }
    context2d.closePath()
}

export function drawText(r, context2d, offset) {
    context2d.beginPath()
    context2d.scale(1,-1);
    context2d.moveTo(0,0)
    context2d.font = "bold 20px serif"
    context2d.fillStyle = "#000000"
    context2d.fillText("R",r * offset - 10,20,40)
    context2d.fillText("R",-r * offset -3,20,40)
    context2d.fillText("R",10,r * offset - 10,40)
    context2d.fillText("R",10,-r * offset + 5,40)
    context2d.closePath()
    context2d.scale(1,-1);
}

export function drawPoint(point, color, r, offset, context2d){
    let prevR = point.r
    let x = ((point.x / prevR)* r) * offset
    let y = ((point.y / prevR)* r) * offset
    context2d.beginPath()
    context2d.moveTo(0,0)
    context2d.fillStyle = color
    context2d.arc(x,y,4,0,Math.PI * 2)
    context2d.fill()
    context2d.closePath()
}

export function drawPoints(chosenRadius, points,pointColorPrev, pointColorHit, pointColorMiss, offset,context2d){
    // console.log(points)
    points.forEach((item,i, points) => {
        if (chosenRadius !== item.r){
            drawPoint(item,pointColorPrev,chosenRadius,offset,context2d)
        }
        else {
            if (item.hit){
                drawPoint(item,pointColorHit,chosenRadius,offset,context2d)
            }
            else {
                drawPoint(item,pointColorMiss,chosenRadius,offset,context2d)
            }
        }
    })
}

export function redrawAll(context2d, width,height, offset,r, points,pointColorPrev, pointColorHit, pointColorMiss){
    clearCanvas(context2d,width,height)
    drawCanvas(context2d,width,height)
    drawFigures(r,context2d,offset)
    drawText(r,context2d,offset)
    drawAxes(context2d, width,height, offset)
    drawPoints(r, points,pointColorPrev, pointColorHit, pointColorMiss,offset,context2d)
}