describe('F.Array', function() {
    var length;
    var add1;
    var arr;
    var spy;

    beforeEach(function() {
        length = jasmine.createSpy().and.callFake(function(arr) {return arr.length});
        add1 = jasmine.createSpy().and.callFake(function(v) {return v+1});
        arr = F.Array([1,2,3]);
        spy = jasmine.createSpy().and.callFake(_.identity);
    });

    it('should pass the input array to .bind', function() {
        expect(arr.bind(length)).toEqual(3);
        expect(length).toHaveBeenCalledWith([1,2,3]);
    });

    describe('map()', function() {
        it('should run the function on each element of the array returning a monad', function() {
            expect(arr.map(add1).map(add1).bind(spy)).toEqual([3,4,5]);
            expect(spy).toHaveBeenCalledWith([3,4,5]);
        });
    });


    describe('lift()', function() {
        it('should be used to mutate an array', function() {
            F.Array.lift('odds', function(v) {
                return _.filter(v, function(it) {return it % 2});
            });

            arr.odds().bind(spy);
            expect(spy).toHaveBeenCalledWith([1,3]);
        });
    });


});