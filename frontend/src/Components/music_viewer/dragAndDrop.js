let allowDrop = e => {
  e.preventDefault();
};
let drop = (e, elem) => {
  e.preventDefault();
  let data = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(data));
  // if (this.props.expectedAnswer === data) {
  //   console.log("Sending Data!!");
  //   this.props.dispatch({
  //     type: "add-answer",
  //     expectedAnswer: this.state.expectedAnswer,
  //     barNumber: this.state.barNumber,
  //     position: this.state.position
  //   });
  // }
  e.dataTransfer.clearData();
};

let drag = e => {
  e.dataTransfer.setData("text/plain", e.target.id);
};

export { allowDrop, drop, drag };
