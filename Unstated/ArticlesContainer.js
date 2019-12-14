import { Container } from "unstated";
import { Linking } from 'react-native';

export default class ArticlesContainer extends Container {
	
	state = {
		savedArticles: [],
		nearArticles: null, 
		error: null,
		loading: false,
	};
	
  	loadArticleInBrowser = (id) => {
		Linking.openURL('http://en.wikipedia.org/?curid=' + id).catch(err => console.error("Couldn't load page", err));
	};
	
	getArticlesFromApiAsync = async (lat, lon) => {
		await this.setState({ loading: true });
		
		let url = "https://en.wikipedia.org/w/api.php"; 

		let params = {
			action: "query",
			list: "geosearch",
			gscoord: lat +  "|" + lon,
			gsradius: "10000",
			gslimit: "10",
			format: "json"
		};
				
		url = url + "?origin=*";
		Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
 
		try {
			const nearArticles = (await fetch(url).then(r => r.json())).query.geosearch;
			await this.setState({ nearArticles, loading: false });
		} catch(error) {
			alert(error);
			await this.setState({ error, loading: false });
		}
	}
	
	clear = () => {
		this.setState({ nearArticles: null });
	};

	saveArticle = async (article) => {
		if(this.state.savedArticles.some(a => a.title === article.title)){
			alert('Article already in the reading list: ' + article.title);
		} else {
			await this.setState(state => ({savedArticles: [...state.savedArticles, article]}));
		}
	}
}
