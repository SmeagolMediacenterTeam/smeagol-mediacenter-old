var parseBuildPlatforms = function (argumentPlatform) {
	// this will make it build no platform when the platform option is specified
	// without a value which makes argumentPlatform into a boolean
	var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

	// Do some scrubbing to make it easier to match in the regexes bellow
	inputPlatforms = inputPlatforms.replace("darwin", "mac");
	inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");

	var buildAll = /^all$/.test(inputPlatforms);

	var buildPlatforms = {
		mac: /mac/.test(inputPlatforms) || buildAll,
		win: /win/.test(inputPlatforms) || buildAll,
		linux32: /linux32/.test(inputPlatforms) || buildAll,
		linux64: /linux64/.test(inputPlatforms) || buildAll
	};

	return buildPlatforms;
};

module.exports = function (grunt) {
	"use strict";

	var buildPlatforms = parseBuildPlatforms(grunt.option('platforms'));
	var pkgJson = grunt.file.readJSON('package.json');
	var currentVersion = pkgJson.version;

	console.log (buildPlatforms);

	require('load-grunt-tasks')(grunt);


	grunt.registerTask('default', [
		'bower_clean',
		'nodewebkit'
	]);

	grunt.registerTask('start', function () {
		var start = parseBuildPlatforms();
		// if (start.win) {
		// 	grunt.task.run('exec:win');
		// } else if (start.mac) {
		// 	grunt.task.run('exec:mac');
		// } else if (start.linux32) {
		// 	grunt.task.run('exec:linux32');
		// } else if (start.linux64) {
		// 	grunt.task.run('exec:linux64');
		// } else {
			grunt.log.writeln('OS not supported.');
		// }
	});


	grunt.initConfig({

		nodewebkit: {
			options: {
				version: '0.9.2',
				build_dir: './build', // Where the build version of my node-webkit app is saved
				keep_nw: true,
				embed_nw: false,
				mac_icns: './src/app/images/smc.icns', // Path to the Mac icon file
				zip: buildPlatforms.win, // Zip nw for mac in windows. Prevent path too long if build all is used.
				mac: buildPlatforms.mac,
				win: buildPlatforms.win,
				linux32: buildPlatforms.linux32,
				linux64: buildPlatforms.linux64,
				download_url: 'https://github.com/Smeagolworms4/smeagol-mediacenter'
			},
			src: [
				'./src/**'      , '!./src/styl/**', './node_modules/**',
				'!./**/test*/**', '!./**/doc*/**' , '!./**/example*/**',
				'!./**/demo*/**', '!./**/bin/**'  , '!./**/build/**'   ,
				'!./**/.*/**'   , './package.json', './README.md'      ,
				'./LICENSE.txt' , './.git.json',
				'!./node_modules/bower/**',
				'!./node_modules/*grunt*/**',
				'!./node_modules/stylus/**'
			]
		}

	});

};