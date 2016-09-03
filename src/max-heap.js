const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
        this.parentNodes = [];
	}

	push(data, priority) {
        var newNode = new Node(data,priority);
		this.insertNode(newNode);
        this.shiftNodeUp(newNode);
	}

	pop() {
		if (this.root != null) {
            var detached = this.detachRoot();
            this.restoreRootFromLastInsertedNode(detached);
            this.shiftNodeDown(this.root);
            return detached.data;
        }
	}

	detachRoot() {
		var detachRoot = this.root;
        this.root = null;
        var i;
        for (i = 0; this.parentNodes[i+1] != undefined; ++i) {
            if (this.parentNodes[i] == detachRoot) {
                for (;this.parentNodes[i+1] != undefined; ++i) 
                    this.parentNodes[i] = this.parentNodes[i+1];
                //this.parentNodes[i] = undefined;
                this.parentNodes.pop();
            }
        }
        return detachRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
        if(this.parentNodes.length == 0) return;
        
        var lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
        this.parentNodes.pop();
        if (detached.left)
            lastInsertedNode.appendChild(detached.left);
        if (detached.right)
            lastInsertedNode.appendChild(detached.right);
        
        if (detached.right == null) 
            this.parentNodes[0] = lastInsertedNode;
        else
            if (detached.right == lastInsertedNode) {
                this.parentNodes[1] = this.parentNodes[0];
                this.parentNodes[0] = lastInsertedNode;
            }
        if (lastInsertedNode.parent != null)
            lastInsertedNode.remove();
        this.root = lastInsertedNode;
	}

	size() {
        return this.nodesCount(this.root);
	}
    
    nodesCount(root) {
        if(root == null) return 0;
        if(root.left == null)
            return 1;
        else {
            if (root.right == null)
                return this.nodesCount(root.left) + 1;
            else 
                return (this.nodesCount(root.left) + this.nodesCount(root.right) + 1);
        }
    }
    
	isEmpty() {
		return this.root == null;
	}

	clear() {
		this.root = null;
        this.parentNodes = [];
	}

	insertNode(node) {
        if(this.root == null) {
            this.root = node;
            this.parentNodes[0] = node;
        } else { 
            if (this.parentNodes[0].left == null){
                this.parentNodes[0].appendChild(node);
                this.parentNodes[this.parentNodes.length] = node;
            } else {
                this.parentNodes[0].appendChild(node);
                var i;
                for (i = 0; this.parentNodes[i+1] != undefined; ++i)
                    this.parentNodes[i] = this.parentNodes[i+1];
                this.parentNodes[i] = node;
            }
                            
        }
        
	}

	shiftNodeUp(node) {
        if (node.parent != null) {
            if (node.parent.priority < node.priority) {
                var parentPosition;
                var nodePosition;
                var i;
                for (i = 0; i < this.parentNodes.length; ++i) {
                    if (this.parentNodes[i] == node.parent)
                        parentPosition = i;
                    else 
                        if (this.parentNodes[i] == node) {
                            nodePosition = i;
                            break;
                        }
                }
                if (nodePosition != undefined) {
                    this.parentNodes[nodePosition] = node.parent;
                    if (parentPosition != undefined)
                        this.parentNodes[parentPosition] = node;
                }
                node.swapWithParent();
                this.shiftNodeUp(node);                
                if (node.parent == null)
                    this.root = node;
            } else return;
        } else return;
	}

	shiftNodeDown(node) {
        if (node == null) return;
        if (node.left == null)
            return;
        var bigChild;
        if (node.left.priority > node.priority)
            bigChild = node.left;
        if (node.right != null) {
            if (node.right.priority > node.left.priority)
                bigChild = node.right;
        }
        if (bigChild == undefined) return;
        var bigChildPosition;
        var nodePosition;
        var i;
        for (i = 0; i < this.parentNodes.length; ++i) {
            if (this.parentNodes[i] == node)
                nodePosition = i;
            else 
                if (this.parentNodes[i] == bigChild) {
                    bigChildPosition = i;
                    break;
                }
        }
        if (bigChildPosition != undefined) {
            this.parentNodes[bigChildPosition] = node;
            if (nodePosition != undefined)
                this.parentNodes[nodePosition] = bigChild;
        }
        bigChild.swapWithParent();
        this.shiftNodeDown(node);                
        if (bigChild.parent == null)
            this.root = bigChild;        
    }
}

module.exports = MaxHeap;
