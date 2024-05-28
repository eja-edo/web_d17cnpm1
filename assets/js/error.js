document.addEventListener("DOMContentLoaded", function() {
    // Xử lý sự kiện cho lịch sử tìm kiếm
    const searchHistoryItems = document.querySelectorAll('.header__search-input-item a');
    
    searchHistoryItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const targetUrl = event.target.getAttribute('href');
            if (targetUrl && targetUrl.trim() !== '') { // Kiểm tra nếu targetUrl tồn tại và không trống
                window.location.href = targetUrl;
            }
        });
    });
});
