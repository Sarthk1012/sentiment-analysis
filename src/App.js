import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [confidence, setConfidence] = useState('');

  const checkSentiment = async () => {
    const formdata = new FormData();

    formdata.append('key', '8c5ab6fd919896570f8853b9de771cb0');
    formdata.append('txt', text);
    formdata.append('lang', 'en');

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    const response = await fetch(
      'https://api.meaningcloud.com/sentiment-2.1',
      requestOptions
    );
    const data = await response.json();
    const tag = data.score_tag;
    const confidence = data.confidence;

    if (tag?.includes('P')) {
      setTag('Positive');
    } else if (tag?.includes('N')) {
      if (tag === 'NONE') {
        setTag('NONE');
      } else {
        setTag('Negative');
      }
    }

    setConfidence(confidence);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='wrapper'>
          <div className='input-wrapper'>
            <input
              type='textarea'
              className='input-field'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Place sample text'
            />
            <button className='classify-btn' onClick={checkSentiment}>
              Classify Text
            </button>
          </div>
          <div className='output-wrapper'>
            <div className='heading'>
              <span className='heading-text'>Tag</span>
              <span className='heading-text'>Confidence</span>
            </div>
            <div className='data'>
              {tag && <span className='data-text'>={tag}</span>}
              {confidence && <span className='data-text'>{confidence}</span>}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
