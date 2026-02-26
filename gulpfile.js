const gulp = require("gulp");
const browserSync = require("browser-sync").create();

// Copy JS files from node_modules
gulp.task("js", function () {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js",
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Copy Font Awesome fonts
gulp.task("fonts", function () {
  return gulp
    .src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("src/fonts"));
});

// Copy Font Awesome CSS
gulp.task("fa", function () {
  return gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("src/css"));
});

// Serve project with BrowserSync
gulp.task("serve", function () {
  browserSync.init({
    server: "./src",
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/css/*.css").on("change", browserSync.reload);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
});

// Default task
gulp.task("default", gulp.series("js", "fonts", "fa", "serve"));
