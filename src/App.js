import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { reset, fetchData, nextImage, prevImage, setArtId } from './features/dataSlice'
import { useEffect } from 'react';

const mapStateToProps = state => {
  return state.data
};

function App({ artId, isLoggedIn }) {
  const dispatch = useDispatch()
  const currentState = useSelector(state => state.data)


  useEffect(() => {
    dispatch(fetchData())
  }, [artId, dispatch])

  const renderImg = () => {
    return currentState.apiData ?
      <img src={currentState.apiData.primaryImage} />
      :
      <h3>No image available</h3>
  }

  return (
    <div className="App" style={{ 'backgroundColor': isLoggedIn ? 'red' : 'yellow'}}>
      <div className='button-container'>
        <button onClick={() => dispatch(fetchData())}>Trigger Thunk!</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(nextImage())}>Next</button>
        <button onClick={() => dispatch(prevImage())}>Back</button>
      </div>
      <div className='input-controls'>
        <h1>{ currentState.artId }</h1>
        <input value={currentState.artId} onChange={(e) => {
          dispatch(setArtId(Number(e.target.value)))
        }} />
      </div>
      <div className='image-container'>
        {currentState.artId}
        {renderImg()}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);