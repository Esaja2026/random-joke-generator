const jokeElement = document.getElementById('joke');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

async function fetchJoke() {
  try {
    jokeElement.textContent = 'Loading a joke...';
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');

    if (!response.ok) {
      throw new Error('Unable to fetch joke');
    }

    const data = await response.json();
    jokeElement.textContent = `${data.setup} ${data.punchline}`;
  } catch (error) {
    jokeElement.textContent = 'Oops! The joke service is unavailable right now. Please try again.';
    console.error(error);
  }
}

copyBtn.addEventListener('click', async () => {
  const jokeText = jokeElement.textContent;

  if (!jokeText || jokeText.includes('Loading') || jokeText.includes('Oops')) {
    return;
  }

  try {
    await navigator.clipboard.writeText(jokeText);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1200);
  } catch (error) {
    console.error('Copy failed:', error);
    alert('Copy failed. Please try again.');
  }
});

generateBtn.addEventListener('click', fetchJoke);

fetchJoke();
