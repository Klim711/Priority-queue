class Node {
	constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
	}

	appendChild(node) {
        if (this.left == null) {
            this.left = node;
            node.parent = this;
        }
        else {
            if (this.right == null) {
                this.right = node;
                node.child = this;
            }
        }
        
	}

	removeChild(node) {
        if (this.left == node) {
            this.left = null;
            node.parent = null;
        }
        else {
            if (this.right == node) {
                this.right = null;
                node.parent = null;
            }
            else this.throw();
        }
	}

	remove() {
        if (this.parent != null) {
            removeChild(this.left);
            removeChild(this.right);
        }
	}

	swapWithParent() {
		if (this.parent != null) {
            var leftChild = this.left;
            var rightChild = this.right;
            this.removeChild(leftChild);
            this.removeChild(rightChild);
            var parentChild;
            if (this.parent.left != this) 
                parentChild = this.parent.left;
            else 
                parentChild = this.parent.right;
            this.parent.removeChild(parentChild);
            this.appendChild(parentChild);
            var parentOfParent = this.parent.parent;
            var parent = this.parent;
            parent.removeChild(this);
            parent.appendChild(leftChild);
            parent.appendChild(rightChild);
            parentOfParent.removeChild(parent);
            parentOfParent.appendChild(this);
            this.appendChild(parent);
        }
	}
}

module.exports = Node;
