const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");

gulp.task("sass", function(done) {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function(done) {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

gulp.task(
  "serve",
  gulp.series("sass", done => {
    browserSync.init({
      server: "./src"
    });

    gulp
      .watch(
        ["./node_modules/bootstrap/scss/bootstrap.scss", "./src/scss/*.scss"],
        gulp.series("sass")
      )
      .on("change", browserSync.reload);
    gulp.watch("src/*.html").on("change", browserSync.reload);
  })
);

gulp.task("fonts", function(done) {
  gulp.src("node_modules/font-awesome/fonts/*").pipe(gulp.dest("src/fonts"));
  done();
});

gulp.task("fa", function(done) {
  gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("src/css"));
  done();
});

gulp.task("default", gulp.series("js", "serve", "fonts", "fa"));
