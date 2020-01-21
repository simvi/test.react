// components/FimItem.ts

import React from 'react';
import {Image, ImageComponent, StyleSheet, Text, View} from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";

type ItemProps = {film: any}

class FilmItem extends React.Component<ItemProps> {
    render() {
        const film = this.props.film
        console.log(film)
        return (
            <View style={styles.viewContainer}>
                <Image style={styles.leftImage}
                    source={{uri: 'https://image.tmdb.org/t/p/w300'+film.item.backdrop_path}}/>
                <View style={styles.rightContainer}>

                    <View style={styles.topTitleNoteContainer}>
                        <Text style={styles.titleText}>{film.item.original_title}</Text>
                        <Text style={styles.noteText}>{film.item.vote_average}</Text>
                    </View>

                    <Text style={styles.descriptionText} numberOfLines={6}>{film.item.overview}</Text>
                    <Text style={styles.dateText}> Sorti le {film.item.release_date} </Text>

                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        margin: 5,
        flexDirection: 'row'
    },
    topTitleNoteContainer: {
        flexDirection: 'row'
    },
    titleText: {
        color: Colors.black,
        flex: 2,
        flexWrap: 'wrap',
        fontSize:20,
        fontWeight: 'bold',
        margin: 5
    },
    noteText: {
        color: Colors.black,
        fontSize:20,
        fontWeight: 'bold'
    },
    leftImage: {
        width: 120,
        height: 180,
        backgroundColor: Colors.black
    },
    rightContainer: {
        flex: 1
    },
    descriptionText: {
        flex:2, margin: 5
    },
    dateText: {
        textAlign: 'right',
        marginBottom: 5
    }

})

export default FilmItem