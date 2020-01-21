import React from 'react';

import {Button, TextInput, View, StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native';
import FilmItem from "./FilmItem";
import {getFilmsFromApiWithSearchedText} from "../api/TMDBApi";
import {Colors} from "react-native/Libraries/NewAppScreen";

class SearchComponent extends React.Component {
	private searchedText: string;
	private page: number;
	private totalPages: number;

	constructor(props) {
		super(props);
		this.searchedText = ""
		this.page = 0
		this.totalPages = 0
		this.state = {
			films: [],
			isLoading: false
		}
	}

	render() {
		console.log('RENDER')
		return (
			<View style={styles.main_container}>

				<TextInput style={styles.textinput}
						   placeholder='Titre du film'
						   onChangeText={text => {this.searchedText = text}}
						   onSubmitEditing={() => this._searchAction()}
				/>

				<Button title='Rechercher'
						onPress={() => {this._searchAction()}}
				/>

				<FlatList
					style={styles.flatList}
					data={this.state.films}
					keyExtractor={item => item.id.toString()}
					renderItem={item => <FilmItem film={item}/>}
					onEndReachedThreshold={0.5}
					onEndReached={info => this._loadFilms()}
				/>

				{ this._getLoadingView() }

			</View>
		);
	}

	_getLoadingView() {
		if (this.state.isLoading) {
			return (
				<View style={styles.activityIndicatorView}>
					<ActivityIndicator size={'small'}/>
				</View>
			)
		}
	}

	_searchAction() {

		this.page = 0
		this.totalPages = 0
		this.setState({
			films: []
		}, () => {
			this._loadFilms()
		})

	}

	_loadFilms() {
		if (this.searchedText.length > 0 && this.page <= this.totalPages) {
			this.setState({isLoading: true})
			getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
				console.log('SEARCH PAGE ' + data.page + ' ON ' + data.total_pages)
				this.page = data.page
				this.totalPages = data.total_pages// taille de la scroll pas bonne ? ken le
				this.setState({films: [...this.state.films, ...data.results], isLoading: false})
			})

		}
	}

}

const styles = StyleSheet.create({
	main_container: {
		marginTop: 20,
	},
	textinput: {
		marginLeft: 5,
		marginRight: 5,
		height: 50,
		borderColor: '#000000',
		borderWidth: 1,
		paddingLeft: 5
	},
	activityIndicatorView: {
		position:'absolute',
		justifyContent: 'center',
		top:0,
		right: 0,
		bottom: 0,
		left: 0
	},
	flatList: {
		bottom:0
	}
})


export default SearchComponent;
