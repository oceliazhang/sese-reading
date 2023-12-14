import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [userRole, setUserRole] = useState("USER");
  const navigate = useNavigate();
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    setUserRole(account.role)
  };
  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);

  const save = async () => {
    await client.updateUser(account);
  };

  const signout = async () => {
    await client.signout();
    navigate("/signin");
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="container w-50">
        <h1 className="text-start">Account</h1>
        {account && (
          <div className="d-flex flex-column text-start w-50 my-4">
            <label>FirstName</label>
            <input
              className="form-control mt-2"
              value={account.firstName}
              onChange={(e) =>
                setAccount({ ...account, firstName: e.target.value })
              }
            />
            <label>lastName</label>
            <input
              className="form-control mt-2"
              value={account.lastName}
              onChange={(e) =>
                setAccount({ ...account, lastName: e.target.value })
              }
            />
            <label>Password</label>
            <input
              id="password"
              className="form-control mt-2"
              value={account.password}
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
            />
            <label>Email</label>
            <input
              className="form-control mt-2"
              value={account.email}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
            <label>Role</label>
            <select
              className="form-control mt-2"
              onChange={(e) => setAccount({ ...account, role: e.target.value })}
            >
              <option value="ADMIN">Admin</option>
              <option value="AUTHOR">Faculty</option>
              <option value="READER">Student</option>
            </select>
            <button className="btn btn-primary w-100 mt-2 " onClick={save}>
              <Link className="text-white text-decoration-none" to="/profile">Save</Link>
            </button>
            <button className="btn btn-danger w-100 mt-2" onClick={signout}>
              Signout
            </button>
            {userRole === "ADMIN" && (
              <Link to="/table" className="btn btn-warning w-100 mt-2">
                Users
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Account;
