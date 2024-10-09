import { useEffect, useState } from "react";

const Quots = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("/quote.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const quotes = await response.json();

        // Select a random quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  // Check if loading or there was an error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if the quote is not null before rendering
  return (
    <div style={styles.quoteContainer}>
      <blockquote style={styles.quoteText}>
        &ldquo;{quote.quote}&rdquo;
      </blockquote>
    </div>
  );
};

// Inline styles
const styles = {
  quoteContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100px", // Adjust height as needed
    padding: "10px",
    // Add margin for spacing
  },
  quoteText: {
    fontSize: "20px", // Font size
    fontStyle: "italic", // Italic style
    color: "#FF4500", // Text color
    overflowWrap: "break-word", // Allow text to wrap
    textAlign: "center", // Center the text
    maxWidth: "90%", // Limit max width
  },
};

// Optional: Add media queries for responsive design
const mediaQueryStyles = {
  "@media (max-width: 600px)": {
    quoteText: {
      fontSize: "18px", // Smaller font size for mobile
    },
  },
};

export default Quots;
