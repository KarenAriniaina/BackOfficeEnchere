window.addEventListener("load", function () {
    if (this.localStorage.getItem("token") != null && this.localStorage.getItem("idAdmin") != null) {
        window.location.assign("accueil.html");
    } else {
        function sendData() {
            var xhr;
            try { xhr = new ActiveXObject('Msxml2.XMLHTTP'); }
            catch (e) {
                try { xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
                catch (e2) {
                    try { xhr = new XMLHttpRequest(); }
                    catch (e3) { xhr = false; }
                }
            }
            var formData = new FormData(form);
            xhr.addEventListener("load", function (event) {
                var retour = JSON.parse(xhr.responseText);
                console.log(retour);
                if (retour.data != null) {
                    localStorage.setItem('token', retour.data[0].token);
                    localStorage.setItem('idAdmin', retour.data[0].idAdmin);
                    window.location.assign("accueil.html");
                }
                else {
                    alert("disoo!");
                }
            });
            xhr.addEventListener("error", function (event) {
                alert('Oups! Quelque chose s\'est mal passé.');
            });
            xhr.open("POST", "https://serveurenchere-production.up.railway.app/LoginAdmin/");
            xhr.send(formData);
        }
        var form = document.getElementById("myForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            sendData();
        });
    }
});