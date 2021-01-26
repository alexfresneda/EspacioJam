import React from "react";
import CardItem from "./CardItem";
import { useState, useEffect } from "react";
import NbaEpisodios from "../data/nbaEpisodios.json";
import CineEpisodios from "../data/cineEpisodios.json";
import "./Cards.css";

const query = `
{
  episodeCollection {
    items {
      title
      publishDate
      topic
      description
      id
      link
      sys {
        id
      }
    }
  }
}
`;

function Cards() {
  // define the initial state
  const [baloncestoEpisode, setBaloncestoEpisode] = useState(null);
  const [cineEpisode, setCineEpisode] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/p9iihut5kp6a/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer DXB1yfBR36VmYiwzhYJpDvk2JXPCHOhALYjlij3qnXA",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })

      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        data.episodeCollection.items.sort((a, b) =>
          a.publishDate > b.publishDate ? 1 : -1
        );
        setCineEpisode(
          data.episodeCollection.items.filter((items) => items.topic === "cine")
        );
        setBaloncestoEpisode(
          data.episodeCollection.items.filter(
            (items) => items.topic === "baloncesto"
          )
        );
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!cineEpisode || !baloncestoEpisode) {
    return (
      <div className="loading__container">
        <img src="images/LogoBlack.png" alt="Cargando..." className="" />
        {/* <p>Loading...</p> */}
      </div>
    );
  }

  return (
    <div className="cards__container">
      <div className="cards__items">
        <h3 className="section__title">Baloncesto</h3>
        <div>
          <CardItem
            topic={baloncestoEpisode[baloncestoEpisode.length - 1].topic}
            id={baloncestoEpisode[baloncestoEpisode.length - 1].id}
            date={baloncestoEpisode[baloncestoEpisode.length - 1].publishDate}
            title={baloncestoEpisode[baloncestoEpisode.length - 1].title}
            description={
              baloncestoEpisode[baloncestoEpisode.length - 1].description
            }
            path={baloncestoEpisode[baloncestoEpisode.length - 1].link}
            sysId={baloncestoEpisode[baloncestoEpisode.length - 1].sys.id}
          />
        </div>
      </div>
      <div className="cards__items">
        <h3 className="section__title">Cine</h3>
        <div>
          <CardItem
            topic={cineEpisode[cineEpisode.length - 1].topic}
            id={cineEpisode[cineEpisode.length - 1].id}
            date={cineEpisode[cineEpisode.length - 1].publishDate}
            title={cineEpisode[cineEpisode.length - 1].title}
            description={cineEpisode[cineEpisode.length - 1].description}
            path={cineEpisode[cineEpisode.length - 1].link}
            sysId={cineEpisode[cineEpisode.length - 1].sys.id}
          />
        </div>
      </div>
    </div>
  );
}

export default Cards;
