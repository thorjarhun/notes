function doPost(url, data) {
    data = (typeof data == 'undefined') ? {} : data;

    var form = document.createElement("form");
    jQuery(form).attr({
        id: "post-form",
        name: "post-form",
        action: url,
        method: "post"
    });
    jQuery.each(data, function(key) {
        jQuery(form).append('<input type="text" name="' + key + '" value="' + this + '" />');
    });
    //document.body.appendChild(form);
    form.submit();
    //document.body.removeChild(form);
}

function doPost2(url, data) {
    data = (typeof data == 'undefined') ? {} : data;

    var http = new XMLHttpRequest();
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.open("POST", url, true);
    
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            document.open();
            document.write(http.responseText);
            //window.location = http.responseText;
        }
    }
    
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    
    var key;
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            urlEncodedDataPairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
    }
    
    urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
    
    http.send(urlEncodedData);
}

doPost("fetchIES.htm", { searchOption: "STK", stockNumber: "56-7110-9-0010", serialNumber: "16307" });