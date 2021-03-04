module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        // 压缩
        uglify: {
            options: {
            // 头部添加当前时间
            banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            static_mappings: {
              // Because these src-dest file mappings are manually specified, every
              // time a new file is added or removed, the Gruntfile has to be updated.
              files: [
                {src: 'src/index.js', dest: 'build/index.min.js'},
                {src: 'src/main.js', dest: 'build/main.min.js'},
              ],
            },
        },
        // 合并
        concat: {
            bar: {
                src: ['build/*.js'],
                dest: 'dest/all.min.js'
            }
        },
        // 监控
        watch: {
            files: ['src/index.js'],
            tasks: ['uglify', 'concat']
        }
    });
  
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify', 'concat', 'watch']);
  };