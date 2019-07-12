import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import TopPlayer from '../../components/player/TopPlayer';
import AlbumArt from '../../components/player/AlbumArt';
import TrackDetails from '../../components/player/TrackDetails';
import SeekBar from '../../components/player/SeekBar';
import Controls from '../../components/player/Controls';
import Video from 'react-native-video';


export default class Player extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  constructor(props) {
    super(props);

    this.state = {
      paused: this.props.navigation.state.params.paused,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
    };
  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.props.navigation.state.params.pushData.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
  }

  render() {
    const track = this.props.navigation.state.params.pushData[this.state.selectedTrack];
    const video = this.state.isChanging ? null : (
      <Video source={{uri: track.source}} // Can be a URL or a local file.
        ref="audioElement"
        paused={this.state.paused}               // Pauses playback entirely.
        playInBackground={true}
        playWhenInactive={true}
        ignoreSilentSwitch={"ignore"}
        repeat={this.state.repeatOn}                // Repeat forever.
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onEnd={
          (this.state.currentPosition === this.state.totalLength) ? this.onForward() : null
        }
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        style={styles.audioElement} />
    );
    const message = `Playing from ${this.props.navigation.state.params.from}`
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <TopPlayer message={message} onDownPress={() => this.props.navigation.navigate('home')} />
        <AlbumArt url={track.artCover} />
        <TrackDetails title={track.title} artist={track.artist} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition} />
        <Controls
          onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === this.props.navigation.state.params.pushData.length - 1}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.setState({paused: false})}
          onPressPause={() => this.setState({paused: true})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        {video}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};
