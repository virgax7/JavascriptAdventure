const dropZones = document.getElementsByClassName("dropZoneCell");
for (let i = 0; i < dropZones.length; i++) {
    dropZones[i].addEventListener("drop", dragDrop);
    dropZones[i].addEventListener("dragover", function () {
        event.preventDefault(); // this will make sure that
        // the dropZone can be used to dropped into, even if the browser
        // disagrees that it should be a drop zone
    });
}

function dragDrop(event) {
    event.preventDefault();
    /*"In a web page, you should call the preventDefault() method of the event if you have accepted the drop
    so that the default browser handling does not handle the dropped data as well. For example,
    when a link is dragged to a web page, Firefox will open the link. By cancelling the event,
    this behavior will be prevented" cited from https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations*/
    if (!isValidDropZone(event.target)) {
        return;
    }
    let eventTarget = event.target;
    if (eventTarget.getAttribute("class") !== "dropZoneCell") {
        while ((eventTarget = eventTarget.parentElement) && eventTarget.getAttribute("class") !== "dropZoneCell") ;
    }
    eventTarget.appendChild(document.getElementById(event.dataTransfer.getData("id")));
}

function isValidDropZone(eventTarget) {
    if (eventTarget.getAttribute("class") === "dropZoneCell") {
        return true;
    }
    while ((eventTarget = eventTarget.parentElement) && eventTarget.getAttribute("class") !== "dropZoneCell") ;
    console.log(eventTarget);
    return eventTarget !== null;
}

const contents = document.getElementsByClassName("content");
for (let i = 0; i < contents.length; i++) {
    contents[i].addEventListener("mousedown", setDraggable);
    // setDraggableAlt
    //contents[i].addEventListener("mousedown",  function() { setDraggableAlt(this); });
}

//function setDraggableAlt(content) {
// content.setAttribute("draggable", true);
//}

function setDraggable(event) {
    const content = event.target; // event
    content.setAttribute("draggable", true);
    content.addEventListener("dragstart", dragStart);
}

function dragStart(event) {
    // dataTransfer has data that is being dragged
    event.dataTransfer.dropEffect = "move"; // upon drop, the node should be visibly re"move"d
    event.dataTransfer.setData("id", event.target.getAttribute("id")); // setting this elements id to the drag dataTransfer so
    // the drop handler(dragDrop) can identify which element to add upon drop
}
