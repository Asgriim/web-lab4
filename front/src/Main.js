import React, {useState} from 'react';
import * as canvasUtil from "./util/canvas"
import shotAPI from "./api/shot";
import validation from "./util/validation";
import ReactPaginate from "react-paginate";
import {Navigate} from "react-router-dom";
let pageNum = 0
class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            p:2,
            ev:0
        }
        this.handlePagClick = this.handlePagClick.bind(this)
    }
    canvasContext
    offset
    canvasWidth
    canvasHeight
    chosenR = 4
    points = []
    pointColorPrev ="#2d2b2b"
    pointColorHit = "#0af80a"
    pointColorMiss = "#fc0202"
    componentDidMount() {
        let logeed = localStorage.getItem("signIn") === "true";
        if (!logeed){
            return
            // return <Navigate to={"/"} replace={true}/>
        }
        this.chosenR = 4
        console.log(this.chosenR)
        this.canvasWidth = document.getElementById("canvas").width;
        this.canvasHeight = document.getElementById("canvas").height
        this.offset =(this.canvasWidth - 20) / 10
        this.canvasContext = this.getCanvasContext();
        this.canvasContext.translate(this.canvasWidth / 2, this.canvasHeight / 2)
        this.canvasContext.scale(1,-1)
        // let po = new canvasUtil.Point(1,1,4,true,"time",1100)
        // this.points.push(po)
        this.redrawCanvas()
        // document.getElementById("canvas").addEventListener("click",this.canvasClickHandler)
        document.getElementById("canvas").onclick = ev => this.canvasClickHandler(ev)
        document.getElementById("rSelect").onchange = () => this.setChosenR()
        document.getElementById("yField").onchange = () => this.yFieldChangeHandler()
        document.getElementById("shotButton").onclick = () => this.shotClickHandler()
        this.reqAllPoints()
        // document.getElementById("mainTable").innerHTML = this.getReactPaginator()
        console.log(this.points)

        // this.pages = Number.parseInt(this.points.length / 10) + 1
        // canvasUtil.redrawAll(this.canvasContext,this.canvasWidth,this.canvasHeight,this.offset,this.chosenR,this.points,this.pointColorPrev,this.pointColorHit,this.pointColorMiss)
    }


    reqAllPoints(){
        shotAPI.getEntries(localStorage.getItem("userToken")).then(response => {
            // console.log(response.data.reverse())
            const arr = response.data

            this.setState({p:Math.ceil(arr.length/10)})
            for(let i = 0; i < arr.length;i++){
                this.savePointFromJson(arr[i])
            }
            this.redrawCanvas()
            this.drawTableFromSlice(this.points.slice(0,10))
        })
    }


    createRow(point){
        return" <tr> <td>" + point.x +"</td>" +
            " <td>"+ point.y +"</td> " +
            "<td>"+ point.r +"</td>" +
            " <td>"+ point.hit +"</td>" +
            " <td>"+ point.time.replace("T"," ") +"</td>" +
            "</tr>"
    }

    drawTableFromSlice(slice){
        const tb = document.getElementById("table")
        tb.innerHTML = "";
        console.log(slice)
        for (let i = 0;i<slice.length ;i++){
            tb.innerHTML += this.createRow(slice[i])
        }
    }

    handlePagClick(event){
        this.setState({ev:event.selected})

        const selected = event.selected
        console.log("sel "  + selected)
        pageNum = selected
        let slice = this.points.slice(selected * 10,selected * 10 + 10)
        this.drawTableFromSlice(slice)
        console.log("чекаем стейт")
        console.error("selecterd " + this.state.ev)
        this.redrawCanvas()

    }


    shotClickHandler(){
        this.sendShot(document.getElementById("xSelect").value,document.getElementById("yField").value,this.chosenR)
    }

    yFieldChangeHandler(){
        const y = document.getElementById("yField").value
        const res = validation.validateY(y)
        const btn = document.getElementById("shotButton")
        if (res){
            btn.disabled = false
        }
        else {
            btn.disabled = true
            document.getElementById("errText").innerText = "Invalid Y"
        }
    }

    canvasClickHandler(event){
        let offLeft = document.getElementById("canvas").offsetLeft
        let offTop = document.getElementById("canvas").offsetTop
        let x = event.pageX - offLeft -  this.canvasWidth / 2
        let y = - (event.pageY - offTop - this.canvasHeight / 2)
        x /= this.offset
        y /= this.offset
        this.sendShot(x.toFixed(3),y.toFixed(3),this.chosenR)
            // console.log(document.getElementById("canvas").pageX)
        // console.log(this.points)
    }

    sendShot(x,y,r){

        shotAPI.sendShot(x,y,r,localStorage.getItem("userToken")).then(response => {
            if (response.status === 200){
                // console.log(response.data)
                this.savePointFromJson(response.data)

                this.drawTableFromSlice(this.points.slice(pageNum*10, 10+pageNum*10))
                this.redrawCanvas()
            }
            else {
                console.log("ploho")
            }
        })
    }

    redrawCanvas(){
        let start
        let end

        if (pageNum == 0){
            start = 0
            end = 10
        }
        else {
            start = pageNum * 10
            end = start + 10
        }
        console.log("start " + start)
        console.log("end" + end)
        console.log("slice fron redraw")
        console.log(this.points.slice(start,end))
        canvasUtil.redrawAll(this.canvasContext,this.canvasWidth,this.canvasHeight,this.offset,Number.parseInt(this.chosenR),this.points.slice(start,end),this.pointColorPrev,this.pointColorHit,this.pointColorMiss)
    }

    savePointFromJson(JSON){
        this.setState({p:Math.ceil(this.points.length / 10)})
        let p = this.points.reverse()
        p.push(new canvasUtil.Point(JSON.x, JSON.y,JSON.r,JSON.result,JSON.time))
        this.points = p.reverse()

    }

    savePoint(point){
        this.points.push(point)
    }

    getCanvasContext(){
        return document.getElementById("canvas").getContext("2d");
    }

    setChosenR(){
        // console.log(this.chosenR)
        this.chosenR = document.getElementById("rSelect").value;
        this.redrawCanvas()
        // console.log(document.getElementById("rSelect").value)
    }


    render() {
        let logeed = localStorage.getItem("signIn") === "true";
        if (!logeed){
            return <Navigate to={"/"} replace={true}/>
        }
        return(
            <div className={"w-100 m-auto"}>
                <h3></h3>
                <div id={"canvasDiv"}>
                    <canvas width={400} height={400} id={"canvas"}/>
                </div>
                <div className={"container w-50 text-center"}>
                    <div className="row mx-5">
                        <div className="col">
                            <p>X</p>
                            <select id={"xSelect"}  className={"form-select-md text-center"}>
                                <option value={-4}>-4</option>
                                <option value={-3}>-3</option>
                                <option value={-2}>-2</option>
                                <option value={-1}>-1</option>
                                <option selected value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </div>
                        <div className="col">
                            <p>R</p>
                            <select id={"rSelect"} className={"form-select-md text-center"}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option selected value={4}>4</option>
                            </select>
                        </div>
                    </div>
                    {/*<p>R</p>*/}

                </div>

                <div className={"text-center container  m-auto"}>
                    <div className={"row-sm3 m-auto"}>
                        <input id={"yField"} className={"form-floating mt-5"} type={"text"} placeholder={"enter Y between -5 to 5"}/>
                        <p id={"errText"} className={"mt-3 err-label"}></p>
                    </div>
                    <div className={"row-sm4"}>
                        <button disabled={true} id={"shotButton"} className={"btn btn-primary "}>Shot</button>
                    </div>

                </div>
                <div id={"mainTable"} className={"container text-center"}>
                    <div  style={{color:'white'}}>
                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">X</th>
                                <th scope="col">Y</th>
                                <th scope="col">R</th>
                                <th scope="col">HIT</th>
                                <th scope="col">TIME</th>
                            </tr>
                            </thead>
                            <tbody id={"table"}>

                            </tbody>
                        </table>
                    </div>
                    <div className={"row-sm ml-4"}>
                        <ReactPaginate className={"pagination center-pag"}
                                       nextLabel="next >"
                                        onPageChange={ev => this.handlePagClick(ev)}
                                       pageRangeDisplayed={2}
                                       marginPagesDisplayed={1}
                                       pageCount={this.state.p}
                                       previousLabel="< previous"
                                       pageClassName="page-item"
                                       pageLinkClassName="page-link"
                                       previousClassName="page-item"
                                       previousLinkClassName="page-link"
                                       nextClassName="page-item"
                                       nextLinkClassName="page-link"
                            // breakLabel="..."
                                       breakClassName="page-item"
                                       breakLinkClassName="page-link"
                                       containerClassName="pagination"
                                       activeClassName="active"
                                       renderOnZeroPageCount={null}/></div>
                </div>

            </div>
        )
    }
}



export default Main