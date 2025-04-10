import React, { useState } from "react";
import "./App.css";

const pollData = {
  question: "What's your favorite frontend framework?",
  options: ["React", "Vue", "Angular", "Svelte"],
};

function App() {
  const [votes, setVotes] = useState(
    new Array(pollData.options.length).fill(0)
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption !== null && !hasVoted) {
      const updatedVotes = [...votes];
      updatedVotes[selectedOption] += 1;
      setVotes(updatedVotes);
      setHasVoted(true);
    }
  };

  const getTotalVotes = () => votes.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="app">
      <h1>{pollData.question}</h1>
      {!hasVoted ? (
        <>
          {pollData.options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name="poll"
                value={index}
                onChange={() => setSelectedOption(index)}
              />
              {option}
            </label>
          ))}
          <button onClick={handleVote} disabled={selectedOption === null}>
            Vote
          </button>
        </>
      ) : (
        <>
          <h2>📊 Results</h2>
          {pollData.options.map((option, index) => {
            const total = getTotalVotes();
            const percent =
              total === 0 ? 0 : Math.round((votes[index] / total) * 100);
            return (
              <div key={index} className="result-row">
                <span className="label">{option}</span>
                <div className="bar-container">
                  <div className="bar" style={{ width: `${percent}%` }} />
                </div>
                <span className="percent">{percent}%</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
