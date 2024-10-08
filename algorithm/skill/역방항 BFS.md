## 역방항 BFS

관련 문제 : https://github.com/JANGSEYEONG/Study/blob/main/algorithm/202408/20240820.md#3-%EB%8B%A4%EC%A4%91-%EC%8B%9C%EC%9E%91%EC%A0%90-bfs-%EC%97%AD%EB%B0%A9%ED%96%A5-bfs

### 역방향 BFS의 개념

출발 지점에서 목표 지점으로 가는 대신 **목표 지점에서 출발 지점으로 역으로 가는 경로를 탐색**

기본 원리 : BFS를 사용해 큐에 다음 위치를 넣고, 가장 먼저 목표에 도달하는 경로를 찾는다.
하지만 탐색 방향을 반대로 하여, 목표에서부터 출발점까지의 최단 경로를 찾는다.

### 언제 역방향 BFS를 사용?

- 출발 지점에서 여러 가지 선택지가 많은 경우: 목표에서 역으로 출발하면 경로가 더 단순해짐
- 특정 목표 지점으로 가는 것이 더 분명할 때: 출발 지점에서 이동하는 경로가 복잡하고 가지가 많아 최단 경로 탐색이 어려울 경우, 목표에서 출발해 역으로 탐색하면 경로 탐색이 쉬워짐
- 목표 지점에서 출발하는 경로가 정해져 있거나 제약이 덜한 경우: 예를 들어, 특정 위치로의 접근 방식이 역으로 더 명확하거나 효율적일 때 사용

### 역방향 BFS의 동작 방식

역방향 BFS는 일반 BFS와 크게 다르지 않지만, 탐색 방향이 다름.

**<일반적인 BFS와 역방향 BFS의 동작을 비교>**

- 일반 BFS
  - 출발 지점에서 시작.
  - 다음 가능한 위치를 큐에 넣음.
  - 목표 지점에 도달할 때까지 BFS로 탐색.
- 역방향 BFS
  - 목표 지점에서 시작.
  - 출발 지점으로 역으로 탐색하면서 큐에 다음 가능한 위치를 넣음.
  - 출발 지점에 도달할 때까지 BFS로 탐색.
