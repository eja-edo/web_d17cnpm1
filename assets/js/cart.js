function changeValue(button, delta) {
    var input = button.parentNode.querySelector('input[type="number"]');
    var value = parseInt(input.value, 10);
    value += delta;
    // Giới hạn giá trị trong khoảng từ 1 đến 999
    if (value < 1) {
        value = 1;
    } else if (value > 999) {
        value = 999;
    }
    input.value = value.toString().padStart(2, '0');
}

