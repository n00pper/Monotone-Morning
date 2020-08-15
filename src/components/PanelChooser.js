import React, { useState } from 'react'
import {useSpring, animated} from 'react-spring'
import '../styles/PanelChooser.css'
import ArrowIcon from '../icons/Arrow'
import ArrowDown from '../icons/ArrowDown'
import BackgroundsSettings from './settings/BackgroundsSettings'
import CurrencyRatesSettings from './settings/CurrencyRatesSettings'
import DailyQuoteSettings from './settings/DailyQuoteSettings'
import NewsSettings from './settings/NewsSettings'
import SearchBarSettings from './settings/SearchBarSettings'
import TabOpenerSettings from './settings/TabOpenerSettings'
import TimeAndDateSettings from './settings/TimeAndDateSettings'
import WeatherSettings from './settings/WeatherSettings'

export default function PanelChooser({ settings, setSettings, bgSettings, setBgSettings }) {
    const [visibility, setVisibility] = useState(false);        // toggle the visibility of the sidemenu
    const [moreInfo, setMoreInfo] = useState(() => {            // toggle the visibility of further settings
        let arr = [];
        for(let i = 0; i < settings.length; i++) {
            arr.push(false);
        }
        return arr;
    })
    const moreSettings = [
        <TimeAndDateSettings settings={settings} setSettings={setSettings} />,
        <WeatherSettings settings={settings} setSettings={setSettings} />,
        <NewsSettings settings={settings[2]} setSettings={setSettings} />,
        <DailyQuoteSettings settings={settings} setSettings={setSettings} />,
        <SearchBarSettings settings={settings[4]} setSettings={setSettings} />,
        <CurrencyRatesSettings settings={settings[5]} setSettings={setSettings} />,
        <TabOpenerSettings settings={settings} setSettings={setSettings} />,
    ];
    const settingsStyle = {
        position: 'fixed',
        height: '100vh',
        width: '500px',
        top: 0,
        right: '-400px',
        backgroundColor: 'rgba(34, 34, 34, 0.7)',
        zIndex: 100
    }
    const toggleStyle = {
        position: 'fixed',
        height: '100vh',
        width: '100px',
        top: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: 'rgba(34, 34, 34, 0.5)',
        cursor: 'pointer',
    }
    const menuStyle = {
        position: 'absolute',
        overflowY: 'scroll',
        height: '100vh',
        width: '400px',
        top: 0,
        right: 0,
        textAlign: 'left',
        color: '#eee',
        boxSizing: 'border-box',
        fontSize: '1.5rem',
    }

    const settingsAnimProps = useSpring({
        right: visibility ? 0 : -400
    });
    const toggleAnimProps = useSpring({
        right: visibility ? 400 : 0
    });
    
    return (
        <animated.div style={{...settingsStyle, ...settingsAnimProps}} className='settings' >
            <div style={{...toggleStyle, ...toggleAnimProps}} onClick={() => setVisibility(!visibility)} className='settings-toggle'>
                <ArrowIcon toggle={visibility} />
            </div>
            <div style={menuStyle} className='settings-menu'>
                {/* BACKGROUND SETTINGS */}
                <div className='settings-menu-element' style={{padding: '5px 10px'}} key={bgSettings.title}>
                    <span style={{cursor: 'pointer', lineHeight: '32px'}} onClick={() => {
                        let next = [...moreInfo];
                        next[0] = !next[0];
                        setMoreInfo(next);
                    }}>
                        {bgSettings.title}
                    </span>
                    <span style={{float: 'right'}} onClick={() => {
                        let next = [...moreInfo];
                        next[0] = !next[0];
                        setMoreInfo(next);
                    }}>
                        <ArrowDown toggle={moreInfo[0]} />
                    </span>
                    {moreInfo[0] && <BackgroundsSettings settings={bgSettings} setSettings={setBgSettings} />}
                </div>
                {/* EVERY OTHER SETTING */}
                {settings.map((element, index) => {
                    return (
                    <div className='settings-menu-element' style={{padding: '5px 10px', lineHeight: '32px'}} key={element.title}>
                        <span style={{cursor: 'pointer'}} onClick={() => {              // TITLE
                            let next = [...moreInfo];
                            next[index+1] = !next[index+1];
                            setMoreInfo(next);
                        }}>
                            {element.title}
                        </span>
                        <span style={{float: 'right'}} onClick={() => {                 // MORE INFO TOGGLE
                            let next = [...moreInfo];
                            next[index+1] = !next[index+1];
                            setMoreInfo(next);
                        }}>
                            <ArrowDown toggle={moreInfo[index+1]} />
                        </span>
                        <label className='settings-switch'>
                            <input type='checkbox' checked={element.active} readOnly />
                            <span className='settings-slider' onClick={() => {          // PANEL TOGGLE
                                const next = [...settings];
                                next[index].active = !next[index].active;
                                setSettings(next);
                            }}/>
                        </label>
                        {moreInfo[index+1] && moreSettings[index]}
                    </div>)
                })}
            </div>
        </animated.div>
    )
}
