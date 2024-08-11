// 1. 2중 for문 대신, 현재가지의 최대.최소 데이터를 갱신하기
function solution(A) {
  const count = [];
  for (let i = 0; i < A.length; i++) {
    for (let k = i; k < A.length; k++) {
      count.push(A[k] - A[i]);
    }
  }
  return Math.max(...count);
}
// 위의 방식은 시간 복잡도 n^2 -> 이것보다 더 좋은 방법은 없을지 고민하다 아래처럼 품
// 현재까지의 최소 가격과, 최대 이익을 기억!
function solution(A) {
  if (A.length < 2) return 0;
  let min = A[0];
  let maxDiff = 0;
  A.forEach((money) => {
    min = Math.min(money, min);
    maxDiff = Math.max(money - min, maxDiff);
  });
  return maxDiff;
}

// 2. DP
function solution(words) {
  // 문자 길이대로 정렬하기
  words.sort((a, b) => a.length - b.length);

  // 각 단어에 대한 최대 체인 길이를 저장할 객체
  let dp = {};
  let maxLength = 1;

  for (let word of words) {
    // 현재 단어의 최대 체인 길이를 1로 초기화
    dp[word] = 1;

    // 현재 단어에서 한 글자를 제거한 모든 경우를 확인
    for (let i = 0; i < word.length; i++) {
      let prev = word.slice(0, i) + word.slice(i + 1);

      // 이전 단어가 존재하고, 현재 단어의 체인 길이가 더 길 경우 업데이트
      if (prev in dp) {
        dp[word] = Math.max(dp[word], dp[prev] + 1);
      }
    }

    // 전체 최대 체인 길이 업데이트
    maxLength = Math.max(maxLength, dp[word]);
  }

  return maxLength;
}

// 3. 정규식 사용하여 replace 간단하게
function solution(call) {
  // 말버릇 : 문자 데이터에서 가장 많이 등장하는 길이 1 이상의 패턴
  // 패턴 모두 삭제, 대소문자 구분 안함, 가장 많이 등장한게 여러개면 다 삭제

  // 묶음을 구할 필요 없음. 하나짜리도 인정이라
  const result = [...call.toLowerCase()].reduce((acc, x) => {
    acc[x] = acc[x] + 1 || 1;
    return acc;
  }, {});
  const maxCount = Math.max(...Object.values(result)); // 최대로 많이나온 개수
  Object.keys(result).forEach((key) => {
    if (result[key] === maxCount) {
      let regex = new RegExp(key, 'gi'); // g: 모든 일치항목, i: 대소문자 구분 안하고 검색
      call = call.replace(regex, ''); // 대소문자 구분없이 모두 지우기
    }
  });
  return call;
}

// 4. 그리디 + 조건
function solution(abilities, k) {
  // 그리디+조건, k: 우선권 개수

  // 내림차순 정렬하고 2개씩 묶기
  const sortedAbilities = abilities
    .sort((a, b) => b - a)
    .reduce((acc, _, i, arr) => {
      if (i % 2 === 0) acc.push(arr.slice(i, i + 2));
      return acc;
    }, []);

  // 마지막꺼를 선택 안하는 경우
  let unSelectedLast = getAbility(sortedAbilities, k);
  // 마지막꺼를 선택하는 경우
  let selectedLast = getAbility(sortedAbilities, k - 1, true);
  return Math.max(unSelectedLast, selectedLast);
}

function getAbility(array, count, isLastSelected) {
  let ability = 0;
  array.forEach((abilities) => {
    // 우선권이 있으면서 묶인 두 수가 같지 않다면 우선권을 쓴다
    if (isLastSelected && abilities.length === 1) {
      ability += abilities[0];
      return;
    }
    if (count > 0 && abilities[0] !== abilities[1]) {
      ability += abilities[0];
      count--;
    } else if (abilities[1]) {
      ability += abilities[1];
    }
  });
  return ability;
}

// 5. 아이디어 : 한방향으로 흘러가며 데이터 흐름 넘기기
function solution(arr, brr) {
  let answer = 0;
  let diff = 0;
  arr.forEach((_, index) => {
    diff += arr[index] - brr[index]; // 우측에 전달할 차이 저장
    if (diff !== 0) {
      // 차이가 있다면 교환해야함,
      answer++;
    }
  });
  return answer;
}

// 6. bfs - 효율성은 실패, visited 조건을 추가해야할 것 같은데,,
// +1 -> -1 -> *2 를 통해 소를 잡는 경우가 있을 것 같아 중복 제거를 했는데 아직 고민중
function solution(s, e) {
  // 시간에 따른 소 이동 거리
  function cowPosition(t) {
    return e + (t * (t + 1)) / 2;
  }

  let queue = [[s, 0]]; // 위치, 시간

  while (queue.length > 0) {
    let [pos, time] = queue.shift();
    let cowPos = cowPosition(time); // 시간에 따른 소 거리

    if (cowPos > 200000) {
      // 못잡는다
      return -1;
    }
    if (pos === cowPos) {
      return time;
    }
    // 지점은 중복 가능해서 visited 체크 없어도 된다고 생각함
    for (let nextPos of [pos - 1, pos + 1, pos * 2]) {
      if (nextPos > 0 && nextPos <= 200000) queue.push([nextPos, time + 1]);
    }
  }
}
