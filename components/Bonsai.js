import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';

import bonsaiStage1 from "../assets/image/BonsaiStage1.png";
import bonsaiStage2 from "../assets/image/BonsaiStage2.png";
import bonsaiStage3 from "../assets/image/BonsaiStage3.png";
import bonsaiStage4 from "../assets/image/BonsaiStage4.png";
import bonsaiStage5 from "../assets/image/BonsaiStage5.png";

import backGround from '../assets/image/japanese_paper_texture.png';

import {images} from '../styles/global';

export default function Bonsai(props) {
  // const [counter,setCounter] = useState(0);

  const counter = props.counterProp;

  const setCounter = props.setCounterProp;
  // const counter = navigation.getParam('counter');
  // let bonsaiStages  = bonsaiStage1;

  const incrementCounter = () => {
      setCounter(counter+1)
  };

// const getBonsaiImage = () => {
//   if(counter == 1) {
//     return require('../assets/image/BonsaiStage1.png')
//   }
//   if(counter )
// }

// getRankImage() {
//   console.log(`++++++rank: ${this.state.rank}`);
//   switch (this.state.rank) {
//     case "unranked":
//       return "";
//     case "Bronze 3":
//       return require(`../assets/image/bronze3.png`);
//     case "Bronze 2":
//       return require(`../assets/image/bronze2.png`);
//     case "Bronze 1":
//       return require(`../assets/image/bronze1.png`);
//     case "Silver 3":
//       return require(`../assets/image/silver3.png`);
//     case "Silver 2":
//       return require(`../assets/image/silver2.png`);
//     case "Silver 1":
//       return require(`../assets/image/silver1.png`);
//     case "Gold 3":
//       return require(`../assets/image/gold3.png`);
//     case "Gold 2":
//       return require(`../assets/image/gold2.png`);
//     case "Gold 1":
//       return require(`../assets/image/gold1.png`);
//     case "Green 3":
//       return require(`../assets/image/green3.png`);
//     case "Green 2":
//       return require(`../assets/image/green2.png`);
//     case "Green 1":
//       return require(`../assets/image/green1.png`);
//     default:
//       return "";
//   }
// }

  return (
    <ImageBackground
      source={backGround}
      style={styles.container}
    >

      <Image
      source = {images.count[counter]}
      style= {styles.bonsaiImage}/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex:1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bonsaiImage: {
    maxWidth: 300,
    resizeMode: 'contain',
  },

});
