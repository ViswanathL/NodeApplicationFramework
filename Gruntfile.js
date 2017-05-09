module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // this is where all the grunt configs will go
  grunt.initConfig({
    // read the package.json
    // pkg will contain a reference to out package.json file use of which we will see later
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
        target: ['routes/**/*.js']
    },
    clean: {
      all: ['apidoc']
    },
    apidoc: {
      all: {
        src: "routes/rest/controller/",
        dest: "apidoc/",
        options: {
          includeFilters: [ ".*\\.js$" ],
          excludeFilters: [ "node_modules/" ]
        }
      }
    }
  }); 

  grunt.loadNpmTasks('grunt-apidoc');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['eslint']);
  
  // codecheck task
  grunt.registerTask('codecheck', ['eslint']);

  // API documentation
  grunt.registerTask('generatedoc', ['clean', 'apidoc']);

};
