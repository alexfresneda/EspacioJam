import React from "react";
import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <div>
      {/* <BrowserRouter> */}
        <li className="cards__item">
          <Link className="cards__item__link" to={`${props.topic}/episodio/${props.sysId}`}>
            <div className="cards__item__overline">
              <div className="cards__item__info">
                <p className="cards__item__number">#{props.id}</p>
                <p className="cards__item__date">{props.date.substring(0,10)}</p>
              </div>
              <div className="play-icon">
                <i className="far fa-play-circle" />
              </div>
            </div>
            <div className="cards__item__info">
              <h3 className="cards__item__title">{props.title}</h3>
            </div>
            <div className="cards__item__info">
              <p className="cards__item__description">{props.description}</p>
            </div>
          </Link>
        </li>
        {/* <Switch>
            <Route path="/article" component={Article} />
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

export default CardItem;
