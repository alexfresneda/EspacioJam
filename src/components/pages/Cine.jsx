import React from "react";
import { useState, useEffect } from "react";
import CardItem from "../CardItem";
import ArticleCardItem from "../ArticleCardItem";
import "../Cards.css";
import "../../App.css";
import "../HeroSection.css";
import HeroSection from "../HeroSection";
import Footer from "../Footer";
import { Button } from "../Button";
import "../Button.css";

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
      sys {
        id
      }
    }
  }
}
`;

function Cine() {
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
        data.articleCollection.items.sort((a, b) =>
          a.publishDate < b.publishDate ? 1 : -1
        );
        setArticle(data.articleCollection.items);
        data.episodeCollection.items.sort((a, b) =>
          a.publishDate < b.publishDate ? 1 : -1
        );
        setEpisode(data.episodeCollection.items);
      });
  }, []);

  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 760) {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  useEffect(() => {
    showButton();
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

  window.addEventListener("resize", showButton);
  if (window.matchMedia("(max-width: 760px)").matches) {
    /* The viewport is less than, or equal to, 700 pixels wide */

    return (
      <div>
        <div className="hero-container">
        <HeroSection
          title="Cine"
          description="En la sección de cine, nos tiramos a la piscina (junto a nuestros atrevidos colaboradores) al analizar la carrera de grandes directores como David Fincher o estudios como Pixar película por película. También podréis disfrutar de episodios temáticos especiales, estrenos y charlas informales con profesionales del mundo del cine y las series."
          // video="/videos/cine.mp4"
        />
        </div>

        <div className="button-wrapper">
          {button && (
            <Button buttonStyle={click ? "btn--primary" : "btn--outline"} onClick={handleClick}>
              PROGRAMAS
            </Button>
          )}
          {button && (
            <Button buttonStyle={!click ? "btn--primary" : "btn--outline"} onClick={handleClick}>
              ARTÍCULOS
            </Button>
          )}
        </div>
        <div className="cards__container">
          <div className="cards__items">
            {episode
              .filter((items) => items.topic === "cine")
              .map((episode, key) => {
                if (click) {
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
                }
              })}
          </div>
          <div className="cards__items">
            {article
              .filter((items) => items.topic === "cine")
              .map((article, key) => {
                if (!click) {
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
                }
              })}
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    /* The viewport is greater than 768 pixels wide */
    return (
      <div>
        <div className="hero-container">
          <HeroSection
            title="Cine"
            description="En la sección de cine, nos tiramos a la piscina (junto a nuestros atrevidos colaboradores) al analizar la carrera de grandes directores como David Fincher o estudios como Pixar película por película. También podréis disfrutar de episodios temáticos especiales, estrenos y charlas informales con profesionales del mundo del cine y las series."
            // video="/videos/baloncesto2.mp4"
          />
        </div>

        <div className="cards__container">
          <div className="cards__items">
            {episode
              .filter((items) => items.topic === "cine")
              .map((episode, key) => {
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
          <div className="cards__items">
            {article
              .filter((items) => items.topic === "cine")
              .map((article, key) => {
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }













  // return (
  //   <div>
  //     <div className="hero-container">
  //       <HeroSection
  //         title="Cine"
  //         description="En la sección de cine, nos tiramos a la piscina (junto a nuestros atrevidos colaboradores) al analizar la carrera de grandes directores como David Fincher o estudios como Pixar película por película. También podréis disfrutar de episodios temáticos especiales, estrenos y charlas informales con profesionales del mundo del cine y las series."
  //         // video="/videos/cine.mp4"
  //       />
  //     </div>
  //     <div className="cards__container">
  //       <div className="cards__items">
  //         {episode
  //           .filter((items) => items.topic === "cine")
  //           .map((episode, key) => {
  //             return (
  //               <div key={key}>
  //                 <CardItem
  //                   topic={episode.topic}
  //                   id={episode.id}
  //                   date={episode.publishDate}
  //                   title={episode.title}
  //                   description={episode.description}
  //                   path={episode.link}
  //                   sysId={episode.sys.id}
  //                 />
  //               </div>
  //             );
  //           })}
  //       </div>
  //       {/* <div className="cards__items">
  //         {article
  //           .filter((items) => items.topic === "cine")
  //           .map((article, key) => {
  //             return (
  //               <div key={key}>
  //                 <ArticleCardItem
  //                   topic={article.topic}
  //                   author={article.author}
  //                   authorImage={article.authorImage.url}
  //                   date={article.publishDate}
  //                   title={article.title}
  //                   description={article.description}
  //                   heroImage={article.heroImage.url}
  //                   id={article.id}
  //                   sysId={article.sys.id}
  //                 />
  //               </div>
  //             );
  //           })}
  //       </div> */}
  //     </div>
  //     <Footer />
  //   </div>
  // );
}





export default Cine;
