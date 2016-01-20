module.exports = {
  app_name: 'React Stack Boilerplate',
  live_reload_port: 35729,
  paths: {
    main_style_src: './app/assets/styles/main.scss',
    styles_src: ['app/assets/styles/**/*.scss', 'app/components/**/*.scss'],
    images_src: 'app/assets/images/*',
    fonts_src: 'app/assets/fonts/*',
    main_script_src: './app/client.js',
    scripts_src: ['*.js', 'tasks/**/*.js', 'app/**/*.js', 'app/**/*.jsx'],
    favicon_data: 'app/assets/favicon_data.json',
    favicon_src: 'app/assets/images/favicon.png',
    layout_file: 'app/components/Layout.jsx',
    production_config_file: './production.json',
    build_dest: './build/',
    test_src: 'tests/**/*.js'
  },
  favicon: {
    ios: {
      pictureAspect: 'backgroundAndMargin',
      backgroundColor: '#ffffff',
      margin: '21%'
    },
    desktopBrowser: {},
    windows: {
      pictureAspect: 'noChange',
      backgroundColor: '#da532c',
      onConflict: 'override'
    },
    androidChrome: {
      pictureAspect: 'noChange',
      themeColor: '#ffffff',
      manifest: {
        name: 'React Stack Boilerplate',
        display: 'browser',
        orientation: 'notSet',
        onConflict: 'override'
      }
    },
    safariPinnedTab: {
      pictureAspect: 'silhouette',
      themeColor: '#5bbad5'
    }
  }
};
