F.Promise = F.MONAD(function (monad, initialValue) {
    var value;
    var cb;
    var chainPromise;
    monad.isPromise = true;

    monad.bind = function (fn) {
        if (value === undefined) {
            cb = fn;
            chainPromise = F.Promise();
            return chainPromise;
        } else {
            return fn(value);
        }
    };

    monad.resolve = function (v) {
        value = v;
        if (cb) {
            var mValue = cb(v);
            if (chainPromise && mValue) {
                var cbValue;
                mValue.bind(function (v) {
                    cbValue = v;
                });
                chainPromise.resolve(cbValue);
            }
        }
    };
});
