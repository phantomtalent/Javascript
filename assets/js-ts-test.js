// Add Element
function addElement() {

	var x = document.getElementById("element_div").childElementCount;

	var colDiv = document.createElement("li");
	colDiv.className = "drag-item";
	colDiv.innerHTML = "Element" + (x + 1);

	document.getElementById("element_div").appendChild(colDiv);

};

// Add attribute
$(".add-element").click(function () {
	$(".drag-item").attr("draggable", "true");
	$(".drag-item").attr("ondragend", "dragEnd()");
	$(".drag-item").attr("ondragover", "dragOver(event)");
	$(".drag-item").attr("ondragstart", "dragStart(event)");
	$(".drag-item").attr("contentEditable", "true");
})

// Show json format of element
function showGenerateJson() {
	var res = [];
	var items = document.getElementById("element_div").childNodes;
	console.log(items);

	for (var i = 0; i < items.length; i++) {
		res.push({
			"element_order": (i+1),
			"element_label": items[i].innerHTML
		})
	}
	// display pretty printed object in text area:
	document.getElementById('exampleTextarea').innerHTML = JSON.stringify(res, undefined, 4);
}

// Drag and drop element
let selected = null;

function dragOver(e) {
  if (isBefore(selected, e.target)) {
    e.target.parentNode.insertBefore(selected, e.target);
  } else {
    e.target.parentNode.insertBefore(selected, e.target.nextSibling);
  }
}

function dragEnd() {
  selected = null;
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null);
  selected = e.target;
}

function isBefore(el1, el2) {
  let cur;
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true;
    }
  }
  return false;
}
