require 'sinatra'
require 'haml'
require 'json'
require 'sinatra/reloader' if development?
require 'sinatra/cookies'

db = JSON.parse File.read('./public/js/db.js')
get '/' do
  haml :index
end

get '/select' do
  haml :select, :locals => {:site_list=>db}
end

get '/show' do
	bounds = {}
	db.each do|site_id, site_group|
		temp = []
		site_group.each do|id, info|
			temp << id;
		end
		bounds[site_id] = temp
	end
	response.set_cookie('site_bounds', bounds.to_json.to_s)
  haml :show, :locals => {:selections => JSON.parse(cookies[:wish_list]), :db=> db}
end

get '/get_next/:k_v' do|k_v|
	#return next v corresponding to k
	k_v = k_v.split('_')
	k = k_v[0]
	v = k_v[1]
	code = v.ord + 1 
	r = code.chr
	if !db[k][r]
		r = "a"
	end
	return r.to_json
end
