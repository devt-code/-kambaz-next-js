import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { Modal, Button } from "react-bootstrap";

export default function AssignmentListControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const [show, setShow] = useState(false);
  const handleDeleteClick = () => {
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleConfirmDelete = () => {
    deleteAssignment(assignmentId);
    setShow(false);
  };

  return (
    <div className="float-end">
      <FaTrash className="text-danger me-3" onClick={handleDeleteClick} />

      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
