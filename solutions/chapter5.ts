// Chapter Five

import {add1, car, cdr, cons, isAtom, isEq, isNull} from "../lib/core";
import {isEqan, plus} from "./chapter4"

export function remberstar(a, l) {
    return (
        isNull(l)
            ? null
            : (
                isAtom(car(l))
                    ? (
                        isEq(car(l), a)
                            ? remberstar(a, cdr(l))
                            : cons(car(l), remberstar(a, cdr(l)))
                    )
                    : cons(remberstar(a, car(l)), remberstar(a, cdr(l)))
            )
    );
}

export function insertRstar(neo, old, l) {
    return (
        isNull(l)
            ? null
            : (
                isAtom(car(l))
                    ? (
                        isEq(car(l), old)
                            ? cons(old, cons(neo, insertRstar(neo, old, cdr(l))))
                            : cons(car(l), insertRstar(neo, old, cdr(l)))
                    )
                    : cons(insertRstar(neo, old, car(l)), insertRstar(neo, old, cdr(l)))
            )
    );
}

export function occurstar(a, l) {
    return (
        isNull(l)
            ? 0
            : (
                isAtom(car(l))
                    ? (
                        isEq(car(l), a)
                            ? add1(occurstar(a, cdr(l)))
                            : occurstar(a, cdr(l))
                    )
                    : plus(occurstar(a, car(l)), occurstar(a, cdr(l)))
            )
    );
}

export function subststar(neo, old, l) {
    return (
        isNull(l)
            ? null
            : cons(
                (
                    isAtom(car(l))
                        ? (
                            isEq(car(l), old)
                                ? neo
                                : car(l)
                        )
                        : insertRstar(neo, old, car(l))
                ),
                subststar(neo, old, cdr(l))
            )
    );
}

export function insertLstar(neo, old, l) {
    return (
        isNull(l)
            ? null
            : (
                isAtom(car(l))
                    ? (
                        isEq(car(l), old)
                            ? cons(neo, cons(old, insertLstar(neo, old, cdr(l))))
                            : cons(car(l), insertLstar(neo, old, cdr(l)))
                    )
                    : cons(insertLstar(neo, old, car(l)), insertLstar(neo, old, cdr(l)))
            )
    );
}

export function memberstar(a, l) {
    return (
        isNull(l)
            ? false
            : (
                isAtom(l)
                    ? isEq(car(l), a)
                    : memberstar(a, car(l)) || memberstar(a, cdr(l))
            )
    );
}

export function leftmost(l) {
    return (
        isAtom(car(l))
            ? car(l)
            : leftmost(car(l))
    );
}

export function isEqlist(l1, l2) {
    return (
        (isNull(l1) && isNull(l2))
            ? true
            : (
                (isNull(l1) || isNull(l2))
                    ? false
                    : (
                        (isAtom(car(l1)) && isAtom(car(l2)))
                            ? isEqan(car(l1), car(l2)) && isEqlist(cdr(l1), cdr(l2))
                            : (
                                (isAtom(car(l1)) || isAtom(car(l2)))
                                    ? false
                                    : isEqlist(car(l1), car(l2)) && isEqlist(cdr(l1), cdr(l2))
                            )
                    )
            )
    );
}

export function isEqual(s1, s2) {
    return (
        (isAtom(s1) && isAtom(s2))
            ? isEqan(s1, s2)
            : (
                (isAtom(s1) || isAtom(s2))
                    ? false
                    : isEqlist(s1, s2)
            )
    );
}

export function isEqlist(l1, l2) {
    return (
        (isNull(l1) && isNull(l2))
            ? true
            : (
                (isNull(l1) || isNull(l2))
                    ? false
                    : isEqual(car(l1), car(l2)) && isEqual(cdr(l1), cdr(l2))
            )
    );
}


export function rember(s, l) {
    return (
        isNull(l)
            ? null
            : (
                isEqual(car(l), s)
                    ? cdr(l)
                    : cons(car(l), rember(s, cdr(l)))
            )
    );
}

