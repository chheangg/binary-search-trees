class Node {
  constructor (data, left, right) {
    this.data = data,
    this.left = left,
    this.right = right;
  }
}

class Tree {
  constructor (array) {
    this.root = this.buildTree(this.sortArray(array));
  }

  sortArray(array) {
    return array
    .sort((a, b) => a - b)
    .reduce((prev, current) => {
      if (prev.length === 0) {
        prev.push(current);
        return prev;
      }
      if (current === prev[prev.length - 1])  {
        return prev;
      }
      prev.push(current);
      return prev;
    }, [])
  }

  buildTree(array) {
    const midPointIndex = Math.floor(array.length / 2);
    const midPoint = array[midPointIndex];

    if (array.length === 0) {
      return null;
    }

    if (array.length === 1) {
      return new Node(array[0], null, null)
    }

    const root = new Node(midPoint,
      this.buildTree(array.slice(0, midPointIndex)),
      this.buildTree(array.slice(midPointIndex + 1)));
    
    return root;
  }

  insertCycler(node, value) {
    if (value === node.data) {
      return null;
    }
    if (value > node.data) {
      if (node.right === null) {
        node.right = new Node(value, null, null);
      }
      this.insertCycler(node.right, value);
    }
    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value, null, null);
      }
      this.insertCycler(node.left, value);
    }
  }

  insert(value) {
    this.insertCycler(this.root, value)
  }
  
  leftMin(node) {
    if (node.left === null) {
      return node;
    } 
    return this.leftMin(node.left);
  }

  leftTopMin(node) {
    if (node.left.left === null) {
      return node;
    } 
    return this.leftTopMin(node.left);
  }

  deleteCycler(prev, curr, value) {
    if (value === curr.data) {
      if (curr.left === null && curr.right === null) {
        if (prev.right === curr) {
          prev.right = null;
        } else {
          prev.left = null;
        }
      }

      if (curr.left !== null && curr.right === null) {
        if (value > prev.data) {
          prev.right = curr.left;
        }
        if (value < prev.data) {
          prev.left = curr.left;
        }
      }

      if (curr.left === null && curr.right !== null) {
        if (value > prev.data) {
          prev.right = curr.right;
        }
        if (value > prev.data) {
          prev.left = curr.right;
        }
      }

      if (curr.left !== null & curr.right !== null) {
        let successor = this.leftMin(curr.right);
        const child = successor.right;
        if (prev === null) {
            this.root.data = successor.data;
            this.deleteCycler(this.root, this.root.right, successor.data);
        } else {
          if (prev.right.data === curr.data) {
            prev.right.data = sucprev.right,cessor.data;
            this.deleteCycler(prev.right, prev.right.right, successor.data);
          } else {
            prev.left.data = successor.data;
            this.deleteCycler(prev.left, prev.left.right, successor.data);
          }
        }
      }
      return;
    }
    if (value < curr.data) {
      return this.deleteCycler(curr, curr.left, value);
    } else {
      this.deleteCycler(curr, curr.right, value);
    }
  }

  delete(value) {
    this.deleteCycler(null, this.root, value);
  }

  findCycler(node, value) {
    if (node === null) {
      return null;
    }
    if (node.data === value) {
      return node;
    }
    if (value > node.data) {
      return this.findCycler(node.right, value);
    }
    return this.findCycler(node.left, value);
  }

  find(value) {
    const node = this.findCycler(this.root, value);
    return node ? node : null;
  }

  levelCycler(queue, arr, func) {
    if (queue.length === 0) {
      return arr;
    }
    const data = queue.shift()
    func ? func(data.data) : arr.push(data.data);
    if (data.left) {
      queue.push(data.left);
    }

    if (data.right) {
      queue.push(data.right);
    }
    return this.levelCycler(queue, arr, func);
  }

  levelOrder(func) {
    const queue = [this.root];
    const newArr = this.levelCycler(queue, [], func);
    if (!func) {
      return newArr;
    }
  }

  orderCycler(type, node, arr, func) {
    if (node.left === null) {
      arr.push(node.data);
      return arr;
    }
    if (type === 'preorder') {
      func ? func(node.date) : arr.push(node.data);
    }
    if (node.left) this.orderCycler(type, node.left, arr, func);
    if (type === 'inorder') {
      func ? func(node.date) : arr.push(node.data);
    }
    if (node.right) this.orderCycler(type, node.right, arr, func);
    if (type === 'postorder') {
      func ? func(node.date) : arr.push(node.data);
    }
    return arr;
  }

  inorder(func) {
    const arr = this.orderCycler('inorder', this.root, [], func)
    return arr;
  }

  preorder(func) {
    const arr = this.orderCycler('preorder', this.root, [], func)
    return arr;
  }

  postorder(func) {
    const arr = this.orderCycler('postorder', this.root, [], func)
    return arr;
  }
  
  heightCycler(node, i) {
    const leftSide = node.left !== null ? this.heightCycler(node.left, i + 1) : i;
    const rightSide = node.right !== null ? this.heightCycler(node.right, i + 1) : i;
    if (leftSide > rightSide) {
      return leftSide;
    } else {
      return rightSide;
    }
  }

  height(value) {
    return this.heightCycler(this.find(value), 0);
  }

  sizeCycler(node, value, i) {
    if (node === null) {
      return null;
    }
    if (node.data === value) {
      return i;
    }
    if (value > node.data) {
      return this.sizeCycler(node.right, value, i + 1);
    }
    return this.sizeCycler(node.left, value, i + 1);
  }

  depth(value) {
    return this.sizeCycler(this.root, value, 0)
  }

  balanceCycler(node, i) {
    const leftSide = node.left !== null ? this.heightCycler(node.left, i + 1) : i;
    const rightSide = node.right !== null ? this.heightCycler(node.right, i + 1) : i;
    if (Math.abs(leftSide - rightSide) < 2) {
      return true;
    } else {
      return false;
    }
  }

  isBalance() {
    return this.balanceCycler(this.root, 0)
  }

  rebalance() {
    console.log(this.inorder());
    this.root = this.buildTree(this.inorder());
  }
}

const newTree = new Tree([20, 30, 32, 34, 36, 40, 50, 60, 65, 70, 75, 80, 85]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

newTree.insert(59)
newTree.insert(58)
newTree.insert(57)
console.log(newTree.isBalance())
newTree.rebalance();
prettyPrint(newTree.root);
console.log(newTree.isBalance())

