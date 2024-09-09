import Sidebar from "./Sidebar";
import View from "./View";

export default function List() {
  return (
    <div className="grid min-h-[90vh] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <View />
    </div>
  );
}
