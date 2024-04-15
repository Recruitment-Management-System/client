import React from "react";
import AddFeedback from "../pages/feedback/AddFeedback";

export default function FeedbackRoutes(){
    return(
        <Routes>
            <Route path = "/savefeedback" element={<AddFeedback/>}/>
        </Routes>
    );
}