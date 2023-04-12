import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { click } from "../store/homeReducer";

const Home = ({ homeState, click }) => {

  return (
    <>
      <h1>Home</h1>
      <div className="clickBlock">
        <span>{homeState.count}</span>
        <button onClick={click} style={{ width: "150px" }}>
          Click me
        </button>
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    click: bindActionCreators(click, dispatch),
  };
}

function mapStateToProps(store) {
  return { homeState: store.home };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
