import React, { useState, useRef } from "react";
import "./PokeCard.css";

function PokeCard({ mockPokemonData }) {
  const [cardStyle, setCardStyle] = useState(stylesNormalCard());
  const [spriteStyle, setSpriteStyle] = useState(styleNormalSprite());
  const [textStyle, setTextStyle] = useState(styleNormalText());
  const cardRef = useRef(null);

  const onMoveCard = (event) => {
    let { xAxis, yAxis } = calculatePerspective(event);
    setCardStyle(stylePerspectiveCard(xAxis, yAxis));
    setSpriteStyle(stylePerspectiveSprite(xAxis, yAxis));
    setTextStyle(stylePerspectiveText(xAxis, yAxis));
  };

  const onLeaveCard = () => {
    setCardStyle(stylesNormalCard());
    setSpriteStyle(styleNormalSprite());
    setTextStyle(styleNormalText());
  };

  function calculatePerspective(event) {
    let cardRec = cardRef.current.getBoundingClientRect();
    let halfWidth = cardRef.current.offsetWidth / 2;
    let halfHeight = cardRef.current.offsetHeight / 2;
    let xAxis = (event.pageX - cardRec.left - halfWidth) / 7;
    let yAxis = -(event.pageY - cardRec.top - halfHeight) / 7;
    return { xAxis, yAxis };
  }

  function stylesNormalCard() {
    return {
      transform: "rotateY(0deg) rotateX(0deg)",
      transition: "transform 0.5s ease, box-shadow 0.5s ease",
      boxShadow: "0 10px 5px rgba(0, 0, 0, 0.2)"
    };
  }

  function styleNormalSprite() {
    return {
      transform: "translateZ(0px) rotateZ(0deg)"
    };
  }

  function styleNormalText() {
    return { transform: "translateZ(0px)" };
  }

  function stylePerspectiveCard(xAxis, yAxis) {
    return {
      transform: `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.1)`,
      transition: "box-shadow 0.5s ease",
      boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2)"
    };
  }

  function stylePerspectiveSprite(xAxis, yAxis) {
    return {
      transform: "translateZ(130px) rotateZ(-1deg) scale(1.09)",
      filter: `drop-shadow(${-xAxis * 1.5}px ${
        yAxis * 1.5
      }px 5px rgba(0, 0, 0, 0.6))`
    };
  }

  function stylePerspectiveText(xAxis, yAxis) {
    return {
      transform: "translateZ(40px)",
      filter: `drop-shadow(${-xAxis / 2}px ${
        yAxis / 2
      }px 1px rgba(0, 0, 0, 0.1))`
    };
  }

  return (
    <div className="PokeCard__container">
      <Card
        parentRef={cardRef}
        dynamicStyle={cardStyle}
        onMouseMove={onMoveCard}
        onMouseLeave={onLeaveCard}
      >
        <CardTitle dynamicStyle={textStyle}>{mockPokemonData.name}</CardTitle>
        <CardSprites
          dynamicStyle={spriteStyle}
          sprites={[
            {
              img: mockPokemonData.sprites.front_default,
              alt: mockPokemonData.name
            },
            {
              img: mockPokemonData.sprites.front_shiny,
              alt: mockPokemonData.name
            }
          ]}
        />
        <CardLinkVideo href={mockPokemonData.video} dynamicStyle={textStyle}>
          {mockPokemonData.name} video
        </CardLinkVideo>
      </Card>
    </div>
  );
}

const Card = (props) => {
  return (
    <div
      ref={props.parentRef}
      className="PokeCard__card"
      style={{ ...props.dynamicStyle }}
      onMouseMove={props.onMouseMove}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
};

const CardTitle = (props) => {
  return (
    <h1 className="PokeCard__text" style={{ ...props.dynamicStyle }}>
      {props.children}
    </h1>
  );
};

const CardSprites = (props) => {
  return (
    <div>
      {props.sprites.map((sprite, i) => {
        return (
          <img
            key={i}
            src={sprite.img}
            alt={props.alt}
            className="PokeCard__img"
            style={{ ...props.dynamicStyle }}
          />
        );
      })}
    </div>
  );
};

const CardLinkVideo = (props) => {
  return (
    <p style={{ ...props.dynamicStyle }}>
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className="PokeCard__text"
      >
        {props.children}
      </a>
    </p>
  );
};

export default PokeCard;
