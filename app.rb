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
