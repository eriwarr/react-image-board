import { Component } from 'react';
import './App.css';

class ImageForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      caption: '',
    }
  this.handleInput = this.handleInput.bind(this);
  this.handleAddImage = this.handleAddImage.bind(this);
  this.cancelInput = this.cancelInput.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  cancelInput(event) {
    this.setState( { url: '', caption: '' });
  }

  handleAddImage(event) {
    event.preventDefault();
    this.props.addPhoto({
      url: this.state.url,
      caption: this.state.caption,
    });
    this.setState( { url: '', caption: '' });

  }


  render() {

    return(
      <form onSubmit={this.handleAddImage} onReset={this.cancelInput}>
        <input type="url" name="url" placeholder="Image URL" value={this.state.url} onChange={this.handleInput}/>
        <input type="text" name="caption" placeholder="Image Caption" value={this.state.caption} onChange={this.handleInput}/>
        <button type="reset">CANCEL</button>
        <button type="submit">ADD IMAGE</button>
      </form>
    )
  }
};


function ImageList(props) {
    const urls = props.images.map((image) => (
       <li key={image.url}>
        <div>
        <img src={image.url} alt="it's working"/>
        <p>{image.caption}</p>
        </div>
       </li>

     ));

  return(
      <ul>{urls}</ul>
  )
};


class ImageBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
    this.addPhoto = this.addPhoto.bind(this);
}

addPhoto(image) {
const images = [ ...this.state.images ];
images.push(image);
this.setState( { images });

}

  render() {

    return (
      <div>
        <ImageForm addPhoto={this.addPhoto}/>
        <ImageList images={this.state.images}/>
      </div>
    );
  }
}

export default ImageBoard;
