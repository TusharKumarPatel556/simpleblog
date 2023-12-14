import axios from "axios";
const url = "http://localhost:4000/stories";
const fetchStories = () => {
  axios.get(url);
};
