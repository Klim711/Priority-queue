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
            /*this.removeChild(this.left);
            this.removeChild(this.right);*/
            this.parent.removeChild(this);
        }
	}

	swapWithParent() {
		if (this.parent == null) return;
            /*var parentOfParent = this.parent.parent;
            var parent = this.parent;
            this.parent.parent = this;
            this.parent = parentOfParent;
            
            if (this.parent.left.data == this.data && 
               this.parent.left.priority == this.priority) {
                this.parent.left.parent = this;
            }
            else 
                this.parent.right.parent = this;*/
            
            /*var parentOfParent = this.parent.parent;
            var parent = this.parent;*/
            
            
            
            if (this.parent.left.data == this.data && 
               this.parent.left.priority == this.priority) {
                this.parent.left = this.left;
                this.left.parent = this.parent;
                this.left = this.parent.right;
                this.parent.right.parent = this;
                this.parent.right = this.right;
                this.right.parent = this.parent;
            }
            else {
                this.parent.right = this.right;
                this.right.parent = this.parent;
                this.right = this.parent.left;
                this.parent.left.parent = this;
                this.parent.left = this.left;
                this.left.parent = this.parent;
            } 
            
            if (this.parent.parent.left.data == this.parent.data && this.parent.parent.left.priority == this.parent.priority)
                this.parent.parent.left = this;
            else 
                this.parent.parent.right = this;
            var parentOfParent = this.parent.parent;
            this.parent.parent = this;
            this.parent = parentOfParent;
            
        
        
	}
}

module.exports = Node;
