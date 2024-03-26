// Chapter Eight

import {
    add1,
    car,
    cdr,
    cons,
    isAtom,
    isEq,
    isNull
} from "../lib/core";

import {isEqn, plus, power, quotient, star} from "./chapter4.ts"
import {firstSubExp, secondSubExp, operator} from "./chapter6.ts"

export function remberF(test, a, l) {
    return (
        isNull(l)
            ? null
            : (
                test(car(l), a)
                    ? cdr(l)
                    : cons(car(l), remberF(test, a, cdr(l)))
            )
    );
}

export function isEqC(a) {
    return function (x) {
        return isEq(x, a);
    };
}

let isEq_salad = isEqC("salad");

export function remberFCurry(test) {
    return function (a, l) {
        return (
            isNull(l)
                ? null
                : (
                    test(car(l), a)
                        ? cdr(l)
                        : cons(car(l), remberFCurry(test)(a, cdr(l)))
                )
        );
    };
}

export function insertG(sisEq) {
    return function (neo, old, l) {
        return (
            isNull(l)
                ? null
                : (
                    isEq(car(l), old)
                        ? sisEq(neo, old, cdr(l))
                        : cons(car(l), insertG(sisEq)(neo, old, cdr(l)))
                )
        );
    };
}

export function sisEqL(neo, old, l) {
    return cons(neo, cons(old, l));
}

export function sisEqR(neo, old, l) {
    return cons(old, cons(neo, l));
}

export function sisEqS(neo, old, l) {
    return cons(neo, l);
}

export function sisEqrem(neo, old, l) {
    return l;
}

let insertL = insertG(sisEqL);
let insertR = insertG(sisEqR);
let subst = insertG(sisEqS);
let rember = insertG(sisEqrem);

export function atomToFunction(x) {
    return (
        isEq(x, "+")
            ? plus
            : (
                isEq(x, "*")
                    ? star
                    : power
            )
    );
}

export function value(aexp) {
    return (
        isAtom(aexp)
            ? aexp
            : atomToFunction(operator(aexp))(value(firstSubExp(aexp)),
                value(secondSubExp(aexp)))
    );
}

export function multiremberF(test) {
    return function (a, lat) {
        return (
            isNull(lat)
                ? null
                : (
                    test(a, car(lat))
                        ? multiremberF(test)(a, cdr(lat))
                        : cons(car(lat), multiremberF(test)(a, cdr(lat)))
                )
        );
    };
}

let multiremberisEq = multiremberF(isEq);

let isEq_tuna = isEqC("tuna");

export function multiremberT(test, lat) {
    return (
        isNull(lat)
            ? null
            : (
                test(car(lat))
                    ? multiremberT(test, cdr(lat))
                    : cons(car(lat), multiremberT(test, cdr(lat)))
            )
    );
}

export function multiremberCO(a, lat, col) {
    return (
        isNull(lat)
            ? col(null, null)
            : (
                isEq(car(lat), a)
                    ? multiremberCO(a, cdr(lat), function (newlat, seen) {
                        return col(newlat, cons(car(lat), seen));
                    })
                    : multiremberCO(a, cdr(lat), function (newlat, seen) {
                        return col(cons(car(lat), newlat), seen);
                    })
            )
    );
}

export function aFriend(x, y) {
    return isNull(y);
}

export function multiinsertLR(neo, oldL, oldR, lat) {
    return (
        isNull(lat)
            ? null
            : (
                isEq(car(lat), oldL)
                    ? cons(neo, cons(oldL, multiinsertLR(neo, oldL, oldR, cdr(lat))))
                    : (
                        isEq(car(lat), oldR)
                            ? cons(
                                oldR,
                                cons(neo, multiinsertLR(neo, oldL, oldR, cdr(lat)))
                            )
                            : cons(car(lat), multiinsertLR(neo, oldL, oldR, cdr(lat)))
                    )
            )
    );
}

export function multiinsertLRCO(neo, oldL, oldR, lat, col) {
    return (
        isNull(lat)
            ? null
            : (
                isEq(car(lat), oldL)
                    ? multiinsertLRCO(
                        neo,
                        oldL,
                        oldR,
                        cdr(lat),
                        function (newlat, L, R) {
                            return col(cons(neo, cons(oldL, newlat)), add1(L), R);
                        }
                    )
                    : (
                        isEq(car(lat), oldR)
                            ? multiinsertLRCO(
                                neo,
                                oldL,
                                oldR,
                                cdr(lat),
                                function (newlat, L, R) {
                                    return col(cons(oldR, cons(neo, newlat)), L, add1(R));
                                }
                            )
                            : multiinsertLRCO(
                                neo,
                                oldL,
                                oldR,
                                cdr(lat),
                                function (newlat, L, R) {
                                    return col(cons(car(lat), newlat), L, R);
                                }
                            )
                    )
            )
    );
}

export function isEven(n) {
    return isEqn(n, star(2, quotient(n, 2)));
}

export function evensOnlystar(l) {
    return (
        isNull(l)
            ? null
            : (
                isAtom(car(l))
                    ? (
                        isEven(car(l))
                            ? cons(car(l), evensOnlystar(cdr(l)))
                            : evensOnlystar(cdr(l))
                    )
                    : cons(evensOnlystar(car(l)), evensOnlystar(cdr(l)))
            )
    );
}



