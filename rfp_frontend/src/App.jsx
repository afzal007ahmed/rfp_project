import { Button } from "@/components/ui/button";
import Sidebar from "./SidebarComponent";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import RouteManager from "./RouteManager";

function App() {
  return (
    <SidebarProvider className="flex-wrap">
      <Sidebar />
      <SidebarTrigger />
      <div className="flex-1 p-4 min-w-[250px]">
        <RouteManager />
      </div>
    </SidebarProvider>
  );
}

export default App;
