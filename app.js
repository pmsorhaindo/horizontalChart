
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        prog: './app',
        libs: './libs',
        jquery: './libs/jquery-2.1.1',
        underscore: './libs/underscore'
    }
});

requirejs(['prog/main']);