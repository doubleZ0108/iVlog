window.model = {
    data: {
        userID: '',
        history: [],
        keyword: ''
    },
    TOKEN: 'iVlog',

    CookieToModel: function() {
       // window.cookie.CheckCookie();
        var dataCookie = window.cookie.GetCookie(model.TOKEN);
        try {
            if (dataCookie)
            {
                model.data = JSON.parse(dataCookie);
            }
        }
        catch (e) {
            console.error(e);
        }
        },
    ModelToCookie: function() {
         try {
            window.cookie.SetCookie(model.TOKEN, JSON.stringify(model.data), {maxAge: 60*60*24}); // 一天期限r
         }
         catch (e) {
             console.error(e);
         }
    }
};