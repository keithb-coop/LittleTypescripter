// Chapter Seven

import {car, cdr, cons, isNull} from "../lib/core";
import{isMember} from "./chapter2.ts"
import {firsts, multirember} from "./chapter3.ts"
import {isEqn, length} from "./chapter4.ts"

export function isSet(lat) {
    return (
        isNull(lat)
            ? true
            : (
                isMember(car(lat), cdr(lat))
                    ? false
                    : isSet(cdr(lat))
            )
    );
}

export function makeset(lat) {
    return (
        isNull(lat)
            ? null
            : cons(car(lat), makeset(multirember(car(lat), cdr(lat))))
    );
}

export function isSubset(set1, set2) {
    return (
        isNull(set1)
        || (isMember(car(set1), set2) && isSubset(cdr(set1), set2))
    );
}

export function isEqset(set1, set2) {
    return isSubset(set1, set2) && isSubset(set2, set1);
}

export function isIntersect(set1, set2) {
    return (
        isNull(set1)
            ? false
            : isMember(car(set1), set2) || isIntersect(cdr(set1), set2)
    );
}

export function intersect(set1, set2) {
    return (
        isNull(set1)
            ? null
            : (
                isMember(car(set1), set2)
                    ? cons(car(set1), intersect(cdr(set1), set2))
                    : intersect(cdr(set1), set2)
            )
    );
}

export function union(set1, set2) {
    return (
        isNull(set1)
            ? set2
            : (
                isMember(car(set1), set2)
                    ? union(cdr(set1), set2)
                    : cons(car(set1), union(cdr(set1), set2))
            )
    );
}

export function difference(set1, set2) {
    return (
        isNull(set1)
            ? null
            : (
                isMember(car(set1), set2)
                    ? difference(cdr(set1), set2)
                    : cons(car(set1), difference(cdr(set1), set2))
            )
    );
}

export function intersectall(lset) {
    return (
        isNull(lset)
            ? car(lset)
            : intersect(car(lset), intersectall(cdr(lset)))
    );
}

export function isPair(l) {
    return isEqn(length(l), 2);
}

export const first = car;

export function second(l) {
    return car(cdr(l));
}

export function build(s1, s2) {
    return cons(s1, cons(s2, null));
}

export function third(l) {
    return car(cdr(cdr(l)));
}

export function isFun(rel) {
    return isSet(firsts(rel));
}

export function revrel(rel) {
    return (
        isNull(rel)
            ? null
            : cons(build(second(car(rel)), first(car(rel))), revrel(cdr(rel)))
    );
}

export function revpair(p) {
    return build(second(p), first(p));
}

export function revrel(rel) {
    return (
        isNull(rel)
            ? null
            : cons(revpair(car(rel)), revrel(cdr(rel)))
    );
}

export function seconds(l) {
    return (
        isNull(l)
            ? null
            : cons(second(car(l)), seconds(cdr(l)))
    );
}

export function isFullfun(fun) {
    return isSet(seconds(fun));
}

export function isOneToOne(fun) {
    return isFun(revrel(fun));
}

