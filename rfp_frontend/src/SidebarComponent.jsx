import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { Briefcase, Clock, FileText } from "lucide-react";
import { Link } from "react-router";

const SidebarComponent = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <p className="font-bold text-sm">Menu</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link to="/vendors" className="flex gap-2 items-center w-full">
                  <Briefcase size={15} />
                  <p>Vendors</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link to="/rfp" className="flex gap-2 items-center w-full">
                  <FileText size={15} />
                  <p>RFP's</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link to="/history" className="flex gap-2 items-center w-full">
                  <Clock size={15} />
                  <p>History</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarComponent;
