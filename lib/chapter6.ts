// Chapter Six

import {car, cdr} from "./core";

export const operator = car;

export function firstSubExp(aexp) {
    return car(cdr(aexp));
}

export function secondSubExp(aexp) {
    return car(cdr(cdr(aexp)));
}

