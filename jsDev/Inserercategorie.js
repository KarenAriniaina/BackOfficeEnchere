window.addEventListener("load", function () {
    if (this.localStorage.getItem("token") == null && this.localStorage.getItem("idAdmin") == null) {
        window.location.assign("index.html");
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
                    alert(retour.message);
                    window.location.assign("GestionCategorie.html");
                }
                else {
                    if (retour.message == "Vous n'etes pas connecté") {
                        localStorage.removeItem("idAdmin");
                        localStorage.removeItem("token");
                        window.location.assign("index.html");
                    }
                    else {
                        alert(retour.message);
                    }
                }
            });
            xhr.addEventListener("error", function (event) {
                alert('Oups! Quelque chose s\'est mal passé.');
            });
            xhr.open("POST", "https://serveurenchere2-production.up.railway.app/Categorie/",true);
            xhr.setRequestHeader("idAdmin", localStorage.getItem('idAdmin'));
            xhr.setRequestHeader("token", localStorage.getItem('token'));
            xhr.send(formData);
        }
        var form = document.getElementById("myForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            sendData();
        });
    }
});