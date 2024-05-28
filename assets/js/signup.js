document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('signUpForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        document.getElementById('accountNameError').textContent = '';
        document.getElementById('userNameError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        var accountName = document.getElementById('accountName').value;
        var userName = document.getElementById('userName').value;
        var password = document.getElementById('password').value;
        var name = accountName.length >= 3 && accountName.length <= 50;
        var username = userName.length >= 3 && userName.length <= 50;
        var pass = password.length >= 3 && password.length <= 20 && /\d/.test(password) && /[a-zA-Z]/.test(password);
        var formIsValid = true;

        if (!name) {
            formIsValid = false;
            document.getElementById('accountNameError').textContent = 'AccountName phải có từ 3 đến 50 ký tự';
        }

        if (!username) {
            formIsValid = false;
            document.getElementById('userNameError').textContent = 'UserName phải có từ 3 đến 50 ký tự';
        }

        if (!pass) {
            formIsValid = false;
            document.getElementById('passwordError').textContent = 'Password phải có từ 3 đến 0 ký tự bao gồm cả chữ cái và số';
        }
        if (formIsValid) {
            alert('Form submitted successfully!');
        }
    });
});
