import React from 'react';
import { Octokit } from '@octokit/rest';
import _ from 'lodash';
import styled from 'styled-components';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n  margin-top: 0.25rem;\n  color: #ffffff;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n  margin: 0;\n  color: #ffffff;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  flex: 1 1;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 1rem;\n  text-align: inherit;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  overflow: hidden;\n  border-radius: 50%;\n  height: 4.5rem;\n  margin-bottom: 0;\n  width: 4.5rem;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  min-width: 18.125rem;\n  width: 20%;\n  margin: 1rem;\n  padding: 1rem;\n  color: inherit;\n  text-decoration: none;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-content: center;\n  flex-flow: row wrap;\n  height: 100%;\n  margin: 1rem 1rem;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var ContributorsList = styled.div(_templateObject());
var Profile = styled.a(_templateObject2());
var Photo = styled.img(_templateObject3());
var Intro = styled.div(_templateObject4());
var Name = styled.h4(_templateObject5());
var Subtitle = styled.small(_templateObject6());

var octokit = new Octokit();

var ProfileComponent = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ProfileComponent, _React$Component);

  function ProfileComponent() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ProfileComponent.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(Profile, {
      href: this.props.url
    }, /*#__PURE__*/React.createElement(Photo, {
      src: this.props.avatar_url
    }), /*#__PURE__*/React.createElement(Intro, null, /*#__PURE__*/React.createElement(Name, null, this.props.name), /*#__PURE__*/React.createElement(Subtitle, null, "Contributions: ", this.props.contributions)));
  };

  return ProfileComponent;
}(React.Component);

var Contributors = /*#__PURE__*/function (_React$Component2) {
  _inheritsLoose(Contributors, _React$Component2);

  function Contributors(props) {
    var _this;

    _this = _React$Component2.call(this, props) || this;
    _this.state = {
      contributors: []
    };
    return _this;
  }

  var _proto2 = Contributors.prototype;

  _proto2.loadContributors = function loadContributors(owner, repo) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      octokit.repos.listContributors({
        owner: owner,
        repo: repo
      }).then(function (result) {
        _this2.setState({
          contributors: [].concat(_.orderBy(_.unionBy(_this2.state.contributors, result.data, "login"), "contributions", "desc"))
        });

        resolve();
      }, function (reason) {
        reject(reason);
      });
    });
  };

  _proto2.componentDidMount = function componentDidMount() {
    var _this3 = this;

    if (!this.props.repo) {
      this.setState({
        contributors: []
      });
      return;
    }

    if (this.props.repo && !Array.isArray(this.props.repo)) {
      this.loadContributors(this.props.owner, this.props.repo);
      return;
    }

    this.props.repo.map(function (repo) {
      _this3.loadContributors(_this3.props.owner, repo);
    });
  };

  _proto2.render = function render() {
    return /*#__PURE__*/React.createElement(ContributorsList, null, this.state.contributors && this.state.contributors.length ? this.state.contributors.map(function (contributor, key) {
      return /*#__PURE__*/React.createElement(ProfileComponent, {
        key: key,
        avatar_url: contributor.avatar_url,
        name: contributor.login,
        url: contributor.html_url,
        contributions: contributor.contributions
      });
    }) : undefined);
  };

  return Contributors;
}(React.Component);

export default Contributors;
//# sourceMappingURL=index.modern.js.map
