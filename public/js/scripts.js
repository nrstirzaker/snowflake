$(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBVTB2U2hjGZUdfus9W0GP7XVD0f6dBAX0",
        authDomain: "snowflake-ab96c.firebaseapp.com",
        databaseURL: "https://snowflake-ab96c.firebaseio.com",
        storageBucket: "snowflake-ab96c.appspot.com",
        messagingSenderId: "279588899938"
    };

    firebase.initializeApp(config);

    $("#btnLogin").click(function () {
        const email = $('#txtEmail').val();
        const password = $('#txtPassword').val();
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });


    $('#btnSignup').click(function () {
        const email = $('#txtEmail').val();
        const password = $('#txtPassword').val();
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));


    });

    $('#btnLogout').click(function () {
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove("hide");
        } else {
            console.log("not logged in");
            btnLogout.classList.add("hide");
        }
    })


}());