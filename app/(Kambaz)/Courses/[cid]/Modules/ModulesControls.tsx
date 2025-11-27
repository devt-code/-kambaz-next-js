/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";
import { FaPlus } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isStudent = currentUser?.role === "STUDENT";
  const isOtherUser = currentUser && !isStudent;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* ADD MODULE BUTTON */}
      {isOtherUser && (
        <Button
          variant="danger"
          onClick={handleShow}
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Module
        </Button>
      )}

      {/* PUBLISH DROPDOWN */}
      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <FaBan
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Unpublish all modules
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <FaBan
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* VIEW PROGRESS */}
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-view-progress"
      >
        View Progress
      </Button>

      {/* COLLAPSE ALL */}
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>

      {/* MODULE EDITOR MODAL (only for non-students) */}
      {isOtherUser && (
        <ModuleEditor
          show={show}
          handleClose={handleClose}
          dialogTitle="Add Module"
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={addModule}
        />
      )}
    </div>
  );
}
