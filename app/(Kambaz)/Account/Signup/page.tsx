import Link from "next/link";
export default function Signup() {
  return (
    <div id="wd-signup-screen" style={{ maxWidth: "300px" }}>
      <h1>Sign up</h1>
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
      <input
        placeholder="verify password"
        type="password"
        id="wd-password-verify"
        className="form-control mb-2"
      />
      <Link
        href="Profile"
        id="wd-singup-btn"
        className="btn btn-primary mb-2 px-4 d-block"
        style={{ width: "auto" }}
      >
        {" "}
        Sign up{" "}
      </Link>
      <Link href="Signin"> Sign in </Link>
    </div>
  );
}
