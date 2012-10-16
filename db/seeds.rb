# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

artists = Artist.create([{name: 'The Chemical Brothers'},
						 {name: 'Red Hot Chili Peppers'},
						 {name: 'R.E.M.'},
						 {name: 'The Beatles'}])

Song.create(title: 'Star Guitar', 			artist: artists[0])
Song.create(title: 'Come With Us', 			artist: artists[0])
Song.create(title: 'My Elastic Eye', 		artist: artists[0])
Song.create(title: 'Hoops', 				artist: artists[0])
Song.create(title: 'Californication', 		artist: artists[1])
Song.create(title: 'Losing My Religion', 	artist: artists[2])
Song.create(title: 'Imitation of Life',	 	artist: artists[2])
Song.create(title: 'Yellow Submarine', 		artist: artists[3])
Song.create(title: 'Yesterday', 			artist: artists[3])
Song.create(title: 'Help!',					artist: artists[3])