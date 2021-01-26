import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "../../App.css";
import "./Article.css";

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
      body
      sys {
        id
      }
    }
  }
}
`;

function Article({ match }) {
  const {
    params: { sysId },
  } = match;
  // define the initial state
  const [article, setArticle] = useState(null);

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
        setArticle(data.articleCollection.items);
      });
  }, [sysId]);

  // show a loading screen case the data hasn't arrived yet
  if (!article) {
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
        {article
          .filter(items => items.sys.id === sysId)
          .map((article, key) => {
            return (
              <div className="article__container">
                <img
                  src={article.heroImage.url}
                  alt="Antonio"
                  className="article__image"
                />
                <div className="article__text">
                  <div className="article__header">
                    <div className="articlecards__item__overline">
                      <img
                        src={article.authorImage.url}
                        alt="Antonio"
                        className="articlecards__item__image"
                      />
                      <div className="cards__item__info">
                        <p className="cards__item__number">{article.author}</p>
                        <p className="cards__item__date">
                          {article.publishDate.substring(0,10)}
                        </p>
                      </div>
                    </div>
                    <div className="cards__item__info">
                      <h1 className="cards__item__title">{article.title}</h1>
                    </div>
                  </div>
                  <div className="article__body">
                    <p>{article.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    </>
  );
}

export default Article;
