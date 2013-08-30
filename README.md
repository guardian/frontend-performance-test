frontend-performance-test
=========================

Suite of client-side performance tests to run against the frontend project. These enable us to monitor and alert against key thresholds for client-side assets sizes.

To run
------

    $ npm install
    $ ./node_modules/webpagetest/bin/webpagetest test http://www.theguardian.com/uk?view=mobile -s http://ec2-box.com/  --breakdown  --reporter=spec --poll --first -l EU_WEST_wptdriver:Chrome --specs specs/tests.json

