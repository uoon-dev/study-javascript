const input = [2, 1, 0, 3, 0, 5, 1, 4, 2, 0, 3];
const result = 0;
const getShortestDuplicatedDate = (input) => input.map((value, index) => {
        const nextIndex = input.indexOf(value, index + 1);
        if (nextIndex < 0) return 0;
        return nextIndex - index;
    }).filter(val => val !== 0)
    // .reduce((acc, curr, index, arr) => (acc < curr) ? acc : curr);
result = Math.min(...getShortestDuplicatedDate(input));
console.log(result);
 