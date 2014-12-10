F.State = F.MONAD(function(monad, mValue) {
    var state;

    monad.setState = function(s) {
        state = s;
        return monad;
    };

    monad.bind = function(fn) {
        var args = Array.prototype.slice.call(arguments,1);
        return mValue.bind(function(v) {
            return fn.apply(undefined, [{value: v, state: state}].concat(args));
        });
    };
});

