/*
 * grunt-po2mo
 * https://github.com/MicheleBertoli/grunt-po2mo
 *
 * Copyright (c) 2013 Michele Bertoli
 * Licensed under the MIT license.
 */
'use strict';

var exec = require('sync-exec');

module.exports = function (grunt) {

    grunt.registerMultiTask('po2mo', 'Compile .po files into binary .mo files with msgfmt.', function () {

        var options = this.options({
            deleteSrc: false,
        });

        var renameFile = function (src, dest) {
            if (dest.indexOf('.po') > -1) {
                dest = dest.replace('.po', '.mo');
            }

            var command = 'msgfmt -o ' + dest + ' ' + src;

            grunt.verbose.writeln('Executing: ' + command);
            var result = exec(command);
            grunt.verbose.writeln('Executed with status: ' + result.status);

            if (result.status !== 0) {
                grunt.log.error(result.stderr);
            }
        };

        this.files.forEach(function (file) {
            var arraySrc  = file.src;
            var arrayDest = file.dest;

            if (!arrayDest) {
                for (var i = 0; i < arraySrc.length; i++) {
                    var fileSrc = arraySrc[i];
                    renameFile(fileSrc, fileSrc);
                }
            } else {
                renameFile(arraySrc, arrayDest);
            }

            if (options.deleteSrc) {
                grunt.file.delete(arraySrc);
            }
        });

    });

};
