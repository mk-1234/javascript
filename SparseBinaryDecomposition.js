// Decompose int into sum of ints having no consecutive 1s in binary form.

/*

A non-negative integer N is called sparse if its binary representation does not
contain two consecutive bits set to 1. For example, 41 is sparse, because its
binary representation is "101001" and it does not contain two consecutive 1s. On
the other hand, 26 is not sparse, because its binary representation is "11010" and
it contains two consecutive 1s.

Two non-negative integers P and Q are called a sparse decomposition of integer N
if P and Q are sparse and N = P + Q.

For example:

8 and 18 are a sparse decomposition of 26 (binary representation of 8 is "1000", binary
representation of 18 is "10010");
9 and 17 are a sparse decomposition of 26 (binary representation of 9 is "1001", binary
representation of 17 is "10001");
2 and 24 are not a sparse decomposition of 26; though 2 + 24 = 26, the binary
representation of 24 is "11000", which is not sparse.

Write a function:

function solution(N);

that, given a non-negative integer N, returns any integer that is one part of a
sparse decomposition of N. The function should return −1 if there is no sparse
decomposition of N.

For example, given N = 26 the function may return 8, 9, 17 or 18, as explained in
the example above. All other possible results for N = 26 are 5, 10, 16 and 21.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..1,000,000,000].

*/

function solution(N) {
    let count = 0;
    let allOkNumbers = [];
    for (let i = 0; i < Math.round(N / 2); i++) {
        console.log(i, '+', N - i);
        let firstNmbOk = checkNumber(i);
        let secondNmbOk = checkNumber(N - i);
        console.log('numbers ok?', firstNmbOk, secondNmbOk);
        if (firstNmbOk && secondNmbOk) {
            count += 2;
            allOkNumbers.push(i);
            allOkNumbers.push(N - i);
        }
    }
    console.log('total number:', count);
    console.log(allOkNumbers.sort((a, b) => {
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    }));
}

function checkNumber(N) {
    let exp = 0;
    let currNmb = Math.pow(2, exp);
    let nmbOk = false;
    if (N == 0) return true;
    while(currNmb <= N) {
        exp++;
        currNmb = Math.pow(2, exp);
        if (currNmb > N) {
            return findString(N, currNmb / 2, exp - 1);
        }
    }
    return nmbOk;
}

function findString(setNmb, nmb, exp) {
    let helpNmb = setNmb;
    let s = '';
    let nmbOk = true;
    for (let i = exp; i >= 0; i--) {
        if (helpNmb >= Math.pow(2, i)) {
            helpNmb -= Math.pow(2, i);
            s += '1';
        } else {
            s += '0';
        }
    }
    console.log('binary:', s, 'length:', s.length);
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === '1' && s[i + 1] === '1') return false;
    }
    return nmbOk;
}

solution(26);