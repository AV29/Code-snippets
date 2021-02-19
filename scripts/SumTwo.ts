/*
Write a function that takes in a non-empty array of distinct integers and an
  integer representing a target sum. If any two numbers in the input array sum
  up to the target sum, the function should return them in an array, in any
  order. If no two numbers sum up to the target sum, the function should return
  an empty array.
  Note that the target sum has to be obtained by summing two different integers
  in the array; you can't add a single integer to itself in order to obtain the
  target sum.
  You can assume that there will be at most one pair of numbers summing up to
  the target sum.

  Sample Input
  
  array = [3, 5, -4, 8, 11, 1, -1, 6]
  targetSum = 10

  Sample Output
  
  [-1, 11] //the numbers could be in reverse order

  !!! Optimal Space & Time Complexity 

  O( n ) time | O( n ) space , n - length of input array
*/

//Brute Force  time O(n^2) - space O(1)
const twoSum_brute = (targetSum, numbers) => {
  for(let i = 0; i < numbers.length - 1; i++) {
    for(let j = i + 1; j < numbers.length; j++) {
        if(targetSum - numbers[i] - numbers[j] === 0) {
            return [numbers[i], numbers[j]];
        }
    }
  }
  return [];
};

//Optimal  time O(n) - space O(n)
const twoSum_memo = (targetSum, numbers, memo = {}) => {
    for (let num of numbers) {
        const rem = targetSum - num;
        if (memo[num]) return [ memo[num], num ];
        memo[rem] = num;
    }
    return [];
};

const twoSum_sorted = (targetSum, numbers) => {
    numbers.sort((a, b) => a - b);
    for (let i = 0, j = numbers.length - 1; i < j;) {
        const sum = numbers[i] + numbers[j];
        if(sum > targetSum) j--;
        else if(sum < targetSum) i++;
        else return [numbers[i], numbers[j]];
    }
    return [];
};

// console.log(twoSum(10, [11, 5, 8, -1, 3, 1, -4, 6]));