var popjsondata = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'https://raw.githubusercontent.com/HTMLdotafreak/Largefiles/master/population.js',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

window.popjson = JSON.stringify(popjsondata);
