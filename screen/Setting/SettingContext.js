import React, { createContext, useState, useEffect} from 'react';
import { db } from '../Components/Data';

const SettingContext = createContext();

const SettingProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const updateDarkMode = (value) => {
    setDarkMode(value);
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM settings',
          [],
          (tx, results) => {
            const len = results.rows.length;
            if (len > 0) {
              tx.executeSql(
                'UPDATE settings SET theme = ? WHERE id = 1;',
                [value ? 1 : 0],
                () => {
                  console.log('Theme updated');
                }
              );
            } else {
              tx.executeSql(
                'INSERT INTO settings (theme) VALUES (?);',
                [value ? 1 : 0],
                () => {
                  console.log('Theme updated');
                }
              );
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFontSize = (value) => {
    setFontSize(value); 
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM settings',
          [],
          (tx, results) => {
            const len = results.rows.length;
            if (len > 0) {
              tx.executeSql(
                'UPDATE settings SET fontsize = ? WHERE id = 1;', 
                [value],
                () => {
                  console.log('FontSize updated');
                }
              );
            } else {
              tx.executeSql(
                'INSERT INTO settings (fontsize) VALUES (?);',
                [value],
                () => {
                  console.log('FontSize updated');
                }
              );
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataFromDatabase = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM settings', [], (tx, results) => {
          if (results.rows.length > 0) {
            const { theme, fontsize } = results.rows.item(0);
            setDarkMode(theme === 1);
            setFontSize(fontsize);
            return;
          } else {
            setDarkMode(false);
            setFontSize(16);
            return;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchDataFromDatabase();
  console.log('Settings fetched');
  }
  , []);

  return (
    <SettingContext.Provider value={{ darkMode, updateDarkMode, fontSize, updateFontSize }}>
      {children}
    </SettingContext.Provider>
  );
};

export { SettingContext, SettingProvider };
