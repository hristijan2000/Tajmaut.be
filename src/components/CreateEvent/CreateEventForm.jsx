<<<<<<< Updated upstream
import "./CreateEventForm.css";
import { TextField, Grid, MenuItem } from "@mui/material/";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const textFieldStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "white",
  },
  "& .MuiFormLabel-root": {},
  "& .MuiFormLabel-root.Mui-focused": {
    color: "var(--primaryPurple)",
  },
  "& .MuiFilledInput-root.Mui-focused": {
    color: "#8465ff",
    backgroundColor: "#F6F3FF",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "var(--primaryPurple)",
  },
};

export default function CreateEventForm() {

  const {authState} = useContext(AuthContext);
=======
import "./CreateEventForm.css"
import { TextField, Grid } from '@mui/material/';
import { useState } from "react"
const textFieldStyles = {
    "& .MuiInputBase-root": {
        backgroundColor: "white",
    },
    "& .MuiFormLabel-root": {
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: 'var(--primaryPurple)'
    },
    "& .MuiFilledInput-root.Mui-focused": {
        color: "#8465ff",
        backgroundColor: "#F6F3FF"
    },
    '& .MuiFilledInput-underline:after': {
        borderBottomColor: 'var(--primaryPurple)',
    },
}

export default function CreateEventForm(props) {

    function handleChange(event) {
        const { name, value } = event.target;
>>>>>>> Stashed changes

    const [formData, setFormData] = useState({
        venueId: 0,
        categoryEventId: 0,
        eventName: "",
        eventDescription: "",
        eventImageURL: "",
        eventDateHappening: "",
        eventDuration: 0,
      });

  function handleChange(event) {
    const { name, value } = event.target;

    {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }
  }
  const [eventCategories, setEventCategories] = useState([]);
  let categoryItems = [];
  
  const [venuesArray, setVenuesArray] = useState([]);
  let venueItems = [];

<<<<<<< Updated upstream
  // custom function that takes parameters and fetches needed data to populate textfield
  async function populateTextField(endpoint, valueKey, idKey) {
    return axios
      .get(endpoint)
      .then((response) => {  
        const temporaryArray = response.data.map((event) => (
          <MenuItem key={event[idKey]} value={event[idKey]}>
            {event[valueKey]}
          </MenuItem>
        ));
        return temporaryArray;
      })
      .catch((error) => {
        console.log(error.response.data);
        throw error;
      });
  }
=======
    function handleSubmit(event) {
        event.preventDefault()
>>>>>>> Stashed changes

  // populate the fields for Venues and Event Category
  useEffect(() => {
    populateTextField('https://tajmautmk.azurewebsites.net/api/Venues/GetAllVenues', 'name', 'venueId')
    .then((temporaryArray) => {
      setVenuesArray(temporaryArray);
    });

<<<<<<< Updated upstream
    populateTextField('https://tajmautmk.azurewebsites.net/api/Categories/GetAllCategories', 'name', 'categoryEventId')
    .then((temporaryArray) => {
      setEventCategories(temporaryArray);
    });
  }, [])

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('https://tajmautmk.azurewebsites.net/api/Events/CreateEvent', {
      "venueId": formData.venueId,
      "categoryEventId": formData.categoryEventId,
      "name": formData.eventName,
      "description": formData.eventDescription,
      "eventImage": formData.eventImageURL,
      "dateTime": formData.eventDateHappening,
      "duration": formData.eventDuration,
    },  {headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': `bearer ${authState.authToken}`,
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
    console.log(formData)
  }


  return (
    <div className="createEventForm">
      <Grid container spacing={2} sx={{ width: "75%" }}>
        <Grid item xs={12}>
          <TextField
            name="venueId"
            select
            label="Локал"
            variant="filled"
            value={formData.venueId}
            onChange={handleChange}
            sx={textFieldStyles}
            fullWidth
          >
            {/* map all locals into the menu */}
            {venuesArray}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="categoryEventId"
            select
            label="Категорија на настан"
            variant="filled"
            value={formData.categoryEventId}
            onChange={handleChange}
            sx={textFieldStyles}
            fullWidth
          >
            {/* map all categories into the menu */}
            {eventCategories}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            sx={textFieldStyles}
            label="Име"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            sx={textFieldStyles}
            label="Опис"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            name="eventImageURL"
            value={formData.eventImageURL}
            onChange={handleChange}
            sx={textFieldStyles}
            label="Слика"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <DateTimePicker
            label="Време на одржување"
            name="eventDateHappening"
            slotProps={{ textField: { variant: "filled" } }}
            sx={{ ...textFieldStyles, width: "100%" }}
            // value={formData.eventDateHappening}
            onChange={(newValue) => {
              setFormData((prevFormData) => {
                return {
                  ...prevFormData,
                  ["eventDateHappening"]: newValue.toISOString(),
                };
              });
              console.log(newValue.toISOString());
            }}
          />

          <Grid item xs={12}>
            <TextField
              required
              name="eventDuration"
              type="number"
              value={formData.eventDuration}
              onChange={handleChange}
              sx={textFieldStyles}
              label="Времетраење"
              variant="filled"
              fullWidth
            />
          </Grid>
        </Grid>
        <div className="reservation--buttonDiv">
          <button
            type="submit"
            className="btnReservationSubmit"
            onClick={handleSubmit}
          >
            Креирај настан
          </button>
        </div>
      </Grid>
    </div>
  );
}
=======
    const [formData, setFormData] = useState(
        {
            restaurantId: 0,
            categoryEventId: 0,
            name: "",
            description: "",
            eventImage: "",
            dateTime: "",
        }
    )

    return (
        <div className="createEventForm">
            <Grid container spacing={2} sx={{ width: '75%' }}>

                <Grid item xs={12}>
                    <TextField
                        required
                        name="restaurantId"
                        value={formData.restaurantId}
                        onChange={handleChange}
                        sx={textFieldStyles}
                        label="restaurantId"
                        variant="filled"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        name="categoryEventId"
                        value={formData.categoryEventId}
                        onChange={handleChange}
                        sx={textFieldStyles}
                        label="categoryEventId"
                        variant="filled"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={textFieldStyles}
                        label="Име"
                        variant="filled"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        sx={textFieldStyles}
                        label="Опис"
                        variant="filled"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        name="eventImage"
                        value={formData.eventImage}
                        onChange={handleChange}
                        sx={textFieldStyles}
                        label="Слика (URL)"
                        variant="filled"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        sx={textFieldStyles}
                        label="Време"
                        variant="filled"
                        fullWidth
                    />
                </Grid>

                <div className="reservation--buttonDiv">
                    <button
                        type="submit"
                        className="btnReservationSubmit"
                        onClick={handleSubmit}
                    >
                        Испрати
                    </button>
                </div>
            </Grid>
        </div>
    )
}
>>>>>>> Stashed changes
