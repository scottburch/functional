describe('F.Promise monad', function() {
    var prom;
    var bindSpy;

    beforeEach(function() {
        prom = F.Promise();
        bindSpy = jasmine.createSpy();
    });

    it('should run the bind function right away if the promise has already been resolved', function() {
        prom.resolve(10);
        prom.bind(bindSpy);
        expect(bindSpy).toHaveBeenCalledWith(10);
    });

    it('should run the bind function when the promise has been resolved', function() {
        prom.bind(bindSpy);
        expect(bindSpy).not.toHaveBeenCalled();
        prom.resolve(10);
        expect(bindSpy).toHaveBeenCalledWith(10);
    });

    it('should chain with bind', function() {
        prom.bind(chainX).bind(chainX).bind(chainX).bind(bindSpy);
        expect(bindSpy).not.toHaveBeenCalled();
        prom.resolve('y');
        expect(bindSpy).toHaveBeenCalledWith('yxxx');
    });

    function chainX(v) {
        return F.Identity(v+'x');
    }
});