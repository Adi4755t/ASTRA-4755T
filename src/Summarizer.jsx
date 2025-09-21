import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Summarizer = () => {
  const location = useLocation();
  const { sessionId, userId, userIdea } = location.state || {};

  const [clarifiers, setClarifiers] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // 🔹 Fetch clarifiers + conflicts togethe
  useEffect(() => {
    if (!sessionId || !userId) return;

    const fetchData = async () => {
      setLoading(true);
      setFetchError("");

      try {
        // ✅ Fetch clarifier answers
        const clarRes = await axios.get(
          `https://astra-c8r4.onrender.com/api/agents/clarifier/summary`,
          { headers: { "x-session-id": sessionId } }
        );

        setClarifiers(clarRes.data.answers || []);

        // ✅ Fetch conflicts
        const conflictRes = await axios.get(
          `https://astra-c8r4.onrender.com/api/agents/conflict-resolver`,
          { headers: { "x-session-id": sessionId } }
        );

        setConflicts(conflictRes.data.conflicts || []);
      } catch (err) {
        console.error(err);
        setFetchError(
          err.response?.data?.message || "Failed to fetch summary data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId, userId]);

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">📑 Session Summary</h1>

      {/* Session Info */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <p>
          <strong>User ID:</strong> {userId}
        </p>
        <p>
          <strong>Session ID:</strong> {sessionId}
        </p>
        <p>
          <strong>Idea:</strong> {userIdea}
        </p>
      </div>

      {loading ? (
        <p className="text-yellow-300 font-semibold">Loading summary...</p>
      ) : fetchError ? (
        <p className="text-red-500 font-semibold">{fetchError}</p>
      ) : (
        <>
          {/* Clarifiers */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">📝 Clarifier Responses</h2>
            {clarifiers.length === 0 ? (
              <p className="text-gray-400">No clarifier responses found.</p>
            ) : (
              <ul className="space-y-4">
                {clarifiers.map((item, idx) => (
                  <li key={idx} className="bg-gray-800 p-4 rounded">
                    <p className="font-semibold">
                      Q{idx + 1}: {item.question || item.text}
                    </p>
                    <p className="mt-2 text-green-300">
                      A: {item.answer || "No answer provided"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Conflicts */}
          <div>
            <h2 className="text-2xl font-bold mb-4">⚡ Conflict Resolution</h2>
            {conflicts.length === 0 ? (
              <p className="text-gray-400">No conflicts identified.</p>
            ) : (
              <ul className="space-y-4">
                {conflicts.map((conflict, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-800 p-4 rounded border border-gray-700"
                  >
                    <p className="font-semibold">
                      Conflict {idx + 1}: {conflict.issue || conflict.question}
                    </p>
                    <ul className="list-disc list-inside mt-2">
                      {(conflict.options || conflict.choices || []).map(
                        (opt, i) => (
                          <li key={i}>{opt}</li>
                        )
                      )}
                    </ul>
                    {conflict.resolvedOption && (
                      <p className="mt-2 text-blue-300">
                        ✅ Resolved: {conflict.resolvedOption}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Summarizer;
