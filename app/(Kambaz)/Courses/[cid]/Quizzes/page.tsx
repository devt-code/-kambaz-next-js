// export default function Quizzes() {
//   return (
//     <div>
//       <h2>Quizzes</h2>
//     </div>
//   );
// }
// import { Routes, Route, Navigate } from "react-router-dom";
// import QuizList from "./List";
// import QuizDetails from "./Details";
// import QuizEditor from "./Editor";
// import QuizPreview from "./Preview";
// import QuizTake from "./Take";

// export default function QuizzesRoutes() {
//   return (
//     <Routes>
//       <Route path="" element={<QuizList />} />
//       <Route path=":qid" element={<QuizDetails />} />
//       <Route path=":qid/edit" element={<QuizEditor />} />
//       <Route path=":qid/preview" element={<QuizPreview />} />
//       <Route path=":qid/take" element={<QuizTake />} />
//       <Route path="*" element={<Navigate to="." />} />
//     </Routes>
//   );
// }

"use client";
import QuizList from "./List";

export default function Page() {
  return <QuizList />;
}
