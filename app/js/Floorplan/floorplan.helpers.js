function getToken() {
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get("token");
    return token;
}