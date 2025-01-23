import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>TweetBar</h4>
                  <p>Web Application</p>
                </div>
              </div>
              <h4>Social Media Platform</h4>
              <p>Django, Python, MySQL</p>
              <a href="https://abdealij.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">
                Visit Site <MdArrowOutward />
              </a>
            </div>
            <WorkImage 
              image="/images/tweetbar.webp" 
              alt="TweetBar Screenshot" 
            />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Tahfeez Mumbai</h4>
                  <p>Educational Platform</p>
                </div>
              </div>
              <h4>Student Management System</h4>
              <p>PHP, MySQL, JavaScript</p>
              <a href="https://tahfeezmumbai.com/" target="_blank" rel="noopener noreferrer">
                Visit Site <MdArrowOutward />
              </a>
            </div>
            <WorkImage 
              image="/images/tahfeez.webp" 
              alt="Tahfeez Mumbai Screenshot" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
