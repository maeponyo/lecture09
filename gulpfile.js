var gulp = require("gulp");
gulp.task("serve",  function(){
  var connect = require('gulp-connect');
  connect.server({
    root: ".",
    livereload: false
  });
});

gulp.task("default", ["serve"]);
