## split으로 문자열에서 특정 문자 개수 찾기

관련 문제 : https://github.com/JANGSEYEONG/Study/blob/main/algorithm/20240819.md#2-%EC%89%AC%EC%9A%B4-%EA%B5%AC%ED%98%84

- 문자열을 for문으로 돌면서 판별해도 되지만,`split`을 활용하여 성능상으로 더 효율적이게 구할 수 있다.
- 단, 메모리 측면에서는 forEach가 유리할 수 있다.

```javascript
const num = 123335;
const countThree = num.toString().split('3').length - 1;
```
