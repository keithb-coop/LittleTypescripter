// Chapter Ten

// Many of these functions we changed in order to take better advantage of
// the JavaScript environment.

import {
    car,
    cdr,
    cons,
    isAtom,
    isBoolean,
    isEq, isFunction,
    isNull,
    isNumber, isUndefined,
    isZero,
} from "./core";

import {build, first, second, third} from "./chapter7.ts"

let newEntry = build;

export function lookupInEntryHelp(name, names, values, entryF) {
    return (
        isNull(names)
            ? entryF(name)
            : (
                isEq(car(names), name)
                    ? car(values)
                    : lookupInEntryHelp(names, cdr(names), cdr(values), entryF)
            )
    );
}

export function lookupInEntry(name, entry, entryF) {
    return lookupInEntryHelp(name, first(entry), second(entry), entryF);
}

let extendTable = cons;
let textOf = second;
let tableOf = first;
let formalsOf = second;
let bodyOf = third;
let functionOf = car;
let argumentsOf = cdr;
let questionOf = first;
let answerOf = second;
let condLinesOf = cdr;
let apply;
let expressionToAction;

export function isElse(x) {
    return isAtom(x) && isEq(x, "else");
}

export function lookupInContext(name, context) {
    return context[name];
}

export function lookupInTable(name, table, tableF) {
    return (
        isNull(table)
            ? tableF(name)
            : lookupInEntry(name, car(table), function (name) {
                return lookupInTable(name, cdr(table), tableF);
            })
    );
}

let $global = {
    "true": true,
    "false": false,
    "nil": null,
    "#t": true,
    "#f": false,
    "eq?": ["primitive", [isEq]],
    "null?": ["primitive", [isNull]],
    "zero?": ["primitive", [isZero]]
};

export function meaning(e, context) {
    return expressionToAction(e)(e, context);
}

export function value(e) {
    return meaning(e, $global);
}

export function evlis(args, context) {
    return (
        isNull(args)
            ? null
            : cons(meaning(car(args), context), evlis(cdr(args), context))
    );
}

export function listToAction(e) {
    return $specialform[car(e)] || function (e, context) {
        return apply(meaning(functionOf(e), context),
            evlis(argumentsOf(e), context));
    };
}

expressionToAction = function expressionToAction(e) {
    return (
        isAtom(e)
            ? function $identifier(e, context) {
                if (isNumber(e) || isBoolean(e)) {
                    return e;
                }
                let i = lookupInContext(e, context);
                if (!isUndefined(i)) {
                    return i;
                }
                i = global[e];
                if (isFunction(i)) {
                    return build("primitive", i);
                }
                return build("error", e);
            }
            : (
                isNull(e)
                    ? null
                    : listToAction(e)
            )
    );
};

export function evcon(lines, context) {
    return (
        isElse(questionOf(car(lines)))
            ? meaning(answerOf(car(lines)), context)
            : (
                meaning(questionOf(car(lines)), context)
                    ? meaning(answerOf(car(lines)), context)
                    : evcon(cdr(lines), context)
            )
    );
}

$specialform = {
    quote: function (e, context) {
        return textOf(e);
    },
    lambda: function (e, context) {
        return build("nonPrimitive", cons(context, cdr(e)));
    },
    cond: function (e, context) {
        debugger;/////////////////////
        return evcon(condLinesOf(e), context);
    },
    define: function (e, context) {
        let mean = meaning(third(e), context);
        context[second(e)] = mean;
        return mean;
    },
    and: function $and(e, context) {
        return (
            isNull(cdr(e))
                ? false
                : (function a(e) {
                    return (
                        isNull(e)
                            ? true
                            : (
                                meaning(car(e), context)
                                    ? a(cdr(e))
                                    : false
                            )
                    );
                }(cdr(e)))
        );
    },
    or: function (e, context) {
        return (function a(e) {
            return (
                isNull(e)
                    ? false
                    : (
                        meaning(car(e), context)
                            ? true
                            : a(cdr(e))
                    )
            );
        }(cdr(e)));
    }
};

let $specialform = {
    quote: function (e, context) {
        return textOf(e);
    },
    lambda: function (e, context) {
        return build("nonPrimitive", cons(context, cdr(e)));
    },
    cond: function (e, context) {
        return evcon(condLinesOf(e), context);
    },
    define: function (e, context) {
        let mean = meaning(third(e), context);
        context[second(e)] = mean;
        return mean;
    },
    and: function $and(e, context) {
        return (
            isNull(cdr(e))
                ? false
                : (function a(e) {
                    return (
                        isNull(e)
                            ? true
                            : (
                                meaning(car(e), context)
                                    ? a(cdr(e))
                                    : false
                            )
                    );
                }(cdr(e)))
        );
    },
    or: function (e, context) {
        return (function a(e) {
            return (
                isNull(e)
                    ? false
                    : (
                        meaning(car(e), context)
                            ? true
                            : a(cdr(e))
                    )
            );
        }(cdr(e)));
    }
};

export function applyPrimitive(fun, vals) {
    return fun.apply(null, (function flatten(l) {
        let a = [];
        while (!isNull(l)) {
            a.push(car(l));
            l = cdr(l);
        }
        return a;
    }(vals)));
}

export function newContext(names, vals, oldContext) {
    let c = (
        oldContext
            ? Object.create(oldContext)
            : {}
    );
    names.forEach(function (name, index) {
        c[name] = vals[index];
    });
    return c;
}

export function applyClosure(closure, vals) {
    return meaning(bodyOf(closure),
        newContext(formalsOf(closure), vals, tableOf(closure)));
}

apply = function apply(fun, vals) {
    return (
        isAtom(fun)
            ? fun
            : (
                isEq(first(fun), "primitive")
                    ? applyPrimitive(second(fun), vals)
                    : (
                        isEq(first(fun), "nonPrimitive")
                            ? applyClosure(second(fun), vals)
                            : fun
                    )
            )
    );
};
