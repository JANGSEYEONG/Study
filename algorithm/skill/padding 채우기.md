## padding 채우기

`padString` default값 : <ruby>
<span><code> </code></span>
<rt>공백</rt></ruby>

### [`String.prototype.padStart(targetLength [, padString])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart):문자열 앞에 특정 문자를 채워 목표 길이를 맞추는 메서드

```javascript
'5'.padStart(2, '0'); // "05"
'123'.padStart(5, '0'); // "00123"
'cat'.padStart(5); // "  cat" (padString 생략시 공백)
'1'.padStart(8, '0123'); // "0123012"
```

### [`String.prototype.padEnd(targetLength [, padString])`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd): 문자열 뒤에 특정 문자를 채워 목표 길이를 맞추는 메서드

```javascript
'cat'.padEnd(5, '.'); // "cat.."
'Menu'.padEnd(10, ' '); // "Menu      "
'test'.padEnd(6); // "test  " (padString 생략시 공백)
'abc'.padEnd(7, '123'); // "abc1231"
```

### 참고

_목표 길이가 현재 길이보다 작은 경우_

```javascript
'hello'.padStart(3, '-'); // "hello" (변화 없음)
'hello'.padEnd(3, '-'); // "hello" (변화 없음)
```

_빈 문자열로 패딩_

```javascript
'abc'.padStart(5, ''); // "abc" (변화 없음)
'abc'.padEnd(5, ''); // "abc" (변화 없음)
```

_긴 패딩 문자열은 잘림_

```javascript
'hi'.padStart(5, 'abcde'); // "abchi"
'hi'.padEnd(5, 'abcde'); // "hiabc"
```
