window.addEventListener("load", function () {
    if (this.localStorage.getItem("token") == null && this.localStorage.getItem("idAdmin") == null) {
        window.location.assign("index.html");
    } else {
        let parame = new URLSearchParams(window.location.search);
        var id;
        for (const param of parame) {
            id = param[1];
            //console.log(id);
        }
        if (id != undefined) {
            console.log(id);
            var xhr;
            try { xhr = new ActiveXObject('Msxml2.XMLHTTP'); }
            catch (e) {
                try { xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
                catch (e2) {
                    try { xhr = new XMLHttpRequest(); }
                    catch (e3) { xhr = false; }
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var retour = JSON.parse(xhr.responseText);
                        console.log(retour);
                        if (retour.data != null) {
                            alert(retour.message);
                            window.location.assign("DemandeRechargement.html");
                        }
                        else {
                            if (retour.message == "Vous n'etes pas connecté") {
                                localStorage.removeItem("idAdmin");
                                localStorage.removeItem("token");
                                window.location.assign("index.html");
                            }
                            else {
                                alert(retour.message);
                                window.location.assign("DemandeRechargement.html");
                            }
                        }
                    }
                }
            }
            xhr.open("GET", "http://localhost:8080/DemandeRechargements/" + id, true);
                xhr.setRequestHeader("idAdmin", localStorage.getItem('idAdmin'));
                xhr.setRequestHeader("token", localStorage.getItem('token'));
                xhr.send(null);
        }
    }
});