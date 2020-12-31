const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .react('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  .copy('resources/favicon/apple-touch-icon.png', 'public/favicon')
  .copy('resources/favicon/favicon-16x16.png', 'public/favicon')
  .copy('resources/favicon/favicon-32x32.png', 'public/favicon')
  .copy('resources/favicon/site.webmanifest', 'public/favicon')
  .copy('resources/favicon/android-chrome-192x192.png', 'public/favicon')
  .copy('resources/favicon/android-chrome-512x512.png', 'public/favicon');
