
import { Link } from "react-router-dom";

const LinkButton = ({ href, rank, content, isRouter = true }) => {

  const getRank = (rank) => {
    switch (rank) {
      case "primary":
        return "landing-btn-primary";
      case "secondary":
        default:
        return "landing-btn-secondary";
    }
  }

  return isRouter ? (
    <Link to={href} className={`landing-btn ${getRank(rank)}`}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`landing-btn ${getRank(rank)}`}
    >
      {content}
    </a>
  );
};

export default LinkButton;
