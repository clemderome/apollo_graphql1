import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_LAUNCHES = gql`
  query {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      {data.launches.map(
        ({ launch_date_utc, launch_success, rocket, links, details }, i) => (
          <div key={i}>
            <h2>{rocket.rocket_name}</h2>
            <p>
              The {rocket.rocket_name} rocket was launched on {launch_date_utc}{" "}
              with {launch_success ? "success" : "without success"}.
            </p>
            <p>
              The video link can be found <a href={links.video_link}>here</a>
            </p>
            <p>More details : </p>
            <p>{details}</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;
