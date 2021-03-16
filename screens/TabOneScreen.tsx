import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';
import TableRenderer from '@native-html/table-plugin';
import { ScrollView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';

import { View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';

const BASE_URL = 'https://dwg.vc';

const isAbsolute = (url: string): boolean => {
  return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|mailto:)?[a-z0-9@]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
}

export default function TabOneScreen() {
  const theme = useColorScheme();
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <HTML
          WebView={WebView}
          source={{uri: BASE_URL + '/legal/privacy.html'}}
          tagsStyles={{
            p: {
              marginBottom: 30
            },
            h2: {
              marginBottom: 30
            }
          }}
          defaultTextProps={{
            style: {
              color: theme === 'dark' ? '#fff' : '#000'
            }
          }}
          renderers={{
            img: () => null,
            h1: () => null,
            footer: () => null,
            header: () => null,
            table: TableRenderer
          }}
          onLinkPress={(evt, href) => {
            if (isAbsolute(href)) {
              Linking.openURL(href);
            } else {
              Linking.openURL(BASE_URL + href);
            }
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20
  }
});
