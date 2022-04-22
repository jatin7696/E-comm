import React from "react";
import caro from "react-bootstrap/Carousel";
const Carousel = () => {
  return (
    <div style={{ display: "block", width: 700, padding: 30 }}>
      <h4>React-Bootstrap caro Component</h4>
      <caro>
        <caro.Item interval={150}>
          <image
            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
            alt="Image One"
          />
          <caro.Caption>
            <h3>Label for first slide</h3>
            <p>Sample Text for Image One</p>
          </caro.Caption>
        </caro.Item>
        <caro.Item interval={500}>
          <image
            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
            alt="Image Two"
          />
          <caro.Caption>
            <h3>Label for second slide</h3>
            <p>Sample Text for Image Two</p>
          </caro.Caption>
        </caro.Item>
      </caro>
    </div>
  );
};
export default Carousel;
