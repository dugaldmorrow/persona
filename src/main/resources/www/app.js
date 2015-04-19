// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
    	jquery: 'jquery-2.0.0',
    	svg: 'svg',
        app: '../app'
    },
    shim: {
        svg: {
        	exports: 'SVG'
        }
    /*,
        'svg-textflow': {
        	deps: ['svg']
        }*/
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
