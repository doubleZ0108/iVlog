window.cookie={

    SetCookie:function(key, value, opt) {
        opt = opt || {};
        var buf = [key, '=', encodeURIComponent(value)];
        if (opt.path) buf.push(';path=' + opt.path);
        if (opt.domain) buf.push(';domain=' + opt.domain);
        if (opt.maxAge) buf.push(';max-age=' + opt.maxAge);
        if (opt.expires) buf.push(';expires=' + opt.expires.toUTCString());
        if (opt.secure) buf.push(';secure');

        var str = buf.join('');
        document.cookie = str;
        return str;
    },
    GetCookie: function(key) {
            var pattern = '(?:(?:^|.*;\\s*)' + key + '\\s*\\=\\s*([^;]*).*$)|^.*$';
            return decodeURIComponent(document.cookie.replace(new RegExp(pattern), "$1"));
            },
    DeleteCookie:function(key) {
        window.cookie.SetCookie(key, '', {maxAge: -1});
        },


}