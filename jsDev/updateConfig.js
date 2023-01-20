window.addEventListener("load", function () {
    if (this.localStorage.getItem("token") == null && this.localStorage.getItem("idAdmin") == null) {
        window.location.assign("index.html");
    } else {
        function sendData(formData) {
            var xhr;
            try { xhr = new ActiveXObject('Msxml2.XMLHTTP'); }
            catch (e) {
                try { xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
                catch (e2) {
                    try { xhr = new XMLHttpRequest(); }
                    catch (e3) { xhr = false; }
                }
            }
            xhr.addEventListener("load", function (event) {
                var retour = JSON.parse(xhr.responseText);
                console.log(retour);
                if (retour.status == true) {
                    alert(retour.message);
                    window.location.assign("Configuration.html");
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
            //console.log(formData.get("dureemin"));
            xhr.open("POST", "http://localhost:8080/Configuration/",true);
            xhr.setRequestHeader("idAdmin", localStorage.getItem('idAdmin'));
            xhr.setRequestHeader("token", localStorage.getItem('token'));
            xhr.send(formData);
        }
        var form = document.getElementById("myForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var formData = new FormData(form);
            if(formData.get("dureemin")=="") formData.set("dureemin",0);
            if(formData.get("dureemax")=="") formData.set("dureemax",0);
            if(formData.get("commission")=="") formData.set("commission",0);
            sendData(formData);
        });
    }
});