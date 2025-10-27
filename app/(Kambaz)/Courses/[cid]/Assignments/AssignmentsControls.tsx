import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { redirect, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsControls() {
  const { cid } = useParams();
  const assignmentEditor = () => {
    const aid = uuidv4();
    redirect("/Courses/" + cid + "/Assignments/" + aid);
  };

  return (
    <div>
      <InputGroup style={{ maxWidth: "300px" }} className="me-1 float-start">
        <InputGroupText className="bg-white border-end-0">
          <CiSearch />
        </InputGroupText>
        <FormControl
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          size="lg"
          className="border-start-0"
        />
      </InputGroup>
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-btn"
        onClick={assignmentEditor}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-group-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
    </div>
  );
}
