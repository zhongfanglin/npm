var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat=require('gulp-concat');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');
var del=require('del');
var connect= require('gulp-connect'); 
var watch = require('gulp-watch');
var revCollector = require('gulp-rev-collector');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
//生成哈希值
var rev= require('gulp-rev');
gulp.task('default',['htmlmin','minijs','watch','connect']);
gulp.task('minijs',function(){
	gulp.src('app/**/*.js')
	 //合并js
	.pipe(concat('all.js'))
	//转义es6->es5
	 .pipe(babel({
            presets: ['@babel/env']
        }))
	//压缩js
	.pipe(uglify())
	//生成哈希值
	.pipe(rev())
	//重命名js
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('rev/js'))
	.pipe(connect.reload());
});
gulp.task('concatjs',function(){
	gulp.src('app/static/js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dist'))
	//自动刷新
	.pipe(connect.reload());
});
gulp.task('htmlmin',function(){
//	gulp.src('index.html')
	gulp.src(['rev/**/*.json','app/**/*.html'])
//	.pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(revCollector())
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
});
//打开连接
gulp.task('connect', function() {
  connect.server({
  	//根目录
  	root:'dist',
  	//端口号
  	port: '7777',
  	//热更新
  	livereload:true
  });
});
//监听事件
gulp.task('watch',function(){
	//监听html
	gulp.watch('all.html',['htmlmin']);
	//监听js
	gulp.watch('app/**/*.js',['htmlmin']);
});
//没有node_modules只需cnpm install;
//删除文件
gulp.task('clean',function(){
	del(['dist']);
})
gulp.task('sass',function(){
	gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});
/*完整功能
 
var gulp = require('gulp');//引入gulp
var uglify = require('gulp-uglify');//压缩js
var babel = require('gulp-babel');//es6转译
var connect = require('gulp-connect');//服务器
var concat = require('gulp-concat');//合并
var minicss = require('gulp-clean-css');//压缩CSS
var minihtml = require('gulp-html-minify');//压缩html
var del = require('del');//删除整个文件
const rev = require('gulp-rev');//添加版本号
var revCollector = require('gulp-rev-collector');//修改路径版本号
var run = require('run-sequence');//异步执行
var miniimg = require('gulp-imagemin');//图片压缩

//所有文件实时更新
gulp.task('default', function(callback) {
    run(['minijs','miniimg','minicss'],
        'minihtml',
        'watch',
        'connect',
        callback);
})
//压缩js
gulp.task('minijs',function(){
    gulp.src('app/static/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/static/js'))
        .pipe(connect.reload())
    console.log('压缩JS成功')
})
//图片压缩
gulp.task('miniimg',function(){
    gulp.src('app/static/img/**/*.*')
//      .pipe(gulp.dest('dist/static/img'))
//      .pipe(connect.reload())
//  console.log('压缩img成功')
//})
////压缩css
//gulp.task('minicss',function(){
//  gulp.src('app/static/css/*.css')
//      .pipe(minicss())
//      .pipe(gulp.dest('dist/static/css'))
//      .pipe(connect.reload())
//  console.log('压缩css成功')
//})
////压缩HTML
//gulp.task('minihtml',function(){
//  gulp.src('app/*.html')
//      .pipe(minihtml({ collapseWhitespace: true }))
//      .pipe(gulp.dest('dist'))
//      .pipe(connect.reload())//实时刷新
//  console.log('压缩html成功')
//})
////监听实时更新
//gulp.task('watch',function(){
//  gulp.watch('app/static/js/*.js',['minijs'])
//  gulp.watch('app/static/css/*.css',['minicss'])
//  gulp.watch('app/static/img/**/*.*',['miniimg'])
//  gulp.watch('app/*.html',['minihtml'])
//})
//
////打开服务器
//gulp.task('connect',function(){
//  connect.server({
//      root: 'app',//服务器默认文件夹
//      port: '7843',//端口号
//      livereload: true
//  })
//  console.log('服务器已开启')
//})
//
//
////删除文件
//gulp.task('clean', function () {
//  del(['dist'])
//});
//



 */