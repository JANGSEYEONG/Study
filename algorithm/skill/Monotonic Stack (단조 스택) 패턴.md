## Monotonic Stack (단조 스택) 패턴

### 단조 스택이란..

- 스택 내의 요소들이 단조 증가 또는 단조 감소 순서를 유지하는 자료구조
- "다음으로 큰/작은 원소 찾기" 또는 "이전에 나온 큰/작은 원소 찾기" 문제에서 `O(n)` 시간 복잡도로 해결
- 관련 문제 예시
  - [주식가격](https://school.programmers.co.kr/learn/courses/30/lessons/42584)
  - [오큰수](https://www.acmicpc.net/problem/17298)
  - [히스토그램에서 가장 큰 직사각형](https://www.acmicpc.net/problem/6549)

### 다음과 같은 패턴이 보이면 단조 스택 의심해보기!

1. 문제에서...

   - "다음으로 큰/작은 ..."
   - "얼마나 기다려야~"
   - "연속된 기간 동안"
   - "오른쪽/왼쪽으로 봤을 때 첫번째로..."

2. 시간복잡도가 O(n²)이 나오는데 O(n)으로 줄여야 할 때

---

### 1. 단조 증가 스택 (Monotonic Increasing Stack)

**정의** : 스택의 요소들이 bottom에서 top으로 갈수록 증가하는 형태

**사용 이유** : 각 원소의 '다음으로 작은 원소'를 찾을 때 유용

**동작 방식**

- 현재 원소가 스택 top보다 작거나 같으면 push
- 크면 pop하면서 조건 처리

**코드 예시**

```javascript
function findNextSmaller(arr) {
  const stack = [];
  const result = new Array(arr.length).fill(-1);

  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] < arr[stack[stack.length - 1]]) {
      const j = stack.pop();
      result[j] = arr[i]; // j위치의 다음 작은 수는 arr[i]
    }
    stack.push(i);
  }
  return result;
}
```

### 2. 단조 감소 스택 (Monotonic Decreasing Stack)

**정의** : 스택의 요소들이 bottom에서 top으로 갈수록 감소하는 형태

**사용 이유** : 각 원소의 '다음으로 큰 원소'를 찾을 때 유용

**동작 방식**

- 현재 원소가 스택 top보다 크거나 같으면 push
- 작으면 pop하면서 조건 처리

**코드 예시**

```javascript
function findNextGreater(arr) {
  const stack = [];
  const result = new Array(arr.length).fill(-1);

  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const j = stack.pop();
      result[j] = arr[i]; // j위치의 다음 큰 수는 arr[i]
    }
    stack.push(i);
  }
  return result;
}
```
