export default {
    entry: './dist/ngx-clipboard.js',
    dest: './dist/bundles/ngxClipboard.umd.js',
    format: 'umd',
    // Global namespace.
    moduleName: 'ngx.clipboard',
    // External libraries.
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs': 'Rx'
    },
    onwarn: () => {
        return
    }
}