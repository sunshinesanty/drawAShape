module Weather.Common.GeneralFunctions {

    export function fixedLenNumber() {
        return function (n: string, len: string) {
            var num = parseInt(n, 10);
            var length = parseInt(len, 10);
            if (isNaN(num) || isNaN(length)) {
                return n;
            }
            var tempNum = num.toString();
            var numString = '' + tempNum;
            while (numString.length < length) {
                numString = '0' + tempNum;
                tempNum = numString;
            }
            return numString;
        }
    }

    export var sort = (arr: any[], by: string): any[]=> {
        if (arr.length > 0) {
            return arr.sort((a, b) => {
                if (a[by] !== null && b[by] !== null) {
                    if (a[by] < b[by]) return -1;
                    if (a[by] > b[by]) return 1;
                    return 0;
                }
                else
                    return 0;
            });
        }
        else
            return arr;
    }

    export var sortDesc = (arr: any[], by: string): any[]=> {
        if (arr.length > 0) {
            return arr.sort((a, b) => {
                if (a[by] !== null && b[by] !== null) {
                    if (b[by] < a[by]) return -1;
                    if (b[by] > a[by]) return 1;
                    return 0;
                }
                else
                    return 0;
            });
        }
        else
            return arr;
    }
}