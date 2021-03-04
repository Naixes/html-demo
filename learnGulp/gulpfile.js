// task()API已经不是推荐的模式了
const {src, dest, series, watch} = require('gulp')
const del = require('del')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
// 可以免引入执行插件，比如plugins.uglify()
const plugins = require('gulp-load-plugins')()
// const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const onError = (err) => {
    console.log(err);
}

// 压缩合并js
function js() {
    console.log('js task');
    // place code for your default task here
    return src('src/*.js')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.uglify())
        .pipe(concat('all.min.js'))
        .pipe(dest('build'))
        .pipe(reload({stream: true}))
}

// 编译压缩css
function css(cb) {
    console.log('css task');
    src('src/*.scss')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        // 配置压缩css
        .pipe(plugins.sass({outputStyle: 'compressed'}))
        .pipe(plugins.autoprefixer({
            // should Autoprefixer use Visual Cascade, if CSS is uncompressed. Default: true
            cascade: false,
            // 删除过时的前缀
            remove: false
            // 还需要在package.json中配置browserslist
        }))
        .pipe(dest('build'))
        .pipe(reload({stream: true}))
    // 需要执行cb或者返回，否则会报错
    cb()
}

// 监听文件变化
function watcher() {
    watch('src/*.scss', css),
    watch('src/*.js', js),
    watch('*.html', reload)
}

// 删除dist目录
function clean(cb) {
    return del('./build')
    // cb()
}

// 处理html
function html() {
    return src('./*.html')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(dest('build'))
        .pipe(reload({stream: true}))
}

// serve
function serve(cb) {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    cb()
}

exports.scripts = js
exports.styles = css
exports.clean = clean

// 串行执行
// 报错：找不到文件，单独执行不会有问题
// 解决：把cb()改为返回
exports.default = series(clean, html, js, css, serve, watcher)