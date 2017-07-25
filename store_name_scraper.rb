require "httparty"
require "nokogiri"
require "mechanize"
require 'json'
require 'pry'
require_relative 'web_scraper'

start = "/Shopping/Fashion/Womens/Pages/Womens.aspx"
@store_names = []

def store_scraper url
	
	destination = url
	#set agent
	a = Mechanize.new { |agent|
	  agent.user_agent_alias = 'Windows Chrome'
	}
	
	a.get("https://whatson.melbourne.vic.gov.au" + destination) do |page|
  	results = page.search(".//h4")
  	results.each do |store|
  		@store_names.push(store.text)
  	end
  	page.links.each do |link|
  		if link.text == '>'
  			 store_scraper(link.href)
  		end
  	end
  	binding.pry
  return @store_names
end
end


# def find_return_window store_name
	
# 	#set agent
# 	a = Mechanize.new { |agent|
# 	  agent.user_agent_alias = 'Windows Chrome'
# 	}
	
# 	#search for store on aus Google
# 	a.get('http://google.com.au/') do |page|
#   search_result = page.form_with(:id => 'tsf') do |search|
#     search.q = store_name + ' melbourne clothes'
#   end.submit

#   #retrieve first link
# 	links = search_result.search(".//h3[@class='r']")
# 	@first_hit = links[0].children[0].attributes['href'].value
# 	end


# 	a.get(@first_hit) do |page|
# 		page.links.each do |link|
# 			#check for returns in link
# 			if link.text.downcase.include? 'return'
#   			a.get(link.href).search(".//p").each do |paragraph|
#   				if paragraph.text.downcase.include? 'days'
#   					array = paragraph.text.split(' ')
#   					i = array.find_index('days')
#   					preceeding_word = array[i-1]
# 						if preceeding_word.to_i > 7
# 							return store_name + ":" +preceeding_word
# 						end
#   				end
#   			end 
#   			return
# 			end
# 		end
# 	end
# 	#failing first test, check for customer in links
# 	if link.text.downcase.include? 'customer'
# 		a.get(link.href).search(".//p").each do |paragraph|
# 			if paragraph.text.downcase.include? 'days'
# 				array = paragraph.text.split(' ')
# 				i = array.find_index('days')
# 				preceeding_word = array[i-1]
# 				if preceeding_word.to_i > 7
# 					return store_name + ":" +preceeding_word
# 				end
# 			end
# 		end
# 	return
# 	end			
# end
# end



store_scraper start

# google_crawler @store_names[0]
# google_crawler @store_names[1]
# google_crawler @store_names[2]
# google_crawler @store_names[3]
# google_crawler @store_names[4]

# @store_names.each do |store|
# 	find_return_window store
# end
# end



# binding.pry
# puts 'so that i can debug even with pry-byebug'