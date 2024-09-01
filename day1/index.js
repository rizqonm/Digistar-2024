let fail = true;

const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (fail) {
            reject("Data not fetched");
        }
        resolve("data fetched");
    }, 1000);
});

fetchData.then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});

async function fetchData(){
    try {
        const data = await new Promise((resolve, reject) =>{
            setTimeout(() => {
                if (fail) {
                    reject({
                        status: 404,
                        message: "pesan",
                        reason: "your request invalid"
                    });
                }
                resolve("data fetch")
            }, 1000);
        });
        console.log(data);
        console.log("Hello world")
    } catch (err) {
        console.log(err.reason)
    }
}

fetchData()

ARRAYYYYY
let array = [1,2,3,4,5,"enam", true]
console.log(array)
array.push(6)
console.log(array)
array.pop()
console.log(array)
array.shift()
console.log(array)
array.unshift(1)
console.log(array)

array.map((value, index) => {
    console.log(value, index)
})

let num =[1,2,3,4]

let evens = num.filter(num => num % 2 === 0)
console.log(evens)
