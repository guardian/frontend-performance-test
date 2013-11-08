/* global module: false */
module.exports = function (grunt) {

    var wptArgs = [
            ['--server', grunt.option('server')],
            ['--breakdown'],
            ['--reporter', 'spec'],
            ['--poll'],
            ['--mobile'],
            ['--noads'],
            ['--location', 'EU_WEST_wptdriver:Chrome']
        ],
        domains = {
            code: 'm.code.dev-theguardian.com',
            prod: 'www.theguardian.com'
        },
        urls = {
            front: 'uk',
            article: 'news/2013/oct/07/jfk-assassination-creepiest-detail-parkland'
        };

    // Project configuration.
    grunt.initConfig({

        // Run shell commands
        shell: {
            wpt: {
                command: function (app) {
                    // default to code
                    var env = grunt.option('env') || 'code',
                        domain = domains[env];
                        cmd = './node_modules/webpagetest/bin/webpagetest test http://' + domain + '/' + urls[app] + '?view=mobile ' + wptArgs.map(function(arg) {
                            return arg.join(' ')
                        }).join(' ') + ' --specs specs/' + app + '-' + env + '.json';
                    grunt.log.ok('Running against `' + domain + '`');
                    grunt.log.ok('`' + cmd + '`');
                    return cmd;
                },
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                }
            }
        }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-shell');

    // Standard tasks
    grunt.registerTask('perf', function(app) {
        if (!app) {
            grunt.fail.warn('App required, e.g. `grunt perf:article`.');
        }
        if (!urls[app]) {
            grunt.fail.warn('Unknown app `'+ app + '`. Available apps - `' + Object.keys(urls).join('`, `') + '`.');
        }
        grunt.task.run(['shell:wpt:' + app]);
    });

};
