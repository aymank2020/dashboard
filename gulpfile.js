const gulp = require("gulp"),
    pug = require("gulp-pug"),
    sass = require("gulp-sass")(require("sass")),
    jsmin = require("gulp-minify"), 
    prefix = require("gulp-autoprefixer"),
    concat = require("gulp-concat"),
    babel = require("gulp-babel");

// ** start html task
gulp.task("html", function () {

    return gulp.src("./stage/html/*.*")

        .pipe(pug())

        .pipe(gulp.dest("./dist/"))

});

// ** start css task
gulp.task("css", function () {

    return gulp.src(["./stage/css/**/*.css", "./stage/css/**/*.scss"])

        .pipe(sass({style: "compressed"}))

        .pipe(prefix())

        .pipe(concat("style.min.css"))

        .pipe(gulp.dest("./dist/css/"))

});

// ** start js task
gulp.task("js", function () {

    return gulp.src("./stage/js/**/*.js")

        .pipe(babel({
            presets: ['@babel/env']
        }))

        .pipe(jsmin())

        .pipe(gulp.dest("./dist/js/"))

});

// ** start image task
gulp.task("img", function () {

    return gulp.src("./stage/imgs/**/*")

        .pipe(gulp.dest("./dist/imgs/"))

});

// ** start watch task
gulp.task("watch", function () {

    gulp.watch(["./stage/html/**/*.pug"], gulp.series("html"));

    gulp.watch(["./stage/css/**/*.css", "./stage/css/**/*.scss"], gulp.series("css"));

    gulp.watch(["./stage/js/**/*.js"], gulp.series("js"));

    gulp.watch(["./stage/imgs/**/*.*"], gulp.series("img"));

});

gulp.task("fonts", function () {
    return gulp.src("./stage/fonts/**/*").pipe(gulp.dest("./dist/fonts/"));
});

gulp.task("vendor", function () {
    return gulp.src("./stage/vendor/**/*").pipe(gulp.dest("./dist/"));
});

gulp.task("build", gulp.parallel("html", "css", "js", "img", "fonts", "vendor"));
gulp.task("default", gulp.series("build"));

