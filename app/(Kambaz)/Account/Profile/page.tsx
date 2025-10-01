import Link from "next/link";
import { FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: "300px" }}>
      <h1>Profile</h1>
      <input
        defaultValue="alice"
        placeholder="username"
        id="wd-username"
        className="form-control mb-2"
      />
      <input
        defaultValue="1235678"
        placeholder="password"
        type="password"
        id="wd-password"
        className="form-control mb-2"
      />
      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="form-control mb-2"
      />
      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="form-control mb-2"
      />
      <input
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="form-control mb-2"
      />
      <input
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="form-control mb-2"
      />
      <FormSelect id="wd-role" className="form-control mb-2">
        <option value="User" defaultChecked>
          User
        </option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link
        href="Signin"
        id="wd-signout-btn"
        className="btn btn-danger mb-2 px-4 d-block"
        style={{ width: "auto" }}
      >
        Sign Out
      </Link>
    </div>
  );
}
