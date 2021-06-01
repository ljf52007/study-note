const deepCopy = function (target, cache = []) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i].target === target) {
      return cache[i].result;
    }
  }

  const type = Object.prototype.toString.call(target).slice(8, -1);
  let result = null;
  if (['String', 'Number', 'Boolen', 'Undefined', 'Null', 'Symbol', 'BigInt'].includes(type)){
    return target;
  } else if (type === 'Object'){
    result = {};
  } else if (type === 'Array') {
    result = [];
  } else if (type === 'Date') {
    result = new Date(target);
  } else if (type === 'RegExp') {
    result = new RegExp(target.source, target.flags);
  } else if (type === 'Function') {
    result = target.bind(this);
  } 

  cache.push({target, result});

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      result[key] = deepCopy(target[key], cache);
    }
  }
  return result;
}

export default deepCopy;


// const deepCopy = function (target, map = new Map()) {
//   if (map.get(target)) return target;

//   const type = Object.prototype.toString.call(target).slice(8, -1);
//   let result = null;
//   if (['String', 'Number', 'Boolen', 'Undefined', 'Null', 'Symbol', 'BigInt'].includes(type)){
//     return target;
//   } else if (type === 'Object'){
//     result = {};
//   } else if (type === 'Array') {
//     result = [];
//   } else if (type === 'Date') {
//     result = new Date(target);
//   } else if (type === 'RegExp') {
//     result = new RegExp(target.source, target.flags);
//   } else if (type === 'Function') {
//     result = target.bind(this);
//   } 

//   map.set(target, true)

//   for (const key in target) {
//     if (target.hasOwnProperty(key)) {
//       result[key] = deepCopy(target[key], map);
//     }
//   }
//   return result;
// }

// export default deepCopy;