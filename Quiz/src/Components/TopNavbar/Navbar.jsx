import "./Navbar.css";
import charusatlogo from "../../Assets/Charusat-Logo.png";
import depstarlogo from "../../Assets/Depstar-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operation/authApi";

const Navbar = () => {
  const { token } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <section className={"navbar"}>
        <Link to="/">
          <div className="logos">
            <img src={charusatlogo} alt="Charusat Logo" />
            <img src={depstarlogo} alt="Depstar Logo" id="charusat" />
          </div>
        </Link>
        <div className="bar">{/* Add your bar items here */}</div>
        <div className="login-signup">
          {!token ? (
            <>
              <Link to="/signup" className="link">
                <div className="signup">Sign Up</div>
              </Link>
              <Link to="/login" className="link">
                <div className="signup">Log In</div>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/${user.usertype}`} className="link">
                <div className="signup">Dashboard</div>
              </Link>
              <div
                className="signup"
                onClick={() => dispatch(logout(navigate))}
              >
                Log Out
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Navbar;
