const express = require('express');
const app = express();

//Utility functions
const calculateMean = (numbers) => {
const sum = numbers.reduce((acc,val) => acc + val, 0);
return sum /numbers.length;

};

const calculateMedian = (numbers) => {
    numbers.sort((a, b) => a - b);
    const mid = Math.floor(numbers.length / 2);
    return numbers.length % 2 != 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
};

const calculateMode = (numbers) => {
const freqMap = {};
numbers.forEach(num => {
    if (!freqMap[num]) {
        freqMap[num] = 0;
    }
    freqMap[num]++;
});

let maxFreq = 0;
let mode = [];
for (const key in freqMap) {
    if (freqMap[key] > maxFreq) {
        maxFreq = freqMap[key];
        mode = [Number(key)];
    } else if (freqMap[key] === maxFreq) {
        mode.push(Number(key));
    }
}
 if (mode.length === numbers.length) {
    mode = [];
 }
 return mode;
};

const parseNums = (numsString) => {
    if (!numsString) {
        throw new Error('numbers are required');
    }

    const nums = numsString.split(',').map(num => {
        const parsed = parseFloat(num);
        if (isNaN(parsed)) {
            throw new Error('${num} is not a number');
        }
        return parsed;
    });
    return nums;
};

// Routes
app.get('/mean', (req, res) => {
    try {
        const nums = parseNums(req.query.nums);
        const mean = calculateMean(nums);
        res.json({ operation: 'mean', value: mean});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.get('/median', (req, res) => {
    try {
        const nums = parseNums(req.query.nums);
        const median = calculateMedian(nums);
        res.json({operation: 'median', value: median});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

app.get('/mode', (req, res) => {
    try {
        const nums = parseNums(req.query.nums);
        const mode = calculateMode(nums);
        res.json({ operation: 'mode', value: mode});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

module.exports = {
    calculateMean,
    calculateMedian,
    calculateMode
};

app.listen(3000,  function() {
    console.log('Server is running on port 3000');
});




