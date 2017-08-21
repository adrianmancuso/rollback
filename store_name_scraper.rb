require "httparty"
require "nokogiri"
require "mechanize"
require 'json'
require 'pry'
# require_relative 'web_scraper'

start = "/Shopping/Fashion/Mens/Pages/Mens.aspx"
@store_names = []

def store_scraper url
	
	destination = url
	#set agent
	a = Mechanize.new { |agent|
	  agent.user_agent_alias = 'Windows Chrome'
	}
	
	#if target is changed both get target and destination must be changed
	a.get("https://whatson.melbourne.vic.gov.au" + destination) do |page|
  	#h4 is specific to whatson.melbourne
  	results = page.search(".//h4")
  	results.each do |store|
  		@store_names.push(store.text)
  	end
  	page.links.each do |link|
  		if link.text == '>'
  			# recursive call
  			 store_scraper(link.href)
  		end
  	end
  return @store_names
	end
end


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



binding.pry
puts 'so that i can debug even with pry-byebug'