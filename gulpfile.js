require('source-map-support').install();

var azk_gulp = require('azk-dev/gulp')({
  cwd  : __dirname,
  sourcemaps_path: "/debug-print", // Custom path to prefix transpiled files
  lint: [ "bin/**/*.js" ], // Extra files for the lint analyzer
});

var gulp = azk_gulp.gulp;

gulp.task("show:args", "Help text", ["before:show"], function() {
  console.log(azk_gulp.yargs.argv);
  return null;
}, { aliases: ["sa", "s"] });
