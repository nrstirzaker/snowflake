$(function () {



    $("#btnLogin").click(function () {
        // const email = $('#txtEmail').val();
        // const password = $('#txtPassword').val();
        // const auth = firebase.auth();

        // const promise = auth.signInWithEmailAndPassword(email, password);
        // promise.catch(e => console.log(e.message));
    });


    $('#btnSignup').click(function () {

        //$('#form').validate();

        const email = $('#txtEmail').val();
        const password = $('#txtPassword').val();

        const credentials = { username: email, password: password };

        $.post({
            url: "/api/register",
            type: "POST",
            async : true,
            data: credentials,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                process.stdout.write(jqXHR);
            }
        });

    });

    $('#btnLogout').click(function () {
        //firebase.auth().signOut();
    });

    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if (firebaseUser) {
    //         console.log(firebaseUser);
    //         btnLogout.classList.remove("hide");
    //     } else {
    //         console.log("not logged in");
    //         btnLogout.classList.add("hide");
    //     }
    // })


}());