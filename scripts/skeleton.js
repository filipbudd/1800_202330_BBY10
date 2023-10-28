function loadSkeleton() {
    console.log($('#navPlaceholder').load('./text/navbar.html'));
    console.log($('#footerPlaceholder').load('./text/footer.html'));
}

loadSkeleton();