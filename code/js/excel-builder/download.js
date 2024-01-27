define(function () {
    return function (fileName, content) {
        var form = $("<form name='formReport'>").attr({
            target: '_BLANK',
            action: base_url+'comun/repo/download',
            method: 'post'
        }).css({display: 'none'});
        form.append($("<input>").attr({name: 'fileName', value: fileName}));
        form.append($("<input>").attr({name: 'contentType', value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
        form.append($("<input>").attr({name: 'content', value: content}));
        form.appendTo($("body"));
        form.submit();
        window.setTimeout(function () {form.remove();}, 10000);
        
    }
});