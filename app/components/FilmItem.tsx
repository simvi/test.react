// components/FimItem.ts

import React from 'react';
import {Image, ImageComponent, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";

type ItemProps = { film: any, displayFilmDetailAction: any, isFavorite: boolean }

class FilmItem extends React.Component<ItemProps> {

    render() {

        const film = this.props.film
        const displayFilmDetailAction = this.props.displayFilmDetailAction
        //console.log(film)
        return (
            <TouchableOpacity style={styles.viewContainer}
                              onPress={() => displayFilmDetailAction(film.item.id)}>
                <Image style={styles.leftImage}
                       source={{uri: 'https://image.tmdb.org/t/p/w300' + film.item.backdrop_path}}/>
                <View style={styles.rightContainer}>

                    <View style={styles.topTitleNoteContainer}>
                        {this._displayFavoriteImge()}
                        <Text style={styles.titleText}>{film.item.original_title}</Text>
                        <Text style={styles.noteText}>{film.item.vote_average}</Text>
                    </View>

                    <Text style={styles.descriptionText} numberOfLines={6}>{film.item.overview}</Text>
                    <Text style={styles.dateText}> Sorti le {film.item.release_date} </Text>

                </View>


            </TouchableOpacity>
        )
    }

    _displayFavoriteImge() {

        var sourceImage = require('../images/ic_favorite_border.png')

        if (this.props.isFavorite == true) {
            sourceImage = require('../images/ic_favorite.png')
        }

        return <Image style={styles.isFavoriteImage} source={sourceImage}/>
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
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5
    },
    isFavoriteImage: {
        width: 20,
        height: 20,
        marginTop: 8,
        marginLeft: 5
    },
    noteText: {
        color: Colors.black,
        fontSize: 20,
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
        flex: 2, margin: 5
    },
    dateText: {
        textAlign: 'right',
        marginBottom: 5
    }

})

export default FilmItem