import React from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking'

export default function App() {
	const [news, setNews] = React.useState([])

	React.useEffect(() => {
		fetch('https://mds-api.netlify.app/news.json').then((response) => {
			return response.json()
		}).then((json) => {
			setNews(json)
		})
	}, [])

	const onItemPress = (item) => {
		Linking.openURL(item.url)
	}

	return (
		<View style={styles.container}>
			<StatusBar />
			<Text style={styles.header}>Liste de news :</Text>
			<View style={styles.newsContainer}>
				<FlatList
					data={news}
					renderItem={({ item }) => (
						<View style={styles.newsItem}>
							<Image
								style={styles.image}
								source={{ uri: item.image }}
								resizeMode="contain"
							/>
							<View style={styles.content}>
								<TouchableOpacity onPress={() => { onItemPress(item) }}>
									<Text style={styles.title}>
										{item.title}
									</Text>
								</TouchableOpacity>
								<Text style={styles.excerpt}>
									{item.excerpt}
								</Text>
							</View>
						</View>
					)}
					keyExtractor={item => item.id}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		marginTop: 10,
		marginLeft: 10,
		marginBottom: 10,
	},
	header: {
		marginBottom: 10,
		fontSize: 18,
	},
	newsContainer: {
		marginTop: 5,
		marginBottom: 5,
	},
	newsItem: {
		flexDirection: "row",
		marginBottom: 15,
	},
	image: {
		width: 70,
		height: 70,
		marginTop: 5,
	},
	content: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	excerpt: {
		fontSize: 12,
	},
});
