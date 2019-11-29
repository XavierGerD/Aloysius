let allowDrop = e => {
  e.preventDefault();
};
let drop = (e, elem) => {
  e.preventDefault();
  let data = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(data));
  e.dataTransfer.clearData();
};

let drag = e => {
  e.dataTransfer.setData("text/plain", e.target.id);
};

export { allowDrop, drop, drag };
