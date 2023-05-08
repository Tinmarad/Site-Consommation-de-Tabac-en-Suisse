import { csv } from "d3-fetch";
csv("../data/data.csv")
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {});
export default csv;
