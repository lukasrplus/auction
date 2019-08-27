require 'open-uri'
require 'json'
require 'csv'

####### bids seed #########

csv_text = File.read(Rails.root.join('lib', 'seeds', '2018bids.csv'))
csv = CSV.parse(csv_text)


csv.each do |entry|
  Bid.create(
    amount: entry[2],
    user_id: 1,
    draft_id: (entry[0].to_i - 2012),
    player_id: entry[3],
    winning: true
  )
end