// Select the elements
const form = document.getElementById('urlForm');
const originalUrlInput = document.getElementById('originalUrl');
const shortenedUrlContainer = document.getElementById('shortenedUrlContainer');
const shortenedUrl = document.getElementById('shortenedUrl');

// Add event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const originalUrl = originalUrlInput.value;

  // Send the original URL to the server and get the shortened URL
  const response = await fetch(`${window.location.origin}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ originalURL: originalUrl }),
  });
  

  const data = await response.json();
if (data.success) {
  // Display the shortened URL
  shortenedUrlContainer.classList.remove('hidden');

  // Get the current origin (domain + protocol) and use it to create the full URL
  const baseUrl = window.location.origin;  // This gets the base URL (http://localhost:3000 or the production URL)

  // Construct the full shortened URL dynamically
  shortenedUrl.textContent = `${baseUrl}/${data.shortCode}`;
  shortenedUrl.href = `${baseUrl}/${data.shortCode}`;
}else {
    alert('Failed to shorten the URL. Please try again.');
  }
});


document.getElementById('copyButton').addEventListener('click', function () {
  const shortenedUrl = document.getElementById('shortenedUrl').href;
  navigator.clipboard.writeText(shortenedUrl).then(() => {
    alert('Shortened URL copied to clipboard!');
  }).catch(err => {
    alert('Failed to copy URL: ' + err);
  });
});
