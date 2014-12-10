describe('state monad', function() {
    var stateMonad;
    var keypress = jasmine.createSpy().and.callFake(doKeypress);
    var spy = jasmine.createSpy();

    beforeEach(function () {
        stateMonad = F.State(F.Identity('')).setState(0);
    });


    it('should pass value and state to bind function', function () {
        stateMonad.bind(spy);
        expect(spy).toHaveBeenCalledWith({value: '', state: 0});
    });

    it('should return the monad from the bound function', function() {
        stateMonad.bind(keypress, 'h').bind(keypress, 'e').bind(keypress, 'l').bind(spy);
        expect(spy).toHaveBeenCalledWith({value: 'hel', state:3})
    });

    function doKeypress(tuple, key) {
        return F.State(F.Identity(tuple.value+key)).setState(tuple.value.length+1);
    }


});
