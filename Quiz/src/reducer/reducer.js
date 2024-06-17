import {combineReducers} from "@reduxjs/toolkit";
import profileReducer from "../slices/profile"

// importing all reducer which is made into slices;



const rootReducer  = combineReducers({                  // combining all reducer;
    profile:profileReducer,
})

export default rootReducer

