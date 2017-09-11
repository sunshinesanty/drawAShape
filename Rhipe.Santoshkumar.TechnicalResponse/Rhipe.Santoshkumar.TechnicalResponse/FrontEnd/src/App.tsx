import * as React from 'react';
import './App.css';
import { Equilateral, RightAngle, Invalid, AcuteAngled, ObtuseAngled } from './components/Triangles';
import { AppState, TriangleType, Payload } from './common/interfaces';
import InputForm from './components/TriangelInputForm';
import dataApi from './api/fetchData';
import config from './common/config';

class App extends React.Component<any, AppState> {
  inputDataSubmited: Payload;
  private LoopTriangleArray: any[] = [];
  private divResult: HTMLDivElement | null;
  private intervalLoopID: any;
  constructor(props: any) {
    super(props);
    this.state = { isLoading: true, ResutType: TriangleType.Invalid };
    this.LoopTriangleArray.push(Equilateral);
    this.LoopTriangleArray.push(RightAngle);
    this.LoopTriangleArray.push(AcuteAngled);
    this.LoopTriangleArray.push(ObtuseAngled);
  }

  setLabelStyle = () => {
    if (this.divResult) {
      this.divResult.className = !this.state.isLoading ? 'triangleLabel triangleSuccess' : 'triangleLabel';
    }
  }

  getTriangleType = async () => {
    try {
      const returnedTriangleType: TriangleType =
        await dataApi.postData(config.apiEndpoints.getTriangleType, this.inputDataSubmited);
      this.setState({ ResutType: returnedTriangleType, isLoading: false });
    } catch (e) {
      this.setState({ ResutType: TriangleType.Invalid, isLoading: false });
    }
  }

  getType = (inputData: Payload) => {
    this.setState({ isLoading: true });
    this.inputDataSubmited = inputData;
    // set time out for a range so that users can see the animation
    setTimeout(this.getTriangleType, this.getRandomNumber(500, 5000));
  }

  getRandomNumber = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomType = (): TriangleType => {
    if (this.state.isLoading) {
      return this.getRandomNumber(1, 4);
    }
    return TriangleType.Invalid;
  }

  setTraingleLoop = () => {
    this.intervalLoopID = setTimeout(
      () => {
        const randomType = this.getRandomType();
        if (this.state.isLoading) {
          this.setState({ ResutType: randomType });
        }
      },
      400);
  }

  getTriagnleToRender = (ResultType: TriangleType): any => {
    let triangleToRender = <Invalid />;
    switch (ResultType) {
      case TriangleType.Obtuse:
        triangleToRender = <ObtuseAngled />;
        break;
      case TriangleType.Acute:
        triangleToRender = <AcuteAngled />;
        break;
      case TriangleType.Equilateral:
        triangleToRender = <Equilateral />;
        break;
      case TriangleType.RightAngle:
        triangleToRender = <RightAngle />;
        break;
      default:
        triangleToRender = <Invalid />;
    }
    return triangleToRender;
  }

  render() {
    const { ResutType } = this.state;
    const triangleTypeText = TriangleType[ResutType];
    if (this.state.isLoading) {
      this.setTraingleLoop();
    } else if (this.intervalLoopID) {
      clearTimeout(this.intervalLoopID);
    }
    const triangleToRender = this.getTriagnleToRender(ResutType);
    return (
      <div className="App" >
        <div style={{ margin: 'auto', width: '50%', float: 'left' }}>
          <InputForm onSubmitData={this.getType} />
        </div>
        <div style={{ margin: 'auto', width: '50%', float: 'left' }}>
          {triangleToRender}
          <div ref={e => { this.divResult = e; this.setLabelStyle(); }}>{triangleTypeText}</div>
        </div>
      </div>
    );
  }
}

export default App;
