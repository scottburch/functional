F.Maybe = F.MONAD(function (monad, value) {
    if (value === null || value === undefined) {
        monad.is_null = true;
        monad.bind = function () {
            return monad;
        };
        return null;
    }
    return value;
});
