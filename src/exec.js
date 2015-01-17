F.exec = function(name) {
    var args = _.toArray(arguments).slice(1);
    return function(obj) {
        return obj[name].apply(obj, args);
    }
}.autoCurry();