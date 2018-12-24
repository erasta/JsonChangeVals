'use strict'
function parse(txt) {
    try {
        return JSON.parse(txt);
    } catch (error) {
        try {
            var jjjj = eval('jjjj=' + txt);
            return jjjj;
        } catch (error) {

        }
    }
    return {}
}

function flat(obj, out) {
    out = out || [];
    Object.keys(obj).forEach(function (k) {
        if (typeof obj[k] == 'object') {
            flat(obj[k], out);
        } else {
            out.push(obj[k]);
        }
    });
    return out;
}

function json2vals() {
    var text = document.getElementById('origjson').value;
    var out = ""
    try {
        var json = parse(text);
        out = flat(json).join('\n');
    } catch (error) {
    }
    document.getElementById('justvalues').value = out;
}

function flatInject(obj, vals) {
    Object.keys(obj).forEach(function (k) {
        if (typeof obj[k] == 'object') {
            flatInject(obj[k], vals);
        } else {
            obj[k] = vals.shift();
        }
    });
    return obj;
}

function vals2json() {
    var text = document.getElementById('origjson').value;
    var vals = document.getElementById('justvalues').value.split('\n');
    var out = ""
    try {
        var json = parse(text);
        out = flatInject(json, vals);
    } catch (error) {
    }
    document.getElementById('jsonwithvalues').value = JSON.stringify(out, null, 4);
}

