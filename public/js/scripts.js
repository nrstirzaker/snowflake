(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBVTB2U2hjGZUdfus9W0GP7XVD0f6dBAX0",
        authDomain: "snowflake-ab96c.firebaseapp.com",
        databaseURL: "https://snowflake-ab96c.firebaseio.com",
        storageBucket: "snowflake-ab96c.appspot.com",
        messagingSenderId: "279588899938"
    };
    firebase.initializeApp(config);


    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const btnLogout = document.getElementById('btnLogout');



    btnLogin.addEventListener("click", e => {


        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
        

    });


    btnSignup.addEventListener("click", e => {


        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
        

    });

    btnLogout.addEventListener("click", e => {
        firebase.auth().signOut();
    });

    firebase.auth().onStateChanged(firebaseUser => {
        if (firebaseUser){
            console.log(firebaseUser);
            btnLogout.classList.remove("hide");
        }else{
            console.log("not logged in");
            btnLogout.classList.add("hide");
        }
    })


}());