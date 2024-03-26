
// Chapter Two

import {car, cdr, isAtom, isEq, isNull} from "../lib/core";

export function isLat(s) {
    return isNull(s) || (isAtom(car(s)) && isLat(cdr(s)));
}

export function isMember(a, lat) {
    return (
        isNull(lat)
            ? false
            : isEq(a, car(lat)) || isMember(a, cdr(lat))
    );
}

