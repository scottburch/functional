describe('F.Either monad', function() {
    var spy;

    beforeEach(function() {
        spy = jasmine.createSpy();
    });

    it('should return a monad with the default value if the value is undefined', function() {
        F.Either(1,undefined).bind(spy);
        expect(spy).toHaveBeenCalledWith(1);
    });

    it('should return a monad with the default value if the value is null', function() {
        F.Either(1, null).bind(spy);
        expect(spy).toHaveBeenCalledWith(1);
    });

    it('should return a monad with the value if the value is not null or undefined', function() {
        F.Either(1,2).bind(spy);
        expect(spy).toHaveBeenCalledWith(2);
    });

    it('should autoCurry', function() {
        F.Either(1)(2).bind(spy);
        expect(spy).toHaveBeenCalledWith(2)
    });
});