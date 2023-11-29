    import {
        BrowserRouter as Router,
        Route,
        Routes,
        Navigate,
    } from "react-router-dom";
    import React from "react";
    import Confirmation from "../../Confirmation/Confirmation";
    
    export const ConfirmationStack = () => {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Confirmation/>}/>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        );
    };
  