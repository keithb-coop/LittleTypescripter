import {add1, car, cdr, cons, isEq, isNull, isNumber, isZero, sub1} from "./core";

// Chapter Four

export function plus(n, m) {
    return (
        isZero(m)
            ? n
            : add1(plus(n, sub1(m)))
    );
}

export function minus(n, m) {
    return (
        isZero(m)
            ? n
            : sub1(minus(n, sub1(m)))
    );
}

export function addtup(tup) {
    return (
        isNull(tup)
            ? 0
            : plus(car(tup), addtup(cdr(tup)))
    );
}

export function star(n, m) {
    return (
        isZero(m)
            ? 0
            : plus(n, star(n, sub1(m)))
    );
}

export function tupplus(tup1, tup2) {
    return (
        isNull(tup1)
            ? tup2
            : (
                isNull(tup2)
                    ? tup1
                    : cons(plus(car(tup1), car(tup2)), tupplus(cdr(tup1), cdr(tup2)))
            )
    );
}

export function gt(n, m) {
    return (
        isZero(n)
            ? false
            : isZero(m) || gt(sub1(n), sub1(m))
    );
}

export function lt(n, m) {
    return (
        isZero(m)
            ? false
            : isZero(n) || lt(sub1(n), sub1(m))
    );
}

export function isEqn(n, m) {
    return !gt(n, m) && !lt(n, m);
}

export function power(n, m) {
    return (
        isZero(m)
            ? 1
            : star(n, power(n, sub1(m)))
    );
}

export function quotient(n, m) {
    return (
        lt(n, m)
            ? 0
            : add1(quotient(minus(n, m), m))
    );
}

export function length(lat) {
    return (
        isNull(lat)
            ? 0
            : add1(length(cdr(lat)))
    );
}

export function pick(n, lat) {
    return (
        isZero(sub1(n))
            ? car(lat)
            : pick(sub1(n), cdr(lat))
    );
}

export function rempick(n, lat) {
    return (
        isZero(sub1(n))
            ? cdr(lat)
            : cons(car(lat), rempick(sub1(n), cdr(lat)))
    );
}

export function noNums(lat) {
    return (
        isNull(lat)
            ? null
            : (
                isNumber(car(lat))
                    ? noNums(cdr(lat))
                    : cons(car(lat), noNums(cdr(lat)))
            )
    );
}

export function allNums(lat) {
    return (
        isNull(lat)
            ? null
            : (
                isNumber(car(lat))
                    ? cons(car(lat), allNums(cdr(lat)))
                    : allNums(cdr(lat))
            )
    );
}

export function isEqan(a1, a2) {
    return (
        (isNumber(a1) && isNumber(a2))
            ? isEqn(a1, a2)
            : (
                (isNumber(a1) || isNumber(a2))
                    ? false
                    : isEq(a1, a2)
            )
    );
}

export function occur(a, lat) {
    return (
        isNull(lat)
            ? 0
            : (
                isEq(car(lat), a)
                    ? add1(occur(a, cdr(lat)))
                    : occur(a, cdr(lat))
            )
    );
}

export function isOne(n) {
    return isEqn(n, 1);
}

export function rempick(n, lat) {
    return (
        isOne(n)
            ? cdr(lat)
            : cons(car(lat), rempick(sub1(n), cdr(lat)))
    );
}

