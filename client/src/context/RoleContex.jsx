import React from "react";
import { useSelector } from "react-redux";

export const RoleContex = () => {
    const userRole = useSelector((state) => state.user.role);
    return (
        <>
            <div></div>
        </>
    );
};
