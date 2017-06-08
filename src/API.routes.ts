export const APIRoutes = {
	
	get_login_route: function(){
		return 'http://do2rom.herokuapp.com/user_token';
	},

	get_products_route: function(){
		return 'http://do2rom.herokuapp.com/products';
	},

	get_prices_route: function(product_id){
		return 'http://do2rom.herokuapp.com/products/'+product_id+'prices';
	},

	get_confirm_route: function(price_id){
		return 'http://do2rom.herokuapp.com/prices/' + price_id + '/confirm'
	},

	get_disconfirm_route: function(price_id){
		return 'http://do2rom.herokuapp.com/prices/' + price_id + '/confirm'
	}
}