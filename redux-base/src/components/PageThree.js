import { connect } from "react-redux";

const PageThree = ({ pageThree }) => {
  return (
    <>
      <h1>page count</h1>
      <div className="clickBlock">
        <h1>Home</h1>
        <span>{pageThree.home.count}</span>

        <br />
        <h1>page two</h1>
        <span>{pageThree.pageTwo.count}</span>
      </div>
    </>
  );
};

function mapStateToProps(store) {
  return {
    pageThree: store,
  };
}

export default connect(mapStateToProps, null)(PageThree);
