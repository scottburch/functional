F.Either = function(defValue, value) {
    var eitherMonad = F.MONAD();
    return value === undefined || value === null ? eitherMonad(defValue) : eitherMonad(value);
}.autoCurry();

