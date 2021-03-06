// Copyright (c) 2012 Lukas Alexandre. http://www.devinscene.com.br/
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to use, copy
// and modify copies of the Software, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// main function to process the fade request //
function colorFade(id,element,start,end,steps,speed) {
    var startrgb,endrgb,er,eg,eb,step,rint,gint,bint,step;
    var target = document.getElementById(id);
    steps = steps || 20;
    speed = speed || 20;
    clearInterval(target.timer);
    endrgb = colorConv(end);
    er = endrgb[0];
    eg = endrgb[1];
    eb = endrgb[2];
    startrgb = colorConv(start);
    r = startrgb[0];
    g = startrgb[1];
    b = startrgb[2];
    target.r = r;
    target.g = g;
    target.b = b;
    rint = Math.round(Math.abs(target.r-er)/steps);
    gint = Math.round(Math.abs(target.g-eg)/steps);
    bint = Math.round(Math.abs(target.b-eb)/steps);
    if(rint == 0) { rint = 1 }
    if(gint == 0) { gint = 1 }
    if(bint == 0) { bint = 1 }
    target.step = 1;
    target.timer = setInterval( function() { animateColor(id,element,steps,er,eg,eb,rint,gint,bint) }, speed);
}

// incrementally close the gap between the two colors //
function animateColor(id,element,steps,er,eg,eb,rint,gint,bint) {
    var target = document.getElementById(id);
    var color;
    if(target.step <= steps) {
        var r = target.r;
        var g = target.g;
        var b = target.b;
        if(r >= er) {
            r = r - rint;
        } else {
            r = parseInt(r) + parseInt(rint);
        }
        if(g >= eg) {
            g = g - gint;
        } else {
            g = parseInt(g) + parseInt(gint);
        }
        if(b >= eb) {
            b = b - bint;
        } else {
            b = parseInt(b) + parseInt(bint);
        }
        color = 'rgb(' + r + ',' + g + ',' + b + ')';
        if(element == 'background') {
            target.style.backgroundColor = color;
        } else if(element == 'border') {
            target.style.borderColor = color;
        } else {
            target.style.color = color;
        }
        target.r = r;
        target.g = g;
        target.b = b;
        target.step = target.step + 1;
    } else {
        clearInterval(target.timer);
        color = 'rgb(' + er + ',' + eg + ',' + eb + ')';
        if(element == 'background') {
            target.style.backgroundColor = color;
        } else if(element == 'border') {
            target.style.borderColor = color;
        } else {
            target.style.color = color;
        }
    }
}

// convert the color to rgb from hex //
function colorConv(color) {
    var rgb = [parseInt(color.substring(0,2),16), 
        parseInt(color.substring(2,4),16), 
        parseInt(color.substring(4,6),16)];
    return rgb;
}
