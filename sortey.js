function findSiblingsUnderElement(element, event) {
	const parent = element.parentElement;
	const top = event.pageY - parent.offsetTop;

	return Array.from(parent.children).filter(sibling =>
		sibling !== element
		&& top <= (sibling.offsetTop - parent.offsetTop) + sibling.clientHeight
	);
}

function listenOnElement(sortableElement) {
	sortableElement.draggable = "true";
	sortableElement.addEventListener("dragstart", () => {
		setTimeout(() => {
			sortableElement.style.visibility = "hidden";
		}, 10);
	});

	sortableElement.addEventListener("drag", event => {
		Array.from(sortableElement.parentElement.children).map(sibling => sibling.style.marginTop = "0px");

		const siblingUnderPosition = findSiblingsUnderElement(sortableElement, event)[0];

		if (siblingUnderPosition) siblingUnderPosition.style.marginTop = sortableElement.clientHeight + 25 + "px";
	});

	sortableElement.addEventListener("dragend", event => {
		const parent = sortableElement.parentElement;
		const copy = sortableElement.cloneNode(true);
		copy.style.visibility = "";

		Array.from(parent.children).map(sibling => sibling.style.marginTop = "0px");

		if (parent) parent.insertBefore(copy, findSiblingsUnderElement(sortableElement, event)[0]);

		sortableElement.remove();
		listenOnElement(copy);
	});
}

function Sortey(parent) {
	this._parent = parent;
	this._children = parent.children;
    
	this.changeParent = parent => {
		this._parent.innerHTML = this._parent.innerHTML;
        	Array.from(this._children).map(sortableElement => sortableElement.removeAttribute("draggable"));

        	this._parent = parent;
        	this._children = parent.children;
        	Array.from(this._children).map(sortableElement => listenOnElement(sortableElement));
    	}
    
	Array.from(this._children).map(sortableElement => listenOnElement(sortableElement));
}
