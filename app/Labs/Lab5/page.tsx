import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import ModuleObject from "./moduleObject";
import WorkingWithArrays from "./WorkingWithArrays";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER_NEW;
export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2 className="mb-4">Student Details</h2>
      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            <th scope="row" className="w-25">
              Name:
            </th>
            <td>Deva Sai Sunder Tangella</td>
          </tr>
          <tr>
            <th scope="row">Section:</th>
            <td>05</td>
          </tr>
          <tr>
            <th scope="row">Client GitHub Repo Link:</th>
            <td>
              <a
                href="https://github.com/devt-code/-kambaz-next-js/tree/a5"
                id="wd-github"
                className="text-decoration-none"
                target="_blank"
              >
                kambaz-next-js Client Repo
              </a>
            </td>
          </tr>
          <tr>
            <th scope="row">Server GitHub Repo Link:</th>
            <td>
              <a
                href="https://github.com/devt-code/kambaz-node-server-app"
                id="wd-github"
                className="text-decoration-none"
                target="_blank"
              >
                kambaz-node-server-app Server Repo
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>
      </div>
      <hr />
      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <ModuleObject />
      <WorkingWithArrays />
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
