describe('F.Maybe monad', function() {
    var spy;

    beforeEach(function() {
        spy = jasmine.createSpy()

    });

    it('should call the bound function with the value if value is not nothing', function() {
        F.Maybe(10).bind(spy);
        expect(spy).toHaveBeenCalledWith(10);
    });

    it('should not call the bound function if the value is nothing', function() {
        F.Maybe(null).bind(spy);
        expect(spy).not.toHaveBeenCalled();

        F.Maybe(undefined).bind(spy);
        expect(spy).not.toHaveBeenCalled();
    });


});