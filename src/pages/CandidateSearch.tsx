import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import '../index.css';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(
    () => {
      const savedCandidates = localStorage.getItem("potentialCandidates");
      return savedCandidates ? JSON.parse(savedCandidates) : [];
    }
  );

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      const candidates = await searchGithub();
      if (candidates.length) {
        const candidateData = await searchGithubUser(candidates[0].login);
        setCandidate(candidateData);
      } else {
        setCandidate(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (candidate) {
      setPotentialCandidates((prev) => {
        const updated = [...prev, candidate];
        localStorage.setItem("potentialCandidates", JSON.stringify(updated));
        return updated;
      });
      fetchCandidate();
    }
  };

  const handleSkip = () => {
    fetchCandidate();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Candidate Search</h1>
      <div className="card-container">
        {candidate ? (
          <div className="candidate-card">
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} className="avatar"/>
            <h2>
              {candidate.name || "No Name Provided"}{" "}<span>({candidate.login})</span>
            </h2>
            <p>Location: {candidate.location || "Not Available"}</p>
            <p>Email: {candidate.email || "Not Available"}</p>
            <p>Company: {candidate.company || "Not Available"}</p>
            <p>Bio: {candidate.bio || "No Bio Available"}</p>
          </div>
        ) : (
          <p>No More Candidate available to Review.</p>
        )}
      </div>
        <div className="button-container">
          <button className="add" onClick={handleSave}>+</button>
          <button className="remove"onClick={handleSkip}>-</button>
        </div>
    </>
  );
};

export default CandidateSearch;
