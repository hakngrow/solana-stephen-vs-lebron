import {
  Avatar,
  Box,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { formatWithCommas, percentize } from "../utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 150,
    width: 70,
    borderRadius: "initial",
    "&.left": {
      marginRight: theme.spacing(0.5),
    },
    "&.right": {
      marginLeft: theme.spacing(0.5),
    },
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: 25,
  },
}));

// Show vote counts for each side
export default function VoteTally({ votes }) {
  const classes = useStyles();

  function getProgress() {
    if (
      typeof votes.stephen !== "number" ||
      typeof votes.lebron !== "number" ||
      votes.stephen + votes.lebron === 0
    ) {
      return 50;
    }
    return (votes.stephen / (votes.lebron + votes.stephen)) * 100;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom="5px">
        <Box display="flex" alignItems="flex-end">
          <Avatar
            alt=""
            src="/images/stephen-curry-jersey.png"
            className={[classes.avatar, "left"].join(" ")}
          />
          <Typography variant="h6">Team Stephen</Typography>
        </Box>
        <Box display="flex" alignItems="flex-end" textAlign="right">
          <Typography variant="h6">Team Lebron</Typography>
          <Avatar
            alt=""
            src="/images/lebron-james-jersey.png"
            className={[classes.avatar, "right"].join(" ")}
          />
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={getProgress()}
        color="secondary"
        className={classes.progress}
      />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">
            {formatWithCommas(votes.stephen)}
          </Typography>
          <Typography variant="h6">
            {percentize(votes.stephen / (votes.stephen + votes.lebron))}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="h3">{formatWithCommas(votes.lebron)}</Typography>
          <Typography variant="h6">
            {percentize(votes.lebron / (votes.stephen + votes.lebron))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
