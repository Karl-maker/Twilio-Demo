/*eslint-disable*/
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Select from "@material-ui/core/Select"; // Added Select component
import MenuItem from "@material-ui/core/MenuItem"; // Added MenuItem component

const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
    },
  };


const useStyles = makeStyles(styles);

export default function Lessons() {
  const classes = useStyles();

  const [selectedLearner, setSelectedLearner] = useState(""); // State to store the selected learner
  const [lesson, setLesson] = useState("");

  const learners = [
    // Define a list of learners with their names and numbers
    { name: "Ray Coney", number: "+13108939219" },
    { name: "Karl-Johan Bailey", number: "+18687422549" },
    // Add more learners as needed
  ];

  const sendSMS = async () => {
    try {
      if (!selectedLearner) {
        // Ensure a learner is selected before sending the SMS
        console.error("Please select a learner.");
        return;
      }

      // Find the selected learner's phone number based on their name
      const selectedLearnerData = learners.find((learner) => learner.name === selectedLearner);

      // Compose your SMS message
      const message = `Hello, ${selectedLearner}! This is your lesson:  ${lesson}`;

      console.log(message)

      // Use Twilio to send the SMS
      await fetch('http://localhost:3000/send-sms', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lesson: message,
          number: selectedLearnerData.number,
        }),
      });
      

      // Optionally, you can handle success or show a confirmation message
      console.log("SMS sent successfully");
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Send Direct Lesson</h4>
              <p className={classes.cardCategoryWhite}>Complete Lesson Form</p>
            </CardHeader>
            <CardBody>
              {/* Dropdown menu to select a learner */}
              <InputLabel>Select a Learner</InputLabel>
              <Select
                value={selectedLearner}
                onChange={(e) => setSelectedLearner(e.target.value)}
                fullWidth
              >
                <MenuItem value="">Select Learner</MenuItem>
                {learners.map((learner) => (
                  <MenuItem key={learner.name} value={learner.name}>
                    {learner.name}
                  </MenuItem>
                ))}
              </Select>
              <CustomInput
                    labelText="Enter Content"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      onChange: (e) => {
                        setLesson(e.target.value);
                      }
                    }}
              />
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={sendSMS}>
                Send Lesson
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
      <Card profile>
        <CardAvatar profile>
          {/* You can add an image for Twilio here */}
          {/* <img src={twilioImage} alt="Twilio Logo" /> */}
        </CardAvatar>
        <CardBody profile>
          <h6 className={classes.cardCategory}>Communication Platform</h6>
          <h4 className={classes.cardTitle}>Twilio</h4>
          <p className={classes.description}>
            Twilio is a cloud communications platform that allows developers to
            programmatically send and receive SMS messages, make voice calls,
            and more. It provides APIs and tools to enable real-time
            communication in your applications.
          </p>
          <Button
            color="primary"
            round
            onClick={() => {
              // You can add an action to learn more about Twilio here
              window.location.href = "https://www.twilio.com/";
            }}
          >
            Learn More
          </Button>
        </CardBody>
      </Card>
    </GridItem>
      </GridContainer>
    </div>
  );
}
