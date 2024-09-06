function isObject(obj: any): obj is Record<string, any> {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

export function areObjectsEqual(obj1: any, obj2: any): boolean {
    if (!isObject(obj1) || !isObject(obj2)) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    return keys1.every((key) => obj1[key] === obj2[key]);
}
