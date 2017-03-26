export default {
    entry: './dist/index.js',
    dest: './dist/bundles/ngxClipboard.umd.js',
    format: 'umd',
    // Global namespace.
    moduleName: 'ngx.clipboard',
    // External libraries.
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs/Observable',
        'rxjs/Observer',
        'clipboard'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx',
        'clipboard': 'Clipboard'
    },
    onwarn: () => {
        return
    }
}