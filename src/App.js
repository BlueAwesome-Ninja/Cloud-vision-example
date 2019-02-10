import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: false,
      header: 'This is a Header.',
      src: '',
      img: {}
    }
    this.handleHeader = this.handleHeader.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.upload = this.upload.bind(this);
    this.resetImage = this.resetImage.bind(this);
  }
  handleHeader(event) {
    this.setState({
      header: event.target.value
    })
  }
  handleClick() {
    this.setState({
      showHeader: !this.state.showHeader
    })
  }
  onChange = e => {
    var reader  = new FileReader();
    let react = this
    reader.readAsDataURL(e.target.files[0]);
    this.setState({ img: e.target.files[0] });
    reader.onloadend = function () {
      react.setState({
        src: reader.result
      });
      react.upload()
    }
  }
  upload() {

  }
  resetImage() {
    this.setState({
      src: ''
    })
  }

  render() {
    const { classes } = this.props;
    var img
    if (this.state.src !== '') {
      img = (
        <div>
          <img src={this.state.src} alt='img' className={classes.image} />
          <Button
            variant="contained"
            color="primary"
            onClick={this.resetImage}
          >
            Reset Image
          </Button>
        </div>
      );
    } else {
      img = <Input type={'file'} onChange={this.onChange} className={classes.input} />
    }
    return (
      <div className="App">
        <div className={classes.headerExample}>
          <Typography
            variant="h1"
            className={classNames(classes.headerText,
              { 'hidden': !this.state.showHeader })}
          >
            {this.state.header}
          </Typography>
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={this.state.header}
            onChange={this.handleHeader}
            margin="normal"
          />
          <Button
            varient="contained"
            color="primary"
            onClick={this.handleClick}
          >
            Click Me!
          </Button>
        </div>
        {img}
      </div>
    );
  }
}

const styles={
  image: {
    position: 'absolute',
    top: '10vh',
    left: '20vw',
    width: '60vw',
    height: 'auto'
  },
  input: {
    position: 'absolute',
    top: '20vh',
    left: '20vw',
    width: '60vw'
  }
}
export default withStyles(styles)(App);
