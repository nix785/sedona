"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  plumber = require("gulp-plumber"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  server = require("browser-sync").create(),
  minify = require("gulp-csso"),
  rename = require("gulp-rename"),
  imagemin = require('gulp-imagemin'),
  webp = require("gulp-webp"),
  svgstore = require('gulp-svgstore'),
  rigger = require('gulp-rigger'),
  del = require("del"),
    svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace');

gulp.task("style", function () {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
        "last 2 versions"
      ]
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("images/**/*.{png,jpg,svg}")
    .pipe(imagemin([
    imagemin.optipng({
        optimizationLevel: 3
      }),
    imagemin.jpegtran({
        progressive: true
      }),
    imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task('svgSpriteBuild', function () {
	return gulp.src('build/img/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						scss: {
							dest:'/sass/global/_sprite.scss',
							template: "parts/_sprite-templates.scss"
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('build/img/'));
});

gulp.task("sprite", function () {
  var svgstore = require("gulp-svgstore");
  return gulp.src("build/img/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("images/**/*.{png,jpg}")
  .pipe(webp())
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(rigger())
    .pipe(gulp.dest("build/"));
});

gulp.task("js", function () {
  return gulp.src("js/*.js")
    .pipe(rigger())
    .pipe(gulp.dest("build/js/"));
});

gulp.task("copy", function () {
  return gulp.src([
 "fonts/**/*.{woff,woff2}",
 "img/**",
 "js/**"
 ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("serve", ["style"], function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html"]);
  gulp.watch("parts/*.html", ["html"]);
  gulp.watch("js/*.js", ["js"]);
  gulp.watch("*.html").on("change", server.reload);

});
