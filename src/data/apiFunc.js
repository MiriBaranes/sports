import {getData} from "./componentData";


function filterKeyPath(x, keyPath, res = {}) {
    let pointerRes = res;
    let pointerX = x;
    const lastKey = keyPath.pop();
    for (const key of keyPath) {
        pointerRes = pointerRes[key] = (pointerRes[key] || {});
        pointerX = pointerX[key];
    }
    if (!pointerX[lastKey]) {
        console.error(`the objects ${x} has not attribute path ${keyPath}`);
    }
    pointerRes[lastKey] = pointerX[lastKey];
    keyPath.push(lastKey);
    return res;
}

function filterKeyPaths(x, keyPaths) {
    let res = {};
    for (const keyPath of keyPaths)
        res = filterKeyPath(x, keyPath, res);
    return res;
}

export function mapByKeyPaths(arr, keyPaths) {
    return arr.map(x => {
        return filterKeyPaths(x, keyPaths);
    });

}

export async function dynamicInitByFuncAndPath(path, func) {
    let data = await getData(path)
    data = func(data);
    return data;
}

export function getCountByKey(jsonData) {
    const counts = jsonData.reduce((a, obj) => {
        const string = JSON.stringify(obj);
        a[string] = (a[string] || 0) + 1
        return a;
    }, {});
    jsonData.forEach((item) => {
        item.count = counts[JSON.stringify(item)];
    });
    return jsonData;
}
export function getTopN(arr, prop, n) {
    let clone = arr.slice(0);
    clone.sort(function(x, y) {
        if (x[prop] === y[prop]) return 0;
        else if (parseInt(x[prop]) < parseInt(y[prop])) return 1;
        else return -1;
    });

    return clone.slice(0, n || 1);
}
export function sortByKey(list, key, type) {
    list.sort((a, b) => {
        return type === 1 ? a[key].charCodeAt(0) - b[key].charCodeAt(0) : b[key] - a[key];
    });
}

export function not(element){
    return typeof element === "function" ? (x) => !element(x) : !element;
}
export function findMinMax(key, list) {
    const data = list.map((node) => node[key]);
    return {
        min: Math.min(...data),
        max: Math.max(...data),
    }
}
const compareFn = (a, b) => (a > b ? 1 : 0);
// const result = array1.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));
export function sortLocal (list,key){
    list.sort((a,b)=> a[key].localeCompare(b[key]));
}
