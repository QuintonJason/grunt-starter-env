// wrapper function
module.exports = function(grunt){
	// load all our Grunt plugins
	require('load-grunt-tasks')(grunt);
	var jpegRecompress = require('imagemin-jpeg-recompress');
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-criticalcss');

	grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'),
		// task configuration goes here

		jshint:{
			options:{
				'node':true,
				'esnext':true,
				'curly':false,
				'smarttabs':false,
				'indent':2,
				'quotmark':'single'
			},
			all:['Gruntfile.js','js/script.js']
		},

		less:{
			production: {
				options:{
					paths:['dist/css'],
					plugins:[ new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})],
					report:'gzip'
				},
				files:{
					'dist/css/styles.css':'css/styles.less'
				}
			}
		},

		cssmin: {
			add_banner: {
				options: {
				banner: '/* Author: Quinton Jason @quintonjasonjr */'
			},
				files: {
				'dist/css/styles.css': ['css/styles.css']
				}
			}
		},

		imagemin:{
			dynamic:{
				options: {
            		svgoPlugins: [{ removeViewBox: false }]
        		},
				files:[{
					expand:true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'dist/'
				}]
			}
		},

		uglify: {
			my_target: {
				options: {
					mangle:false,
					report:'gzip'
				},
				files: {
					'dist/js/script.min.js': ['js/script.js']
				}
			}
		},

		watch: {
			scripts:{
				files:'js/script.js',
				tasks:['uglify'],
				options:{
					livereload:true
				}
			},
			css:{
				files:'css/styles.less',
				tasks:['less'],
				options:{
					livereload:true
				}
			},
			commit:{
				files:['.git/logs/HEAD'],
				tasks:['imagemin']
			}
		}

	});

    // define the default task that executes when we run 'grunt' from inside the project
	grunt.registerTask('default', ['watch']);

};