import React from "react";
import { Carousel } from "react-bootstrap";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import "./carousel.css";

function Slider() {
  return (
    <Carousel className="carousel">
      <Carousel.Item interval={6000000}>
        <Carousel.Caption style={{color:'white'}}>
          <p style={{color:'white'}}>
            TaxChain Reduces Corruption and Creates
            <span className="green"> Transparency </span>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <Carousel.Caption style={{color:'white'}}>
          <p style={{color:'white'}}>
            TaxChain Is An All In One Website To Pay and
            <span className="green"> Track Your Tax</span>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <Carousel.Caption style={{color:'white'}}>
          <p style={{color:'white'}}>
            A <span className="green">Revolutionary Idea </span>
            Which Can End Corruption Forever
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

// function Slider() {
//   return (
//     <MDBCarousel showIndicators showControls fade>
//       <MDBCarouselItem className="w-100 d-block" itemId={1} src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
//         alt='...'>
//         <p>
//           TaxChain Reduces Corruption and Creates
//           <span className="green"> Transparency </span>
//         </p>
//       </MDBCarouselItem>

//       <MDBCarouselItem className="w-100 d-block" itemId={2} src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
//         alt='...'>
//         <p>
//           TaxChain Is An All In One Website To Pay and{" "}
//           <span className="green"> Track Your Tax</span>{" "}
//         </p>
//       </MDBCarouselItem>

//       <MDBCarouselItem className="w-100 d-block" itemId={3} src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
//         alt='...'>
//         <p>
//            A <span className="green">Revolutionary Idea </span>
//            Which Can End Corruption Forever{" "}
//         </p>
//       </MDBCarouselItem>
//     </MDBCarousel>
//   );
// }
export default Slider;
