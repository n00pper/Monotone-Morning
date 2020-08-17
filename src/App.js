import React, { useState } from 'react';
import PanelChooser from './components/PanelChooser'
import Backgrounds from './components/panels/Backgrounds'
import TimeAndDate from './components/panels/TimeAndDate'
import Weather from './components/panels/Weather'
import News from './components/panels/News'
import DailyQuote from './components/panels/DailyQuote'
import SearchBar from './components/panels/SearchBar'
import CurrencyRates from './components/panels/CurrencyRates'
import TabOpener from './components/panels/TabOpener'
import './App.css';
// Lazy loading!
 
function App() {
  const [lightMode, setLightMode] = useState(false);
  const [panelSettings, setPanelSettings] = useState([
    {
      title: 'Time and Date',
      active: true,
      showSeconds: true,
      showYear: false
    },
    {
      title: 'Weather Forecast',
      active: true,
      unit: 'metric',
      city: '',
      lat: null,
      lon: null
    },
    {
      title: 'News',
      active: true,
      country: 'gb',
      category: 'all'
    },
    {
      title: 'Quote of the Day',
      active: true,
      from: 'all'
    },
    {
      title: 'Search Bar',
      active: true,
      engine: 'Google'
    },
    {
      title: 'Currency Rates',
      active: true,
      base: 'EUR',
      show: ['USD', 'GBP']
    },
    {
      title: 'Tab Opener',
      active: true,
      tabs: []
    }
  ]);
  const [bgSettings, setBgSettings] = useState({
    title: 'Background',
    active: true,
    current: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/White_flag_of_surrender.svg/255px-White_flag_of_surrender.svg.png',
    options: [],
    updateDaily: true,
    category: [true, false, false],
    purity: [true, false, false]
  })
  // MIN RES: 900x600
  return (
    <div className="App">
      {panelSettings[0].active && <TimeAndDate settings={panelSettings[0]} mode={lightMode} />}
      {panelSettings[1].active && <Weather settings={panelSettings[1]} setSettings={setPanelSettings} mode={lightMode} />}
      {panelSettings[2].active && <News settings={panelSettings[2]} mode={lightMode} />}
      {panelSettings[3].active && <DailyQuote settings={panelSettings[3]} mode={lightMode} />}
      {panelSettings[4].active && <SearchBar settings={panelSettings[4]} mode={lightMode} />}
      {panelSettings[5].active && <CurrencyRates settings={panelSettings[5]} mode={lightMode} />}
      {panelSettings[6].active && <TabOpener settings={panelSettings[6]} mode={lightMode} />}
      <Backgrounds bgSettings={bgSettings} setBgSettings={setBgSettings} />
      <PanelChooser settings={panelSettings} setSettings={setPanelSettings} bgSettings={bgSettings} setBgSettings={setBgSettings} mode={lightMode} setMode={setLightMode} />
    </div>
  );
}

export default App;
