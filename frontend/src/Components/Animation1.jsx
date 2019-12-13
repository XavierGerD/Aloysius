import React, { Component } from "react";

let height = 250;
let width = 200;
let ballSize = 15;
let x = 100;
let y = 50;
let speed = 4;
let acceleration = 0.5;

class Animation1 extends Component {
  constructor() {
    super();
    this.state = {
      canvasRef: React.createRef(),
      canvas: undefined,
      ctx: undefined
    };
  }

  componentDidMount = () => {
    this.state.canvas = this.state.canvasRef.current;
    this.state.ctx = this.state.canvas.getContext("2d");
    this.state.x = this.state.canvas.width / 2;
    this.state.y = this.state.canvas.height - 30;
    this.bounce();
    this.moveBall();
  };

  componentWillUnmount = () => {
    console.log("unmounting");
    window.cancelAnimationFrame(this.bounce);
    window.cancelAnimationFrame(this.moveBall);
    x = 100;
    y = 50;
    speed = 4;
    console.log("speed after unmount", speed);
  };

  bounce = () => {
    this.state.ctx.clearRect(
      0,
      0,
      this.state.canvas.width,
      this.state.canvas.height
    );
    this.state.ctx.beginPath();
    this.state.ctx.arc(x, y, ballSize, 0, Math.PI * 2, true);
    this.state.ctx.fillStyle = "#32a852";
    this.state.ctx.fill();
    this.state.ctx.closePath();
    window.requestAnimationFrame(this.bounce);
  };

  moveBall = () => {
    y += speed;
    speed += acceleration;
    if (y >= height - ballSize) {
      speed = (speed - acceleration) * -1;
    }
    window.requestAnimationFrame(this.moveBall);
  };

  render = () => {
    console.log("speed", speed);
    return (
      <div
        style={{ display: "flex", width: "600px", justifyContent: "center" }}
      >
        <canvas
          width={width}
          height={height}
          id="canvas"
          ref={this.state.canvasRef}
        />
      </div>
    );
  };
}

export default Animation1;
