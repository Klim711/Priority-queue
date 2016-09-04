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
                node.parent = this;
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
            else throw new Error("Passed node is not a child of this node!");
        }
	}

	remove() {
        if (this.parent != null) {
            /*this.removeChild(this.left);
            this.removeChild(this.right);*/
            this.parent.removeChild(this);
        }
	}

	swapWithParent() {
		if (this.parent == null) return;
        
        if (this.parent.left.data == this.data && 
           this.parent.left.priority == this.priority) {
            
            this.parent.left = this.left;
            if (this.left != null)
                this.left.parent = this.parent;
            this.left = this.right;
            if (this.left != null)
                this.left.parent = this.parent;
            this.right = this.parent.right;
            /*if (this.parent.right != null)
                this.parent.right.parent = this;*/
            this.parent.right = this.left;
            this.left = this.parent;
            if (this.right != null)
                this.right.parent = this;
        }
        else {
            
            this.parent.right = this.right;
            if (this.right != null)
                this.right.parent = this.parent;
            this.right = this.left;
            if (this.right != null)
                this.right.parent = this.parent;
            this.left = this.parent.left;
            /*if (this.parent.left != null)
                this.parent.left.parent = this;*/
            this.parent.left = this.right;
            this.right = this.parent;
            if (this.left != null)
                this.left.parent = this;
        }

        if (this.parent.parent != null){
        if (this.parent.parent.left.data == this.parent.data && this.parent.parent.left.priority == this.parent.priority)
                this.parent.parent.left = this;
            else 
                this.parent.parent.right = this;
        }
        var parentOfParent = this.parent.parent;
        this.parent.parent = this;
        this.parent = parentOfParent;
            
        
        
	}
}

module.exports = Node;
