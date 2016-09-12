/**
 * special
 * By Julian
 * @ zanjser@163.com
 * 2016年07月28日13:39:38
 */
import pkg          from './package.json';
import conf         from './config.json';
import gulp         from 'gulp';
import sass         from 'gulp-sass';
import concat       from 'gulp-concat';
import minifycss    from 'gulp-minify-css';
import uglify       from 'gulp-uglify';
import rename       from 'gulp-rename';
import notify       from 'gulp-notify';
import imagemin     from 'gulp-imagemin';
import header       from 'gulp-header';
import autoprefixer from 'gulp-autoprefixer';
import px2rem       from 'gulp-pxrem';


const day           = conf.start;
const title         = conf[day].title;
const description   = conf[day].description;
const keywords      = conf[day].keywords;
const author        = conf[day].author;
const version       = conf[day].version;
const mincss        = conf[day].build.css;
const minjs         = conf[day].build.js;



let cssLoadSrc = conf[day].load.css;
let jsLoadSrc  = conf[day].load.js;
let csssrc = `./${day}/src/scss/main.scss`;
let jssrc = `./${day}/src/js/*.js`;



const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const banner = [
  '/*! ',
    '<%= pkg.name %> ',
    `v ${version}  | `,
    `(c) ${new Date()}  ${author}  |`,
    ' <%= pkg.homepage %> ',
    ` ${title}`,
  ' */',
  '\n'
].join('');


gulp.task('ejs', () => gulp.src(`./${day}/src/templates/*.ejs`)
    .pipe(ejs({
        title: title,
        description: description,
        keywords: keywords,
        mincss: mincss,
        minjs: minjs,
        time: new Date().getTime()
    }))
    .pipe(gulp.dest(`./${day}/.__`))
    .pipe(rename({extname: ".html"}))
    .pipe(gulp.dest(`./${day}/`))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'ejs task complete' })));



//编译Sass，Autoprefix及缩小化
gulp.task('sass', () => gulp.src(cssLoadSrc)
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulp.dest(`./${day}/.tmp/css`))
    .pipe(autoprefixer({
        browsers: ['> 1%','Firefox <= 20',''],
        cascade: false
    }))
    .pipe(px2rem({
        baseDpr: 2, // base device pixel ratio (default: 2)
        threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
        remVersion: true, // whether to generate rem version (default: true)
        remUnit: 72, // rem unit value (default: 75)
        remPrecision: 6
    }))
    .pipe(rename(mincss))
    .pipe(gulp.dest(`./${day}/.tmp/`))
    .pipe(minifycss())

    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(`./${day}/build/css/`))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Styles  task complete' })));




gulp.task('scripts', () => gulp.src(jsLoadSrc)
    .pipe(concat(minjs))
    .pipe(gulp.dest(`./${day}/.tmp/js`))
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(`./${day}/build/js/`))
    .pipe(reload({ stream: true }))
    .pipe(notify({ message: 'Scripts task complete' })));


gulp.task('images', () => {
    return gulp.src(`./${day}/src/images/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`./${day}/build/images`));
});


gulp.task('html', () => {
    gulp.src(`./${day}/*.html`)
        .pipe(reload({ stream: true }))
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['sass'], () => {

    browserSync.init({
        server: `./${day}/`
    });

    // 看守.scss 档
    gulp.watch(`./${day}/src/scss/*.scss`, ['sass']);
    gulp.watch('./home/scss/*.scss', ['home']);
    // 看守所有.js档
    gulp.watch(`./${day}/*.js`, ['scripts']);
    gulp.watch(`./${day}/src/js/*.js`, ['html', 'scripts']);
    gulp.watch(`./${day}/src/images/*`, ['images']);

    // 看守所有.html
    gulp.watch(`./${day}/*.html`).on('change', reload);;
    gulp.watch('./*.html').on('change', reload);;

});





gulp.task('default', ['dev']);