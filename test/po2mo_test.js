'use strict';

var grunt = require('grunt');

exports.po2mo = {
  setUp: function(done) {
    done();
  },
  stage: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/fr/message.mo');
    var expected = grunt.file.read('test/expected/fr/message.mo');

    test.equal(actual, expected);

    test.done();
  },
  prod: function(test) {
    test.expect(1);

    var expected = grunt.file.exists('tmp/fr/message.po');
    test.equal(expected, false);

    test.done();
  },
  multiple: function(test){
    test.expect(1);

    var expectedMo1 = grunt.file.exists('test/fixtures/fr/message1.mo');
    var expectedMo2 = grunt.file.exists('test/fixtures/fr/message2.mo');
    test.equal(expectedMo1, true);
    test.equal(expectedMo2, true);
    grunt.file.delete('test/fixtures/fr/message1.mo');
    grunt.file.delete('test/fixtures/fr/message2.mo');

    test.done();
  }
};
