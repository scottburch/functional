F.Promise = F.MONAD(function(monad, value) {
    var value;
    var cb;
    monad.bind = function(fn) {
        value === undefined ? (cb = fn) : fn(value);
    };

    monad.resolve = function(v) {
        cb ? cb(v) : (value = v);
    };
    return value;
});
