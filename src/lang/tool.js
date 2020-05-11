export function copyArray(targetArray, sourceArray) {

    let i = 0;
    for (; i < sourceArray.length; i++) {
        targetArray[i] = sourceArray[i];
    }

    for (let j = targetArray.length - 1; j >= i; j--) {
        delete targetArray[j];
    }

};