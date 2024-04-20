import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./executetran.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const ExecuteTran = () => {
  const [inputs, setInputs] = useState([{ input: "", dropdown: "" }]);
  const [age, setAge] = useState("");

  const handleChange = (index, key, value) => {
    const newInputs = [...inputs];
    newInputs[index][key] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, { input: "", dropdown: "" }]);
  };

  const deleteInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    if (inputs.some((input) => input.input === "" || input.dropdown === "")) {
      toast.error(`One input is empty`, {
        position: "bottom-right",
      });
    } else {
      
      toast.success(`Transaction executed`, {
        position: "bottom-right",
      });
      console.log("Input data:", inputs);
      // You can perform further actions with the data here
    }
  };

  return (
    <div className="executetran_container">
      {inputs.map((input, index) => (
        <div key={index} className="executetran_div">
          <Box
            component="form"
            // sx={{
            //   "& > :not(style)": { m: 1, width: "30ch" },
            // }}
            className="box_container"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Enter data"
              variant="outlined"
              value={input.input}
              onChange={(e) => handleChange(index, "input", e.target.value)}
            />

            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={input.dropdown}
                label="Age"
                onChange={(e) =>
                  handleChange(index, "dropdown", e.target.value)
                }
              >
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
                <MenuItem value="address">Address</MenuItem>
                <MenuItem value="uint">uint</MenuItem>
                <MenuItem value="bool">bool</MenuItem>
                <MenuItem value="string">string</MenuItem>
              </Select>
            </FormControl>

            <svg
              onClick={() => deleteInput(index)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#65b5db"
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
          </Box>

          {/* <input
            type="text"
            placeholder="Enter data"
            value={input.input}
            required
            onChange={(e) => handleChange(index, "input", e.target.value)}
          /> */}
          {/* <select
            value={input.dropdown}
            required
            onChange={(e) => handleChange(index, "dropdown", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="address">Address</option>
            <option value="uint">uint</option>
            <option value="bool">bool</option>
            <option value="string">string</option>
          </select> */}
        </div>
      ))}
      <div className="execute_button_container">
        <button onClick={addInput} className="execute_button1">
          Add New{" "}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="#65b5db"
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
            />
          </svg>
        </button>
        <button onClick={handleSubmit} className="execute_button2">
          Submit
        </button>
      </div>
    </div>
  );
};
