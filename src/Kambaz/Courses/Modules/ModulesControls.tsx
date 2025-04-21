import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";
import "./modules.css";

interface ModulesControlsProps {
  moduleName: string;
  setModuleName: React.Dispatch<React.SetStateAction<string>>;

  addModule: () => void;
}

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: ModulesControlsProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      id="wd-modules-controls"
      className="d-flex flex-nowrap gap-2 justify-content-end align-items-center overflow-auto mb-3"
    >
      <Button variant="light" size="lg" id="wd-collapse-all" className="wd-light-gray-btn">
        Collapse All
      </Button>
      <Button variant="light" size="lg" id="wd-view-progress" className="wd-light-gray-btn">
        View Progress
      </Button>

      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          size="lg"
          id="wd-publish-all-btn"
          className="wd-light-gray-btn wd-publish-all-btn"
        >
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            Unpublish all modules and items
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button
        variant="danger"
        size="lg"
        id="wd-add-module-btn"
        style={{ minWidth: "120px", whiteSpace: "nowrap" }}
        onClick={handleShow}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
