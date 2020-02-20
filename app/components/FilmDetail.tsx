// components/FilmDetail

import React from "react";
import {StyleSheet, View, ScrollView, ActivityIndicator, Text, Image, TouchableOpacity, Button} from "react-native";
import {getFilmDetail} from "../api/TMDBApi";
import moment from "moment";
import numeral from "numeral"
import {connect} from "react-redux"
import {toggleFavoriteAction, toggleFavoriteThunk} from "../store/actions/filmActions";
import {Dispatch} from "redux";

type ItemProps = { film: any }

interface IState {
    film?: string;
}

class FilmDetail extends React.Component<ItemProps> {

    constructor(props) {
        super();
        this.state = {
            film: undefined, isLoading: true
        }
    }

    componentDidMount(): void {
        getFilmDetail(this.props.navigation.getParam('idFilm')).then(value =>
            this.setState({
                    film: value,
                    isLoading: false
                }
            )
        )
    }


    componentDidUpdate() {
        console.log("componentDidUpdate : ")
        console.log(this.props.favoritesFilms)
    }

    _displayView() {

        const {film} = this.state

        if (film == undefined) {
            return (

                <View style={styles.activityContainer}>
                     <ActivityIndicator size={"large"}/>
                 </View>
            )
        }
        else {
            return (

                <ScrollView style={styles.scrollviewContainer}>
                    <Image style={styles.filmImage}
                           source={{uri: 'https://image.tmdb.org/t/p/w300/'+film.poster_path}}/>

                           <View style={styles.titleContentView}>

                               <Text style={styles.filmTitleText}>{film.original_title + '\n'+ film.title}</Text>

                               <TouchableOpacity onPress={() => this._toggleFavorite()}>
                                   {this._displayFavoriteImge()}
                               </TouchableOpacity>

                           </View>



                    <Text style={styles.filmDetailText}>{film.overview}</Text>

                    {/* Release date */}
                    <View style={styles.filmDetailsView}>
                        <Text style={styles.filmDetailsTitle}>Date de sortie: </Text>
                        <Text style={styles.filmDetailsText}>{

                            moment(new Date(film.release_date)).format("DD/MM/YYYY")

                        }</Text>
                    </View>

                    {/* Note */}
                    <View style={styles.filmDetailsView}>
                        <Text style={styles.filmDetailsTitle}>Note: </Text>
                        <Text style={styles.filmDetailsText}>{film.vote_average}/10</Text>
                    </View>

                    {/* budget */}
                    <View style={styles.filmDetailsView}>
                        <Text style={styles.filmDetailsTitle}>Budget: </Text>
                        <Text style={styles.filmDetailsText}>{
                            numeral(film.budget).format('0,0[.]00$')
                        }</Text>
                    </View>

                    {/* genre */}
                    <View style={styles.filmDetailsView}>
                        <Text style={styles.filmDetailsTitle}>Genre: </Text>

                        <Text style={styles.filmDetailsText}>{

                            film.genres.map(genre => {
                                return genre.name
                            }).join(' / ')


                        }</Text>
                    </View>

                    {/* Companies */}
                    <View style={styles.filmDetailsView}>
                        <Text style={styles.filmDetailsTitle}>Producteurs: </Text>
                        <Text style={styles.filmDetailsText}>{

                           film.production_companies.map(companie =>
                                companie.name
                           ).join(', ')

                        }</Text>
                    </View>


                </ScrollView>
            )
        }
    }

    _displayFavoriteImge() {

        var sourceImage = require('../images/ic_favorite_border.png')

        if (this.props.favoritesFilms.findIndex(item => item.id === this.state.film.id) >= 0) {
            sourceImage = require('../images/ic_favorite.png')
        }

        return <Image style={styles.favoritesButton}  source={sourceImage}/>
    }

    render() {

        console.log('FilmdDetail props: ' + this.props.favoritesFilms)

        return (
            <View style={styles.mainContainer}>
                {this._displayView()}
            </View>
        )

    }

    // Actions

    _toggleFavorite() {
        console.log("_toggleFavorite action")
        this.props.reduxToggleFavorite(this.state.film)
    }

}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    titleContentView: {
        flexDirection:'row',
    },
    activityContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center', // align on X
        justifyContent: 'center' // align on Y
    },
    scrollviewContainer: {
        backgroundColor: 'white'
    },
    filmImage: {
        height:300,
        margin: 5
    },
    favoritesButton: {
      width: 40,
      height: 40,
        marginRight: 10
    },
    filmTitleText: {
        fontWeight:'bold',
        textAlign:'center',
        fontSize:20,
        flex:1,
        marginLeft:40

    },
    filmDetailText: {
        fontSize:12,
        marginBottom:10,
        marginTop:20
    },
    filmDetailsView: {
        flexDirection:'row'
    },
    filmDetailsTitle: {
        fontWeight:'bold',
        fontSize:12
    },
    filmDetailsText: {
        fontSize:12
    },
})

// Redux

const mapStateToProps = (state) => {
    //  any time the redux store is updated, mapStateToProps will be called
    return {
        favoritesFilms: state.favoritesFilms
    }
}

const mapDispatchToProps = () => ({
    reduxToggleFavorite:toggleFavoriteThunk,
});

//
export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail)