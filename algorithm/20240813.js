// 1. 슬라이딩 윈도우
// 가능한 점들의 x, y 최소를 구해서 기준잡고 필터링하기
function solution(w, h, t, s, points) {
  const SELECT = s;
  let answer = 0;
  // 나무를 기준점으로 보면 된다. 제일 작은 x좌표 찾아야하니 sort 한번
  const sortedTrees = points.sort((a, b) => a[0] - b[0]);
  sortedTrees.map((tree) => {
    const [startX] = tree;
    // s만큼 선택했을 때 범위를 벗어나면 return
    // x 좌표 내에 존재하는 것
    const checkX = sortedTrees.filter((tree) => {
      return tree[0] >= startX && tree[0] <= startX + SELECT;
    });
    // 제일 작은 y좌표 구하기 위해 sort하고 map 반복
    const sortedCheckX = checkX.sort((a, b) => a[1] - b[1]);
    sortedCheckX.map((tree) => {
      const [_, startY] = tree;
      const checkY = sortedCheckX.filter((tree) => {
        return tree[1] >= startY && tree[1] <= startY + SELECT;
      });
      answer = Math.max(answer, checkY.length);
    });
  });
  return answer;
}

// 2. 원과의 거리 + bfs
// bfs + 원 내부 조건
function bfs(array, startIndex) {
  const visited = Array.from(array.length).fill(false);
  const queue = [startIndex];
  visited[startIndex] = true;
  let count = 1; // 시작 폭탄도 포함

  while (queue.length > 0) {
    const currentIndex = queue.shift();
    const [x, y, r] = array[currentIndex];

    for (let i = 0; i < array.length; i++) {
      if (!visited[i]) {
        const [x2, y2] = array[i];
        if (isPointInsideCircle(x, y, r, x2, y2)) {
          visited[i] = true;
          queue.push(i);
          count++; // 폭탄 터짐
        }
      }
    }
  }
  return count;
}
function solution(bombs) {
  // 폭탄이 하나면 return 1
  if (bombs.length === 1) return 1;
  let maxBombs = 0;
  for (let i = 0; i < bombs.length; i++) {
    const bombCount = bfs(bombs, i);
    maxBombs = Math.max(maxBombs, bombCount);
  }
  return maxBombs;
}
function isPointInsideCircle(x, y, r, pointX, pointY) {
  // 원의 중심과 점 사이의 거리를 계산
  const distance = Math.sqrt(Math.pow(pointX - x, 2) + Math.pow(pointY - y, 2));
  // 거리가 반지름보다 작거나 같으면 점은 원 안에 있음
  return distance <= r;
}

// 3. every로 만족 조건 걸기
function solution(water, time) {
  let answer = [];
  for (let i = 0; i < water.length; i++) {
    if (checkOrderWithinTime(water, i, time)) answer.push(i);
  }
  return answer;
}

function checkOrderWithinTime(arr, index, time) {
  const before = arr.slice(index - time, index + 1);
  const after = arr.slice(index, index + time + 1);

  // time만큼 없으면 return (index 포함이라 1 더해줌)
  if (before.length < time + 1) return false;
  if (after.length < time + 1) return false;

  // 앞에가 내림차순인지 확인
  const isDESC = before.every((x, i) => {
    if (i === before.length - 1) return true;
    return x >= before[i + 1];
  });

  // 뒤에가 오름차순인지 확인
  const isASC = after.every((x, i) => {
    if (i === after.length - 1) return true;
    return x <= after[i + 1];
  });

  return isDESC && isASC;
}

// 4. 그냥 재미난 구현구현, reduce 최고 최고!
function solution(M, remote_tasks, office_tasks, employees) {
  let answer = [];

  // 재택으로만 가능하다면 재택근무시킨다
  const employeeInfo = employees.reduce((acc, x, i) => {
    const [dept, ...tasks] = x.split(' ');
    const canRemote = checkRemote(remote_tasks, tasks);
    // 처음 들어오는 부서면 데이터 초기화 후 진행
    if (acc[dept] == undefined) {
      acc[dept] = {
        peoples: [],
        canRemotes: [],
        remoteCount: 0,
      };
    }
    acc[dept].peoples.push({
      id: i + 1,
    });
    if (canRemote) {
      acc[dept].canRemotes.push({ id: i + 1 });
      acc[dept].remoteCount++;
    }
    return acc;
  }, {});
  //재택근무 가능한 사원들 번호 오름차순
  Object.values(employeeInfo).forEach((dept) => {
    if (dept.peoples.length === dept.remoteCount) {
      // 다 재택이면 id 빠른사람 회사가야함
      answer.push(...dept.canRemotes.slice(1).map((x) => x.id));
    } else {
      answer.push(...dept.canRemotes.map((x) => x.id));
    }
  });
  return answer;
}

function checkRemote(remote_tasks, tasks) {
  return tasks.every((task) => {
    return remote_tasks.indexOf(task) > -1;
  });
}

// 5. 대문자인지 판단하기
function solution(s, n) {
  // 아니다 shift는 하나만 취급, 한번 추가하면 재사용 가능
  const result = [...s].reduce((acc, x) => {
    if (x !== ' ') {
      const lowerCase = x.toLowerCase();
      if (isUpperCase(x)) {
        acc['shift'] = acc['shift'] + 1 || 1;
      }
      acc[lowerCase] = acc[lowerCase] + 1 || 1;
    }
    return acc;
  }, {});
  if (Object.keys(result).length > n) {
    // 사용 문자를 초과하였다면
    return -1;
  } else {
    return s.length;
  }
}

function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}
