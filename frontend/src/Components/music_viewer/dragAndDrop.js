let allowDrop = e => {
  e.preventDefault();
};
let drop = (e, elem) => {
  e.preventDefault();
  let data = e.dataTransfer.getData("text");
  let toAppend = document.getElementById(data);
  if (toAppend !== e.target) e.target.appendChild(toAppend);
  e.dataTransfer.clearData();
};

export { allowDrop, drop };
