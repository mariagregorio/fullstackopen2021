import React, { useState } from 'react'

const AnecdoteOfTheDay = ({anecdote, votes, handleVote, handleRandom}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>Voted {votes} times</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandom}>random anecdote</button>
    </div>
  )
}

const AnecdoteWithMostVotes = ({anecdote, votes}) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const initialVotes = new Array(anecdotes.length)
  initialVotes.fill(0);

  const getMostVotedAnecdotePosition = (votes) => {
    let maxVotes = 0;
    votes.forEach((vote) => {
      if (vote > maxVotes) { maxVotes = vote }
    });
    return votes.indexOf(maxVotes);
  }
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  const [mostVoted, setMostVoted] = useState(0)

  const generateRandomAnecdoteNumber = () => {
    const max = anecdotes.length;
    return Math.floor(Math.random() * max);
  }

  const addVote = (selected) => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
    setMostVoted(getMostVotedAnecdotePosition(votesCopy));
  }

  return (
    <div>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        handleVote={() => addVote(selected)}
        handleRandom={() => setSelected(generateRandomAnecdoteNumber())}
      />
      <AnecdoteWithMostVotes
        anecdote={anecdotes[mostVoted]}
        votes={votes[mostVoted]}
      />
    </div>
  )
}

export default App