module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['assets/js/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		connect: {
			all: {
				options:{
					port: 9000,
					hostname: "0.0.0.0",
					base: ''

				}
			}
		},

		wiredep: {

			task: {
				src: [
					'index.html'
					]
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'assets/js/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>', 'assets/js/*', 'assets/less/*', 'index.html'],
			tasks: ['less'],
			options: { 
				livereload: true
			}
		},

		less: {
		  development: {
		    options: {
		      paths: ['assets/less']
		    },
		    files: {
		      'assets/css/out.css': 'assets/less/*.less'
		    }
		  }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('test', ['jshint', 'qunit']);

	grunt.registerTask('default',['concat', 'uglify']);
	grunt.registerTask('serve',[
		'connect', 'watch'
	]);
};
