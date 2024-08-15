// 1. DP인 것 같으나, 반복문으로 처리, 반복되는 최대 문자열 길이 찾기
function solution(s) {
  const N = s.length;
  const maxLen = 0;
  // 반복될 문자열 길이 정하기
  for (let len = 1; len <= N; i++) {
    // 길이가 n인 문자가 반복되는지 확인
    const seen = new Set();
    for (let i = 0; i < N - i; i++) {
      const newWord = s.substring(i, i + len);
      if (seen.has(newWord)) {
        maxLen = len;
        break; // 하나라도 확인 되었으니 다음 길이 확인
      }
      seen.add(newWord); // 본 단어에 추가
    }
  }
  return maxLen;
}

// 2. 애니팡같은걸로, 3개 이상 세로가로 반복되면 없애고 미는 빡구현 문제
// 접근 방법 : 특정 index의 col을 구하는 함수를 만들어 col도 row처럼 다루기
function solution(board) {
  let WIDTH = board[0].length;
  let HEIGHT = board.length;

  let removeRow = [];
  let removeCol = [];
  do {
    removeRow = [];
    removeCol = [];
    // 세로체크
    for (let i = 0; i < WIDTH; i++) {
      let dx = i;
      const cols = getCols(i, board);
      for (let k = 0; k < HEIGHT; k++) {
        const count = checkContinuous(k, cols);
        if (count >= 3) {
          removeCol.push([dx, k, count]);
        }
      }
    }

    // 가로체크
    board.forEach((row, i) => {
      let dy = i;
      for (let k = 0; k < WIDTH; k++) {
        const count = checkContinuous(k, row);
        if (count >= 3) {
          removeRow.push([k, dy, count]);
        }
      }
    });

    // 모은거 지우기
    const checkPush = new Set([]);
    removeCol.forEach(([dx, k, count]) => {
      executeRemoveCol(board, [dx, k, count], checkPush);
    });
    removeRow.forEach(([k, dy, count]) => {
      executeRemoveRow(board, [k, dy, count], checkPush);
    });
    // 0만큼 땡기기 (땡겨지는건 세로로만 땡겨짐)
    executePush(board, checkPush, HEIGHT);
  } while (!(removeRow.length === 0 && removeCol.length === 0));

  return board;
}

function executePush(board, checkPush, HEIGHT) {
  checkPush.forEach((checkCol) => {
    // 0 지우고, 부족한만큼 앞에 0 채우기
    const col = getCols(checkCol, board).filter((x) => x != 0);
    const newCol = Array.from({ length: HEIGHT - col.length })
      .fill(0)
      .concat(col);

    // newCol로 갈아끼우기
    board.forEach((row, i) => {
      row.forEach((number, k) => {
        if (k === checkCol) {
          board[i][k] = newCol[i];
        }
      });
    });
  });
}

function executeRemoveRow(board, [dx, dy, count], checkPush) {
  // dx, dy 부터 row로 count만큼 0으로 변경
  for (let i = 0; i < count; i++) {
    checkPush.add(dx + i);
    board[dy][dx + i] = 0;
  }
}

function executeRemoveCol(board, [dx, dy, count], checkPush) {
  // dx, dy 부터 col로 count만큼 0으로 변경
  for (let i = 0; i < count; i++) {
    checkPush.add(dx);
    board[dy + i][dx] = 0;
  }
}

function checkContinuous(index, array) {
  if (array[index] === 0) return 0; // 0은 빈거라서 체크안함
  let count = 1;
  let continuous = true;
  // 전달받은 인덱스가 어디까지 반복되는지 확인
  for (let i = 1; i < array.length - index; i++) {
    if (continuous && array[index] === array[index + i]) {
      count++;
    } else {
      continuous = false;
    }
  }
  return count;
}

function getCols(index, array) {
  return array.reduce((acc, x) => {
    acc.push(x[index]);
    return acc;
  }, []);
}

// 3. bfs + 지나갈 수 없는 특수조건 (공주, 기사, 딸기)
function solution(board) {
  const W = board[0].length;
  const H = board.length;

  // 위치 구하기
  let princess,
    knight,
    strawberries = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const value = board[y][x];
      if (value === 2) princess = [y, x];
      if (value === 3) knight = [y, x];
      if (value === 4) strawberries.push([y, x]);
    }
  }
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // 방향

  const queue = [[...princess, 0, false]]; // y, x, days, hasStrawberry
  const visited = new Set();

  while (queue.length > 0) {
    const [y, x, days, hasStrawberry] = queue.shift();
    const key = `${y},${x},${hasStrawberry}`; // y, x, hasStrawberry

    // 현재 위치 방문처리
    if (visited.has(key)) continue;
    visited.add(key);

    // 기사를 만났는데 딸기가 있으명 days return
    if (y === knight[0] && x === knight[1] && hasStrawberry) return days;

    // 지나갈 수 없는 경우 제외하고 큐에 넣기
    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;

      if (nx < 0 || nx >= W || ny < 0 || ny >= H || board[ny][nx] === 1) continue;
      if (board[ny][nx] === 3 && !hasStrawberry) continue;

      let newHasStrawberry = hasStrawberry;
      if (board[ny][nx] === 4) newHasStrawberry = true;
      queue.push([ny, nx, days + 1, newHasStrawberry]);
    }
  }
}

// 4. 통나무 자르는 dp,, 작은 조각으로 최소 비용을 조합해서 사용
function solution(n, nums) {
  // 배열의 시작과 끝에 0과 n을 추가하여 전체 범위를 나타내도록 함
  nums.unshift(0);
  nums.push(n);

  const len = nums.length;
  // DP 테이블 초기화
  const dp = Array.from({ length: len }, () => Array(len).fill(0));

  // 간격별로 DP 계산
  for (let gap = 2; gap < len; gap++) {
    for (let i = 0; i < len - gap; i++) {
      const j = i + gap;
      dp[i][j] = Infinity;
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + nums[j] - nums[i]);
      }
    }
  }

  // 최종 최소 비용 반환
  return dp[0][len - 1];
}

// 5. bfs 최소 회전방향구하기 = 직진을 생각하지 말고, 일단 도달 가능한 최단거리를 구한 후 끝 조건으로 찾아서 최소 구하기
function solution(room, x1, y1, x2, y2) {
  const H = room.length;
  const W = room[0].length;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ]; // 상, 하, 좌, 우

  const queue = [];
  const visited = new Map();

  for (let i = 0; i < directions.length; i++) {
    // 네방향으로 모두 시작, 방향을 큐에 넣기에 이렇게 미리 넣어줘야함
    queue.push([y1, x1, i, 0]); // y, x, dir, 방향 전환 횟수
    visited.set(`${y1},${x1},${i}`, 0); // y, x, 방향 => 방향 전환 횟수
  }

  while (queue.length > 0) {
    const [y, x, dir, turns] = queue.shift();

    // 방문 처리
    for (let i = 0; i < directions.length; i++) {
      const ny = y + directions[i][0];
      const nx = x + directions[i][1];
      const newTurns = turns + (dir !== i ? 1 : 0);
      const newKey = `${ny},${nx},${i}`;

      if (ny >= H || ny < 0 || nx >= W || nx < 0 || room[ny][nx] === 1) continue;
      if (visited.has(newKey) && visited.get(newKey) >= newTurns) continue;

      queue.push([ny, nx, i, newTurns]);
      visited.set(newKey, newTurns);
    }
  }

  const endKeys = [[`${y2},${x2},0`], [`${y2},${x2},1`], [`${y2},${x2},2`], [`${y2},${x2},3`]];
  const minTurns = Infinity;
  endKeys.forEach((key) => {
    minTurns = Math.min(visited.get(key), minTurns);
  });
  return minTurns === Infinity ? -1 : minTurns;
}
