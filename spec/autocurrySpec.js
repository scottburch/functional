describe('autocurry()', function() {
    var sum;

    beforeEach(function() {
        sum = function(a,b) {
            return a+b;
        }.autoCurry();
    });


    it('changes a function so that it will return a partially applied function until it receives all of its arguments', function() {
        expect(sum(1,2)).toBe(3);
        expect(sum(1)(2)).toBe(3);
        expect(sum()(1)(2)).toBe(3);
    });
});