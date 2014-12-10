describe('monad()', function () {
    var IntMonad;
    var add1,times2;
    var resultSpy;
    var sum;

    beforeEach(function () {
        IntMonad = F.MONAD();
        add1 = jasmine.createSpy().and.callFake(function(v) {return v+1});
        times2 = jasmine.createSpy().and.callFake(function(v) {return v*2});
        resultSpy = jasmine.createSpy();
    });

    describe('Monad.bind()', function () {
        it('returns an object with a bind method which passes the value to the passed function', function () {
            expect(IntMonad(10).bind(add1)).toBe(11);
            expect(add1).toHaveBeenCalledWith(10);
        });
    });

    describe('Monad.lift()', function() {
        it("takes a function that accepts a value and adds it as a method on the monad - also returns a monad", function() {
            IntMonad.lift('add1', add1);
            IntMonad.lift('times2', times2);
            IntMonad(10).add1().times2().bind(resultSpy);
            expect(add1).toHaveBeenCalledWith(10);
            expect(times2).toHaveBeenCalledWith(11);
            expect(resultSpy).toHaveBeenCalledWith(22);
        });

        it('should also work with arguments', function() {
            IntMonad.lift('add', sum);
            IntMonad(10).add(3).bind(resultSpy);
            expect(resultSpy).toHaveBeenCalledWith(13);
        });
    });

    describe('Monad.liftValue()', function() {
        it('takes a function that accepts a value and adds it as a method on the monad - returns the value and not a monad', function() {
            IntMonad.liftValue('add1', add1);
            expect(IntMonad(10).add1()).toBe(11);
            expect(add1).toHaveBeenCalledWith(10);
        });
    });

    var sum = function(a,b) {
        return a+b;
    }.autoCurry()
});


