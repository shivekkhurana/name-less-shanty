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
