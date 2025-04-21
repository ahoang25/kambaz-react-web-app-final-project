import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, deleteModule, updateModule, editModule } from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { Container, Row, Col, ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import "./modules.css";
import * as coursesClient from "../client";  
import { useEffect } from "react";
import * as modulesClient from "../client";

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  editing: boolean;
  course: string;       
  lessons: Lesson[];    
}

export default function Modules() {
  const { cid } = useParams<{ cid?: string }>();
  const dispatch = useDispatch();

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  useEffect(() => {
    const fetchModules = async () => {
      if (cid) {
        const modules = await coursesClient.findModulesForCourse(cid);
        dispatch(setModules(modules));
      }
    };
    fetchModules();
  }, [cid]);

  const modules: Module[] = useSelector((state: any) => state.modulesReducer.modules);

  const [moduleName, setModuleName] = useState("");

  return (
    <Container fluid style={{ marginLeft: "100px" }} >
      <Row>
        <Col md={9}>
        <ModulesControls
  moduleName={moduleName}
  setModuleName={setModuleName}
  addModule={createModuleForCourse}
/>

          <ListGroup className="rounded-0" id="wd-modules">
            {modules.map((m) => (
                <ListGroup.Item
                  key={m._id}
                  className="wd-module p-0 mb-5 fs-5 border-gray"
                >
                  <div className="wd-title p-3 ps-2 module-header d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />

                    {m.editing ? (
                      <FormControl
                        className="w-50 d-inline-block"
                        value={m.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          dispatch(updateModule({ ...m, name: e.target.value }))
                        }
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") {
                              saveModule({ ...m, editing: false });
                            }
                          }}
                      />
                    ) : (
                      <span className="fw-bold">{m.name}</span>
                    )}

                    <div className="ms-auto d-flex align-items-center">
                    <ModuleControlButtons
  moduleId={m._id}
  deleteModule={() => removeModule(m._id)} 
  editModule={() => dispatch(editModule(m._id))}
/>
                    </div>
                  </div>

                  {m.lessons && (
                    <ListGroup className="wd-lessons rounded-0">
                      {m.lessons.map((lesson) => (
                        <ListGroup.Item
                          key={lesson._id}
                          className="wd-lesson p-3 ps-1 d-flex align-items-center published"
                        >
                          <BsGripVertical className="me-2 fs-3" />
                          {lesson.name}
                          <div className="ms-auto">
                          <LessonControlButtons
                              moduleId={lesson._id}
                              deleteModule={(lessonId: string) => {
                                console.log("Deleting lesson with ID:", lessonId);
                                
                              }}
                            />
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
