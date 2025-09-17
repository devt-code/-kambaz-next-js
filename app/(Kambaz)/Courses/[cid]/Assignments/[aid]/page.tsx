export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <b>Assignment Name</b>
      </label>
      <br />
      <br />
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" rows={6} cols={60}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <br />

      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option>Percentage</option>
              <option>Points</option>
              <option>Complete/Incomplete</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option>Online</option>
              <option>Offline</option>
            </select>
            <br />
            <div>
              <label>
                <input type="checkbox" /> Text Entry
              </label>
              <br />
              <label>
                <input type="checkbox" /> Website URL
              </label>
              <br />
              <label>
                <input type="checkbox" /> Media Recordings
              </label>
              <br />
              <label>
                <input type="checkbox" /> Student Annotation
              </label>
              <br />
              <label>
                <input type="checkbox" /> File Uploads
              </label>
            </div>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            Assign to
            <br />
            <input id="wd-assign-to" value="Everyone" />
          </td>
        </tr>
        <br />

        <tr>
          <td />
          <td>
            Due <br />
            <input type="date" id="wd-due-date" value="2025-09-17" />
          </td>
        </tr>
        <br />

        <tr>
          <td />
          <table>
            <tr>
              <td>Available from</td>
              <td> Until</td>
            </tr>
            <tr>
              <td>
                <input type="date" id="wd-available-from" value="2025-09-10" />
              </td>
              <td>
                <input type="date" id="wd-available-until" value="2025-09-24" />
              </td>
            </tr>
          </table>
        </tr>
        <tr>
          <td colSpan={2}>
            <hr />
          </td>
        </tr>
        <tr>
          <td></td>
          <td align="right">
            <button>Cancel</button> <button>Save</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
