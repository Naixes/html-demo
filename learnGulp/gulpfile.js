// task()API已经不是推荐的模式了
const {src, pipe, dest} = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

function defaultTask() {
    // place code for your default task here
    return src('src/*.js')
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(dest('build'))
}

exports.default = defaultTask