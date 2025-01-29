import { useEffect, useState } from "react";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState ([]);

  useEffect(() => {
    const SavedCandidates = JSON.parse(localStorage.getItem('savedCandidates')) || [];
    setCandidates(SavedCandidates);
  }, []);

  if(!candidates.length){
    return(
      <p>No Candidates have been saved</p>
    );
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      {candidates.map((candidate, index) => (
        <div key={index}>
          <p>Name: {candidate.name}</p>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <img src={candidate.avatar_url} alt={`${candidate.username}'s avatar`} />
          <p>Email: {candidate.email}</p>
          <p>URL: <a href={candidate.html_url}>{candidate.html_url}</a></p>
          <p>Company: {candidate.company}</p>
        </div>
      ))}
    </>
  );
};

export default SavedCandidates;
