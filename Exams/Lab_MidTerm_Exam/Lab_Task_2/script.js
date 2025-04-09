const form = document.getElementById('checkoutForm');
const errorElements = document.querySelectorAll('.error');

// Validation functions
function validateName() {
    const name = document.getElementById('fullName');
    const regex = /^[A-Za-z ]+$/;
    if (!regex.test(name.value)) {
        showError(name, 'nameError', 'Please enter a valid name (alphabets only)');
        return false;
    }
    return true;
}

function validateEmail() {
    const email = document.getElementById('email');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
        showError(email, 'emailError', 'Please enter a valid email address');
        return false;
    }
    return true;
}

function validateExpiry() {
    const expiry = document.getElementById('expiry');
    const [month, year] = expiry.value.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!expiry.value || 
        month < 1 || month > 12 || 
        year < currentYear || 
        (year == currentYear && month < currentMonth)) {
        showError(expiry, 'expiryError', 'Please enter a valid future date');
        return false;
    }
    return true;
}

function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    input.classList.add('invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    errorElements.forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('invalid');
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate all fields
    if (!validateName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validateExpiry()) isValid = false;

    // Check required fields
    document.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
            showError(input, `${input.id}Error`, 'This field is required');
            isValid = false;
        }
    });

    // Additional validations
    const phone = document.getElementById('phone');
    if (!/^\d{10,15}$/.test(phone.value)) {
        showError(phone, 'phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    const cardNumber = document.getElementById('cardNumber');
    if (!/^\d{16}$/.test(cardNumber.value)) {
        showError(cardNumber, 'cardError', 'Please enter a valid card number');
        isValid = false;
    }

    const cvv = document.getElementById('cvv');
    if (!/^\d{3}$/.test(cvv.value)) {
        showError(cvv, 'cvvError', 'Please enter a valid CVV');
        isValid = false;
    }

    if (isValid) {
        // Submit form or show success message
        alert('Checkout successful!');
        form.reset();
    }
});

// Real-time validation for expiry date
document.getElementById('expiry').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});