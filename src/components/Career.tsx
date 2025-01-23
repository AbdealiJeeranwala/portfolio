import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Qism al-Tahfeez, Mahad al-Zahra - Mumbai</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Developed and maintained the official website for Qism al-Tahfeez 
              (<a href="https://tahfeezmumbai.com/" target="_blank" rel="noopener noreferrer">tahfeezmumbai.com</a>). 
              Built a comprehensive system with Admin Panel, Venue-Incharge Panel, 
              Teacher Panel and Student Panel. Implemented using PHP and MySQL.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Personal Project</h4>
                <h5>TweetBar Social Platform</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Developed a social media platform (<a href="https://abdealij.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">TweetBar</a>) 
              using Django and Python. Features include user authentication, 
              tweet creation, image uploads, and social interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
