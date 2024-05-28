document.addEventListener("DOMContentLoaded", function() {
    // Xử lý sự kiện cho lịch sử tìm kiếm
    const searchHistoryItems = document.querySelectorAll('.header__search-input-item a');
    
    searchHistoryItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const targetUrl = event.target.getAttribute('href');
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        });
    });

    var modal = document.getElementById("quickViewModal");
    var closeButton = document.getElementById("closeButton");

    // Nút "Quick View" cho sản phẩm 1
    var btn1 = document.getElementById("quickViewButton1");
    btn1.onclick = function() {
        showModal("ASUS FHD Gaming Laptop", "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.", "./assets/img/img_wishlist/ideapad_gaming.png");
    }

    // Nút "Quick View" cho sản phẩm 2
    var btn2 = document.getElementById("quickViewButton2");
    btn2.onclick = function() {
        showModal("IPS LCD Gaming Monitor", "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.", "./assets/img/img_wishlist/LCD_gaming.png");
    }

    // Nút "Quick View" cho sản phẩm 3
    var btn3 = document.getElementById("quickViewButton3");
    btn3.onclick = function() {
        showModal("HAVIT HV-G92 Gamepad", "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.", "./assets/img/img_wishlist/gamepad_havit.png");
    }

    // Nút "Quick View" cho sản phẩm 4
    var btn4 = document.getElementById("quickViewButton4");
    btn4.onclick = function() {
        showModal("AK-900 Wired Keyboard", "Description of Product", "./assets/img/img_wishlist/keyboard.png");
    }

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function showModal(name, description, imageUrl) {
        var productName = document.getElementById("productName");
        var productDescription = document.getElementById("productDescription");
        var productImage = document.getElementById("productImage");

        productName.textContent = name;
        productDescription.textContent = description;
        productImage.src = imageUrl;

        modal.style.display = "block";
    }
});
