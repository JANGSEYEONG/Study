## 우선순위 큐 구현하기 with Heap

관련 문제 : https://github.com/JANGSEYEONG/Study/blob/main/algorithm/20240823.md#1-bfs--%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%ED%81%90-heap

### 우선순위 큐

- 가장 높은 우선순위를 가진 요소를 먼저 처리하는 자료구조
- 일반적인 큐와 달리, 들어간 순서대로 처리하지 않고, 우선순위에 따라 처리 순서가 결정

### 힙(Heap)으로 우선순위 큐 구현하기

- 우선순위 큐를 효율적으로 구현하려면 힙(Heap) 자료구조를 사용
- 힙은 이진 트리 구조로,

  - 삽입과 삭제 연산을 `O(log n)` 로 처리
  - 가장 높은 우선순위 확인은 `O(1)` 로 처리

- 바스크립트에는 기본적으로 우선순위 큐를 제공하는 클래스가 없기 때문에, 직접 구현 필요

```javascript
class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this.heap = [];
    this.comparator = comparator;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.heap[0];
  }

  push(...values) {
    values.forEach((value) => {
      this.heap.push(value); // 요소를 힙의 끝에 추가
      this._bubbleUp(); // 힙 속성을 유지하기 위해 재배열
    });
    return this.size();
  }

  pop() {
    const poppedValue = this.peek(); // 루트 요소(최우선순위 요소)
    const bottom = this.size() - 1;
    if (bottom > 0) {
      this._swap(0, bottom); // 루트와 마지막 요소 교환
    }
    this.heap.pop(); // 마지막 요소 제거
    this._bubbleDown(); // 힙 속성 유지하기 위해 재배열
    return poppedValue;
  }

  // 힙 속성을 유지하기 위해 요소를 위로 이동
  _bubbleUp() {
    let index = this.size() - 1;
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (this.comparator(parent, element)) break; // 부모가 더 크면 종료
      this._swap(index, parentIndex); // 부모와 교환
      index = parentIndex;
    }
  }

  // 힙 속성을 유지하기 위해 요소를 아래로 이동
  _bubbleDown() {
    let index = 0;
    const length = this.size();
    const element = this.heap[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.comparator(leftChild, element)) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && this.comparator(rightChild, element)) ||
          (swap !== null && this.comparator(rightChild, leftChild))
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this._swap(index, swap);
      index = swap;
    }
  }

  // 두 요소의 위치를 교환
  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
```
