document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const shareModal = document.getElementById('share-modal');
    const modalOverlay = shareModal?.querySelector('.modal-overlay');
    const modalCloseButton = shareModal?.querySelector('.modal-close');
    const copyLinkButton = shareModal?.querySelector('.copy-link-button');
    const copyFeedback = shareModal?.querySelector('.copy-link-feedback');

    // --- Sidebar Toggle ---
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // --- Close Sidebar on Outside Click ---
    document.addEventListener('click', (event) => {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);

        if (sidebar.classList.contains('active') && !isClickInsideSidebar && !isClickOnMenuToggle) {
            sidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // --- Action Button Event Listener (Delegated) ---
    if (mainContent) {
        mainContent.addEventListener('click', (e) => {
            const button = e.target.closest('.action-button');
            if (!button) return; // Exit if click wasn't on or inside an action button

            const buttonType = button.dataset.type;
            const postElement = button.closest('.post');
            const postActions = button.closest('.post-actions');

            if (!postElement || !postActions) return; // Ensure we are inside a post

            if (buttonType === 'like') {
                handleLike(button, postActions);
            } else if (buttonType === 'downvote') {
                handleDownvote(button, postActions);
            } else if (buttonType === 'comment') {
                toggleCommentSection(postElement);
            } else if (buttonType === 'share') {
                showShareModal(postElement); // Pass post element if needed later
            }
        });
    }


    // --- Like/Dislike Handlers ---
    function handleLike(likeButton, actionsContainer) {
        const downvoteButton = actionsContainer.querySelector('.downvote-button');
        const countSpan = likeButton.querySelector('.count');
        let count = parseCount(countSpan?.textContent);

        if (likeButton.classList.contains('liked')) {
            likeButton.classList.remove('liked');
            count--;
        } else {
            likeButton.classList.add('liked');
            count++;
            if (downvoteButton && downvoteButton.classList.contains('downvoted')) {
                downvoteButton.classList.remove('downvoted');
            }
        }
        updateCountDisplay(countSpan, count);
    }

    function handleDownvote(downvoteButton, actionsContainer) {
        const likeButton = actionsContainer.querySelector('.like-button');

        if (downvoteButton.classList.contains('downvoted')) {
            downvoteButton.classList.remove('downvoted');
        } else {
            downvoteButton.classList.add('downvoted');
            if (likeButton && likeButton.classList.contains('liked')) {
                 const likeCountSpan = likeButton.querySelector('.count');
                 let likeCount = parseCount(likeCountSpan?.textContent);
                 likeButton.classList.remove('liked');
                 likeCount--;
                 updateCountDisplay(likeCountSpan, likeCount);
            }
        }
    }

    // --- Comment Section Toggle ---
    function toggleCommentSection(postElement) {
        const existingCommentSection = postElement.querySelector('.comment-section');

        if (existingCommentSection) {
            existingCommentSection.remove();
        } else {
            const commentSection = document.createElement('div');
            commentSection.className = 'comment-section';
            commentSection.innerHTML = `
                <h4>Leave a Comment</h4>
                <textarea class="comment-input" placeholder="Type your comment here..."></textarea>
                <button class="comment-submit">Submit Comment</button>
            `;
            postElement.appendChild(commentSection);

            // Optional: Add listener for the submit button within this new section
            const submitButton = commentSection.querySelector('.comment-submit');
            submitButton?.addEventListener('click', () => {
                const textarea = commentSection.querySelector('.comment-input');
                console.log('Comment Submitted:', textarea.value);
                textarea.value = ''; // Clear textarea
                // In a real app, you would send this data to a server
                commentSection.remove(); // Close section after submit for demo
            });
        }
    }


    // --- Share Modal Logic ---
    function showShareModal(postElement) {
        if (shareModal) {
            // TODO: Potentially update modal links based on postElement (e.g., setting the actual URL)
            // For now, just show the generic modal
            shareModal.style.display = 'flex';
            document.body.classList.add('no-scroll'); // Prevent background scroll
        }
    }

    function hideShareModal() {
        if (shareModal) {
            shareModal.style.display = 'none';
             if (copyFeedback) copyFeedback.style.display = 'none'; // Hide feedback on close
             document.body.classList.remove('no-scroll');
        }
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', hideShareModal);
    }
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', hideShareModal);
    }

     // --- Copy Link Functionality ---
     if (copyLinkButton && copyFeedback) {
         copyLinkButton.addEventListener('click', (e) => {
             e.preventDefault(); // Prevent default anchor behavior
             const urlToCopy = window.location.href; // Use current page URL as placeholder

             navigator.clipboard.writeText(urlToCopy).then(() => {
                 copyFeedback.style.display = 'block';
                 setTimeout(() => {
                     copyFeedback.style.display = 'none';
                 }, 2000); // Hide feedback after 2 seconds
             }).catch(err => {
                 console.error('Failed to copy link: ', err);
                 copyFeedback.textContent = 'Failed to copy!';
                 copyFeedback.style.display = 'block';
                  setTimeout(() => {
                     copyFeedback.style.display = 'none';
                     copyFeedback.textContent = 'Link Copied!'; // Reset text
                 }, 2000);
             });
         });
     }


    // --- Utility Functions ---
    function parseCount(text) {
        let num = 0;
        if (text) {
            const cleanedText = text.trim().toLowerCase();
            if (cleanedText.includes('k')) {
                num = parseFloat(cleanedText.replace('k', '')) * 1000;
            } else {
                num = parseInt(cleanedText.replace(/,/g, ''), 10);
            }
        }
        return isNaN(num) ? 0 : Math.round(num);
    }

    function updateCountDisplay(spanElement, count) {
        if (!spanElement) return;
         if (count >= 10000) {
             spanElement.textContent = (count / 1000).toFixed(1) + 'k';
        } else if (count >= 1000) {
             spanElement.textContent = count.toLocaleString();
        }
         else {
             spanElement.textContent = count;
        }
    }

});