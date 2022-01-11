let logger = (function(){

    function postLog(email, password) {
        console.log(email + ' se connecte');
        $.ajax({
            type: "POST",
            url: "/login/",
            data: {
                email: email,
                password: password
            },
            success: () => {
                window.location.href = "/";
            },
        });
    }

    function postInsc(nom, prenom, promo, email, password) {
        console.log(email + ' se connecte');
        $.ajax({
            type: "POST",
            url: "/signup/",
            data: {
                nom: nom,
                prenom: prenom,
                promo: promo,
                email: email,
                password: password
            },
            success: () => {
                window.location.href = "/";
            },
        });
    }

    return {
        connexion(email, password) {
            postLog(email, password);
        },
        inscription(nom, prenom, promo, email, password) {
            postInsc(nom, prenom, promo, email, password);
        }
    }
})();