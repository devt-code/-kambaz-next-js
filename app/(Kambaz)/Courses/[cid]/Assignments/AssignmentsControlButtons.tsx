import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <span className="fs-4 bg-secondary border border-dark rounded-pill px-1">
        40% of Total
      </span>
      <BsPlus className="fs-4 text-black" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
