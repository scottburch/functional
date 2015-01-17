F.exec = function(name, obj) {
    var args = _.toArray(arguments).slice(2);
    return obj[name].apply(obj, args);
}.autoCurry();