var Cookie = {
    get: (name) => {
        var cookie = document.cookie;
        var cookieName = encodeURIComponent(name) + "=";
        var start = cookie.indexOf(cookieName);
        var value = null;
        if (start > -1)
        {
            var end = cookie.indexOf(";", start);
            if (end == -1)
                end = cookie.length;
            value = decodeURIComponent(cookie.substring(start + cookieName.length, end));
        }
        return value;
    },
    set: (name, value, expires, path, domain, secure) => {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires){
            var d = new Date();
            d.setTime(d.getTime() + expires);
            cookieText += "; expires=" + d.toUTCString();
        }
        if (path)
            cookieText += "; path=" + path;
        if (domain)
            cookieText += "; domain=" + domain;
        if (secure)
            cookieText += "; secure";

        document.cookie = cookieText;
    },
    unset: (name, path, domain, secure) => {
        this.set(name, "", new Date(0), path, domain, secure);
    }
}
