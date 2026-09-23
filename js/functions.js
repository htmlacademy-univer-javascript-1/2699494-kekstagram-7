function checklength(string, maxLength) {
  return string.length <= maxLength;
}

function palindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();

  let revers = '';

  for (let i = string.length - 1; i >= 0; i--) {
    revers += string[i];
  }

  return string === revers;
}

function digits(string) {
  string = String(string);

  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      result += string[i];
    }
  }

  if (result === '') {
    return NaN;
  }

  return Number(result);
}

console.log(checklength('проверяемая строка', 20));
console.log(checklength('проверяемая строка', 18));
console.log(checklength('проверяемая строка', 10));

console.log(palindrome('топот'));
console.log(palindrome('ДовОд'));
console.log(palindrome('Кекс'));


console.log(digits('2023 год'));
console.log(digits('1 кефир, 0.5 батона'));
console.log(digits('агент 007'));
