function loadSkeleton() {
    console.log($('#navPlaceholderNoUser').load('/text/navbarnotloggedin.html'));
    console.log($('#navPlaceholder').load('/text/navbar.html'));
    console.log($('#footerPlaceholder').load('/text/footer.html'));
}

loadSkeleton();