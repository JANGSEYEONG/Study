## 우선순위 큐 구현하기 with Heap

관련 문제 : https://github.com/JANGSEYEONG/Study/blob/main/algorithm/202408/20240823.md#1-bfs--%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%ED%81%90-heap

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

### 위에 구현한 힙의 문제

1. 초기 구성의 비효율성
   - 요소를 하나씩 push하면서 매번 \_bubbleUp 수행
   - N개의 요소에 대해 각각 O(log N) 연산 수행
   - 전체 시간복잡도: O(N log N)
2. 불필요한 swap 연산

### Heapify로 최적화하기

- 기존 방식

  - 초기 구성: O(N log N)
  - 공간복잡도: O(N)
  - 많은 swap 연산 필요

- 최적화 후

  - 초기 구성: O(N)
  - 공간복잡도: O(N)
  - swap 연산 최소화
  - push/pop 연산은 여전히 O(log N)이지만 실제 수행 시간 개선

1. 최적화된 초기 구성 (O(N))

```javascript
class PriorityQueue {
  constructor(comparator, elements = []) {
    this.heap = [...elements];
    this.comparator = comparator;

    // 바닥에서부터 위로 올라가며 힙 구성
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this._bubbleDown(i);
    }
  }
}
```

2. swap 연산 최적화

```javascript
_bubbleDown(index) {
    const element = this.heap[index];  // 임시 저장
    const length = this.size();

    while (true) {
        let swapIndex = null;
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;

        // 자식 노드들과 비교
        if (leftChildIndex < length) {
            if (this.comparator(this.heap[leftChildIndex], element)) {
                swapIndex = leftChildIndex;
            }
        }

        if (rightChildIndex < length) {
            if (this.comparator(this.heap[rightChildIndex],
                (swapIndex === null ? element : this.heap[swapIndex]))) {
                swapIndex = rightChildIndex;
            }
        }

        if (swapIndex === null) break;

        // swap 대신 직접 할당
        this.heap[index] = this.heap[swapIndex];
        index = swapIndex;
    }

    // 최종 위치에 element 할당
    this.heap[index] = element;
}
```
