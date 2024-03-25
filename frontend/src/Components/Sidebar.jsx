import React from 'react';
import { Link } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';

const Sidebar = () => {
  return (
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" style={{ height: '100%' }}>
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Menu
      </CDBSidebarHeader>
      <CDBSidebarContent style={{ height: 'calc(100vh - 60px)' }}> {/* Subtracting header height */}
        <CDBSidebarMenu>
        <Link to="/">
            <CDBSidebarMenuItem icon="server">Index</CDBSidebarMenuItem>
          </Link>
        <Link to="/home">
            <CDBSidebarMenuItem icon="info-circle">Phone Info</CDBSidebarMenuItem>
          </Link>
          <Link to="/app-installer">
            <CDBSidebarMenuItem icon="download">App Installer</CDBSidebarMenuItem>
          </Link>
          <Link to="/app-manager">
            <CDBSidebarMenuItem icon="th-large">App Manager</CDBSidebarMenuItem>
          </Link>
          <Link to="/screen-capture">
            <CDBSidebarMenuItem icon="camera">Screen Capture</CDBSidebarMenuItem>
          </Link>
          
          <Link to="/terminal">
            <CDBSidebarMenuItem icon="code">ADB Shell</CDBSidebarMenuItem>
          </Link>
          <Link to="/booting-options">
            <CDBSidebarMenuItem icon="sync">Booting Options</CDBSidebarMenuItem>
          </Link>
          <Link to="/network-logs">
            <CDBSidebarMenuItem icon="sticky-note">Network Logs</CDBSidebarMenuItem>
          </Link>
          <Link to="/screenshot">
            <CDBSidebarMenuItem icon="mobile-alt">Screenshot</CDBSidebarMenuItem>
          </Link>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      {/* Uncomment this if you want to include the footer */}
      {/* 
      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
          Sidebar Footer
        </div>
      </CDBSidebarFooter> 
      */}
    </CDBSidebar>
  );
};

export default Sidebar;
