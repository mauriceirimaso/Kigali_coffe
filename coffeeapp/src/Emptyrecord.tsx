import React from 'react';
const orders =require('../assets/emptyphotoes/orders.png');
import { 
    Image, 
    View, 
    ImageSourcePropType 
} from 'react-native';
import styles from './Emptyrecordcss';

interface EmptyRecordProps {
    photo: ImageSourcePropType;
}

const Emptyrecord: React.FC<EmptyRecordProps> = (props) => {
    return (
        <View style={styles.grandview}>
            <Image style={styles.coverphoto} source={props.photo} />
        </View>
    );
};

export default Emptyrecord;
