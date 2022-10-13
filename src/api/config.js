import axios from "axios";

const instans = axios.create({
    baseURL: 'https://private-anon-72e50d348d-grchhtml.apiary-mock.com/',
    headers: {
      "Content-Type":"application/json"
    }
  });

  export default instans;