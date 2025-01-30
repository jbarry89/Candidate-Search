import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import '../index.css';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
    setCandidates(savedCandidates);
  }, []);

  if(!candidates.length){
    return(
      <p>No Candidates have been saved</p>
    );
  }

  const handleReject = (index: number) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));

  };

  return (
    <>
      <h1>Potential Candidates</h1>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td><img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} /></td>
              <td>{candidate.name} <span>({candidate.login})</span></td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td><button className="remove" onClick={() => handleReject(index)}>-</button></td>
            </tr>  
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default SavedCandidates;
