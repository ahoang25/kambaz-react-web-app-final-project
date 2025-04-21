import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa"; 
import GreenCheckmark from "./GreenCheckmark";

interface LessonControlButtonsProps {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
}

export default function LessonControlButtons({ moduleId, deleteModule }: LessonControlButtonsProps) {
  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteModule(moduleId)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
