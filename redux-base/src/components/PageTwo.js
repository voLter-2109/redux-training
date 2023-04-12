import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { click } from "../store/pageTwoReducer";

const PageTwo = ({ pageTwoState, click }) => {
  return (
    <>
      <h1>PageTwo</h1>
      <div className="clickBlock">
        <span>{pageTwoState.count}</span>
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
  return { pageTwoState: store.pageTwo };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTwo);
