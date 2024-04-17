import React from 'react';
import '../css/RightSidebar.css' // 임포트
import {
    Menu,
    MenuItem,
    Sidebar,
    SubMenu,
} from "react-pro-sidebar";







function RightSidebar() {
    return (
       
        <RightSidebar>
            <Menu>
                <SubMenu label="Charts">
                    <MenuItem> 1 </MenuItem>
                    <MenuItem> 2 </MenuItem>
                </SubMenu>
                <MenuItem> 3 </MenuItem>
                <MenuItem> 4 </MenuItem>
            </Menu>
        </RightSidebar>
    );
}

export default RightSidebar;