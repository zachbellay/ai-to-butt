// replace.js
function replaceText(node) {
    if (node.nodeType === 3) { // Text node
        let text = node.nodeValue;
        
        // Replace "AI" and "A.I." with "butt" but not partial matches
        text = text.replace(/\bAI\b/g, "Butt");
        text = text.replace(/\bA\.I\./g, "Butt");
        
        if (text !== node.nodeValue) {
            node.nodeValue = text;
        }
    } else if (node.nodeType === 1 && // Element node
               node.nodeName !== 'SCRIPT' && 
               node.nodeName !== 'STYLE' &&
               node.nodeName !== 'TEXTAREA' &&
               node.nodeName !== 'INPUT') {
        // Recursively process child nodes
        for (let i = 0; i < node.childNodes.length; i++) {
            replaceText(node.childNodes[i]);
        }
    }
}

// Create a MutationObserver to handle dynamically added content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            replaceText(node);
        });
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial replacement
replaceText(document.body);
