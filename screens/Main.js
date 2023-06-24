import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {StyleSheet,Text,View,SafeAreaView,Platform,Image,ScrollView,TouchableOpacity} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions"


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: []
    };

    this.onFacesDetected = this.onFacesDetected.bind(this);
  }

  onCameraPermission = (status) =>{
        this.setState({
            hasCameraPermissions: status === "granted"
        });
    }

  async componentDidMount() { 
    Permissions
    .askAsync(Permissions.CAMERA)
    .then(this.onCameraPermission)
  }

  onFacesDetected({ faces }) {
    this.setState({ faces: faces });
  }

  onFacesDetectionError = (error) => {
    console.log(error)
  }

  render() {
    var { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.upperContainer}>
          <Text style={styles.appName}>Look Me....</Text>
        </View>
        <View style={styles.middleContainer}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.ltContainer}></View>
          <View style={styles.lbContainer}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F2F8"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  upperContainer: {
    flex: 0.13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7F2F8",
    flexDirection: "row"
  },
  appName: {
    fontSize: 25
  },
  middleContainer: { flex: 0.67 },
  lowerContainer: {
    flex: 0.2,
  },
  ltContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  lbContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  }
});
