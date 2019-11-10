class Sortey {
	constructor(parent) {
    	this.parent = parent;
		this.children = parent.children;

		Array.from(this.children).map(sortableElement => listenOnElement(sortableElement));
	}

	changeParent(parent) {
		this.parent.innerHTML = this.parent.innerHTML;
        Array.from(this.children).map(sortableElement => sortableElement.removeAttribute("draggable"));

        this.parent = parent;
        this.children = parent.children;
        Array.from(this.children).map(sortableElement => listenOnElement(sortableElement));
    }

	delete() {
		this.parent.innerHTML = this.parent.innerHTML;
		Array.from(this.children).map(sortableElement => sortableElement.removeAttribute("draggable"));
    }
}
