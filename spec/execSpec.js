describe('exec', function() {
    var obj = {
        a: _.identity
    }

    it('should execute a method with arguments', function() {
        expect(F.exec('a', 'foo')(obj)).toBe('foo');
    });
});