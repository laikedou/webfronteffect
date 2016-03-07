module.exports = function(grunt) {

  // 配置Grunt各种模块的参数
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    meta: {
            basePath: './',
            srcPath: './sass/',
            deployPath: './css/'
    },
    jshint: { 
       all: [
            'js/*.js'
             ],
        options: {
            browser: true,            // browser environment
            devel: true,                // 
            curly: true,
            eqeqeq: true,
            eqnull: true
            }
    },
    concat: {
     /* concat的参数 */ 
     options: {
        //定义一个字符串插入没个文件之间用于连接输出
        separator: ';'
      },
      dist: {
          src: ['js/zepto.min.js','js/zepto.slider.js','js/app.js'],
          dest: 'build/<%= pkg.name %>.cat.js'
      }
    },
    uglify: { 
    /* uglify的参数 */ 
     my_target: {
        files: [{
          expand: true,
          src: 'js/<%= pkg.name %>.cat.js'
        }]
      }
    },
    watch:  {
     /* watch的参数 */ 
    },
    cssmin:{
      /*cssmin配置参数 对css进行压缩处理*/
      compress: {
        files: {
          'build/<%= pkg.name %>.min.css': [
          "css/gloabal.css",
          "css/slider.css",
          "css/ycaidao.css"
        ]
        }
      }
    },
    sass:{
            dist: {
                files: {
                    '<%= meta.deployPath %>*.css': '<%= meta.srcPath %>*.scss'
                },
                options: {
                    sourcemap: 'false'
                }
            }
    }

  });
  // 从node_modules目录加载模块文件
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-sass');
  // 每行registerTask定义一个任务
  grunt.registerTask('default', [ 'concat', 'uglify','cssmin']);
  grunt.registerTask('check', ['jshint']);

};