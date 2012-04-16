/*

    Copyright (c) 2012 Colin Teal

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

*/

/* jslint browser: true, newcap: true, plusplus: true, maxerr: 50, indent: 4 */
(function (w) {

    "use strict";

    var key;

    function drawFezNumber(paper, number, offset) {
        if (key.hasOwnProperty(number)) {
            key[number](paper, offset);
        }
    }

    function draw(paper, date, precision) {
        var hour, minutes, seconds, time, offset;

        // default to now
        date = date || new Date();
        // default to HH:MM
        precision = precision || 4;

        hour = date.getHours();
        hour = (hour > 12) ? (hour - 12) : ((hour > 0) ? hour : 12);
        minutes = date.getMinutes();

        time = [Math.floor(hour / 10), hour % 10, Math.floor(minutes / 10), minutes % 10];

        // if seconds are required
        if (precision === 6) {
            seconds = date.getSeconds();
            time = time.concat([Math.floor(seconds / 10), seconds % 10]);
        }

        while (--precision >= 0) {
            offset = (precision * 55) + 5;
            paper.rect(offset, 5, 50, 50);
            drawFezNumber(paper, time[precision], offset);
        }
    }

    function drawLine(paper, sx, sy, dx, dy) {
        paper.path("M" + sx + "," + sy + "L" + dx + "," + dy);
    }

    key = {
        1: function one(paper, offset) {
            var sx, sy, dx, dy;

            sx = offset + 25;
            sy = 5;
            dx = sx;
            dy = 30;

            drawLine(paper, sx, sy, dx, dy);
        },
        2: function two(paper, offset) {
            var sx, sy, dx, dy;

            sx = offset + 25;
            sy = 30;
            dx = sx + 25;
            dy = sy;

            drawLine(paper, sx, sy, dx, dy);
        },
        3: function three(paper, offset) {
            var sx, sy, dx, dy;

            sx = offset + 25;
            sy = 30;
            dx = sx;
            dy = 55;

            drawLine(paper, sx, sy, dx, dy);
        },
        4: function four(paper, offset) {
            var sx, sy, dx, dy;

            sx = offset;
            sy = 30;
            dx = offset + 25;
            dy = sy;

            drawLine(paper, sx, sy, dx, dy);
        },
        5: function five(paper, offset) {
            this[3](paper, offset);
            this[2](paper, offset);
        },
        6: function six(paper, offset) {
            this[4](paper, offset);
            this[2](paper, offset);
        },
        7: function seven(paper, offset) {
            this[4](paper, offset);
            this[3](paper, offset);
        },
        8: function eight(paper, offset) {
            this[4](paper, offset);
            this[3](paper, offset);
            this[1](paper, offset);
        },
        9: function nine(paper, offset) {
            this[6](paper, offset);
            this[3](paper, offset);
        }
    };

    w.Fez = {
        DEFAULT_PRECISION: 4,
        draw: function (canvas, precision) {
            var paper, date = new Date();

            precision = precision || w.Fez.DEFAULT_PRECISION;

            paper = Raphael(canvas, (precision * 60), 70);

            // draw first
            draw(paper, date, precision);

            // setup the interval
            setInterval(function tick() {
                paper.clear();
                draw(paper, null, precision);
            }, 1000);
        }
    };

}(window));