// Chapter Six

import {car, cdr} from "../lib/core";

export const operator = car;

export function firstSubExp(aexp) {
    return car(cdr(aexp));
}

export function secondSubExp(aexp) {
    return car(cdr(cdr(aexp)));
}

