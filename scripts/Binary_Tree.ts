const BinarySearchTree = function () {
    this._root = null;
};

BinarySearchTree.prototype = {

    constructor: BinarySearchTree,

    add: function (value) {
        let newNode = {
            value: value,
            left: null,
            right: null
        };

        if (this._root === null) {
            this._root = newNode;
        } else {
            let current = this._root;

            while (true) {
                if (current.value > value) {
                    if (current.left === null) {
                        current.left = newNode;
                        break;
                    } else {
                        current = current.left;
                    }
                } else if (current.value < value) {
                    if (current.right === null) {
                        current.right = newNode;
                        break;
                    } else {
                        current = current.right;
                    }
                } else {
                    break;
                }
            }
        }
    },

    contains: function (value) {
        let found = false;
        let current = this._root;

        while (!found && current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        return found;
    },

    size: function () {
        let length = 0;
        this.traverse(function (node) {
            length++;
        });
        return length;
    },

    toString: function () {
        return this.toArray().toString();
    },

    toArray: function () {
        let result = [];
        this.traverse(function (node) {
            result.push(node.value);
        });
        return result;
    },

    remove: function (value) {

    },

    printElements: function () {
        this.traverse(function (node) {
            console.log(node.value);
        });
    },

    traverse: function (action) {
        function inOrderTraverse(node) {
            if (node) {
                if (node.left !== null) {
                    inOrderTraverse(node.left);
                }

                action.call(this, node);

                if (node.right !== null) {
                    inOrderTraverse(node.right);
                }

            }
        }
        inOrderTraverse(this._root);
    }

};

let tree = new BinarySearchTree();
let testArray = [3, 5, 1, 0, 2, 7, 6];

testArray.forEach(function (item) {
    tree.add(item);
});

console.log(tree.toString());
console.log(tree.size());
tree.printElements();