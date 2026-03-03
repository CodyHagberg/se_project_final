import { useState, useEffect } from "react";
import { fetchBusinesses } from "../../utils/api";
import "./AdminBusinesses.css";

function AdminBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const data = await fetchBusinesses();
      setBusinesses(data.businesses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="adminBiz__loading">Loading businesses...</p>;
  if (error) return <p className="adminBiz__error">{error}</p>;

  return (
    <div className="adminBiz">
      <h2 className="adminBiz__title">Onboarded Businesses</h2>
      {businesses.length === 0 ? (
        <p className="adminBiz__empty">No businesses onboarded yet.</p>
      ) : (
        <table className="adminBiz__table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Leads</th>
              <th>API Key</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((biz) => (
              <tr key={biz.id}>
                <td>{biz.companyName}</td>
                <td>{biz.email}</td>
                <td>
                  <span className="adminBiz__plan">{biz.plan}</span>
                </td>
                <td>{biz.leadCount}</td>
                <td>
                  <code className="adminBiz__key">{biz.apiKey?.slice(0, 16)}...</code>
                </td>
                <td>{new Date(biz.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminBusinesses;
