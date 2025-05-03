import React, { useRef, useMemo } from 'react';
import 'react-native-gesture-handler';
import { View, Text, Button, StyleSheet } from 'react-native';

import {BottomSheetModal,BottomSheetModalProvider} from '@gorhom/bottom-sheet'

const Page = () => {
  
  const bottomSheetRef = useRef(null);

  
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    
  const handleOpenPress = () => {
    bottomSheetRef.current?.present();
  };

  return (  
    <BottomSheetModalProvider>
    <View style={styles.container}>
        <Button title="Open Bottom Sheet" onPress={handleOpenPress} />
         <BottomSheetModal
            ref={bottomSheetRef} 
            index={0}
            snapPoints={snapPoints}
            >
          <View>
              <Text>hello fam im here today</Text>
          </View>

         </BottomSheetModal>
      
     
        </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Page;
