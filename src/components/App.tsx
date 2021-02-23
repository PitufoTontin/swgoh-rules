import './App.css';
import { ComboBox } from '@fluentui/react';
import Data from '../data/Data';
import { useId } from '@fluentui/react-hooks';

function App() {
  const charNamesId: string = useId("char-names-combobox");

  return (
    <div className="App">    
      <ComboBox
        label="Character"
        key={charNamesId}
        allowFreeform={false}
        autoComplete={'on'}
        options={Data.getCharNamesOptions()}
      />
    </div>
  );
}

export default App;
