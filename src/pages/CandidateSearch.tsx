import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]= useState<string | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(() =>{
    const savedCandidates = localStorage.getItem('potentialCandidates');
    return savedCandidates ? JSON.parse(savedCandidates) : [];   
  })

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const candidates = await searchGithub();
        if(candidates.length){
          const candidateData = await searchGithubUser(candidates[0].login);
          setCandidate(candidateData);
        }else {
          setCandidate(null);
        }
      }catch (err: any) {
        setError(err.message);
      }finally{
        setLoading(false);
      }
    };

    fetchCandidate();
  }, []);

  const handleSave = () => {
    //Implement Save Functionality Code
  };

  const handleSkip = () => {
    // Implement skip functionality code
    fetchCandidate();
  };

  if(loading){
    return <p>Loading...</p>;
  }

  if(error){
    return <p>Error: {error}</p>;
  }


  return(
    <div className='card-container'>
      <h1>CandidateSearch</h1>
      {candidate ?(
        <div className='candidate-card'>
          <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} className='avatar' />
          <h2>{candidate.name} <span>({candidate.login})</span></h2>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <p>Location: {candidate.location}</p>
          <p>Bio: {candidate.bio}</p>
        </div>
      ): (
        <p>No More Candidate available to Review.</p>
      )} 
      <div className='button-container'>
        <button onClick={handleSave}>+</button>
        <button onClick={handleSkip}>-</button>
      </div>
    </div>
  );

};

export default CandidateSearch;
