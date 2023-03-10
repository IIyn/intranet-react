import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState, //on initialise la state avec la valeur par défaut de notre const
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
//je déclare officiellement que ma fonction changeName du reducers sera une action (pour modifier mes states)
export const { setUser } = userSlice.actions; //on pourra modfier les states en appelant les actions depuis le composant

//on indique le nom de la state que l'on pourra manipuler dans le composant
export const selectUser = (state) => state.user;

export default userSlice.reducer;
