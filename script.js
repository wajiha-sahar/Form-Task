document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            showThankYouPage();
        }
    });
    togglePassword.addEventListener('click', () => {
        const passwordField = document.getElementById('password');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            togglePassword.classList.replace('fa-eye', 'fa-eye-slash'); // Change icon
        } else {
            passwordField.type = 'password';
            togglePassword.classList.replace('fa-eye-slash', 'fa-eye'); // Change icon
        }
    });
}); 
function validateField(input) {
    const errorSpan = document.getElementById(input.id + 'Error');
    let isValid = true;

    switch (input.id) {
        case 'username':
            isValid = input.value.trim() !== '';
            break;
        case 'email':
            isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value);
            break;
        case 'firstName':
            isValid = input.value.trim() !== '';
            break;
        case 'website':
            isValid = input.value.trim() === '' || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(input.value);
            break;
        case 'password':
            isValid = validatePassword(input.value);
            break;
        case 'rePassword':
            const password = document.getElementById('password').value;
            isValid = input.value === password;
            break;
        case 'terms':
            isValid = input.checked;
            break;
    }

    if (!isValid) {
        input.classList.add('invalid');
        errorSpan.style.display = 'block';
    } else {
        input.classList.remove('invalid');
        errorSpan.style.display = 'none';
    }

    return isValid;
}

function validatePassword(password) {
    const errorSpan = document.getElementById('passwordError');
    let errors = [];
    const lengthValid = password.length >= 8 && password.length <= 20;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[\s!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!lengthValid) {
        errors.push('Password must be between 8 and 20 characters.');
    }
    if (!hasLetter) {
        errors.push('Password must contain at least one letter.');
    }
    if (!hasNumber) {
        errors.push('Password must contain at least one number.');
    }
    if (hasSpecialChar) {
        errors.push('Password must not contain special characters.');
    }

    errorSpan.innerHTML = errors.join('<br>');
    return errors.length === 0;
}

function showThankYouPage() {
    document.body.innerHTML = `
        <div class="container">
            <h2>Thank You!</h2>
            <p>Your form has been submitted successfully.</p>
            <button onclick="location.reload()">Back to Form</button>
        </div>
    `;
}
