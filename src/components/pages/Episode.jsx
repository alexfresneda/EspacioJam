import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "../../App.css";
import "./Article.css";

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

function Episode({ match }) {
  const {
    params: { sysId },
  } = match;
  // define the initial state
  const [episode, setEpisode] = useState(null);

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
        // data.articleCollection.items.filter((items) => items.sys.id === sysId);
        setEpisode(data.episodeCollection.items);
      });
  }, [sysId]);

  // show a loading screen case the data hasn't arrived yet
  if (!episode) {
    return (
      <div className="loading__container">
        <img
          src="images/LogoBlack.png"
          alt="Cargando..."
          className=""
        />
        {/* <p>Loading...</p> */}
      </div>
    );
  }

  return (
    <>
      <>
        {episode
          .filter((items) => items.sys.id === sysId)
          .map((episode, key) => {
            return (
              <div className="article__container">
                <div className="article__text">
                  <div className="article__header">
                    <div className="articlecards__item__overline">
                      <div className="cards__item__info">
                        <p className="cards__item__number">#{episode.id}</p>
                        <p className="cards__item__date">
                          {episode.publishDate.substring(0,10)}
                        </p>
                      </div>
                    </div>
                    <div className="cards__item__info">
                      <h1 className="cards__item__title">{episode.title}</h1>
                    </div>
                  </div>
                  <div className="article__body">
                    <p>{episode.description}</p>
                  </div>
                  <iframe
                    width="100%"
                    height="200"
                    frameborder="0"
                    allowfullscreen=""
                    scrolling="no"
                    src={episode.link}
                  ></iframe>
                </div>
              </div>
            );
          })}
      </>
    </>
  );
}

export default Episode;
