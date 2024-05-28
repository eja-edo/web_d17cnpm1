document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-1');
    const subscribeCheckbox = document.getElementById('subscribe');

    // Load saved data if available
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        form.elements['firstname'].value = savedData.firstname || '';
        form.elements['companyname'].value = savedData.companyname || '';
        form.elements['streetaddress'].value = savedData.streetaddress || '';
        form.elements['apartment'].value = savedData.apartment || '';
        form.elements['city'].value = savedData.city || '';
        form.elements['phone'].value = savedData.phone || '';
        form.elements['email'].value = savedData.email || '';
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn chặn form submit mặc định
        validateForm();
    });

    subscribeCheckbox.addEventListener('change', function () {
        if (this.checked) {
            if (validateForm()) {
                const formData = {
                    firstname: form.elements['firstname'].value.trim(),
                    companyname: form.elements['companyname'].value.trim(),
                    streetaddress: form.elements['streetaddress'].value.trim(),
                    apartment: form.elements['apartment'].value.trim(),
                    city: form.elements['city'].value.trim(),
                    phone: form.elements['phone'].value.trim(),
                    email: form.elements['email'].value.trim(),
                };
                localStorage.setItem('formData', JSON.stringify(formData));
                alert('Information saved successfully.');
            } else {
                this.checked = false;
                document.getElementById('general-message').textContent = 'Cannot save information due to validation errors.';
            }
        }
    });

    function validateForm() {
        let isValid = true;
        const firstName = form.elements['firstname'].value.trim();
        const streetAddress = form.elements['streetaddress'].value.trim();
        const city = form.elements['city'].value.trim();
        const phoneNumber = form.elements['phone'].value.trim();
        const email = form.elements['email'].value.trim();

        // Reset all error messages
        document.querySelectorAll('.form-message').forEach(el => el.textContent = '');

        // Validation checks
        if (firstName === '') {
            showError('first-name', 'First name is required');
            isValid = false;
        }
        if (streetAddress === '') {
            showError('street-address', 'Street address is required');
            isValid = false;
        }
        if (city === '') {
            showError('city', 'City is required');
            isValid = false;
        }

        const phonePattern = /^[0-9]{10,11}$/;
        if (!phonePattern.test(phoneNumber)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    }

    function showError(fieldId, message) {
        const formGroup = document.getElementById(fieldId).closest('.form-group');
        const messageElement = formGroup.querySelector('.form-message');
        messageElement.textContent = message;
        formGroup.querySelector('input').style.borderColor = 'red';
    }
});
