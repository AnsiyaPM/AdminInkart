import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore,persistReducer } from "redux-persist";
import { configureStore ,getDefaultMiddleware} from "@reduxjs/toolkit";
import { inKartReducer } from "./reducer";

//redux persist config
const persistConfig ={
    key:'InKartAdmin',
    storage:AsyncStorage,
};

//middleware :Redux persist persisted reducer

const persistedReducer=persistReducer(persistConfig,inKartReducer);


//redux store(setting store)
const store= configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({
        immutableCheck:false,
        serializableCheck:false,
    }),
});

//middleware redux persist persister
let persister =persistStore(store);
//exporting
export{store,persister};
