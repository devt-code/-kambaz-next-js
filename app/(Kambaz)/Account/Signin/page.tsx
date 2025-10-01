import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" style={{ maxWidth: "300px" }}>
      <h1>Signin</h1>

      <input
        placeholder="username"
        id="wd-username"
        className="form-control mb-2"
      />

      <input
        placeholder="password"
        type="password"
        id="wd-password"
        className="form-control mb-2"
      />

      <Link
        href="/Dashboard"
        id="wd-signin-btn"
        className="btn btn-primary mb-2 px-4 d-block"
        style={{ width: "auto" }}
      >
        Signin
      </Link>

      <Link href="Signup" id="wd-signup-link">
        Signup
      </Link>
    </div>
  );
}
