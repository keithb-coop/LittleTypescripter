// Chapter Three

import {car, cdr, cons, isEq, isNull} from "./core";

export function rember(a, lat) {
    return (
        isNull(lat)
            ? null
            : (
                isEq(a, car(lat))
                    ? cdr(lat)
                    : cons(car(lat), rember(a, cdr(lat)))
            )
    );
}

export function firsts(l) {
    return (
        isNull(l)
            ? null
            : cons(car(car(l)), firsts(cdr(l)))
    );
}

export function insertR(neo, old, lat) {
    return (
        isNull(lat)
            ? null
            : (
                cons(car(lat), isEq(car(lat), old)
                    ? cons(neo, cdr(lat))
                    : insertR(neo, old, cdr(lat)))
            )
    );
}

export function insertL(neo, old, lat) {
    return (
        isNull(lat)
            ? null
            : (
                isEq(car(lat), old)
                    ? cons(neo, lat)
                    : cons(car(lat), insertL(neo, old, cdr(lat)))
            )
    );
}

export function subst(neo, old, lat) {
    return (
        isNull(lat)
            ? null
            : (
                isEq(car(lat), old)
                    ? cons(neo, cdr(lat))
                    : cons(car(lat), subst(neo, old, cdr(lat)))
            )
    );
}

export function subst2(neo, old1, old2, lat) {
    return (
        isNull(lat)
            ? null
            : (
                (isEq(car(lat), old1) || isEq(car(lat), old2))
                    ? cons(neo, cdr(lat))
                    : cons(car(lat), subst2(neo, old1, old2, cdr(lat)))
            )
    );
}

export function multirember(a, lat) {
    return (
        isNull(lat)
            ? null
            : (
                isEq(a, car(lat))
                    ? multirember(a, cdr(lat))
                    : cons(car(lat), multirember(a, cdr(lat)))
            )
    );
}

export function multiinsertR(neo, old, lat) {
    return (
        isNull(lat)
            ? null
            : (
                isEq(old, car(lat))
                    ? cons(old, cons(neo, multiinsertR(old, neo, cdr(lat))))
                    : multiinsertR(old, neo, cdr(lat))
            )
    );
}

export function multiinsertL(neo, old, lat) {
    return (
        isNull(lat)
            ? null
            : (isEq(old, car(lat))
                    ? cons(neo, cons(old, multiinsertL(old, neo, cdr(lat))))
                    : multiinsertL(old, neo, cdr(lat))
            )
    );
}

export function multisubst(neo, old, lat) {
    return (
        isNull(lat)
            ? null
            : (
                isEq(car(lat), old)
                    ? cons(neo, multisubst(neo, old, cdr(lat)))
                    : cons(car(lat), multisubst(neo, old, cdr(lat)))
            )
    );
}

