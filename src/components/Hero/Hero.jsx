import { Button } from "../Button/Button"
import './Hero.scss';

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        <h1 className="hero__content--title">
          Test assignment for front-end developer
        </h1>
        <p className="hero__content--description">
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        <a href="#signup" className="header__link">
            <Button>Sign up</Button>
        </a>
      </div>
    </div>
  )
}