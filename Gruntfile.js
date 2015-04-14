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

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'bower_clean',
		'nodewebkit'
	]);
	
	grunt.registerTask('init', [
		'shell:mkdir',
		'gitclone'
	]);

	grunt.registerTask('start', [
		'nodewebkit',
		'launch'
	]);

	grunt.registerTask('launch', function () {
		var start = parseBuildPlatforms();

		if (start.win) {
			grunt.task.run('exec:win');
		} else if (start.mac) {
			grunt.task.run('exec:mac');
		} else if (start.linux32) {
			grunt.task.run('exec:linux32');
		} else if (start.linux64) {
			grunt.task.run('exec:linux64');
		} else {
			grunt.log.writeln('OS not supported.');
		}
	});

	grunt.initConfig({
		nodewebkit: {
			options: {
				version: '0.9.2',
				build_dir: './build', // Where the build version of my node-webkit app is saved
				keep_nw: true,
				embed_nw: false,
				mac_icns: './web/images/smc.icns', // Path to the Mac icon file
				macZip: buildPlatforms.win, // Zip nw for mac in windows. Prevent path too long if build all is used.
				mac: buildPlatforms.mac,
				win: buildPlatforms.win,
				linux32: buildPlatforms.linux32,
				linux64: buildPlatforms.linux64,
				download_url: 'http://get.popcorntime.io/nw/'
			},

			src: [
				'./src/**', 
				'./web/**', 
				'./vendors/**',
				'./annotations/**',

				'./node_modules/**',
				'!./node_modules/*grunt*/**',
				
				'!./**/test*/**', '!./**/doc*/**' , '!./**/example*/**',
				'!./**/demo*/**', '!./**/bin/**'  , '!./**/build/**'   ,
				'!./**/.*/**'   , './package.json', './README.md'      ,
				'./LICENSE.txt' , './.git.json'
			]
		},

		exec: {

			win: {
				cmd: '"build/cache/win/<%= nodewebkit.options.version %>/nw.exe" .'
			},
			mac: {
				cmd: 'build/cache/mac/<%= nodewebkit.options.version %>/node-webkit.app/Contents/MacOS/node-webkit .'
			},
			linux32: {
				cmd: '"build/cache/linux32/<%= nodewebkit.options.version %>/nw" .'
			},
			linux64: {
				cmd: '"build/cache/linux64/<%= nodewebkit.options.version %>/nw" .'
			},

		},
		
		shell: {

			mkdir: {

				command: [
					'mkdir vendors',
					'mkdir vendors/GollumJS',
					'mkdir vendors/jQuery',
				].join(';'),

				options: {
					failOnError: false,
					stderr: false
				}
			},
		},

		gitclone: {
			gjs_class: {
				options: {
					repository: 'https://github.com/GollumJS/Class.js',
					branch: 'master',
					directory: 'vendors/GollumJS/Class'
				}
			},
			
			gjs_annotation: {
				options: {
					repository: 'https://github.com/GollumJS/GollumJsAnnotation.js.git',
					branch: 'master',
					directory: 'vendors/GollumJS/Annotation'
				}
			},
			
			gjs_orm: {
				options: {
					repository: 'https://github.com/GollumJS/GollumJsORM.js.git',
					branch: 'master',
					directory: 'vendors/GollumJS/ORM'
				}
			},
			
			jquery: {
				options: {
					repository: 'https://github.com/jquery/jquery.git',
					branch: '2.1.3',
					directory: 'vendors/jQuery/jquery'
				}
			},

		},

	});

};