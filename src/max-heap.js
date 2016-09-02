const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
        this.parentNodes = [];
	}

	push(data, priority) {
		this.insertNode(new Node(data,priority));
        this.shiftNodeUp(new Node(data,priority));
	}

	pop() {
		if (this.root != null) {
            
        }
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return parentNodes.length;
	}

	isEmpty() {
		return this.root == null;
	}

	clear() {
		this.root = null;
        this.parentNodes = null;
	}

	insertNode(node) {
        if(this.root == null) {
            this.root = node;
            this.parentNodes[0] = node;
        } else { 
            if (this.parentNodes[0].left == null){
                this.parentNodes[0].left = node;
                this.parentNodes[this.parentNodes.length] = node;
            } else {
                this.parentNodes[0].right = node;
                var i;
                for (i = 0; this.parentNodes[i+1] != undefined; ++i)
                    this.parentNodes[i] = this.parentNodes[i+1];
                this.parentNodes[i] = node;
            }
                            
        }
        
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
