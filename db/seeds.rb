# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

scraped_results = {"7 For All Mankind"=>"30",
 "A.P.C. Store"=>"14",
 "Adidas"=>"14",
 "Alannah Hill"=>"14",
 "Bul Clothing"=>"14",
 "Burberry"=>"30",
 "City Chic"=>"7",
 "Cue"=>"10",
 "Dangerfield"=>"14",
 "Dion Lee"=>"15",
 "Distal Phalanx"=>"7",
 "Et Al"=>"10",
 "Fella Hamilton"=>"30",
 "Fletcher Jones Australia"=>"28",
 "French Connection"=>"14",
 "Funkis"=>"7",
 "G Star"=>"10",
 "General Pants Co"=>"10",
 "Godwin Charli"=>"30",
 "Gorman"=>"7",
 "Husk"=>"7",
 "Incu"=>"7",
 "Karen Millen"=>"14",
 "Katies"=>"30",
 "Kookai"=>"14",
 "Kuwaii"=>"10",
 "Le Style Boutique"=>"14",
 "Lee Mathews"=>"14",
 "Leona Edmiston"=>"14",
 "Leonard St"=>"7",
 "Life With Bird"=>"7",
 "Lorna Jane"=>"14",
 "Lorna Jane Active Living"=>"14",
 "Maje"=>"30",
 "Marcs"=>"30",
 "Marimekko"=>"30",
 "MCM Studio"=>"30",
 "Metalicus"=>"14",
 "Monster Threads"=>"21",
 "nevenka"=>"14",
 "Nine West"=>"30",
 "Obus"=>"14",
 "Reiss"=>"14",
 "Ripe Maternity"=>"14",
 "Roxanne"=>"14",
 "Seafolly"=>"31",
 "Seed"=>"14",
 "Seed Heritage"=>"14",
 "soleDevotion"=>"7",
 "Somewhere"=>"7",
 "Target Australia"=>"28",
 "Tiffany Treloar"=>"14",
 "Uniqlo"=>"30",
 "Vanishing Elephant"=>"100",
 "Veronika Maine"=>"10",
 "Zara"=>"15",
 "Zimmermann"=>"15"}

Store.destroy_all
User.destroy_all

 scraped_results.each do |key, value|
 	Store.create name: key, return_window: value
 end

User.create(name: 'Sarah', email: 'sarah@gmail.com', password: 'password')
User.create(name: 'Adrian', email: 'adrian@gmail.com', password: 'password')
User.create(name: 'Matt', email: 'sabrina@gmail.com', password: 'password')
User.create(name: 'Sabrina', email: 'sabrina@gmail.com', password: 'password')
User.create(name: 'Chloe', email: 'chloe@gmail.com', password: 'password')


