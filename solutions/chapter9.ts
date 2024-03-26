// Chapter Nine

export function y(le) {
    return (function (f) {
        return f(f);
    }(function (f) {
        return le(function (x) {
            return f(f)(x);
        });
    }));
}

export function F(factorial) {
    return function (n) {
        return (
            n <= 2
                ? n
                : n * factorial(n - 1)
        );
    };
}

let factorial = y(F);

let number120 = factorial(5);