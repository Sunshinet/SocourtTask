import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { FormGroup, Label, Input } from "reactstrap";
import "./SideMenu.css";

class SideMenu extends Component {
  render() {
    return (
      <div className="SideMenu">
        <div>
          <FormGroup>
              <div className = "search">
            <Input
              type="search"
              value={this.props.search}
              onChange={val => this.props.onSearch(val)}
            />

            <Button color="primary" onClick={this.props.onSearchButton}>
              Search
            </Button>
            </div>
          </FormGroup>
        </div>
        <div>
          {this.props.genres.map(genre => {
            return (
              <FormGroup check key={genre.id}>
                <Label check>
                  <Input
                    type="checkbox"
                    name={genre.genre}
                    check={this.props.isChecked.toString()}
                    onChange={val => this.props.onCheckbox(val)}
                  />
                  {genre.genre}
                </Label>
              </FormGroup>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres,
    search: state.search,
    isChecked: state.isChecked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckbox: val => dispatch({ type: "GENRE", value: val }),
    onSearch: val => dispatch({ type: "SEARCH_INPUT", value: val }),
    onSearchButton: () => dispatch({ type: "ON_SEARCH_BUTTON" })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
