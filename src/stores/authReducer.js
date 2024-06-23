import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, getFiles, loginUser } from "./authService";

const initialState = {
  user: [],
  files: [],
  data: [],
  loading: false,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Add reducers here
    clearState (state) {
      state = initialState;
    }
  },
  extraReducers: (builder) => {
    // Login User
    builder.addCase(requestLoginUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(requestLoginUser.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(requestLoginUser.fulfilled, (state, action) => {
      return {
        ...state,
        status: "succeeded",
        user: action.payload,
      };
    });
    // Get Files
    builder.addCase(requestGetFiles.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(requestGetFiles.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(requestGetFiles.fulfilled, (state, action) => {
      return {
        ...state,
        status: "succeeded",
        files: action.payload,
      };
    });
    // Get Data
    builder.addCase(requestGetData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(requestGetData.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(requestGetData.fulfilled, (state, action) => {
      return {
        ...state,
        status: "succeeded",
        data: csvToArr(action.payload, ','),
      };
    });
  },
});

export const requestLoginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload) => {
    const { username, code } = payload;
    // Calling service
    const response = await loginUser({
      username,
      code,
    });
    return response;
  }
);

export const requestGetFiles = createAsyncThunk(
  "auth/getFiles",
  async () => {
    // Calling service
    const response = await getFiles();
    return response;
  }
);

export const requestGetData = createAsyncThunk(
  "auth/getData",
  async (payload) => {
    const { fileCode } = payload;
    // Calling service
    const response = await getData({
      fileCode,
    });
    return response;
  }
);

function csvToArr(stringVal, splitter) {
  const [keys, ...rest] = stringVal
    .trim()
    .split("\n")
    .slice(5)
    .map((item) => item.split(splitter));

  const formedArr = rest.map((item) => {
    const object = {
      value: 0,
    };
    keys.forEach((key, index) => {
      key = key.replaceAll("\"", '');
      if (key === "male" || key === "female" || key === "other") {
        object["value"] = parseInt( object["value"]) + parseInt(item.at(index).replaceAll("\"", ''));
      } else {
        object[key] = item.at(index).replaceAll("\"", '');
      }
    });
    return object;
  });
  return formedArr;
}

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
