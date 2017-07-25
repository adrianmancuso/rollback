require "httparty"
require "nokogiri"
require "mechanize"
require 'json'
require 'pry'


melbourne_stores =  ["7 For All Mankind",
 "A.P.C. Store",
 "A|X Armani Exchange",
 "Adidas",
 "Alannah Hill",
 "Alpha60",
 "Alterations Now",
 "American Rag",
 "American Rag",
 "Andrea Yasmin",
 "Angel Sissi",
 "Anna Thomas Boutique",
 "Archive - A Shop by Phillips",
 "Armani Outlet",
 "Arpelle Outlet",
 "Arthur Daley's On Swanston Street",
 "Assin",
 "Authentic Factory Outlet (Converse)",
 "Black Orange Fashions",
 "Blonde Venus",
 "Bluebell Bridal",
 "Brides On Collins By Wendy Makin",
 "Brown Sugar",
 "Bul Clothing",
 "Burberry",
 "Calvin Klein Platinum Label",
 "Calvin Klein Underwear",
 "Catwalk Mode Outlet",
 "Chanel",
 "Chelsea",
 "Christine",
 "City Chic",
 "Clementine's",
 "CoRLection",
 "Cos",
 "Cotton On",
 "Cotton On",
 "Cotton On",
 "Cotton On",
 "Cotton On",
 "Cotton On Body",
 "Cubec",
 "Cue",
 "Cue",
 "Dada & Co",
 "Dangerfield",
 "Danny's Knitwear",
 "David Jones",
 "David Lawrence",
 "De Elegance",
 "Design a Space",
 "Dion Lee",
 "Dior",
 "Distal Phalanx",
 "Diva",
 "Dizingof",
 "Dolce & Gabbana",
 "dot COMME",
 "Dotti",
 "Dotti",
 "Dotti",
 "Dotti",
 "Dress U",
 "Eastern Market Fabrica",
 "Eimai",
 "Erika",
 "Erinbank Crafts & Gifts",
 "Et Al",
 "Factorie",
 "Fashion On Top",
 "Feathers",
 "Feathers",
 "Fella Hamilton",
 "Fletcher Jones Australia",
 "Fokus",
 "Forcast Outlet",
 "French Connection",
 "French Connection",
 "Funkis",
 "G Star",
 "Gap",
 "General Pants Co",
 "General Pants Co",
 "Godwin Charli",
 "Gorman",
 "Gorman",
 "Green With Envy",
 "H&M",
 "Hannii",
 "Harrolds",
 "Harrolds Outlet",
 "Hedrena",
 "Hidden Agenda",
 "Hill and Dale",
 "Hunter Gatherer",
 "Husk",
 "Husk",
 "Idyl",
 "IM Lingerie",
 "Incu",
 "Indigo",
 "Jacqui Fernandes",
 "JasonGrech",
 "Jay Jay's",
 "JD Sports",
 "Josua Andreas - Urban Project",
 "Karen Millen",
 "Katies",
 "Keon Couture Design",
 "Kimono House",
 "Kinki Gerlinki",
 "Kookai",
 "Kookai",
 "Kookai",
 "Kuwaii",
 "La Bella Donna",
 "Lady Bold",
 "Le Style Boutique",
 "Leather Cargo",
 "Lee Mathews",
 "Leona Edmiston",
 "Leonard St",
 "Life With Bird",
 "Lorna Jane",
 "Lorna Jane",
 "Lorna Jane",
 "Lorna Jane Active Living",
 "Louis Vuitton Australia",
 "Louise MacDonald Milliner",
 "L'uccello",
 "Maconii",
 "Madam Virtue & Co",
 "Made in Milan",
 "Maje",
 "Marais",
 "Marcs",
 "Marimekko",
 "Material By Product",
 "Mazi",
 "MCM Studio",
 "Melko",
 "Metalicus",
 "Metalicus",
 "Milly Sleeping",
 "Mollini",
 "Monk House Design",
 "Monster Threads",
 "Monster Threads",
 "Muji",
 "Myer Melbourne",
 "Neuw Denim",
 "nevenka",
 "Nine West",
 "No Concept Store",
 "No Order Market",
 "Obus",
 "Origen",
 "Oroton",
 "Out Of The Closet",
 "P.A.M Store Melbourne",
 "Peter Sheppard Footwear",
 "Planinsek",
 "Principal",
 "Queenspark",
 "Reiss",
 "Republic Boutique Melbourne",
 "Rex Clothing",
 "Rhodes & Beckett",
 "Rhodes & Beckett",
 "Ripe Maternity",
 "Ritzy Lady Boutiques",
 "RMIT Pop Up Shop 2",
 "Roxanne",
 "Roxanne",
 "Roxanne",
 "RPM",
 "Saba",
 "Saba Melbourne",
 "Sandro Paris",
 "Scanlan & Theodore",
 "Scotch & Soda",
 "Seafolly",
 "Seed",
 "Seed Heritage",
 "Serena Lindeman Millinery",
 "Shag",
 "Silk Lane Boutique",
 "Simone Perele",
 "Slow Waves",
 "Smooth",
 "soleDevotion",
 "Some Like It Hot",
 "Somewhere",
 "Springfield",
 "Superdry",
 "Swensk",
 "Target Australia",
 "The Alpaca Collection",
 "The Cats Meow",
 "The Distinctive Dame",
 "The Gently Unfurling Sneak",
 "The Kooples",
 "Tiffany Treloar",
 "Topshop",
 "Trenery Spencer Outlet Centre",
 "Uniqlo",
 "Vanishing Elephant",
 "Verner",
 "Veronika Maine",
 "Veronika Maine",
 "Villain",
 "Willow",
 "Witchery",
 "Wolford Melbourne",
 "Zadig & Voltaire",
 "Zambesi",
 "Zara",
 "Zimmermann"]


@result_hash = {}

def google_crawler store_name
	
	#set agent
	@a = Mechanize.new { |agent|
	  agent.user_agent_alias = 'Windows Chrome'
	}
	
	#search for store on aus Google
	@a.get('http://google.com.au/') do |page|
  search_result = page.form_with(:id => 'tsf') do |search|
    search.q = store_name + ' melbourne clothes'
  end.submit

  #retrieve first link
	links = search_result.search(".//h3[@class='r']")
	@first_hit = links[0].children[0].attributes['href'].value
	end

	def check_for_day link
		@a.get(link.href).search(".//p").each do |paragraph|
			if paragraph.text.downcase.include? 'days'
				array = paragraph.text.split(' ')
				i = array.find_index('days')
				if i
					preceeding_word = array[i-1]
					if (preceeding_word.is_a? String) && (preceeding_word.to_i > 6)
						return preceeding_word
					end
				end
			end
		end 
	end

	@a.get(@first_hit) do |page|
		page.links.each do |link|
			#check for returns in link
			if link.text.downcase.include? 'return'
				return check_for_day link
  			return
			end
		end
		page.links.each do |link|
			if link.text.downcase.include? 'customer'
				return check_for_day link
				return
			end			
		end
	end
	# failing first test, check for customer in links
end


melbourne_stores.each do |store|
	days = google_crawler store
	if (days.is_a? String) && (days.to_i > 0) 
		puts store
		puts days
		@result_hash[store] = days
	end
end

puts @result_hash



# scraped_results = {"7 For All Mankind"=>"30",
#  "A.P.C. Store"=>"14",
#  "Adidas"=>"14",
#  "Alannah Hill"=>"14",
#  "Bul Clothing"=>"14",
#  "Burberry"=>"30",
#  "City Chic"=>"7",
#  "Cue"=>"10",
#  "Dangerfield"=>"14",
#  "Dion Lee"=>"15",
#  "Distal Phalanx"=>"7",
#  "Et Al"=>"10",
#  "Fella Hamilton"=>"30",
#  "Fletcher Jones Australia"=>"28",
#  "French Connection"=>"14",
#  "Funkis"=>"7",
#  "G Star"=>"10",
#  "General Pants Co"=>"10",
#  "Godwin Charli"=>"30",
#  "Gorman"=>"7",
#  "Husk"=>"7",
#  "Incu"=>"7",
#  "Karen Millen"=>"14",
#  "Katies"=>"30",
#  "Kookai"=>"14",
#  "Kuwaii"=>"10",
#  "Le Style Boutique"=>"14",
#  "Lee Mathews"=>"14",
#  "Leona Edmiston"=>"14",
#  "Leonard St"=>"7",
#  "Life With Bird"=>"7",
#  "Lorna Jane"=>"14",
#  "Lorna Jane Active Living"=>"14",
#  "Maje"=>"30",
#  "Marcs"=>"30",
#  "Marimekko"=>"30",
#  "MCM Studio"=>"30",
#  "Metalicus"=>"14",
#  "Monster Threads"=>"21",
#  "nevenka"=>"14",
#  "Nine West"=>"30",
#  "Obus"=>"14",
#  "Reiss"=>"14",
#  "Ripe Maternity"=>"14",
#  "Roxanne"=>"14",
#  "Seafolly"=>"31",
#  "Seed"=>"14",
#  "Seed Heritage"=>"14",
#  "soleDevotion"=>"7",
#  "Somewhere"=>"7",
#  "Target Australia"=>"28",
#  "Tiffany Treloar"=>"14",
#  "Uniqlo"=>"30",
#  "Vanishing Elephant"=>"100",
#  "Veronika Maine"=>"10",
#  "Zara"=>"15",
#  "Zimmermann"=>"15"}


# # google_crawler 'uniqlo'
# # google_crawler 'A.P.C store'
# # google_crawler 'Allanah Hill'
# # google_crawler 'adidas'
# # google_crawler 'target'
# # google_crawler 'nike'

# binding.pry
# puts 'so that i can debug even with pry-byebug'