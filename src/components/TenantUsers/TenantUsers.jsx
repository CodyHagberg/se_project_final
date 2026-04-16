import { useEffect, useMemo, useState } from "react";
import { createTenantUser, deleteTenantUser, fetchTenantUsers, resetTenantUserPassword } from "../../utils/api";
import "./TenantUsers.css";

function TenantUsers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [data, setData] = useState({ users: [], seatLimit: 1, seatsUsed: 1 });

  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetUserId, setResetUserId] = useState(null);

  const canAddUser = useMemo(() => (data.seatsUsed ?? 1) < (data.seatLimit ?? 1), [data]);

  async function load() {
    setError("");
    setLoading(true);
    try {
      const res = await fetchTenantUsers();
      setData({ users: res.users || [], seatLimit: res.seatLimit ?? 1, seatsUsed: res.seatsUsed ?? 1 });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const showMsg = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(""), 2000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createTenantUser({ email, tempPassword });
      setEmail("");
      setTempPassword("");
      showMsg("User created");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Remove ${user.email}?`)) return;
    setError("");
    try {
      await deleteTenantUser(user.id);
      showMsg("User removed");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenReset = (user) => {
    setResetUserId(user.id);
    setResetPassword("");
  };

  const handleReset = async () => {
    if (!resetUserId) return;
    setError("");
    try {
      await resetTenantUserPassword(resetUserId, resetPassword);
      setResetUserId(null);
      setResetPassword("");
      showMsg("Password reset");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="tenantUsers__loading">Loading users...</p>;
  if (error) return <p className="tenantUsers__error">{error}</p>;

  return (
    <div className="tenantUsers">
      <div className="tenantUsers__header">
        <h2 className="tenantUsers__title">Team</h2>
        <div className="tenantUsers__seatMeta">
          Seats: <strong>{data.seatsUsed}</strong> / <strong>{data.seatLimit}</strong>
        </div>
      </div>

      {actionMsg && <p className="tenantUsers__actionMsg">{actionMsg}</p>}

      <form className="tenantUsers__form" onSubmit={handleCreate}>
        <div className="tenantUsers__formRow">
          <label className="tenantUsers__label">
            Email
            <input
              className="tenantUsers__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@company.com"
              required
              disabled={!canAddUser}
            />
          </label>
          <label className="tenantUsers__label">
            Temporary password
            <input
              className="tenantUsers__input"
              type="text"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              placeholder="Min 8 characters"
              required
              disabled={!canAddUser}
            />
          </label>
          <button className="tenantUsers__primaryBtn" type="submit" disabled={!canAddUser}>
            Add user
          </button>
        </div>
        {!canAddUser && (
          <p className="tenantUsers__hint">Seat limit reached. Ask an admin to increase seats.</p>
        )}
      </form>

      <div className="tenantUsers__table">
        <div className="tenantUsers__row tenantUsers__row--header">
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div className="tenantUsers__actionsHeader">Actions</div>
        </div>
        {data.users.map((u) => (
          <div key={u.id} className="tenantUsers__row">
            <div className="tenantUsers__mono">{u.email}</div>
            <div>{u.role === "business" ? "Owner" : "Member"}</div>
            <div>{u.mustChangePassword ? "Must change password" : "Active"}</div>
            <div className="tenantUsers__actions">
              {u.role === "member" && (
                <>
                  <button className="tenantUsers__btn" type="button" onClick={() => handleOpenReset(u)}>
                    Reset password
                  </button>
                  <button className="tenantUsers__dangerBtn" type="button" onClick={() => handleDelete(u)}>
                    Remove
                  </button>
                </>
              )}
              {u.role === "business" && <span className="tenantUsers__muted">—</span>}
            </div>
          </div>
        ))}
      </div>

      {resetUserId && (
        <div className="tenantUsers__modalBackdrop" role="dialog" aria-modal="true">
          <div className="tenantUsers__modal">
            <h3 className="tenantUsers__modalTitle">Reset password</h3>
            <label className="tenantUsers__label">
              New temporary password
              <input
                className="tenantUsers__input"
                type="text"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                placeholder="Min 8 characters"
              />
            </label>
            <div className="tenantUsers__modalActions">
              <button className="tenantUsers__primaryBtn" type="button" onClick={handleReset}>
                Save
              </button>
              <button className="tenantUsers__btn" type="button" onClick={() => setResetUserId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TenantUsers;

