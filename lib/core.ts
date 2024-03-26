// The Little JavaScripter
// http://www.crockford.com/javascript/little.js

// 2019-05-27


/*jslint this: true */

let global = this;


// Little Scheme primitives

export function add1(n) {
    return n + 1;
}

export function car(s) {
    return s[0];
}

export function cdr(s) {
    return s[1];
}

export function cons(a, d) {
    return [a, d];
}

export function isAtom(a) {
    return (
        typeof a === "string"
        || typeof a === "number"
        || typeof a === "boolean"
    );
}

export function isBoolean(a) {
    return typeof a === "boolean";
}

export function isNull(a) {
    return a === undefined || a === null;
}

export function isEq(s, t) {
    return s === t || (isNull(s) && isNull(t));
}

export function isFunction(a) {
    return typeof a === "function";
}

export function isList(a) {
    return Array.isArray(a);
}

export function isNumber(a) {
    return Number.isFinite(a);
}

export function isUndefined(a) {
    return a === undefined;
}

export function isZero(s) {
    return s === 0;
}

export function sub1(n) {
    return n - 1;
}


// Produce a printable presentation of an s-expression

export function p(x) {
    let r;
    if (isList(x)) {
        r = "(";
        do {
            r += p(car(x)) + " ";
            x = cdr(x);
        } while (isList(x));
        if (r.charAt(r.length - 1) === " ") {
            r = r.substr(0, r.length - 1);
        }
        if (isAtom(x)) {
            r += " . " + x;
        }
        return r + ")";
    }
    if (isNull(x)) {
        return "()";
    }
    return x;
}

let rx_token = /\s*([\(\)']|[^\s()']+)?/gmy;

// Produce an array of s-expressions from a source string.

let s = function (source) {
    let result = [];
    let expr;
    let num;
    rx_token.lastIndex = 0;
    return (function array() {
        expr = (function expression() {
            let head = null;
            let neo = null;
            let match = rx_token.exec(source);
            let sexp = (match && match[1]) || "";
            let tail = null;

            if (sexp === "(") {
                while (true) {
                    sexp = expression();
                    if (sexp === "" || sexp === ")") {
                        return head;
                    }
                    neo = [sexp];
                    if (tail) {
                        tail[1] = neo;
                    } else {
                        tail = neo;
                        head = neo;
                    }
                    tail = neo;
                }
            } else if (!sexp) {
                sexp = source.slice(rx_token.lastIndex);
                if (sexp) {
                    rx_token.lastIndex = source.length;
                    return "ERROR: " + sexp;
                } else {
                    return "";
                }
            } else if (sexp === "'") {
                return ["quote", [expression()]];
            } else {
                num = Number(sexp);
                return (
                    (Number.isFinite(num) && sexp.length > 0)
                        ? num
                        : sexp
                );
            }
        }());
        if (expr) {
            result.push(expr);
            return array();
        } else {
            return result;
        }
    }())
};
