import React from "react";
import { useState, useEffect } from "react";
import CardItem from "../CardItem";
import ArticleCardItem from "../ArticleCardItem";
import "../Cards.css";
import "../../App.css";
import "../HeroSection.css";
import HeroSection from "../HeroSection";
import Footer from "../Footer";

const query = `
{
  articleCollection {
    items {
      title
      heroImage {
        url
      }
      author
      authorImage {
        url
      }
      publishDate
      topic
      description
      favourite
      sys {
        id
      }
    }
  }
  episodeCollection {
    items {
      title
      publishDate
      topic
      description
      id
      link
      favourite
      sys {
        id
      }
    }
  }
}
`;

function Nba() {
  // define the initial state
  const [article, setArticle] = useState(null);
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
        data.articleCollection.items.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
        setArticle(data.articleCollection.items);
        data.episodeCollection.items.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
        setEpisode(data.episodeCollection.items);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!article || !episode) {
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
    <div>
      <div className="hero-container">
        <HeroSection
          title="Baloncesto"
          description="Descripcion de baloncesto"
          // video="/videos/baloncesto2.mp4"
        />
        {/* <video src="/videos/baloncesto.mp4" autoPlay loop muted />
        <h1 className="cine">Baloncesto</h1> */}
      </div>
      <div className="cards__container">
        <div className="cards__items">
          {episode.filter(items => items.topic === "baloncesto").map((episode, key) => {
            return (
              <div key={key}>
                <CardItem
                  topic={episode.topic}
                  id={episode.id}
                  date={episode.publishDate}
                  title={episode.title}
                  description={episode.description}
                  path={episode.link}
                  sysId={episode.sys.id}
                />
              </div>
            );
          })}
        </div>
        {/* <div className="cards__items">
          {article.filter(items => items.topic === "baloncesto").map((article, key) => {
            return (
              <div key={key}>
                <ArticleCardItem
                  topic={article.topic}
                  author={article.author}
                  authorImage={article.authorImage.url}
                  date={article.publishDate}
                  title={article.title}
                  description={article.description}
                  heroImage={article.heroImage.url}
                  id={article.id}
                  sysId={article.sys.id}
                />
              </div>
            );
          })}
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default Nba;
