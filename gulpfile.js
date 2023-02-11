

var gulp = require('gulp'),
		fileinclude = require('gulp-file-include'),
		rename = require('gulp-rename'), // rename files
		cssnano     = require('gulp-cssnano'),	// minify css
		notify = require('gulp-notify'),	// 
		autoprefixer = require('gulp-autoprefixer'),	// old browser autoprefix
		connect = require('gulp-connect'),	// server connect
		sass = require('gulp-sass'),	// sass plugin
		del = require('del'),	// delete files
		cache = require('gulp-cache'),	// cache files
		imagemin = require('gulp-imagemin'),	// optimize img
		pngquant = require('imagemin-pngquant'),	// optimize png
		livereload = require('gulp-livereload'),	// livereload plugin
		concat = require('gulp-concat'), // concat files
		uglify = require('gulp-uglifyjs'),	// minify js
		jade = require('gulp-jade'),	// jade
		fs = require('fs'),
		sourcemaps = require('gulp-sourcemaps');

var path = {
	dist : "dist",
	jade : {
		src : "src/markups/pages/*.jade",
		srcAll : "src/markups/**/*",
		dist : "dist/pages"
	},
	sass : {
		src : "src/scss/style.scss",
		dist : "dist/css",
		dist_template : "../public_html/catalog/view/theme/antonio/css",
	},
	js : {
		src : [
			'src/js/**/*'
		],
		srcB : [ 
			
		],
		srcIE : [
			'node_modules/html5shiv/dist/html5shiv.min.js', 
			'node_modules/html5shiv/dist/html5shiv-printshiv.min.js', 
			'node_modules/respond/dest/respond.min.js'
		],
		dist : "dist/js"
	},
	css : {
		src : [
			'node_modules/normalize-css/normalize.css'
		],
		srcImg : [
			
		],
		srcMove : "src/css/**/*",
		dist : "dist/css"
	},
	font : {
		src : 'src/fonts/**/*',
		dist : 'dist/fonts'
	},
	html : {
		src : "src/*.html",
		dist : "dist"
	},
	php : {
		src : "src/*.php",
		dist : "dist"
	},
	include : {
		src : "src/_include/**/*",
		dist : "dist/_include"
	},


	htaccess : {
		src : "src/.htaccess",
		dist : "dist"
	},

	img : {
		src : "src/img/**/*",
		dist : "dist/img"
	},
	images : {
		src : "src/images/**/*",
		dist : "dist/images"
	},
	libs : {
		src : 'src/libs/**/*',
		dist : 'dist/libs'
	}
}

// server connect
gulp.task('connect', function(done) {
	connect.server({
		root: path.dist,
		livereload: true
	});
		
		done();
});

// html
gulp.task('html', function(done){
	gulp.src(path.html.src)
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest(path.html.dist))
	.pipe(connect.reload());
		
		done();
});
// php
gulp.task('php', function(done){
	gulp.src(path.php.src)
	.pipe(gulp.dest(path.php.dist))
	.pipe(connect.reload());

	done();
});
// include
gulp.task('include', function(done){
	gulp.src(path.include.src)
	.pipe(gulp.dest(path.include.dist))
	.pipe(connect.reload());
		
		done();
});



// htaccess
gulp.task('htaccess', function(done){
	gulp.src(path.htaccess.src)
	.pipe(gulp.dest(path.htaccess.dist))
	.pipe(connect.reload());
		
		done();
});



// fonts
gulp.task('fonts', function(done){
	gulp.src(path.font.src)
	.pipe(gulp.dest(path.font.dist));
		
		done();
});

// libs
gulp.task('libs', function(done){
	gulp.src(path.libs.src)
	.pipe(gulp.dest(path.libs.dist));
		
		done();
});





// css
gulp.task('sass', function (done) {
	gulp
		.src(path.css.src)
		.pipe(concat('libs.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest(path.css.dist));

	gulp
		.src(path.css.srcMove)
		.pipe(gulp.dest(path.css.dist));
 
	gulp
		.src(path.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 0.5%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest(path.sass.dist))
		// .pipe(gulp.dest(path.sass.dist_template))
		.pipe(rename('style.css'))
		// .pipe(sourcemaps.write())
		.pipe(cssnano())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(path.sass.dist))
		.pipe(gulp.dest(path.sass.dist_template))
		.pipe(connect.reload()); 
	/*gulp
		.src(path.css.srcImg) 
		.pipe(cache(imagemin({  
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(path.css.dist)); */
		
		done();
});

// js
gulp.task('js', function(done){

	gulp
		.src(path.js.src)
		.pipe(gulp.dest(path.js.dist))
		.pipe(connect.reload());
		
		done();
});

// scripts
gulp.task('scripts', function(done) {
	gulp
		.src(path.js.srcIE)
		.pipe(concat('ie.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.js.dist));

   
  /*gulp
  	.src(path.js.srcB)
  	.pipe(concat('libs.min.js'))
  	.pipe(uglify())
		.pipe(gulp.dest(path.js.dist));*/
		
		done();
});

// img
gulp.task('img', function(done) {
	gulp
		.src(path.img.src) 
		.pipe(cache(imagemin({  
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); 
		
		done();
});
gulp.task('img-server', function(done) {
	gulp
		.src(path.img.src) 
		.pipe(gulp.dest(path.img.dist)); 
		
		done();
});

// IMAGES
gulp.task('images', function(done){
	gulp
		.src(path.images.src)
		.pipe(cache(imagemin({  
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(path.images.dist));
		
		done();
})

gulp.task('jade', function(done) {
	var YOUR_LOCALS = './content.json';

	gulp
		.src(path.jade.src)
		.pipe(jade({
			locals: JSON.parse(fs.readFileSync(YOUR_LOCALS, 'utf-8')),
			pretty : '\t',
		}))
		.pipe(gulp.dest(path.jade.dist))
		.pipe(connect.reload());

		done();
});

// watch
gulp.task('watch', function(done){
	gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
	gulp.watch('src/*.html', gulp.parallel('html'));
	gulp.watch('src/*.php', gulp.parallel('php'));
	gulp.watch('src/_include/*/**', gulp.parallel('include'));
	gulp.watch('src/.htaccess', gulp.parallel('htaccess'));
	gulp.watch('src/js/*.js', gulp.parallel('js'));
	gulp.watch(path.jade.srcAll, gulp.parallel('jade'));
	done();
});

gulp.task('delete', function(done) {
	del.sync(path.dist);
	done();
});

	// default
	gulp.task('default', gulp.series('delete','connect','jade', 'img-server','images', 'html','htaccess', 'php', 'include', 'libs', 'fonts', 'sass', 'scripts', 'js', 'watch'));

	// clear cache
	gulp.task('clear', function () {
		return cache.clearAll();
	});
