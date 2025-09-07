$(document).ready(function() {
    // Tab switching functionality
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        
        // Update tab buttons
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // Update tab content
        $('.tab-pane').removeClass('active');
        $(`#${tabId}`).addClass('active');
    });
    
    // Login form submission
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        const username = $('#loginUsername').val().trim();
        const password = $('#loginPassword').val().trim();
        
        if (username === 'user' && password === '1234567890') {
            // Success animation
            const btn = $(this).find('.auth-btn');
            btn.html('<i class="fas fa-check"></i> Success!');
            btn.css('background', '#007bff');
            
            setTimeout(() => {
                window.location.href = 'homepage.html';
            }, 1000);
        } else {
            // Error animation
            const btn = $(this).find('.auth-btn');
            btn.html('<i class="fas fa-times"></i> Invalid!');
            btn.css('background', '#dc3545');
            
            setTimeout(() => {
                alert('Invalid Credentials');
                btn.html('<span>Access Universe</span><i class="fas fa-arrow-right"></i>');
                btn.css('background', '#007bff');
            }, 1500);
        }
    });
    
    // Reset modal when closed
    $('#authModal').on('hidden.bs.modal', function() {
        $('#loginForm')[0].reset();
        $('.tab-btn').removeClass('active');
        $('.tab-btn[data-tab="login"]').addClass('active');
        $('.tab-pane').removeClass('active');
        $('#login').addClass('active');
    });
});