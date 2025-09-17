export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />{" "}
      <button id="wd-add-assignment-group">+ Group</button>{" "}
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </link>
          <p>
            Multiple Modules | <b>Not available until</b> Sep 10 at 12:00am |{" "}
            <b>Due</b> Sep 17 at 11:59pm | 100 pts
          </p>
        </li>

        <li className="wd-assignment-list-item">
          <link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </link>
          <p>
            Multiple Modules | <b>Not available until</b> Sep 24 at 12:00am |{" "}
            <b>Due</b> Oct 01 at 11:59pm | 100 pts
          </p>
        </li>

        <li className="wd-assignment-list-item">
          <link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </link>
          <p>
            Multiple Modules | <b>Not available until</b> Oct 08 at 12:00am |{" "}
            <b>Due</b> Oct 15 at 11:59pm | 100 pts
          </p>
        </li>
      </ul>
    </div>
  );
}
