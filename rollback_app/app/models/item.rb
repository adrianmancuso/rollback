class Item < ApplicationRecord
  belongs_to :store
  belongs_to :clothing_type
  belongs_to :user
end
